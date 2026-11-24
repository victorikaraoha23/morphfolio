import "server-only";

import { and, asc, desc, eq, sql } from "drizzle-orm";
import { getDatabase } from "@/lib/db";
import {
  projectContentVersions,
  projects,
  publicEligibleProjects,
  repositories
} from "@/lib/db/schema";

function publicProjectSelection() {
  return {
    id: projects.id,
    slug: projects.slug,
    featured: projects.featured,
    sortOrder: projects.sortOrder,
    content: projectContentVersions.content,
    repositoryFullName: repositories.fullName,
    repositoryUrl: repositories.htmlUrl
  };
}

/**
 * Reads only records admitted by the database's public eligibility view.
 * The hardcoded portfolio catalogue remains the active page source until
 * the verified content migration is complete.
 */
export async function getPublicProjects() {
  return getDatabase()
    .select(publicProjectSelection())
    .from(publicEligibleProjects)
    .innerJoin(projects, eq(projects.id, publicEligibleProjects.projectId))
    .innerJoin(
      projectContentVersions,
      and(
        eq(projectContentVersions.id, publicEligibleProjects.currentPublishedVersionId),
        eq(projectContentVersions.projectId, publicEligibleProjects.projectId)
      )
    )
    .innerJoin(repositories, eq(repositories.id, publicEligibleProjects.repositoryId))
    .orderBy(
      desc(projects.featured),
      asc(sql`coalesce(${projects.sortOrder}, 2147483647)`),
      asc(projects.slug)
    );
}

export async function getPublicProjectBySlug(slug: string) {
  const rows = await getDatabase()
    .select(publicProjectSelection())
    .from(publicEligibleProjects)
    .innerJoin(projects, eq(projects.id, publicEligibleProjects.projectId))
    .innerJoin(
      projectContentVersions,
      and(
        eq(projectContentVersions.id, publicEligibleProjects.currentPublishedVersionId),
        eq(projectContentVersions.projectId, publicEligibleProjects.projectId)
      )
    )
    .innerJoin(repositories, eq(repositories.id, publicEligibleProjects.repositoryId))
    .where(eq(projects.slug, slug))
    .limit(1);

  return rows[0] ?? null;
}
