-- MorphFolio initial persistence schema.
-- PostgreSQL / Neon. Apply once through the migration runner after Drizzle is configured.
-- GitHub IDs are stored as bigint-compatible numeric strings by the application.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE github_account_type AS ENUM ('user', 'organization');
CREATE TYPE repository_visibility AS ENUM ('public', 'private', 'internal', 'unknown');
CREATE TYPE repository_sync_status AS ENUM ('pending', 'syncing', 'succeeded', 'failed', 'inaccessible');
CREATE TYPE project_publication_status AS ENUM ('pending_review', 'published', 'excluded', 'unpublished');
CREATE TYPE ai_run_status AS ENUM ('queued', 'running', 'succeeded', 'failed', 'cancelled');
CREATE TYPE content_version_status AS ENUM ('draft', 'published', 'superseded', 'rejected');
CREATE TYPE content_version_creator AS ENUM ('ai', 'owner', 'system');
CREATE TYPE webhook_processing_status AS ENUM ('received', 'queued', 'processed', 'ignored', 'failed');
CREATE TYPE sync_trigger_type AS ENUM ('initial', 'manual', 'webhook', 'reconciliation');
CREATE TYPE sync_run_status AS ENUM ('queued', 'running', 'succeeded', 'failed', 'cancelled');

CREATE TABLE github_installations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  github_installation_id bigint NOT NULL UNIQUE,
  account_github_id bigint NOT NULL,
  account_login text NOT NULL,
  account_type github_account_type NOT NULL,
  permissions jsonb NOT NULL DEFAULT '{}'::jsonb,
  suspended_at timestamptz,
  installed_at timestamptz NOT NULL DEFAULT now(),
  uninstalled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT github_installations_lifecycle_check
    CHECK (uninstalled_at IS NULL OR uninstalled_at >= installed_at)
);

CREATE TABLE repositories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  github_repository_id bigint NOT NULL UNIQUE,
  installation_id uuid REFERENCES github_installations(id) ON DELETE SET NULL,
  owner_login text NOT NULL,
  name text NOT NULL,
  full_name text NOT NULL,
  html_url text NOT NULL,
  default_branch text,
  description text,
  homepage text,
  visibility repository_visibility NOT NULL DEFAULT 'unknown',
  is_archived boolean NOT NULL DEFAULT false,
  is_fork boolean NOT NULL DEFAULT false,
  is_disabled boolean NOT NULL DEFAULT false,
  is_deleted boolean NOT NULL DEFAULT false,
  is_accessible boolean NOT NULL DEFAULT true,
  private_analysis_opt_in boolean NOT NULL DEFAULT false,
  analysis_enabled boolean NOT NULL DEFAULT true,
  owner_excluded boolean NOT NULL DEFAULT false,
  last_observed_commit_sha text,
  last_readme_path text,
  last_readme_sha text,
  metadata_hash text,
  last_synced_at timestamptz,
  sync_status repository_sync_status NOT NULL DEFAULT 'pending',
  safe_error_code text,
  discovered_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT repositories_full_name_nonempty CHECK (length(trim(full_name)) > 0),
  CONSTRAINT repositories_private_analysis_check
    CHECK (visibility = 'public' OR private_analysis_opt_in = false OR visibility IN ('private', 'internal'))
);

CREATE INDEX repositories_installation_idx ON repositories(installation_id);
CREATE INDEX repositories_visibility_lifecycle_idx
  ON repositories(visibility, is_deleted, is_disabled, is_accessible);
CREATE INDEX repositories_sync_status_idx ON repositories(sync_status, updated_at);
CREATE INDEX repositories_owner_excluded_idx ON repositories(owner_excluded);

CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id uuid NOT NULL UNIQUE REFERENCES repositories(id) ON DELETE RESTRICT,
  slug text NOT NULL UNIQUE,
  publication_status project_publication_status NOT NULL DEFAULT 'pending_review',
  automatic_updates_enabled boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer,
  current_published_version_id uuid,
  first_published_at timestamptz,
  unpublished_at timestamptz,
  approved_by_github_user_id bigint,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT projects_slug_format_check CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT projects_approval_pair_check
    CHECK ((approved_by_github_user_id IS NULL) = (approved_at IS NULL))
);

CREATE INDEX projects_publication_slug_idx ON projects(publication_status, slug);
CREATE INDEX projects_featured_sort_idx ON projects(featured DESC, sort_order);

CREATE TABLE repository_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id uuid NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
  commit_sha text NOT NULL,
  readme_path text,
  readme_sha text,
  readme_content text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
  content_hash text NOT NULL,
  captured_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT repository_snapshots_private_content_check
    CHECK (readme_content IS NULL OR length(readme_content) <= 200000)
);

CREATE INDEX repository_snapshots_repository_captured_idx
  ON repository_snapshots(repository_id, captured_at DESC);
