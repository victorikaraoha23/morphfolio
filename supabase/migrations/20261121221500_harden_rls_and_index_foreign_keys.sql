-- MorphFolio database hardening and foreign-key support indexes.

-- The existing ensure_rls event trigger owns this SECURITY DEFINER function.
-- It remains attached to DDL events, but must not be exposed as an RPC to API roles.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

-- Index the referencing columns of composite foreign keys. These support efficient
-- parent updates/deletes and avoid full scans when referenced rows change.
create index approval_events_portfolio_version_user_idx
  on public.approval_events(portfolio_version_id, user_id)
  where portfolio_version_id is not null;

create index approval_events_project_profile_user_idx
  on public.approval_events(project_profile_id, user_id)
  where project_profile_id is not null;

create index evidence_items_repository_user_idx
  on public.evidence_items(repository_id, user_id);

create index evidence_items_snapshot_user_repo_idx
  on public.evidence_items(snapshot_id, user_id, repository_id);

create index portfolio_versions_based_on_user_idx
  on public.portfolio_versions(based_on_version_id, user_id)
  where based_on_version_id is not null;

create index portfolio_versions_evolution_run_user_idx
  on public.portfolio_versions(evolution_run_id, user_id)
  where evolution_run_id is not null;

create index portfolio_versions_portfolio_user_idx
  on public.portfolio_versions(portfolio_id, user_id);

create index project_profile_evidence_evidence_user_idx
  on public.project_profile_evidence(evidence_item_id, user_id);

create index project_profile_evidence_profile_user_idx
  on public.project_profile_evidence(profile_id, user_id);

create index project_profiles_repository_user_idx
  on public.project_profiles(repository_id, user_id);

create index project_profiles_snapshot_user_repo_idx
  on public.project_profiles(snapshot_id, user_id, repository_id);

create index repositories_connection_user_idx
  on public.repositories(connection_id, user_id);

create index repository_snapshots_repository_user_idx
  on public.repository_snapshots(repository_id, user_id);

-- The new composite indexes supersede these narrower indexes.
drop index public.approval_events_portfolio_version_idx;
drop index public.approval_events_project_profile_idx;
drop index public.repositories_connection_idx;
