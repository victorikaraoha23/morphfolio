-- Atomic project publication transitions. These functions run inside the caller's transaction.
CREATE OR REPLACE FUNCTION approve_and_publish_project(
  p_project_id uuid,
  p_version_id uuid,
  p_actor_github_user_id bigint
)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  project_row projects%ROWTYPE;
  repository_row repositories%ROWTYPE;
  version_row project_content_versions%ROWTYPE;
BEGIN
  SELECT * INTO project_row
    FROM projects
   WHERE id = p_project_id
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Project not found' USING ERRCODE = 'P0002';
  END IF;

  IF project_row.publication_status <> 'pending_review'
     OR project_row.current_published_version_id IS NOT NULL THEN
    RAISE EXCEPTION 'Project is not awaiting first publication' USING ERRCODE = '23514';
  END IF;

  SELECT * INTO repository_row
    FROM repositories
   WHERE id = project_row.repository_id
   FOR UPDATE;
  IF NOT FOUND OR repository_row.visibility <> 'public'
     OR repository_row.is_deleted OR repository_row.is_disabled
     OR NOT repository_row.is_accessible OR repository_row.owner_excluded THEN
    RAISE EXCEPTION 'Repository is not eligible for public publication' USING ERRCODE = '23514';
  END IF;

  SELECT * INTO version_row
    FROM project_content_versions
   WHERE id = p_version_id AND project_id = p_project_id
   FOR UPDATE;
  IF NOT FOUND OR version_row.status <> 'draft' THEN
    RAISE EXCEPTION 'A draft version belonging to this project is required' USING ERRCODE = '23514';
  END IF;

  UPDATE project_content_versions
     SET status = 'published'
   WHERE id = p_version_id;

  UPDATE projects
     SET publication_status = 'published',
         current_published_version_id = p_version_id,
         approved_by_github_user_id = p_actor_github_user_id,
         approved_at = now(),
         first_published_at = COALESCE(first_published_at, now()),
         unpublished_at = NULL,
         updated_at = now()
   WHERE id = p_project_id;

  INSERT INTO owner_audit_events
    (actor_github_user_id, action, target_type, target_id, metadata)
  VALUES
    (p_actor_github_user_id, 'project.first_published', 'project', p_project_id::text,
     jsonb_build_object('version_id', p_version_id));
END;
$$;

CREATE OR REPLACE FUNCTION publish_validated_project_update(
  p_project_id uuid,
  p_version_id uuid
)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  project_row projects%ROWTYPE;
  repository_row repositories%ROWTYPE;
  version_row project_content_versions%ROWTYPE;
BEGIN
  SELECT * INTO project_row
    FROM projects
   WHERE id = p_project_id
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Project not found' USING ERRCODE = 'P0002';
  END IF;

  IF project_row.publication_status <> 'published'
     OR NOT project_row.automatic_updates_enabled
     OR project_row.current_published_version_id IS NULL THEN
    RAISE EXCEPTION 'Project is not eligible for automatic publication' USING ERRCODE = '23514';
  END IF;

  SELECT * INTO repository_row
    FROM repositories
   WHERE id = project_row.repository_id
   FOR UPDATE;
  IF NOT FOUND OR repository_row.visibility <> 'public'
     OR repository_row.is_deleted OR repository_row.is_disabled
     OR NOT repository_row.is_accessible OR repository_row.owner_excluded THEN
    RAISE EXCEPTION 'Repository is not eligible for public publication' USING ERRCODE = '23514';
  END IF;

  SELECT * INTO version_row
    FROM project_content_versions
   WHERE id = p_version_id AND project_id = p_project_id
   FOR UPDATE;
  IF NOT FOUND OR version_row.status <> 'draft'
     OR p_version_id = project_row.current_published_version_id THEN
    RAISE EXCEPTION 'A new draft version belonging to this project is required' USING ERRCODE = '23514';
  END IF;

  PERFORM 1
    FROM project_content_versions
   WHERE id = project_row.current_published_version_id
     AND project_id = p_project_id
     AND status = 'published'
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Last known-good published version is missing' USING ERRCODE = '23514';
  END IF;

  UPDATE project_content_versions
     SET status = 'superseded'
   WHERE id = project_row.current_published_version_id;

  UPDATE project_content_versions
     SET status = 'published'
   WHERE id = p_version_id;

  UPDATE projects
     SET current_published_version_id = p_version_id,
         updated_at = now()
   WHERE id = p_project_id;
END;
$$;

CREATE OR REPLACE FUNCTION unpublish_ineligible_project(p_project_id uuid)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  project_row projects%ROWTYPE;
  repository_row repositories%ROWTYPE;
BEGIN
  SELECT * INTO project_row
    FROM projects
   WHERE id = p_project_id
   FOR UPDATE;
  IF NOT FOUND THEN
    RETURN false;
  END IF;

  SELECT * INTO repository_row
    FROM repositories
   WHERE id = project_row.repository_id
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Project repository is missing' USING ERRCODE = '23514';
  END IF;

  IF repository_row.visibility = 'public'
     AND NOT repository_row.is_deleted
     AND NOT repository_row.is_disabled
     AND repository_row.is_accessible
     AND NOT repository_row.owner_excluded THEN
    RAISE EXCEPTION 'Repository is still eligible; refusing to unpublish' USING ERRCODE = '23514';
  END IF;

  UPDATE projects
     SET publication_status = 'unpublished',
         unpublished_at = COALESCE(unpublished_at, now()),
         updated_at = now()
   WHERE id = p_project_id
     AND publication_status <> 'unpublished';

  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION approve_and_publish_project(uuid, uuid, bigint) FROM PUBLIC;
REVOKE ALL ON FUNCTION publish_validated_project_update(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION unpublish_ineligible_project(uuid) FROM PUBLIC;
