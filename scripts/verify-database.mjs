import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { Pool } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error("DATABASE_URL is required to run database verification.");
}

if (!/^postgres(?:ql)?:\/\//.test(connectionString)) {
  throw new Error("DATABASE_URL must be a PostgreSQL connection string.");
}

const pool = new Pool({
  connectionString,
  max: 1,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 10_000
});

const client = await pool.connect();
const passed = [];

async function check(name, callback) {
  await callback();
  passed.push(name);
  process.stdout.write(`✓ ${name}\n`);
}

async function expectSqlState(callback, expectedState) {
  const savepoint = `verify_${randomUUID().replaceAll("-", "")}`;
  await client.query(`SAVEPOINT ${savepoint}`);

  try {
    await callback();
    throw new Error(`Expected PostgreSQL error ${expectedState}, but the statement succeeded.`);
  } catch (error) {
    if (error?.code !== expectedState) {
      throw error;
    }
  } finally {
    await client.query(`ROLLBACK TO SAVEPOINT ${savepoint}`);
    await client.query(`RELEASE SAVEPOINT ${savepoint}`);
  }
}

async function createRepository({ visibility = "public", privateOptIn = false } = {}) {
  const githubId = BigInt(`0x${randomUUID().replaceAll("-", "").slice(0, 12)}`).toString();
  const result = await client.query(
    `INSERT INTO repositories
      (github_repository_id, owner_login, name, full_name, html_url, visibility, private_analysis_opt_in)
     VALUES ($1, 'morphfolio-verification', $2, $3, $4, $5, $6)
     RETURNING id`,
    [githubId, `verify-${githubId}`, `morphfolio-verification/verify-${githubId}`,
      `https://github.com/morphfolio-verification/verify-${githubId}`, visibility, privateOptIn]
  );
  return result.rows[0].id;
}

async function createPublishedProject(repositoryId, slug) {
  const ownerId = (BigInt(Date.now()) * 1000n).toString();
  const projectResult = await client.query(
    `INSERT INTO projects
      (repository_id, slug, publication_status, approved_by_github_user_id, approved_at)
     VALUES ($1, $2, 'published', $3, now())
     RETURNING id`,
    [repositoryId, slug, ownerId]
  );
  const projectId = projectResult.rows[0].id;
  const versionResult = await client.query(
    `INSERT INTO project_content_versions
      (project_id, version_number, content, status, creator)
     VALUES ($1, 1, $2::jsonb, 'published', 'owner')
     RETURNING id`,
    [projectId, JSON.stringify({ title: "Verification fixture", summary: "Temporary test content." })]
  );
  const versionId = versionResult.rows[0].id;
  await client.query(
    "UPDATE projects SET current_published_version_id = $1 WHERE id = $2",
    [versionId, projectId]
  );
  return { projectId, versionId };
}

