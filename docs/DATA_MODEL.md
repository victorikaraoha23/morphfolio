# MorphFolio — Data Model

**Status:** Initial schema migration prepared; application to the hosted project is pending project restoration.

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

## Deliberate omissions in this first migration

- No raw GitHub access tokens or private keys.
- No anonymous access policies.
- No billing, teams, organizations, or multi-tenant role hierarchy.
- No public SQL view exposing portfolio data.
- No automatic Auth user trigger; profile creation remains an explicit application operation.
