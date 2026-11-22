-- Enforce MorphFolio's single-owner authorization boundary.
-- The signed app_metadata claim is provisioned through the Supabase Auth Admin API.
-- Missing, false, or user_metadata-only claims deny access.

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;

create policy "profiles_select_owner" on public.profiles
  for select to authenticated
  using (
    ((select auth.jwt()) -> 'app_metadata' ->> 'morphfolio_owner') = 'true'
    and (select auth.uid()) = id
  );

create policy "profiles_insert_owner" on public.profiles
  for insert to authenticated
  with check (
    ((select auth.jwt()) -> 'app_metadata' ->> 'morphfolio_owner') = 'true'
    and (select auth.uid()) = id
  );

create policy "profiles_update_owner" on public.profiles
  for update to authenticated
  using (
    ((select auth.jwt()) -> 'app_metadata' ->> 'morphfolio_owner') = 'true'
    and (select auth.uid()) = id
  )
  with check (
    ((select auth.jwt()) -> 'app_metadata' ->> 'morphfolio_owner') = 'true'
    and (select auth.uid()) = id
  );

create policy "profiles_delete_owner" on public.profiles
  for delete to authenticated
  using (
    ((select auth.jwt()) -> 'app_metadata' ->> 'morphfolio_owner') = 'true'
    and (select auth.uid()) = id
  );

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
    'portfolio_versions'
  ]
  loop
    execute format('drop policy if exists %I on public.%I', table_name || '_select_own', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_insert_own', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_update_own', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_delete_own', table_name);

    execute format(
      'create policy %I on public.%I for select to authenticated using (((select auth.jwt()) -> ''app_metadata'' ->> ''morphfolio_owner'') = ''true'' and (select auth.uid()) = user_id)',
      table_name || '_select_owner',
      table_name
    );

    execute format(
      'create policy %I on public.%I for insert to authenticated with check (((select auth.jwt()) -> ''app_metadata'' ->> ''morphfolio_owner'') = ''true'' and (select auth.uid()) = user_id)',
      table_name || '_insert_owner',
      table_name
    );

    execute format(
      'create policy %I on public.%I for update to authenticated using (((select auth.jwt()) -> ''app_metadata'' ->> ''morphfolio_owner'') = ''true'' and (select auth.uid()) = user_id) with check (((select auth.jwt()) -> ''app_metadata'' ->> ''morphfolio_owner'') = ''true'' and (select auth.uid()) = user_id)',
      table_name || '_update_owner',
      table_name
    );

    execute format(
      'create policy %I on public.%I for delete to authenticated using (((select auth.jwt()) -> ''app_metadata'' ->> ''morphfolio_owner'') = ''true'' and (select auth.uid()) = user_id)',
      table_name || '_delete_owner',
      table_name
    );
  end loop;
end;
$$;

drop policy if exists "approval_events_select_own" on public.approval_events;
create policy "approval_events_select_owner" on public.approval_events
  for select to authenticated
  using (
    ((select auth.jwt()) -> 'app_metadata' ->> 'morphfolio_owner') = 'true'
    and (select auth.uid()) = user_id
  );

-- Supabase's supabase_admin role also creates objects in public. Remove inherited
-- API-role defaults so future tables, sequences, and functions are not exposed by
-- default. Existing application grants remain explicitly controlled by migrations.
alter default privileges for role supabase_admin in schema public
  revoke all on tables from anon, authenticated, service_role;

alter default privileges for role supabase_admin in schema public
  revoke all on sequences from anon, authenticated, service_role;

alter default privileges for role supabase_admin in schema public
  revoke execute on functions from anon, authenticated, service_role;

-- PostgreSQL grants EXECUTE on new functions to PUBLIC by default. A schema-scoped
-- REVOKE cannot cancel that global default, so remove it for both roles that create
-- application functions. This is role-wide and intentionally closes the default
-- execution path for future functions, including functions outside public.
alter default privileges for role supabase_admin
  revoke execute on functions from public;

alter default privileges for role postgres
  revoke execute on functions from public;
