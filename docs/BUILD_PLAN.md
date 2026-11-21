# MorphFolio — Build Plan

## Delivery approach

Build a working vertical slice before adding breadth. Every phase must have demonstrable acceptance criteria and automated checks where applicable.

## Phase 0 — Foundation (current)

- [x] Confirm repository and product direction.
- [x] Establish product requirements.
- [x] Establish architecture and security baseline.
- [x] Establish AI system policy.
- [ ] Add application scaffold and CI.
- [ ] Confirm initial design direction and tokens.

**Exit criteria:** repository contains the approved project rules and a buildable application scaffold with CI.

## Phase 1 — Public portfolio shell

- [ ] Create responsive public portfolio landing page.
- [ ] Add project listing and project detail route.
- [ ] Implement Starter, Growth, and Engineering Hub renderers.
- [ ] Define design tokens and accessible primitives.
- [ ] Add loading, empty, and error states.
- [ ] Add metadata and social preview basics.

**Exit criteria:** all three layouts render from fixture data; responsive and accessibility checks pass.

## Phase 2 — Owner dashboard and Supabase

- [ ] Configure Supabase server and browser clients safely.
- [ ] Add initial SQL migrations.
- [ ] Implement owner authentication.
- [ ] Add profile and design preferences.
- [ ] Add RLS policies and database tests.
- [ ] Build dashboard navigation and settings.

**Exit criteria:** owner can authenticate and manage private settings; unauthenticated users cannot access protected data.

## Phase 3 — GitHub connection and synchronization

- [ ] Create GitHub App and document permission setup.
- [ ] Implement secure installation connection.
- [ ] List accessible repositories.
- [ ] Allow explicit repository selection.
- [ ] Synchronize metadata, languages, topics, releases, and README.
- [ ] Handle pagination, rate limits, retries, and idempotency.
- [ ] Record sync history.

**Exit criteria:** owner can select repositories and synchronize normalized records without exposing credentials.

## Phase 4 — OpenRouter intelligence

- [ ] Implement provider adapter and environment-based model IDs.
- [ ] Add evidence packet construction and size limits.
- [ ] Add project-profile Zod schema.
- [ ] Generate summaries and categories.
- [ ] Verify evidence references and reject unsupported claims.
- [ ] Record model usage, prompt/schema versions, and outcomes.
- [ ] Add provider timeout and retry policy.

**Exit criteria:** selected repository fixtures produce validated project profiles; malformed and unsupported claims are rejected.

## Phase 5 — Portfolio Architect and evolution history

- [ ] Define versioned portfolio configuration schema.
- [ ] Implement deterministic layout policy.
- [ ] Add AI recommendations with constrained choices.
- [ ] Add draft preview.
- [ ] Add approve/reject/edit workflow.
- [ ] Record immutable evolution events.
- [ ] Implement rollback.

**Exit criteria:** a proposal can be previewed, approved, published, and rolled back; failed runs cannot replace the published version.

## Phase 6 — Automation and operational readiness

- [ ] Add manual and scheduled synchronization.
- [ ] Add secure webhook-triggered sync when ready.
- [ ] Add concurrency and duplicate-run prevention.
- [ ] Add bounded retries and failure notifications.
- [ ] Add CI for lint, typecheck, tests, and build.
- [ ] Configure Vercel preview and production environments.
- [ ] Add monitoring and cost controls.

**Exit criteria:** repeatable deployment and safe recovery from failed synchronization or AI provider outages.

## Phase 7 — Advanced features

Only after the core workflow is stable:
- Automated screenshots.
- Technology and project relationship graphs.
- Contribution timeline.
- Rich technical case studies.
- Multiple themes and custom domains.
- Multi-user SaaS onboarding and billing.

## Definition of done

A feature is not done until its behavior is documented, inputs are validated, authorization is enforced, relevant tests pass, failure states are handled, and no secrets are exposed.
