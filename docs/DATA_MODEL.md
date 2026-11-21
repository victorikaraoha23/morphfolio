# MorphFolio — Data Model

**Status:** Initial identity, repository-evidence, and portfolio-version foundation applied and verified. This is not yet the complete content-management schema required by the personal-first PRD. Additional content, translation, media, contact inbox, and analytics migrations are planned in the build plan.

## Identity and ownership

Supabase Auth is the only identity authority. Every user-owned record carries a `user_id` that references `auth.users(id)`. Composite foreign keys include the owner ID so records cannot be linked across different users, even if a caller guesses another row's UUID.

## Tables

| Table | Responsibility |
|---|---|
| `profiles` | Application profile attached to the Supabase Auth user |
| `github_connections` | GitHub account and App installation metadata; no access tokens or private keys |
| `repositories` | Repositories selected for portfolio analysis |
| `repository_snapshots` | Immutable snapshot metadata for a repository revision |
| `evidence_items` | Bounded, attributable evidence extracted from a snapshot |
| `project_profiles` | Versioned, structured AI-generated project descriptions |
| `project_profile_evidence` | Explicit links from generated profiles to supporting evidence |
| `evolution_runs` | Idempotent sync, analysis, proposal, publish, and rollback runs |
| `portfolios` | Portfolio identity, slug, and public/private switch |
| `portfolio_versions` | Versioned JSON configuration; never executable code |
| `approval_events` | Append-only approval, rejection, publish, and rollback history |

## Security rules

- RLS is enabled on every table in the exposed `public` schema.
- Authenticated users can access only rows whose `user_id` matches `auth.uid()`; the profile row uses its primary key.
- No anonymous table access is granted. Public rendering will use a separate server-side read path that exposes only approved and published fields.
- Approval events are read-only to authenticated clients. Trusted server-side code writes them so the client cannot rewrite audit history.
- GitHub App installation tokens are short-lived and minted server-side. The database stores installation metadata only.
- AI output is persisted as validated structured data, never as executable React, SQL, or JavaScript.
- Repository evidence is bounded and linked to the exact snapshot from which it was derived.

## Lifecycle

1. A user connects a GitHub App installation.
2. Selected repositories are synchronized into metadata snapshots.
3. Evidence items are extracted and associated with the snapshot.
4. The analyst creates a draft project profile linked to evidence.
5. The portfolio architect proposes a new portfolio configuration version.
6. The owner reviews and approves or rejects the proposal.
7. Only an approved version may be published; a failed run must not replace the last known-good published version.

## Migration files

- `supabase/migrations/20261121221153_initial_morphfolio_schema.sql`
- `supabase/migrations/20261121221228_harden_rls_and_index_foreign_keys.sql`
- `supabase/migrations/20261121221724_lock_down_api_privileges.sql`

The security advisor returned no findings after hardening. The performance advisor no longer reports unindexed foreign keys; its remaining unused-index notices are expected while the tables are empty and should be reassessed after real workload exists.

## Planned content-domain expansion

The current 11-table foundation does not yet represent the full portfolio CMS. Before implementing dashboard CRUD, design and migrate owner-scoped records for:

- Profile and site settings, social links, availability, and section configuration.
- Projects, case studies, project categories, featured ordering, and public lifecycle status.
- Skills and skill categories, services, FAQs, work experience, career timeline, education, and certifications.
- Locale-aware translations for English, French, and Hausa, with explicit translation completeness and fallback rules.
- Media metadata for screenshots, galleries, videos, diagrams, and the downloadable CV; actual file bytes belong in Supabase Storage with separate access policies.
- Contact submissions and notification delivery status, kept private from anonymous visitors.
- Analytics configuration and aggregated reporting references; avoid storing unnecessary visitor-level personal data.

Do not treat this list as already implemented tables. Define relationships, constraints, indexes, retention, publication rules, and RLS before writing migrations. Public queries must expose only published content through a narrowly scoped read path.

## Deliberate omissions in this first migration

- No raw GitHub access tokens or private keys.
- No anonymous access policies.
- No billing, teams, organizations, or multi-tenant role hierarchy.
- No public SQL view exposing portfolio data.
- No automatic Auth user trigger; profile creation remains an explicit application operation.
