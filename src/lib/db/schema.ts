import {
  bigint,
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  pgView,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const githubAccountType = pgEnum("github_account_type", ["user", "organization"]);
export const repositoryVisibility = pgEnum("repository_visibility", ["public", "private", "internal", "unknown"]);
export const repositorySyncStatus = pgEnum("repository_sync_status", ["pending", "syncing", "succeeded", "failed", "inaccessible"]);
export const projectPublicationStatus = pgEnum("project_publication_status", ["pending_review", "published", "excluded", "unpublished"]);
export const aiRunStatus = pgEnum("ai_run_status", ["queued", "running", "succeeded", "failed", "cancelled"]);
export const contentVersionStatus = pgEnum("content_version_status", ["draft", "published", "superseded", "rejected"]);
export const contentVersionCreator = pgEnum("content_version_creator", ["ai", "owner", "system"]);
export const webhookProcessingStatus = pgEnum("webhook_processing_status", ["received", "queued", "processed", "ignored", "failed"]);
export const syncTriggerType = pgEnum("sync_trigger_type", ["initial", "manual", "webhook", "reconciliation"]);
export const syncRunStatus = pgEnum("sync_run_status", ["queued", "running", "succeeded", "failed", "cancelled"]);

const createdAt = () => timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow();
const updatedAt = () => timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow();

export const githubInstallations = pgTable("github_installations", {
  id: uuid("id").primaryKey().defaultRandom(),
  githubInstallationId: bigint("github_installation_id", { mode: "bigint" }).notNull().unique(),
  accountGithubId: bigint("account_github_id", { mode: "bigint" }).notNull(),
  accountLogin: text("account_login").notNull(),
  accountType: githubAccountType("account_type").notNull(),
  permissions: jsonb("permissions").$type<Record<string, unknown>>().notNull().default({}),
  suspendedAt: timestamp("suspended_at", { withTimezone: true, mode: "date" }),
  installedAt: timestamp("installed_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  uninstalledAt: timestamp("uninstalled_at", { withTimezone: true, mode: "date" }),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, (table) => [
  check("github_installations_lifecycle_check", sql`${table.uninstalledAt} IS NULL OR ${table.uninstalledAt} >= ${table.installedAt}`)
]);

export const repositories = pgTable("repositories", {
  id: uuid("id").primaryKey().defaultRandom(),
  githubRepositoryId: bigint("github_repository_id", { mode: "bigint" }).notNull().unique(),
  installationId: uuid("installation_id").references(() => githubInstallations.id, { onDelete: "set null" }),
  ownerLogin: text("owner_login").notNull(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  htmlUrl: text("html_url").notNull(),
  defaultBranch: text("default_branch"),
  description: text("description"),
  homepage: text("homepage"),
  visibility: repositoryVisibility("visibility").notNull().default("unknown"),
  isArchived: boolean("is_archived").notNull().default(false),
  isFork: boolean("is_fork").notNull().default(false),
  isDisabled: boolean("is_disabled").notNull().default(false),
  isDeleted: boolean("is_deleted").notNull().default(false),
  isAccessible: boolean("is_accessible").notNull().default(true),
  privateAnalysisOptIn: boolean("private_analysis_opt_in").notNull().default(false),
  analysisEnabled: boolean("analysis_enabled").notNull().default(true),
  ownerExcluded: boolean("owner_excluded").notNull().default(false),
  lastObservedCommitSha: text("last_observed_commit_sha"),
  lastReadmePath: text("last_readme_path"),
  lastReadmeSha: text("last_readme_sha"),
  metadataHash: text("metadata_hash"),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true, mode: "date" }),
  syncStatus: repositorySyncStatus("sync_status").notNull().default("pending"),
  safeErrorCode: text("safe_error_code"),
  discoveredAt: timestamp("discovered_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, (table) => [
  index("repositories_installation_idx").on(table.installationId),
  index("repositories_visibility_lifecycle_idx").on(table.visibility, table.isDeleted, table.isDisabled, table.isAccessible),
  index("repositories_sync_status_idx").on(table.syncStatus, table.updatedAt),
  index("repositories_owner_excluded_idx").on(table.ownerExcluded),
  check("repositories_full_name_nonempty", sql`length(trim(${table.fullName})) > 0`),
  check("repositories_private_analysis_check", sql`${table.visibility} = 'public' OR ${table.privateAnalysisOptIn} = false OR ${table.visibility} IN ('private', 'internal')`)
]);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  repositoryId: uuid("repository_id").notNull().references(() => repositories.id, { onDelete: "restrict" }).unique(),
  slug: text("slug").notNull().unique(),
  publicationStatus: projectPublicationStatus("publication_status").notNull().default("pending_review"),
  automaticUpdatesEnabled: boolean("automatic_updates_enabled").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order"),
  // The FK to project_content_versions is created in the SQL migration because it is circular.
  currentPublishedVersionId: uuid("current_published_version_id"),
  firstPublishedAt: timestamp("first_published_at", { withTimezone: true, mode: "date" }),
  unpublishedAt: timestamp("unpublished_at", { withTimezone: true, mode: "date" }),
  approvedByGithubUserId: bigint("approved_by_github_user_id", { mode: "bigint" }),
  approvedAt: timestamp("approved_at", { withTimezone: true, mode: "date" }),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, (table) => [
  index("projects_publication_slug_idx").on(table.publicationStatus, table.slug),
  index("projects_featured_sort_idx").on(table.featured, table.sortOrder),
  check("projects_slug_format_check", sql`${table.slug} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`),
  check("projects_approval_pair_check", sql`(${table.approvedByGithubUserId} IS NULL) = (${table.approvedAt} IS NULL)`),
  check("projects_published_requires_approval_check", sql`${table.publicationStatus} <> 'published' OR (${table.approvedByGithubUserId} IS NOT NULL AND ${table.approvedAt} IS NOT NULL)`)
]);

export const repositorySnapshots = pgTable("repository_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  repositoryId: uuid("repository_id").notNull().references(() => repositories.id, { onDelete: "cascade" }),
  commitSha: text("commit_sha").notNull(),
  readmePath: text("readme_path"),
  readmeSha: text("readme_sha"),
  readmeContent: text("readme_content"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  evidence: jsonb("evidence").$type<Array<Record<string, unknown>>>().notNull().default([]),
  contentHash: text("content_hash").notNull(),
  capturedAt: timestamp("captured_at", { withTimezone: true, mode: "date" }).notNull().defaultNow()
}, (table) => [
  index("repository_snapshots_repository_captured_idx").on(table.repositoryId, table.capturedAt),
  index("repository_snapshots_content_hash_idx").on(table.repositoryId, table.contentHash),
  check("repository_snapshots_private_content_check", sql`${table.readmeContent} IS NULL OR length(${table.readmeContent}) <= 200000`)
]);

export const aiGenerationRuns = pgTable("ai_generation_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  repositoryId: uuid("repository_id").notNull().references(() => repositories.id, { onDelete: "restrict" }),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "set null" }),
  snapshotId: uuid("snapshot_id").references(() => repositorySnapshots.id, { onDelete: "set null" }),
  modelId: text("model_id").notNull(),
  promptVersion: text("prompt_version").notNull(),
  schemaVersion: text("schema_version").notNull(),
  status: aiRunStatus("status").notNull().default("queued"),
  inputHash: text("input_hash").notNull(),
  output: jsonb("output").$type<Record<string, unknown> | null>(),
  usage: jsonb("usage").$type<Record<string, unknown> | null>(),
  latencyMs: integer("latency_ms"),
  safeErrorCode: text("safe_error_code"),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "date" }),
  completedAt: timestamp("completed_at", { withTimezone: true, mode: "date" }),
  createdAt: createdAt()
}, (table) => [
  index("ai_generation_runs_repository_created_idx").on(table.repositoryId, table.createdAt),
  index("ai_generation_runs_status_created_idx").on(table.status, table.createdAt),
  check("ai_generation_runs_latency_check", sql`${table.latencyMs} IS NULL OR ${table.latencyMs} >= 0`),
  check("ai_generation_runs_completion_check", sql`${table.completedAt} IS NULL OR ${table.startedAt} IS NULL OR ${table.completedAt} >= ${table.startedAt}`)
]);

