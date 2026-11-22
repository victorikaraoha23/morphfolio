-- Enforce MorphFolio's single-owner launch boundary in Postgres.
-- The owner claim is written to app_metadata (not user_metadata), which users
-- cannot modify themselves. Existing owner sessions must sign in again to refresh JWT claims.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('morphfolio_owner', true)
where lower(email) = lower('Victorikaraoha23@gmail.com');

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create or replace function private.is_morphfolio_owner()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $function$
  select coalesce(
    (select auth.jwt() -> 'app_metadata' ->> 'morphfolio_owner') = 'true',
    false
  );
$function$;

revoke all on function private.is_morphfolio_owner() from public, anon;
grant execute on function private.is_morphfolio_owner() to authenticated;

-- Replace user-scoped policies with single-owner policies. Ownership predicates
-- remain in place as a second condition rather than being replaced by the owner claim.
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
      'create policy %I on public.%I for select to authenticated using (private.is_morphfolio_owner() and (select auth.uid()) = user_id)',
      table_name || '_select_owner', table_name
    );
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (private.is_morphfolio_owner() and (select auth.uid()) = user_id)',
      table_name || '_insert_owner', table_name
    );
    execute format(
      'create policy %I on public.%I for update to authenticated using (private.is_morphfolio_owner() and (select auth.uid()) = user_id) with check (private.is_morphfolio_owner() and (select auth.uid()) = user_id)',
      table_name || '_update_owner', table_name
    );
    execute format(
      'create policy %I on public.%I for delete to authenticated using (private.is_morphfolio_owner() and (select auth.uid()) = user_id)',
      table_name || '_delete_owner', table_name
    );
  end loop;
end;
$$;

drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_insert_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_delete_own on public.profiles;

create policy profiles_select_owner on public.profiles
  for select to authenticated
  using (private.is_morphfolio_owner() and (select auth.uid()) = id);
create policy profiles_insert_owner on public.profiles
  for insert to authenticated
  with check (private.is_morphfolio_owner() and (select auth.uid()) = id);
create policy profiles_update_owner on public.profiles
  for update to authenticated
  using (private.is_morphfolio_owner() and (select auth.uid()) = id)
  with check (private.is_morphfolio_owner() and (select auth.uid()) = id);
create policy profiles_delete_owner on public.profiles
  for delete to authenticated
  using (private.is_morphfolio_owner() and (select auth.uid()) = id);

drop policy if exists approval_events_select_own on public.approval_events;
create policy approval_events_select_owner on public.approval_events
  for select to authenticated
  using (private.is_morphfolio_owner() and (select auth.uid()) = user_id);
