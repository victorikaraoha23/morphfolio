# MorphFolio — Build Plan

**Product baseline:** Personal-first, single-owner portfolio  
**Delivery principle:** Build the public portfolio and owner content workflow before advanced automation. Keep each phase deployable and testable.

## Phase 0 — Requirements and foundation

- [x] Confirm personal-first product direction.
- [x] Define the public portfolio requirements and excluded features.
- [x] Establish the brand palette and theme behavior.
- [x] Establish Supabase Auth, owner-only access, and RLS foundation.
- [x] Establish GitHub read-only and AI evidence-safety principles.
- [ ] Align architecture and data model with the approved PRD.
- [ ] Add the design token implementation and verify both themes.
- [ ] Add a reproducible dependency lockfile and confirm CI.

**Exit criteria:** the PRD, architecture, data model, and build plan describe the same product; baseline CI is green.

## Phase 1 — Design system and public portfolio shell

**Current progress:** The approved palette, light/dark theme behavior, responsive homepage shell, and searchable/filterable projects index are implemented. Remaining public routes, project case studies, command palette, multilingual UI, and full accessibility/performance verification are still outstanding.

- [x] Implement semantic light/dark design tokens exactly matching the approved palette.
- [x] Implement system theme preference and manual override.
- [x] Build responsive navigation, footer, VI monogram, and initial accessible navigation/theme controls.
- [x] Build the homepage hero and initial About, selected projects, capabilities, and contact sections.
- [ ] Build About, Services, Resume, and Contact routes.\n- [x] Build the Projects index and project detail routes.
- [ ] Add responsive states, loading/empty/error states, and reduced-motion behavior.
- [ ] Add command palette and mobile navigation.
- [ ] Create fixture content with clearly identified sample data; do not invent personal achievements.

**Exit criteria:** every public route renders consistently on mobile and desktop in both themes; core interactions are keyboard accessible.

## Phase 2 — Public content model and CMS foundation

- [ ] Design migrations for portfolio content: profile, sections, projects, case studies, skills, services, experience, education, FAQs, social links, availability, translations, and media metadata.
- [ ] Preserve owner-scoped access and RLS; public reads must expose only published records.
- [ ] Implement draft, preview, publish, unpublish, and restore/version behavior.
- [ ] Build dashboard navigation and CRUD workflows for core content.
- [ ] Add media upload validation and Supabase Storage policies.
- [ ] Add CV upload and public download handling.
- [ ] Add preview mode that does not leak draft content publicly.

**Exit criteria:** owner can manage all core portfolio content without editing code; anonymous visitors can access only published content.

## Phase 3 — Core public experience

- [ ] Populate About, skills, experience/timeline, education, services, FAQ, and contact sections from database content.
- [ ] Implement featured project selection and manual ordering (3–4 on homepage by default).
- [x] Implement the projects index with category filters, search, and lifecycle status labels.\n- [x] Add grounded project detail pages with clear lifecycle labels.
- [ ] Build detailed project case-study templates with architecture and media support.
- [ ] Build the public resume page and print stylesheet.
- [ ] Implement social links and editable availability.
- [ ] Implement the GitHub activity summary without a separate open-source contributions page.

**Exit criteria:** all approved public content is database-driven and the site can present a complete, coherent portfolio.

## Phase 4 — Contact workflow and notifications

- [ ] Implement contact form with inquiry type and server-side validation.
- [ ] Add rate limiting, spam/abuse protection, and safe error responses.
- [ ] Persist submissions privately in Supabase.
- [ ] Send owner email notifications through a selected email provider.
- [ ] Build private contact inbox with read/unread and response status.
- [ ] Add notification failure handling and retry/observability.

**Exit criteria:** a visitor can submit a valid enquiry; it is stored privately, the owner is notified, and the inbox can manage it.

## Phase 5 — Multilingual content and SEO

- [ ] Implement English, French, and Hausa locales; English is default.
- [ ] Add language switcher and preserve locale across navigation.
- [ ] Add translation fields/workflows for all public content types.
- [ ] Add translation completeness and fallback behavior.
- [ ] Implement locale-aware metadata, canonical URLs, and hreflang.
- [ ] Add Open Graph metadata/images, structured data, sitemap, and robots.txt.
- [ ] Verify custom domain canonical behavior and Vercel preview indexing policy.

**Exit criteria:** all three locales work across public routes; translated content and metadata are crawlable and correctly linked.

## Phase 6 — GitHub connection and repository synchronization

- [ ] Complete GitHub App installation/callback flow.
- [ ] Confirm least-privilege read-only permissions.
- [ ] List accessible repositories and allow explicit owner selection.
- [ ] Exclude forks and archived repositories by default, with override.
- [ ] Synchronize metadata, README, topics, languages, releases, and safe activity data.
- [ ] Handle pagination, rate limits, retries, idempotency, and sync history.
- [ ] Keep imported content private until owner approval.

**Exit criteria:** owner can connect GitHub, select repositories, synchronize evidence, and review it without exposing credentials or publishing automatically.

## Phase 7 — AI Portfolio Assistant

- [ ] Implement typed workflows for project analysis and content drafting.
- [ ] Generate evidence-linked project descriptions and case-study drafts.
- [ ] Suggest skill evidence and project categories.
- [ ] Draft biography, services, FAQ content, and translations.
- [ ] Add independent review for material factual claims.
- [ ] Validate all outputs with Zod and deterministic rules.
- [ ] Track model, prompt/schema version, evidence, usage, and outcome.
- [ ] Add cost limits, timeouts, retries, and request throttles.
- [ ] Integrate drafts into the approval workflow.

**Exit criteria:** AI can produce useful private drafts from grounded evidence; unsupported claims are flagged/rejected and nothing publishes without owner approval.

## Phase 8 — Analytics and operational readiness

- [ ] Select privacy-conscious analytics provider and document data collection/retention.
- [ ] Build private analytics overview and date filtering.
- [ ] Add aggregated popular pages/projects, referrers, and geographic reporting where available.
- [ ] Add contact conversion metrics without exposing visitor personal data.
- [ ] Add error monitoring and operational alerts.
- [ ] Configure backups and recovery checks.
- [ ] Add automated unit, integration, RLS, and browser tests.
- [ ] Verify Vercel production and preview environments, secrets, and callback URLs.
- [ ] Run accessibility, security, SEO, and performance audits.

**Exit criteria:** production deployment is observable, recoverable, secure, accessible, and meets release acceptance criteria.

## Future phase — SaaS evaluation

Do not build public registration, multi-tenancy, billing, or customer workspaces during the personal-first release. Revisit only after validating the portfolio experience and operational model with the single-owner product.

## Definition of done

A feature is complete only when:
- Its requirements and behavior are documented.
- Inputs are validated and authorization is enforced.
- Public/private data boundaries are tested.
- Loading, empty, success, and failure states are handled.
- Accessibility and responsive behavior are considered.
- Relevant automated checks pass.
- Secrets and personal data are not exposed.
- The deployed behavior is verified rather than assumed.