export const projectContentVersions = pgTable("project_content_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  generationRunId: uuid("generation_run_id").references(() => aiGenerationRuns.id, { onDelete: "set null" }),
  versionNumber: integer("version_number").notNull(),
  content: jsonb("content").$type<Record<string, unknown>>().notNull(),
  evidenceReferences: jsonb("evidence_references").$type<Array<Record<string, unknown>>>().notNull().default([]),
  sourceCommitSha: text("source_commit_sha"),
  sourceReadmeSha: text("source_readme_sha"),
  status: contentVersionStatus("status").notNull().default("draft"),
  creator: contentVersionCreator("creator").notNull().default("ai"),
  createdAt: createdAt()
}, (table) => [
  index("project_content_versions_project_created_idx").on(table.projectId, table.createdAt),
  index("project_content_versions_status_idx").on(table.status),
  unique("project_content_versions_unique").on(table.projectId, table.versionNumber)
]);

export const projectOverrides = pgTable("project_overrides", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  fieldPath: text("field_path").notNull(),
  value: jsonb("value").$type<unknown>().notNull(),
  ownerGithubUserId: bigint("owner_github_user_id", { mode: "bigint" }).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt()
}, (table) => [
  unique("project_overrides_unique_field").on(table.projectId, table.fieldPath),
  check("project_overrides_field_path_check", sql`${table.fieldPath} ~ '^[a-zA-Z][a-zA-Z0-9_.-]{0,119}$'`)
]);

