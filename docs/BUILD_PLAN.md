# MorphFolio — Build Plan

**Product:** AI-powered, GitHub-synchronized personal developer portfolio  
**Current operating model:** One owner, one GitHub account, private owner workspace, public portfolio  
**Delivery:** Work on update-dev; pull requests to main; never merge without owner approval

## Milestone 0 — Product and architecture baseline
- [x] Confirm GitHub is the source of truth for repository identity, README, metadata, and lifecycle.
- [x] Confirm new repositories require first-publication approval.
- [x] Confirm validated updates to already-published projects may publish automatically.
- [x] Confirm owner overrides take precedence over AI-generated fields.
- [x] Confirm private repositories are never public and private README content is not sent to external AI by default.
- [x] Confirm no public signup or multi-tenant SaaS in this phase.
- [x] Document modular-monolith, GitHub App, PostgreSQL, Drizzle, Inngest, and AI architecture.
- [x] Implement the approved architecture and initial persistence schema.

## Milestone 1 — Repository foundation and data model
- [x] Add PostgreSQL connection and Drizzle configuration/migrations.
- [x] Implement installation, repository, project, evidence snapshot, AI run, content version, override, webhook delivery, sync run, and owner audit tables.
- [ ] Add repository/project state enums, unique constraints, indexes, and transactional publication operations.
- [x] Add a server-only public data-access layer and published-project queries; owner-only queries remain pending.
- [x] Add a manually triggered, rollback-only Neon verification suite for schema, publication approval, repository visibility, private README retention, cross-project version isolation, and webhook idempotency constraints.\n- [ ] Add application-level tests for overrides, transactional publication, and last-known-good behavior.
- [ ] Preserve existing hardcoded portfolio projects as published content during migration; match them to GitHub repositories by verified repository identity.

## Milestone 2 — GitHub App connection and repository discovery
- [ ] Create/configure a GitHub App with minimum read-only permissions and required webhook subscriptions.
- [ ] Implement owner GitHub authorization and allowlist enforcement.
- [ ] Implement secure install/callback/disconnect flow.
- [ ] Generate installation tokens server-side.
- [ ] Enumerate all accessible repositories with pagination.
- [ ] Record immutable GitHub repository IDs, visibility, default branch, archived/fork/disabled state, and metadata.
- [ ] Discover private repositories but never publish them; do not send private README content to AI without explicit opt-in.
- [ ] Add owner repository list, include/exclude controls, and manual sync.

## Milestone 3 — Webhook ingress and durable synchronization
- [ ] Verify webhook HMAC signatures against raw request bodies.
- [ ] Deduplicate GitHub delivery IDs.
- [ ] Persist minimal event metadata and enqueue durable Inngest jobs.
- [ ] Handle repository create/edit/rename/archive/unarchive/delete/publicize/privatize and installation repository changes.
- [ ] Handle default-branch push events and compare README SHA/metadata before AI work.
- [ ] Coalesce repeated events and make jobs idempotent.
- [ ] Implement scheduled reconciliation for missed webhooks and permission changes.
- [ ] Unpublish projects promptly on deletion, privatization, disabled status, or access loss.
- [ ] Preserve stable project identity across repository renames.

## Milestone 4 — AI project content generation
- [ ] Extend the existing repository analyst schema to a complete case-study draft.
- [ ] Build bounded README and metadata evidence packets with stable evidence IDs.
- [ ] Add prompt/schema versioning and evidence/source traceability.
- [ ] Validate all generated fields and evidence references.
- [ ] Add missing-information reporting and safe project status suggestions.
- [ ] Apply cost budgets, caching, cooldowns, timeouts, bounded retries, and provider error handling.
- [ ] Add private-repository analysis opt-in and disclosure before any private content is sent externally.
- [ ] Test prompt injection, unsupported claims, invalid JSON, unknown evidence IDs, provider failure, and oversized README input.

## Milestone 5 — Approval and publication lifecycle
- [ ] Create pending-review drafts for newly discovered repositories.
- [ ] Implement owner approve/edit/reject/exclude actions.
- [ ] Implement field-level owner overrides and reset-to-generated behavior.
- [ ] Automatically update already-published projects after successful validation.
- [ ] Keep owner overrides, featured ordering, and owner-controlled profile data unchanged.
- [ ] Atomically promote new content versions and retain the last known-good published version.
- [ ] Add per-project auto-update pause/review controls.
- [ ] Add audit records for approvals, exclusions, overrides, and publication.

## Milestone 6 — Owner workspace
- [ ] GitHub connection status and disconnect.
- [ ] Repository inventory, visibility, inclusion/exclusion, and last-sync status.
- [ ] Pending project review with evidence and public preview.
- [ ] Project content editor and field override controls.
- [ ] Sync history, failed jobs, and retry actions.
- [ ] Owner-only authorization on every workspace operation.
- [ ] Accessible responsive interface consistent with public design system.

## Milestone 7 — Dynamic public portfolio
- [ ] Replace hardcoded project catalogue reads with a database-backed project service.
- [ ] Keep existing manually curated project pages intact through migration.
- [ ] Render only published projects linked to eligible public repositories.
- [ ] Preserve stable slugs and handle repository renames.
- [ ] Add project last-synchronized/updated information where useful.
- [ ] Ensure project search, categories, featured selection, locale handling, metadata, and sitemap use published data.
- [ ] Keep About, Services, Resume, Contact, and other owner-authored profile data owner-maintained.

## Milestone 8 — Reliability, privacy, and quality
- [ ] Test webhook duplicates, delayed/out-of-order events, missed events, and reconciliation.
- [ ] Test GitHub rate limits, token expiry, app uninstall, permission loss, private/deleted repositories, and repository rename.
- [ ] Test AI failure and database transaction rollback without losing last-known-good content.
- [ ] Test owner authorization, CSRF, webhook signatures, secret handling, and private content isolation.
- [ ] Test cost limits, retry caps, job concurrency, and event coalescing.
- [ ] Complete accessibility, responsive, performance, SEO, and cross-browser audits.
- [ ] Run lint, typecheck, unit/integration tests, and production build.

## Milestone 9 — Release
- [ ] Configure production GitHub App callback/webhook URLs and least-privilege permissions.
- [ ] Configure production database, migrations, Inngest, AI provider, and secrets.
- [ ] Run initial repository import and reconcile existing project content.
- [ ] Verify new-repository approval, README auto-update, deletion/private unpublishing, and recovery flows end-to-end.
- [ ] Verify public site and owner workspace on production.
- [ ] Document operations, backup/restore, disconnect, and incident recovery.

## Future SaaS phase — Not in current scope
Multiple developers, multiple GitHub installations, tenant isolation, public registration, billing, quotas, customer onboarding, custom domains, and customer support are deferred until the personal product is validated.
