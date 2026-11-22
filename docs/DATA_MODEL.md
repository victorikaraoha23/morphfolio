# MorphFolio — Content and Persistence Model

**Status:** Repository-managed content for the personal-first release  
**Database:** None in the current application

## 1. Current source of truth

Approved portfolio content is typed, version-controlled application data under `src/lib/portfolio/`.

- `projects.ts` — project catalogue and factual project descriptions.
- `project-translations.ts` — localized project content.
- `resume.ts` — resume and timeline content.
- Other typed dictionaries and page-level content — profile, navigation, services, and public sections.

The Git repository is the persistence and review mechanism for this release. Changes are reviewed and deployed through Vercel.

## 2. AI-generated proposals

The repository analyst builds bounded evidence packets and validates structured model output with Zod. Analysis is currently an internal service and does not persist drafts. Approved suggestions are incorporated into typed content through a reviewed change. Unsupported claims are rejected or labelled as unverified.

## 3. No database or identity layer

The personal-first application does not require a hosted database, authentication, login, user accounts, sessions, user/tenant IDs, row-level security, migrations, generated database types, a private admin dashboard, or a database-backed CMS.

Do not introduce a database simply to make static portfolio content editable. Reassess only when a concrete workflow requires persistence that is materially better served by a database than by version-controlled files.

## 4. Future SaaS considerations

A SaaS release will likely need durable records for accounts, workspaces, portfolios, drafts, evidence, AI runs, approvals, versions, usage, and billing. This is a future design exercise, not an existing schema. Define tenancy boundaries, data lifecycle, retention, access patterns, backups, and migration strategy before choosing a database.
