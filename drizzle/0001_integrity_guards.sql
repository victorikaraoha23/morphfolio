-- Enforce owner approval at the database boundary, not only in UI code.
ALTER TABLE projects
  ADD CONSTRAINT projects_published_requires_approval_check
  CHECK (
    publication_status <> 'published'
    OR (approved_by_github_user_id IS NOT NULL AND approved_at IS NOT NULL)
  );

-- Private/internal README bodies may only be retained after explicit owner opt-in.
CREATE FUNCTION enforce_repository_snapshot_privacy()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  repo_visibility repository_visibility;
  private_opt_in boolean;
BEGIN
  IF NEW.readme_content IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT visibility, private_analysis_opt_in
    INTO repo_visibility, private_opt_in
  FROM repositories
  WHERE id = NEW.repository_id;

  IF repo_visibility IN ('private', 'internal') AND private_opt_in IS NOT TRUE THEN
    RAISE EXCEPTION 'Private repository README retention requires explicit owner opt-in'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER repository_snapshots_privacy_guard
  BEFORE INSERT OR UPDATE OF readme_content, repository_id
  ON repository_snapshots
  FOR EACH ROW
  EXECUTE FUNCTION enforce_repository_snapshot_privacy();