CREATE INDEX repository_snapshots_content_hash_idx ON repository_snapshots(repository_id, content_hash);

CREATE TABLE ai_generation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id uuid NOT NULL REFERENCES repositories(id) ON DELETE RESTRICT,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  snapshot_id uuid REFERENCES repository_snapshots(id) ON DELETE SET NULL,
  model_id text NOT NULL,
  prompt_version text NOT NULL,
  schema_version text NOT NULL,
  status ai_run_status NOT NULL DEFAULT 'queued',
  input_hash text NOT NULL,
  output jsonb,
  usage jsonb,
  latency_ms integer,
  safe_error_code text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ai_generation_runs_latency_check CHECK (latency_ms IS NULL OR latency_ms >= 0),
  CONSTRAINT ai_generation_runs_completion_check
    CHECK (completed_at IS NULL OR started_at IS NULL OR completed_at >= started_at)
);

CREATE INDEX ai_generation_runs_repository_created_idx
  ON ai_generation_runs(repository_id, created_at DESC);
CREATE INDEX ai_generation_runs_status_created_idx ON ai_generation_runs(status, created_at);

CREATE TABLE project_content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  generation_run_id uuid REFERENCES ai_generation_runs(id) ON DELETE SET NULL,
  version_number integer NOT NULL,
  content jsonb NOT NULL,
  evidence_references jsonb NOT NULL DEFAULT '[]'::jsonb,
  source_commit_sha text,
  source_readme_sha text,
  status content_version_status NOT NULL DEFAULT 'draft',
  creator content_version_creator NOT NULL DEFAULT 'ai',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT project_content_versions_number_check CHECK (version_number > 0),
  CONSTRAINT project_content_versions_unique UNIQUE(project_id, version_number)
);

ALTER TABLE projects
  ADD CONSTRAINT projects_current_published_version_fk
  FOREIGN KEY (current_published_version_id)
  REFERENCES project_content_versions(id)
  ON DELETE SET NULL
  DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX project_content_versions_project_created_idx
  ON project_content_versions(project_id, created_at DESC);
CREATE INDEX project_content_versions_status_idx ON project_content_versions(status);

CREATE TABLE project_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  field_path text NOT NULL,
  value jsonb NOT NULL,
  owner_github_user_id bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT project_overrides_unique_field UNIQUE(project_id, field_path),
  CONSTRAINT project_overrides_field_path_check
    CHECK (field_path ~ '^[a-zA-Z][a-zA-Z0-9_.-]{0,119}$')
);

CREATE TABLE webhook_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  github_delivery_id text NOT NULL UNIQUE,
  event_name text NOT NULL,
  action text,
  github_repository_id bigint,
  processing_status webhook_processing_status NOT NULL DEFAULT 'received',
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  safe_error_code text
);

CREATE INDEX webhook_deliveries_status_received_idx
  ON webhook_deliveries(processing_status, received_at);

CREATE TABLE sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id uuid REFERENCES github_installations(id) ON DELETE SET NULL,
  repository_id uuid REFERENCES repositories(id) ON DELETE SET NULL,
  trigger_type sync_trigger_type NOT NULL,
  status sync_run_status NOT NULL DEFAULT 'queued',
  source_revision text,
  retry_count integer NOT NULL DEFAULT 0,
  safe_error_code text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT sync_runs_scope_check CHECK (installation_id IS NOT NULL OR repository_id IS NOT NULL),
  CONSTRAINT sync_runs_retry_count_check CHECK (retry_count >= 0),
  CONSTRAINT sync_runs_completion_check
    CHECK (completed_at IS NULL OR started_at IS NULL OR completed_at >= started_at)
);

CREATE INDEX sync_runs_status_created_idx ON sync_runs(status, created_at);
CREATE INDEX sync_runs_repository_created_idx ON sync_runs(repository_id, created_at DESC);

CREATE TABLE owner_audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_github_user_id bigint NOT NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX owner_audit_events_target_created_idx
  ON owner_audit_events(target_type, target_id, created_at DESC);
CREATE INDEX owner_audit_events_created_idx ON owner_audit_events(created_at DESC);

-- Public visibility is deliberately expressed as a single reusable predicate.
-- Callers must also join the current version and require its status = 'published'.
CREATE VIEW public_eligible_projects AS
SELECT p.id AS project_id, p.slug, p.featured, p.sort_order,
       p.current_published_version_id, r.id AS repository_id,
       r.full_name, r.html_url
FROM projects p
JOIN repositories r ON r.id = p.repository_id
JOIN project_content_versions v ON v.id = p.current_published_version_id
WHERE p.publication_status = 'published'
  AND v.status = 'published'
  AND r.visibility = 'public'
  AND r.is_accessible = true
  AND r.is_deleted = false
  AND r.is_disabled = false;
