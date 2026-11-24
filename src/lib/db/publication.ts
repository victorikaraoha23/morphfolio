import "server-only";

import { sql } from "drizzle-orm";
import { getDatabase } from "@/lib/db";

/**
 * Approves and publishes the first validated draft for a newly discovered project.
 * The database function locks the project, repository, and version and records
 * the approving GitHub owner in the audit log.
 */
export async function approveAndPublishProject(input: {
  projectId: string;
  versionId: string;
  ownerGithubUserId: bigint;
}): Promise<void> {
  await getDatabase().execute(sql`
    SELECT approve_and_publish_project(
      ${input.projectId}::uuid,
      ${input.versionId}::uuid,
      ${input.ownerGithubUserId.toString()}::bigint
    )
  `);
}

/**
 * Promotes a validated draft only when the existing public project is eligible
 * for automatic updates. The previous published version is retained as
 * superseded and remains untouched if any validation or transaction step fails.
 */
export async function publishValidatedProjectUpdate(input: {
  projectId: string;
  versionId: string;
}): Promise<void> {
  await getDatabase().execute(sql`
    SELECT publish_validated_project_update(
      ${input.projectId}::uuid,
      ${input.versionId}::uuid
    )
  `);
}

/**
 * Unpublishes a project only after its linked repository is no longer eligible.
 * The last published content version is deliberately retained for recovery.
 */
export async function unpublishIneligibleProject(projectId: string): Promise<boolean> {
  const result = await getDatabase().execute(sql`
    SELECT unpublish_ineligible_project(${projectId}::uuid) AS unpublished
  `);
  return Boolean(result.rows[0]?.unpublished);
}
