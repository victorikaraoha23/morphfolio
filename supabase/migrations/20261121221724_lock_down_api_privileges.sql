-- Lock down default Supabase API grants for MorphFolio's private public-schema tables.
-- RLS remains the row-level boundary; SQL privileges are an additional access gate.

revoke all on all tables in schema public from anon, authenticated, service_role;

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
  public.portfolio_versions
to authenticated, service_role;

grant select on public.approval_events to authenticated;
grant select, insert on public.approval_events to service_role;

-- Supabase's default public-schema ACLs grant broad table rights to API roles.
-- Remove those defaults for both roles that create application objects.
alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke all on sequences from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated;

revoke all on all sequences in schema public from anon, authenticated, service_role;
