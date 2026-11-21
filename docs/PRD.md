# MorphFolio — Product Requirements Document

**Status:** Draft baseline  
**Version:** 0.1.0  
**Initial release:** Single-user, SaaS-ready foundation

## 1. Product vision

MorphFolio is a developer portfolio that continuously understands, organizes, and presents its owner's engineering work. It connects to GitHub, analyzes selected repositories, creates evidence-backed project profiles, and recommends changes to portfolio structure as the body of work evolves.

## 2. Problem

Developer portfolios become stale because project descriptions, screenshots, categorization, and page structure require manual maintenance. Repository metadata alone is not enough to explain engineering work to recruiters, collaborators, or customers.

## 3. Target user

Initial user: one developer who owns the connected GitHub account and controls one public portfolio.

Future users: independent developers, students, engineers, technical founders, and teams.

## 4. Product goals

- Reduce manual portfolio maintenance.
- Present projects clearly to technical and non-technical visitors.
- Make project claims traceable to evidence.
- Adapt information hierarchy and layout to the developer's actual work.
- Preserve owner control and a reliable rollback path.
- Keep initial infrastructure and AI costs low.

## 5. Non-goals for v1

- Billing, subscriptions, and paid plans.
- Public multi-tenant onboarding.
- AI-generated or AI-executed application source code.
- Automatic commits to the developer's repositories.
- Private repository ingestion by default.
- Resume generation, job applications, or recruiter CRM.
- Autonomous publishing of major redesigns without owner approval.

## 6. Primary user journey

1. Owner signs in.
2. Owner connects GitHub using the approved integration.
3. Owner selects repositories and inclusion preferences.
4. MorphFolio synchronizes repository metadata and README content.
5. AI creates project profiles with explicit evidence references.
6. Owner edits or approves project profiles.
7. Portfolio Architect proposes a presentation configuration.
8. Owner previews, approves, or rejects the proposal.
9. Public portfolio renders the latest approved configuration.
10. Owner can inspect evolution history and restore a previous approved version.

## 7. Functional requirements

### GitHub connection
- Authenticate the owner securely.
- Request least-privilege read access.
- List repositories available to the installation.
- Allow explicit repository selection.
- Exclude forks and archived repositories by default, with owner override.
- Support manual synchronization.
- Record sync status, timestamps, and safe error details.

### Repository analysis
- Retrieve name, description, URL, default branch, visibility, topics, primary languages, stars, forks, timestamps, homepage, and README where permitted.
- Do not assume a README is complete or truthful.
- Store raw source references and normalized metadata separately.
- Detect changes and avoid unnecessary re-analysis.

### AI project profiles
- Generate a concise description, category, technology list, project type, documentation quality, and suggested featured status.
- Record evidence references for factual claims.
- Distinguish verified facts from inferences and owner-provided information.
- Allow owner editing and override.
- Reject malformed or unsupported output.

### Portfolio architecture
- Support Starter, Growth, and Engineering Hub presentation patterns.
- Use project count as one signal, not the sole decision variable.
- Consider project quality, diversity, complexity evidence, documentation, and owner preferences.
- Keep design tokens and core brand identity under owner control.
- Generate a versioned configuration, never arbitrary source code.

### Approval and publishing
- Provide preview, approve, reject, and edit workflows.
- Preserve the previous published configuration until approval.
- Record who approved what and when.
- Support rollback to a previous approved version.

### Public portfolio
- Responsive and accessible.
- Search and category filtering when useful.
- Project detail pages with repository/demo links.
- No private tokens or private repository information in public responses.
- Search-engine metadata and social sharing metadata.

## 8. Non-functional requirements

- Strict TypeScript.
- Server-side secret handling.
- RLS on user-owned Supabase tables.
- Idempotent synchronization and evolution jobs.
- Bounded model spend and request volume.
- Graceful handling of provider outages and rate limits.
- Auditability of AI proposals and publication events.
- Automated unit, integration, and end-to-end tests.
- No deployment of unapproved AI proposals.

## 9. Success criteria for v1

- Owner can connect GitHub and select repositories.
- Sync produces normalized repository records.
- AI can create valid project profiles from selected repository evidence.
- Unsupported claims are rejected or flagged.
- Portfolio configuration can be previewed and approved.
- Three layout patterns render from configuration.
- Failed AI runs do not affect the published portfolio.
- Owner can inspect and roll back approved versions.
- CI runs lint, typecheck, tests, and production build.
