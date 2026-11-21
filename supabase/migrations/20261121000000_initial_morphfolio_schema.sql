-- MorphFolio initial persistence schema
-- Supabase Auth is the only identity authority. GitHub credentials are deliberately
-- not stored in these tables; GitHub App installation tokens are minted server-side.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  username text unique,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_length check (username is null or char_length(username) between 3 and 39)
);

create table public.github_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  github_account_id bigint not null,
  github_login text not null,
  avatar_url text,
  installation_id bigint not null unique,
  installation_permissions jsonb not null default '{}'::jsonb,
  connected_at timestamptz not null default now(),
  disconnected_at timestamptz,
  created_at timestamptz not null default now(),
  unique (id, user_id),
  unique (user_id, github_account_id),
  constraint github_connections_permissions_object check (jsonb_typeof(installation_permissions) = 'object')
);

create table public.repositories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  connection_id uuid not null,
  github_repo_id bigint not null,
  owner_login text not null,
  name text not null,
  full_name text not null,
  html_url text not null,
  description text,
  default_branch text,
  visibility text not null default 'private' check (visibility in ('public', 'private', 'internal')),
  is_selected boolean not null default false,
  sync_status text not null default 'not_synced' check (sync_status in ('not_synced', 'queued', 'syncing', 'synced', 'failed')),
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id),
  unique (connection_id, github_repo_id),
  foreign key (connection_id, user_id)
    references public.github_connections(id, user_id) on delete cascade
);

create index repositories_user_selected_idx on public.repositories(user_id, is_selected);
create index repositories_connection_idx on public.repositories(connection_id);

create table public.repository_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  repository_id uuid not null,
  commit_sha text not null,
  branch_name text,
  repository_metadata jsonb not null default '{}'::jsonb,
  readme_excerpt text,
  content_digest text not null,
  captured_at timestamptz not null default now(),
  unique (id, user_id, repository_id),
  unique (repository_id, commit_sha),
  foreign key (repository_id, user_id)
    references public.repositories(id, user_id) on delete cascade,
  constraint repository_snapshots_metadata_object check (jsonb_typeof(repository_metadata) = 'object')
);

create index repository_snapshots_user_repo_idx on public.repository_snapshots(user_id, repository_id, captured_at desc);

create table public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  repository_id uuid not null,
  snapshot_id uuid not null,
  evidence_type text not null check (evidence_type in ('repository_metadata', 'readme', 'package_manifest', 'source_file', 'commit', 'release', 'other')),
  source_path text,
  source_url text,
  excerpt text,
  structured_value jsonb not null default '{}'::jsonb,
  content_hash text not null,
  created_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (repository_id, user_id)
    references public.repositories(id, user_id) on delete cascade,
  foreign key (snapshot_id, user_id, repository_id)
    references public.repository_snapshots(id, user_id, repository_id) on delete cascade,
  constraint evidence_items_value_object check (jsonb_typeof(structured_value) = 'object')
);

create index evidence_items_snapshot_idx on public.evidence_items(user_id, snapshot_id);
create index evidence_items_repository_idx on public.evidence_items(user_id, repository_id);

create table public.project_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  repository_id uuid not null,
  snapshot_id uuid not null,
  version_number integer not null check (version_number > 0),
  status text not null default 'draft' check (status in ('draft', 'approved', 'archived')),
  title text not null,
  summary text not null,
  role_description text,
  technologies jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  claims jsonb not null default '[]'::jsonb,
  model_provider text,
  model_id text,
  schema_version text not null,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  unique (id, user_id),
  unique (repository_id, version_number),
  foreign key (repository_id, user_id)
    references public.repositories(id, user_id) on delete cascade,
  foreign key (snapshot_id, user_id, repository_id)
    references public.repository_snapshots(id, user_id, repository_id) on delete restrict,
  constraint project_profiles_technologies_array check (jsonb_typeof(technologies) = 'array'),
  constraint project_profiles_highlights_array check (jsonb_typeof(highlights) = 'array'),
  constraint project_profiles_claims_array check (jsonb_typeof(claims) = 'array')
);

create index project_profiles_user_status_idx on public.project_profiles(user_id, status, created_at desc);
create index project_profiles_repository_idx on public.project_profiles(user_id, repository_id, version_number desc);

create table public.project_profile_evidence (
  profile_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  evidence_item_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (profile_id, evidence_item_id),
  foreign key (profile_id, user_id)
    references public.project_profiles(id, user_id) on delete cascade,
  foreign key (evidence_item_id, user_id)
    references public.evidence_items(id, user_id) on delete cascade
);

