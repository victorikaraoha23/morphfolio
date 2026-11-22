# MorphFolio — Build Plan

**Product baseline:** Single-user personal-first portfolio product; future SaaS is a separate phase  
**Delivery principle:** Build the public portfolio and AI-assisted workflows without login, a dashboard, or a database.

## Phase 0 — Requirements and foundation
- [x] Confirm the personal-first, single-user product direction.
- [x] Define public portfolio requirements and exclusions.
- [x] Establish brand palette and theme behavior.
- [x] Confirm no login, database, or admin dashboard is required for the current release.
- [x] Establish GitHub read-only and AI evidence-safety principles.
- [ ] Align architecture, PRD, and content model.
- [x] Establish reproducible dependency installation and CI.

## Phase 1 — Public portfolio experience
- [x] Implement semantic light/dark design tokens and theme behavior.
- [x] Build responsive navigation, footer, and accessible theme controls.
- [x] Build homepage and public About, Services, Resume, Contact, Projects, and project-detail routes.
- [x] Add visitor command palette, mobile navigation, and English/French/Spanish content.
- [ ] Complete responsive, accessibility, reduced-motion, and performance verification.
- [ ] Review all content for factual accuracy and evidence.

## Phase 2 — Version-controlled content workflow
- [ ] Consolidate profile, projects, case studies, skills, services, experience, education, FAQs, social links, availability, translations, and media metadata into typed content modules.
- [ ] Define a lightweight proposal/review workflow for AI-generated content.
- [ ] Keep approved content in version control and publish through Git/Vercel.
- [ ] Add public media assets and CV delivery using repository/Vercel-supported asset hosting where appropriate.

## Phase 3 — Portfolio depth and integrations
- [x] Implement project search, category filters, lifecycle labels, and project detail pages.
- [ ] Build detailed project case-study templates.
- [ ] Improve GitHub activity/repository summary without a separate contributions page.
- [ ] Implement read-only GitHub repository inspection using a configured GitHub App.
- [ ] Keep imported evidence as proposals until reviewed; never auto-publish it.

## Phase 4 — AI-assisted portfolio workflows
- [x] Add server-only OpenRouter provider configuration.
- [x] Add Zod schemas for evidence packets and generated project profiles.
- [x] Implement bounded repository analysis with evidence-ID validation and timeouts.
- [ ] Add independent review for material claims and proposed changes.
- [ ] Add token/cost budgets, bounded retries, and clear failure handling.
- [ ] Define how approved proposals become reviewed repository changes.

## Phase 5 — Contact, SEO, and release readiness
- [ ] Complete contact form validation, spam protection, and delivery through a selected email provider.
- [ ] Complete locale-aware metadata, canonical URLs, hreflang, sitemap, robots, Open Graph, and structured data checks.
- [ ] Add automated unit, integration, and browser tests.
- [ ] Verify Vercel production/preview environments and server-side secrets.
- [ ] Run accessibility, security, SEO, and performance audits.

## Future phase — SaaS productization
MorphFolio's long-term goal is a SaaS product. After the personal-first workflow is useful and validated, plan a dedicated phase covering customer discovery, authentication, persistent storage, tenant isolation, onboarding, billing, quotas, abuse controls, support, and migration. Select infrastructure only after those requirements are defined.

## Definition of done
- Requirements and behavior are documented.
- Inputs are validated and no unauthenticated write capability is introduced.
- Public content and server-side secret boundaries are tested.
- Relevant loading, empty, success, and failure states are handled.
- Accessibility and responsive behavior are considered.
- Relevant automated checks pass.
- Secrets and personal data are not exposed.
- Deployed behavior is verified rather than assumed.

Run `npm run check` before a public release or material design change. Review public routes at mobile and desktop widths, both themes, and all three supported languages.
