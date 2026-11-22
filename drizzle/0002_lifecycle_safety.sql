-- Keep the public read model bound to a content version owned by the same project.
CREATE OR REPLACE VIEW public_eligible_projects AS
SELECT p.id AS project_id, p.slug, p.featured, p.sort_order,
       p.current_published_version_id, r.id AS repository_id,
       r.full_name, r.html_url
FROM projects p
JOIN repositories r ON r.id = p.repository_id
JOIN project_content_versions v
  ON v.id = p.current_published_version_id
 AND v.project_id = p.id
WHERE p.publication_status = 'published'
  AND v.status = 'published'
  AND r.visibility = 'public'
  AND r.is_accessible = true
  AND r.is_deleted = false
  AND r.is_disabled = false;

-- If a repository becomes private/internal without opt-in, erase retained README
-- bodies from existing snapshots as well as blocking future writes.
CREATE FUNCTION scrub_private_repository_snapshots()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.visibility IN ('private', 'internal')
     AND NEW.private_analysis_opt_in IS NOT TRUE THEN
    UPDATE repository_snapshots
       SET readme_content = NULL
     WHERE repository_id = NEW.id
       AND readme_content IS NOT NULL;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER repositories_scrub_private_snapshots
  AFTER UPDATE OF visibility, private_analysis_opt_in
  ON repositories
  FOR EACH ROW
  EXECUTE FUNCTION scrub_private_repository_snapshots();