try {
  await client.query("BEGIN");
  await client.query("SET LOCAL statement_timeout = '15s'");
  await client.query("SET LOCAL lock_timeout = '5s'");

  await check("all ten persistence tables and the public eligibility view exist", async () => {
    const result = await client.query(
      `SELECT table_name, table_type
         FROM information_schema.tables
        WHERE table_schema = current_schema()`
    );
    const names = new Set(result.rows.map((row) => row.table_name));
    const expected = [
      "github_installations", "repositories", "projects", "repository_snapshots",
      "ai_generation_runs", "project_content_versions", "project_overrides",
      "webhook_deliveries", "sync_runs", "owner_audit_events"
    ];
    for (const name of expected) assert.ok(names.has(name), `Missing table: ${name}`);
    assert.ok(result.rows.some((row) => row.table_name === "public_eligible_projects" && row.table_type === "VIEW"));
  });

  const publicRepositoryId = await createRepository();
  const { projectId, versionId } = await createPublishedProject(publicRepositoryId, `verify-${randomUUID().slice(0, 8)}`);

  await check("approved public project appears in the public eligibility view", async () => {
    const result = await client.query(
      "SELECT project_id, current_published_version_id FROM public_eligible_projects WHERE project_id = $1",
      [projectId]
    );
    assert.equal(result.rowCount, 1);
    assert.equal(result.rows[0].current_published_version_id, versionId);
  });

  await check("public eligibility excludes private, disabled, deleted, and inaccessible repositories", async () => {
    const mutations = [
      ["visibility = 'private'", "visibility = 'public'"],
      ["is_disabled = true", "is_disabled = false"],
      ["is_deleted = true", "is_deleted = false"],
      ["is_accessible = false", "is_accessible = true"]
    ];
    for (const [blocked, restored] of mutations) {
      await client.query(`UPDATE repositories SET ${blocked} WHERE id = $1`, [publicRepositoryId]);
      const hidden = await client.query(
        "SELECT 1 FROM public_eligible_projects WHERE project_id = $1",
        [projectId]
      );
      assert.equal(hidden.rowCount, 0, `Project remained visible when ${blocked}`);
      await client.query(`UPDATE repositories SET ${restored} WHERE id = $1`, [publicRepositoryId]);
    }
  });

  await check("unapproved projects cannot enter published state", async () => {
    const repositoryId = await createRepository();
    await expectSqlState(
      () => client.query(
        "INSERT INTO projects (repository_id, slug, publication_status) VALUES ($1, $2, 'published')",
        [repositoryId, `unapproved-${randomUUID().slice(0, 8)}`]
      ),
      "23514"
    );
  });

  await check("private README content is rejected without explicit opt-in", async () => {
    const repositoryId = await createRepository({ visibility: "private" });
    await expectSqlState(
      () => client.query(
        `INSERT INTO repository_snapshots
          (repository_id, commit_sha, readme_content, content_hash)
         VALUES ($1, 'verification-commit', 'must not be retained', 'verification-hash')`,
        [repositoryId]
      ),
      "42501"
    );
  });

  await check("revoking private-analysis opt-in scrubs previously retained README content", async () => {
    const repositoryId = await createRepository({ visibility: "private", privateOptIn: true });
    await client.query(
      `INSERT INTO repository_snapshots
        (repository_id, commit_sha, readme_content, content_hash)
       VALUES ($1, 'verification-commit', 'temporary private README', 'verification-private-hash')`,
      [repositoryId]
    );
    await client.query(
      "UPDATE repositories SET private_analysis_opt_in = false WHERE id = $1",
      [repositoryId]
    );
    const result = await client.query(
      "SELECT readme_content FROM repository_snapshots WHERE repository_id = $1",
      [repositoryId]
    );
    assert.equal(result.rows[0].readme_content, null);
  });

  await check("public view rejects a content version owned by a different project", async () => {
    const otherRepositoryId = await createRepository();
    const otherProject = await createPublishedProject(otherRepositoryId, `verify-other-${randomUUID().slice(0, 8)}`);
    await client.query(
      "UPDATE projects SET current_published_version_id = $1 WHERE id = $2",
      [otherProject.versionId, projectId]
    );
    const result = await client.query(
      "SELECT 1 FROM public_eligible_projects WHERE project_id = $1",
      [projectId]
    );
    assert.equal(result.rowCount, 0);
  });

  await check("GitHub webhook delivery IDs are unique", async () => {
    const deliveryId = `verify-${randomUUID()}`;
    await client.query(
      "INSERT INTO webhook_deliveries (github_delivery_id, event_name) VALUES ($1, 'verification')",
      [deliveryId]
    );
    await expectSqlState(
      () => client.query(
        "INSERT INTO webhook_deliveries (github_delivery_id, event_name) VALUES ($1, 'verification')",
        [deliveryId]
      ),
      "23505"
    );
  });


  await check("first publication requires owner approval and atomically promotes its draft", async () => {
    const repositoryId = await createRepository();
    const ownerId = (BigInt(Date.now()) * 1000n + 1n).toString();
    const project = await client.query(
      `INSERT INTO projects (repository_id, slug, publication_status)
       VALUES ($1, $2, 'pending_review') RETURNING id`,
      [repositoryId, `approve-${randomUUID().slice(0, 8)}`]
    );
    const projectId = project.rows[0].id;
    const draft = await client.query(
      `INSERT INTO project_content_versions (project_id, version_number, content, status)
       VALUES ($1, 1, '{"title":"Approved draft"}'::jsonb, 'draft') RETURNING id`,
      [projectId]
    );
    const versionId = draft.rows[0].id;
    await client.query("SELECT approve_and_publish_project($1, $2, $3)", [projectId, versionId, ownerId]);
    const state = await client.query(
      `SELECT p.publication_status, p.current_published_version_id, v.status AS version_status
         FROM projects p JOIN project_content_versions v ON v.id = p.current_published_version_id
        WHERE p.id = $1`,
      [projectId]
    );
    assert.equal(state.rows[0].publication_status, "published");
    assert.equal(state.rows[0].current_published_version_id, versionId);
    assert.equal(state.rows[0].version_status, "published");
    const audit = await client.query(
      "SELECT 1 FROM owner_audit_events WHERE target_id = $1 AND action = 'project.first_published'",
      [projectId]
    );
    assert.equal(audit.rowCount, 1);
  });

  await check("automatic publication atomically supersedes the previous version and preserves it on failure", async () => {
    const repositoryId = await createRepository();
    const { projectId, versionId: firstVersionId } = await createPublishedProject(
      repositoryId, `auto-update-${randomUUID().slice(0, 8)}`
    );
    const draft = await client.query(
      `INSERT INTO project_content_versions (project_id, version_number, content, status)
       VALUES ($1, 2, '{"title":"Updated draft"}'::jsonb, 'draft') RETURNING id`,
      [projectId]
    );
    const secondVersionId = draft.rows[0].id;
    await client.query("SELECT publish_validated_project_update($1, $2)", [projectId, secondVersionId]);
    const promoted = await client.query(
      `SELECT p.current_published_version_id, old.status AS old_status, current.status AS current_status
         FROM projects p
         JOIN project_content_versions old ON old.id = $2
         JOIN project_content_versions current ON current.id = p.current_published_version_id
        WHERE p.id = $1`,
      [projectId, firstVersionId]
    );
    assert.equal(promoted.rows[0].current_published_version_id, secondVersionId);
    assert.equal(promoted.rows[0].old_status, "superseded");
    assert.equal(promoted.rows[0].current_status, "published");

    await client.query("UPDATE projects SET automatic_updates_enabled = false WHERE id = $1", [projectId]);
    const third = await client.query(
      `INSERT INTO project_content_versions (project_id, version_number, content, status)
       VALUES ($1, 3, '{"title":"Must not publish"}'::jsonb, 'draft') RETURNING id`,
      [projectId]
    );
    await expectSqlState(
      () => client.query("SELECT publish_validated_project_update($1, $2)", [projectId, third.rows[0].id]),
      "23514"
    );
    const preserved = await client.query(
      "SELECT current_published_version_id FROM projects WHERE id = $1",
      [projectId]
    );
    assert.equal(preserved.rows[0].current_published_version_id, secondVersionId);
  });

  await check("ineligible repository unpublishes its project without deleting the last published version", async () => {
    const repositoryId = await createRepository();
    const { projectId, versionId } = await createPublishedProject(
      repositoryId, `unpublish-${randomUUID().slice(0, 8)}`
    );
    await client.query("UPDATE repositories SET visibility = 'private' WHERE id = $1", [repositoryId]);
    const result = await client.query("SELECT unpublish_ineligible_project($1) AS unpublished", [projectId]);
    assert.equal(result.rows[0].unpublished, true);
    const state = await client.query(
      `SELECT publication_status, current_published_version_id
         FROM projects WHERE id = $1`,
      [projectId]
    );
    assert.equal(state.rows[0].publication_status, "unpublished");
    assert.equal(state.rows[0].current_published_version_id, versionId);
  });

  await check("Drizzle migration ledger contains all four persistence migrations", async () => {
    const result = await client.query(
      "SELECT to_regclass('drizzle.__drizzle_migrations') AS ledger"
    );
    assert.ok(result.rows[0].ledger, "Missing Drizzle migration ledger");
    const migrations = await client.query("SELECT count(*)::int AS count FROM drizzle.__drizzle_migrations");
    assert.ok(migrations.rows[0].count >= 4, "Expected at least four applied migrations");
  });

  await client.query("ROLLBACK");
  process.stdout.write(`\nDatabase verification passed: ${passed.length} checks. All fixture data was rolled back.\n`);
} catch (error) {
  await client.query("ROLLBACK").catch(() => undefined);
  process.stderr.write("\nDatabase verification failed. Test transaction rolled back.\n");
  throw error;
} finally {
  client.release();
  await pool.end();
}