export const webhookDeliveries = pgTable("webhook_deliveries", {
  id: uuid("id").primaryKey().defaultRandom(),
  githubDeliveryId: text("github_delivery_id").notNull().unique(),
  eventName: text("event_name").notNull(),
  action: text("action"),
  githubRepositoryId: bigint("github_repository_id", { mode: "bigint" }),
  processingStatus: webhookProcessingStatus("processing_status").notNull().default("received"),
  receivedAt: timestamp("received_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  processedAt: timestamp("processed_at", { withTimezone: true, mode: "date" }),
  safeErrorCode: text("safe_error_code")
}, (table) => [
  index("webhook_deliveries_status_received_idx").on(table.processingStatus, table.receivedAt)
]);

export const syncRuns = pgTable("sync_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  installationId: uuid("installation_id").references(() => githubInstallations.id, { onDelete: "set null" }),
  repositoryId: uuid("repository_id").references(() => repositories.id, { onDelete: "set null" }),
  triggerType: syncTriggerType("trigger_type").notNull(),
  status: syncRunStatus("status").notNull().default("queued"),
  sourceRevision: text("source_revision"),
  retryCount: integer("retry_count").notNull().default(0),
  safeErrorCode: text("safe_error_code"),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "date" }),
  completedAt: timestamp("completed_at", { withTimezone: true, mode: "date" }),
  createdAt: createdAt()
}, (table) => [
  index("sync_runs_status_created_idx").on(table.status, table.createdAt),
  index("sync_runs_repository_created_idx").on(table.repositoryId, table.createdAt),
  check("sync_runs_scope_check", sql`${table.installationId} IS NOT NULL OR ${table.repositoryId} IS NOT NULL`),
  check("sync_runs_retry_count_check", sql`${table.retryCount} >= 0`),
  check("sync_runs_completion_check", sql`${table.completedAt} IS NULL OR ${table.startedAt} IS NULL OR ${table.completedAt} >= ${table.startedAt}`)
]);

export const ownerAuditEvents = pgTable("owner_audit_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorGithubUserId: bigint("actor_github_user_id", { mode: "bigint" }).notNull(),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: createdAt()
}, (table) => [
  index("owner_audit_events_target_created_idx").on(table.targetType, table.targetId, table.createdAt),
  index("owner_audit_events_created_idx").on(table.createdAt)
]);

export const publicEligibleProjects = pgView("public_eligible_projects", {
  projectId: uuid("project_id"),
  slug: text("slug"),
  featured: boolean("featured"),
  sortOrder: integer("sort_order"),
  currentPublishedVersionId: uuid("current_published_version_id"),
  repositoryId: uuid("repository_id"),
  fullName: text("full_name"),
  htmlUrl: text("html_url")
}).existing();
