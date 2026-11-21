import { z } from "zod";

export const evidenceItemSchema = z.object({
  id: z.string().min(1).max(80),
  source: z.enum(["repository_metadata", "readme", "topics", "languages", "release"]),
  excerpt: z.string().min(1).max(1_200)
});

export const repositoryAnalysisInputSchema = z.object({
  fullName: z.string().min(3).max(200),
  htmlUrl: z.url(),
  description: z.string().max(500).nullable(),
  primaryLanguage: z.string().max(80).nullable(),
  languages: z.array(z.string().max(80)).max(30),
  topics: z.array(z.string().max(80)).max(30),
  stars: z.number().int().nonnegative(),
  homepage: z.url().nullable(),
  evidence: z.array(evidenceItemSchema).min(1).max(30)
});

export const projectProfileSchema = z.object({
  displayName: z.string().min(1).max(80),
  tagline: z.string().min(1).max(140),
  summary: z.string().min(1).max(500),
  category: z.enum(["AI/ML", "Web", "CLI/Tools", "Developer Tools", "Other"]),
  complexity: z.enum(["beginner", "intermediate", "advanced", "undetermined"]),
  technologies: z.array(z.string().min(1).max(50)).max(12),
  highlights: z.array(
    z.object({
      statement: z.string().min(1).max(180),
      evidenceIds: z.array(z.string().min(1).max(80)).min(1).max(4)
    })
  ).max(5),
  summaryEvidenceIds: z.array(z.string().min(1).max(80)).min(1).max(6),
  featuredCandidate: z.boolean(),
  missingInformation: z.array(z.string().min(1).max(160)).max(5)
});

export type RepositoryAnalysisInput = z.infer<typeof repositoryAnalysisInputSchema>;
export type ProjectProfile = z.infer<typeof projectProfileSchema>;