create index project_profile_evidence_user_idx on public.project_profile_evidence(user_id);

create table public.evolution_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  run_type text not null check (run_type in ('repository_sync', 'project_analysis', 'portfolio_proposal', 'manual_edit', 'publish', 'rollback')),
  status text not null default 'queued' check (status in ('queued', 'running', 'succeeded', 'failed', 'cancelled')),
  idempotency_key text not null,
  source_revision text,
  prompt_version text,
  failure_code text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (id, user_id),
  unique (user_id, idempotency_key)
);

create index evolution_runs_user_created_idx on public.evolution_runs(user_id, created_at desc);

create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id),
  unique (user_id, slug),
  constraint portfolios_slug_format check (slug ~ '^[a-z0-9]+([a-z0-9-]*[a-z0-9])?$')
);

create table public.portfolio_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  portfolio_id uuid not null,
  version_number integer not null check (version_number > 0),
  status text not null default 'draft' check (status in ('draft', 'approved', 'published', 'superseded', 'rejected')),
  configuration jsonb not null,
  evolution_run_id uuid,
  based_on_version_id uuid,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  published_at timestamptz,
  unique (id, user_id),
  unique (portfolio_id, version_number),
  foreign key (portfolio_id, user_id)
    references public.portfolios(id, user_id) on delete cascade,
  foreign key (evolution_run_id, user_id)
    references public.evolution_runs(id, user_id) on delete set null,
  foreign key (based_on_version_id, user_id)
    references public.portfolio_versions(id, user_id) on delete set null,
  constraint portfolio_versions_configuration_object check (jsonb_typeof(configuration) = 'object')
);

create unique index portfolio_versions_one_published_per_portfolio
  on public.portfolio_versions(portfolio_id) where status = 'published';
create index portfolio_versions_user_status_idx on public.portfolio_versions(user_id, status, created_at desc);

create table public.approval_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  portfolio_version_id uuid,
  project_profile_id uuid,
  action text not null check (action in ('approved', 'rejected', 'published', 'rolled_back')),
  note text,
  created_at timestamptz not null default now(),
  constraint approval_events_exactly_one_target check (
    (portfolio_version_id is not null and project_profile_id is null)
    or (portfolio_version_id is null and project_profile_id is not null)
  ),
  foreign key (portfolio_version_id, user_id)
    references public.portfolio_versions(id, user_id) on delete cascade,
  foreign key (project_profile_id, user_id)
    references public.project_profiles(id, user_id) on delete cascade
);

create index approval_events_user_created_idx on public.approval_events(user_id, created_at desc);
create index approval_events_portfolio_version_idx on public.approval_events(portfolio_version_id) where portfolio_version_id is not null;
create index approval_events_project_profile_idx on public.approval_events(project_profile_id) where project_profile_id is not null;

-- RLS is enabled on every table in the exposed public schema.
alter table public.profiles enable row level security;
alter table public.github_connections enable row level security;
alter table public.repositories enable row level security;
alter table public.repository_snapshots enable row level security;
alter table public.evidence_items enable row level security;
alter table public.project_profiles enable row level security;
alter table public.project_profile_evidence enable row level security;
alter table public.evolution_runs enable row level security;
alter table public.portfolios enable row level security;
alter table public.portfolio_versions enable row level security;
alter table public.approval_events enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
create policy "profiles_delete_own" on public.profiles
  for delete to authenticated using ((select auth.uid()) = id);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'github_connections',
    'repositories',
    'repository_snapshots',
    'evidence_items',
    'project_profiles',
    'project_profile_evidence',
    'evolution_runs',
    'portfolios',
    'portfolio_versions',
    'approval_events'
  ]
  loop
    execute format('create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id)', table_name || '_select_own', table_name);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', table_name || '_insert_own', table_name);
    execute format('create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', table_name || '_update_own', table_name);
    execute format('create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', table_name || '_delete_own', table_name);
  end loop;
end
$$;

grant select, insert, update, delete on
  public.profiles,
  public.github_connections,
  public.repositories,
  public.repository_snapshots,
  public.evidence_items,
  public.project_profiles,
  public.project_profile_evidence,
  public.evolution_runs,
  public.portfolios,
  public.portfolio_versions,
  public.approval_events
to authenticated;

comment on table public.github_connections is 'GitHub App installation metadata only; never store installation access tokens or private keys here.';
comment on table public.evidence_items is 'Bounded, attributable evidence used to support generated project profile claims.';
comment on table public.portfolio_versions is 'Versioned portfolio configuration; AI-generated configuration is data, never executable application code.';
