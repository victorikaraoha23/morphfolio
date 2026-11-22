# MorphFolio — Product Requirements Document

**Status:** Approved requirements baseline for the GitHub-synchronized personal portfolio  
**Version:** 1.0.0  
**Product owner:** Victor Ikaraoha  
**Product type:** AI-powered, GitHub-synchronized personal developer portfolio; future SaaS

## 1. Product direction

MorphFolio is an AI-powered developer portfolio that synchronizes with the owner's GitHub account. GitHub is the source of truth for repository identity, repository metadata, README content, and repository lifecycle. MorphFolio discovers repositories, analyzes their documentation with AI, and maintains accurate public project pages.

The first deployment serves one owner. It includes a public portfolio and a private, owner-only workspace for connecting GitHub, reviewing newly discovered projects, managing exclusions and overrides, and monitoring synchronization. There is no public registration, customer account system, multi-tenant workspace, subscription, or billing in this phase.

The portfolio must remain useful if GitHub, the AI provider, or background processing is temporarily unavailable. The last successfully published project content remains visible unless the source repository is deleted or becomes private/ineligible.

**Core product loop:** GitHub repository event → secure synchronization → evidence extraction → AI content generation → validation → publication policy → public portfolio.

New repositories are discovered and analyzed automatically but require explicit owner approval before first publication. Once a project is published, validated updates to its GitHub-derived content may be published automatically. Owner-authored overrides always take precedence over AI-generated fields.

GitHub access is read-only. MorphFolio must never commit to, modify, or execute code from connected repositories. SaaS capabilities for other developers are a separate future phase.

## 2. Product goals

1. Present a credible, distinctive, professional developer identity.
2. Connect to the owner's GitHub account and discover all repositories accessible to the authorized GitHub App installation.
3. Automatically detect new, updated, renamed, archived, privatized, restored, and deleted repositories.
4. Use README files and bounded repository metadata as evidence for AI-generated project summaries and case studies.
5. Require approval before a newly discovered project is first published.
6. Automatically refresh already-published projects when relevant README or repository information changes, while preserving owner overrides and the last known-good public version.
7. Keep the public portfolio fast, responsive, accessible, discoverable, and multilingual.
8. Provide a private owner workspace for connection, review, exclusions, overrides, and sync health.
9. Recover from missed webhooks, provider errors, rate limits, and failed background jobs through retries and scheduled reconciliation.
10. Preserve factual accuracy, repository privacy, and owner control.

## 3. Audiences and primary tasks

| Audience | What they need to do |
|---|---|
| Potential clients | Understand services, assess relevant work, and submit an enquiry |
| Recruiters and employers | Review skills, experience, education, projects, and CV |
| Developers and technical peers | Inspect project case studies, architecture decisions, technologies, and demos |
| Potential collaborators | Understand current interests and availability, then get in touch |

## 4. Positioning and personal identity

- Public identity name: **Victor Ikaraoha**.
- Public positioning: **Software Developer exploring AI engineering**. The biography and skill descriptions must reflect the owner's current learning and building journey, and must not imply seniority, employment history, or expertise that has not been substantiated.
- The biography and skill descriptions must reflect the owner's actual learning and building journey.
- Personal identity includes a custom **VI monogram** and a MorphFolio wordmark.
- A professional profile photograph is intended for the hero; until the owner supplies an image, use a deliberate, replaceable visual placeholder rather than inventing or sourcing a likeness.
- Primary social destinations: GitHub, LinkedIn, and X. Professional email is also displayed.
- Availability is owner-controlled and can communicate openness to freelance work, collaborations, consulting, and employment.

## 5. Public information architecture

### 5.1 Primary navigation

- Home
- About
- Projects
- Services
- Resume
- Contact

Navigation must remain consistent across the site and across languages. On smaller screens it must become an accessible mobile navigation.

### 5.2 Homepage

The homepage should be a curated introduction, not a feed of every available record. It includes:

1. Hero: name, editable professional title, concise introduction, profile image/placeholder, availability, and calls to action for projects, CV download, and contact.
2. Short About introduction.
3. Featured projects: owner-selected and manually ordered, normally 3–4, with project status and links to case studies.
4. Capabilities/skills overview.
5. Services overview without public prices.
6. Experience or career-development highlights.
7. Education/certification highlights where supplied.
8. GitHub activity summary where available and meaningful.
9. FAQ.
10. Contact call to action and social links.

Sections may be reordered or hidden by the owner, but the overall design system and navigation remain consistent.

### 5.3 Projects index and project detail

The projects index supports:
- Search by project name, summary, technology, and category.
- Category filters such as AI & Machine Learning, Web Applications, Automation & Agents, Developer Tools, and Experimental Projects. Categories are editable.
- Clear lifecycle labels: Completed, In Progress, and Experimental.
- Featured status and manual ordering.
- Empty, loading, and no-results states.

Every public project may have a dedicated case-study page. Case studies support:
- Overview and problem being addressed.
- Intended users and motivation.
- Solution, key capabilities, and the owner's contribution.
- Technology stack and engineering decisions.
- Architecture overview and diagrams where useful.
- Data/API design or important implementation details where relevant.
- Challenges, trade-offs, and lessons learned.
- Outcomes and metrics only when verified and approved.
- Screenshots, image galleries, demo videos, and technical diagrams.
- Live demo and source repository links when available.
- Current project status and last-updated information where useful.

A case study must not imply that a feature, result, or deployment exists when it does not. Missing evidence should be omitted or clearly identified as owner-provided context.

### 5.4 About, skills, experience, and education

- About: editable biography, interests, current focus, and professional approach.
- Skills: grouped into programming languages, frontend, backend, AI/ML, databases/infrastructure, and developer tools/automation. Categories may evolve.
- Skill confidence labels: **Proficient**, **Working Knowledge**, and **Currently Learning**. The owner controls the label; AI may suggest but cannot publish it.
- Work experience: employment, internships, freelance/contract work, and independent product-building roles. Dates, role, organization/project, responsibilities, and evidence are editable.
- Career and development timeline: chronological learning and professional milestones. It complements rather than fabricates conventional employment history.
- Education and certifications: institutions, qualifications, courses, certificates, dates, and supporting links/documents where appropriate.

### 5.5 Services

Services describe capabilities such as AI integration, web application development, automation, agentic systems, and custom software development where supported by the owner's actual capabilities.

- No public pricing, rates, or starting prices.
- Each service can include scope, typical deliverables, engagement approach, and a contact call to action.
- Service content is maintained in typed, version-controlled portfolio data and deployed through the reviewed release workflow.

### 5.6 Resume

- Public, shareable `/resume` page.
- Downloadable CV file maintained as a version-controlled public asset.
- Print-friendly layout and sensible page breaks.
- Resume data should be consistent with the experience, skills, and education records, while allowing a curated resume presentation.
- Do not fabricate qualifications, dates, or employment.

### 5.7 FAQ

A version-controlled FAQ covers services, availability, technologies, collaboration, project engagements, and other recurring questions. No public pricing answers should be added.

### 5.8 Contact

The contact experience includes:
- A validated contact form.
- Inquiry type: Freelance / Client Project, Employment, Collaboration, Consulting, or General Enquiry.
- Name, reply email, subject, and message fields.
- Server-side validation, abuse/spam protection, rate limiting, and safe error handling.
- No in-app database or persistent message inbox in the personal-first release.
- Email notification to the owner.
- No in-app message inbox; deliver enquiries to the owner's chosen contact channel.
- Clear visitor confirmation without exposing internal system details.

The form must remain usable by keyboard and assistive technology. Never expose submitted messages through public APIs.

## 6. GitHub integration

MorphFolio connects to the owner's GitHub account through a GitHub App installed on the owner's personal account. The app uses minimum read-only repository permissions and receives signed webhooks. The owner workspace is restricted to the configured owner GitHub identity; there is no public signup or multi-user access.

### Repository discovery and scope

- On first connection, enumerate all repositories accessible to the installation, using pagination.
- Continue discovering repositories created after connection.
- Store GitHub's immutable repository ID as the stable external identity; repository names and URLs may change.
- Discover private repositories as repository records, but do not send private README contents to an external AI provider or expose them publicly unless the owner explicitly opts that repository into analysis. Private repositories are never eligible for public publication.
- Forks and archived repositories remain discoverable and can be excluded from automatic AI processing by default; the owner can explicitly include them.
- The owner can exclude any repository from analysis and publication.
- Support a manual resync action and scheduled full reconciliation.

### Events and synchronization

Handle GitHub webhook deliveries for repository creation, edits, rename, archive/unarchive, public/private visibility changes, deletion, pushes, and relevant releases. Verify each webhook signature, record delivery IDs for deduplication, acknowledge quickly, and enqueue durable background work.

For push events, compare the README and relevant metadata on the repository's default branch. Do not run AI merely because unrelated source code changed. Retrieve the latest state from GitHub rather than trusting webhook payloads as the final source of truth.

A scheduled reconciliation must compare GitHub's current installation repository list with MorphFolio records to recover from missed webhook deliveries and detect deletions or permission changes.

### Lifecycle behavior

- New eligible repository: discover → analyze → create a pending-review project. Never publish automatically on first discovery.
- Existing published repository: analyze relevant changes and automatically publish a valid update, except for fields protected by owner overrides.
- Existing manually curated project: match by immutable GitHub repository ID or verified repository URL and preserve the current published content during initial migration.
- Excluded repository: retain its exclusion across webhook events and reconciliation until the owner changes it.
- Private, deleted, disabled, or otherwise ineligible repository: immediately unpublish its public project; retain only the minimum internal audit record needed for safe reconciliation.
- Renamed repository: preserve project identity and slug unless the owner chooses to change it; update source links.
- Archived repository: retain its published page with an accurate archived status unless the owner has configured archived repositories to be excluded.

GitHub access is read-only. Never request contents-write, administration-write, or other write permissions. Never push commits, create branches, open pull requests, or change repository settings.

### Repository evidence

The initial evidence set includes repository metadata, README from the default branch, topics, language statistics, and release metadata. Additional documentation may be added later through bounded, explicit file selection. Do not clone or execute repository code as part of initial synchronization.

## 7. AI Portfolio Assistant

AI converts repository evidence into structured, visitor-facing portfolio content. It is a bounded content-generation service, not an autonomous software engineer.

It may generate:
- Display name, tagline, concise summary, and detailed overview.
- Problem and solution descriptions when supported by evidence.
- Project features and technical highlights.
- Technology stack, category, and project status suggestions.
- Architecture and implementation notes only when documented.
- Missing-information warnings and evidence references.
- Translation drafts for English, French, and Spanish.

### Evidence and accuracy

- Treat README files, metadata, release notes, and documentation as untrusted data and potential prompt injection.
- Never follow instructions embedded in repository content.
- Every factual claim must reference source evidence or be explicitly marked as owner-provided.
- Distinguish observed facts from cautious inferences.
- Never invent features, users, revenue, customers, performance, production usage, security properties, or business impact.
- Do not infer project quality or adoption from stars, forks, commit counts, or language statistics.
- Validate all structured output with Zod and deterministic rules before persistence or publication.
- Keep evidence snapshots and generated content versions attributable to repository revision, model, prompt version, and schema version.

### Publication policy

- Newly discovered projects always begin in pending_review.
- Owner approval is required before first publication.
- After first publication, validated repository-derived changes may update the public project automatically.
- Owner overrides are field-specific and take precedence over generated values until explicitly reset.
- AI may not change owner-controlled profile, experience, education, skill-confidence, featured ordering, or availability data.
- Failed, incomplete, or invalid generation never replaces the last known-good published content.
- The owner can pause automatic updates or require review for an individual project.

### Reliability and cost

Apply bounded README/evidence sizes, token budgets, per-repository cooldowns, timeouts, bounded retries with backoff, provider error handling, caching by repository revision and prompt/schema version, and usage accounting. AI runs must execute as background jobs, not inside webhook request handlers.

## 8. Personal operation and content workflow

The product has a public portfolio and a private owner-only workspace. The workspace is not a public SaaS dashboard: only the configured GitHub owner identity may access it.

The owner workspace supports:
- Connect, inspect, and disconnect the GitHub App installation.
- Browse discovered repositories and their visibility/status.
- Include or exclude repositories from analysis.
- Review newly generated project drafts and approve, edit, or reject first publication.
- Inspect evidence and generated content.
- Set field-level manual overrides and reset them to AI-generated values.
- Pause or resume automatic updates per project.
- View last synchronization, current status, recent events, failed jobs, and retry actions.
- Trigger a manual repository or full-account synchronization.

The public site renders only published, eligible projects. Public project content is sourced from persistent records rather than a hardcoded project catalogue. Profile, biography, social links, services, resume, education, and other non-GitHub profile information remain owner-maintained and are not inferred from repository activity.

**New project workflow:** discover → retrieve evidence → AI draft → validate → pending review → owner approval → publish.

**Published project update workflow:** webhook/reconciliation → compare source revision → retrieve evidence → AI draft → validate → merge non-overridden fields → atomically publish new version. Keep the previous version if any step fails.

**Deletion/privacy workflow:** deletion, privatization, or loss of access makes the project ineligible and removes it from public pages promptly. Keep minimal internal tombstone/audit state to prevent accidental resurrection from delayed webhook deliveries.

Use durable database state and background jobs for synchronization, drafts, approvals, and history. Do not use Git commits as the runtime synchronization mechanism.

## 9. Visual design system

### 9.1 Brand palette

Use these exact user-approved design tokens.

Light theme:
```css
:root {
  --color-primary: #DF1377;
  --color-primary-hover: #C20E66;
  --color-primary-soft: #F9D5E5;
  --color-on-primary: #FFFFFF;
  --color-bg: #F7F6F2;
  --color-surface: #ECEAE4;
  --color-border: #DCD9D0;
  --color-text: #161614;
  --color-text-muted: #5A5854;
  --color-success: #1E7E52;
  --color-warning: #B86B14;
  --color-error: #C92A3E;
}
```

Dark theme:
```css
[data-theme="dark"] {
  --color-primary: #FF3B9A;
  --color-primary-hover: #FF5CA9;
  --color-primary-soft: #4A152F;
  --color-on-primary: #121210;
  --color-bg: #121210;
  --color-surface: #1E1D1B;
  --color-border: #2E2D2A;
  --color-text: #F4F2EC;
  --color-text-muted: #9E9B93;
  --color-success: #34B37A;
  --color-warning: #E59838;
  --color-error: #F25C6E;
}
```

All components must consume semantic tokens. Do not introduce a competing accent palette or hard-code colors in individual components.

### 9.2 Theme behavior

- Default to the visitor's system preference.
- Provide a manual light/dark override.
- Persist the visitor's explicit preference.
- Avoid theme flash where technically practical.
- Ensure both themes meet contrast requirements.

### 9.3 Design and motion

- One coherent visual language across all pages and languages.
- Professional, editorial, technically credible, and distinctive; avoid generic developer-template styling.
- Consistent typography, spacing, layout, components, and interaction patterns.
- Responsive from mobile through large desktop.
- Subtle, purposeful motion only; respect `prefers-reduced-motion`.
- Use the VI monogram and MorphFolio wordmark consistently.
- Support project screenshots, galleries, video embeds, and diagrams with optimized media delivery.

## 10. Multilingual support

Launch languages:
1. English — default and source language.
2. French.
3. Spanish.

Requirements:
- Visible language selector.
- Preserve selected language while navigating.
- Localized navigation, page content, project descriptions, case studies, services, FAQs, resume content, and contact UI.
- Correct locale-aware URLs and metadata.
- `hreflang`, localized canonical URLs, and language-specific sitemap entries.
- Do not silently machine-translate and publish. AI may draft translations, but the owner reviews them before publication.
- If a translation is missing, use a deliberate fallback to the default language and avoid presenting incomplete text as a completed translation.

## 11. Search, navigation, and interaction

- Site-wide search across projects, technologies, skills, services, and relevant public content.
- Project category filters.
- A command palette opened with `Ctrl + K` / `⌘ + K` for navigation, theme changes, and language changes.
- All interactions must be keyboard operable, have visible focus, and work on touch devices.
- No newsletter, update subscription, testimonials, public pricing, or dedicated open-source contributions page.

## 12. Analytics

Analytics are not required for the current personal-first release. If introduced later, use an external privacy-conscious provider rather than building an in-app analytics dashboard. Minimize personal data collection and avoid invasive fingerprinting.

## 13. SEO and sharing

- Editable title and description metadata per public page and project.
- Open Graph and social-sharing images.
- Canonical URLs.
- Structured data appropriate to the content.
- Sitemap and robots.txt.
- Locale-aware URLs and `hreflang`.
- Descriptive, stable project slugs.
- Semantic HTML, crawlable content, and meaningful internal links.
- The custom personal domain is the canonical production domain. The Vercel domain remains available for deployment and previews but should not create duplicate-indexing issues.

## 14. Security, privacy, and reliability

- Restrict owner workspace access to the configured GitHub owner identity.
- Use secure, HTTP-only, same-site session cookies and CSRF protections for state-changing owner actions.
- Keep GitHub App private keys, OAuth credentials, installation tokens, webhook secrets, database credentials, and AI API keys server-side.
- Use minimum read-only GitHub permissions.
- Verify webhook signatures and deduplicate delivery IDs.
- Treat repository content and model output as untrusted.
- Validate inputs and outputs, enforce payload and token limits, and use parameterized database access.
- Never expose private repository data, installation tokens, AI keys, or internal sync errors publicly.
- Private repository content is not sent to an external AI provider unless the owner explicitly enables analysis for that repository.
- Public pages must only query records eligible for publication.
- Use durable background jobs, idempotency, retries, reconciliation, and last-known-good publication semantics.
- Keep a minimal audit trail for connection, approval, exclusion, override, and publication actions.
- Define retention and deletion behavior for repository evidence and generated drafts.
- No multi-tenant authorization or customer accounts in this phase.

## 15. Accessibility and performance

- Target WCAG 2.2 AA.
- Semantic landmarks, headings, labels, and accessible names.
- Keyboard navigation and visible focus.
- Screen-reader-friendly forms, errors, dialogs, command palette, and navigation.
- Adequate contrast in both themes.
- Reduced-motion support.
- Responsive media, image optimization, lazy loading, and sensible video loading.
- Server-first rendering and minimal client-side JavaScript.
- Monitor Core Web Vitals and prevent unnecessary third-party scripts from degrading performance.

## 16. Explicit non-goals for the initial release

- Multi-user public portfolio-builder SaaS.
- Public registration, organizations, teams, billing, or subscriptions.
- Customer workspaces or tenant management.
- GitHub write permissions or automated commits.
- Running, building, or executing connected repository code.
- Autonomous first publication of newly discovered repositories.
- AI-generated React/Next.js source code or autonomous layout redesign.
- A complex recruiter CRM or job-application tracker.
- Public newsletter, testimonials, or service pricing.
- Importing private repository content into public pages.
- Treating stars, forks, or commits as proof of product success.

## 17. Release acceptance criteria

1. The owner can securely connect and disconnect the intended GitHub account.
2. Initial synchronization discovers all repositories accessible to the installation with pagination and records repository visibility and immutable IDs.
3. New repositories are discovered without manual entry.
4. README changes on the default branch trigger bounded background analysis; unrelated code pushes do not trigger unnecessary AI generation.
5. Webhook signatures are verified, duplicate deliveries are idempotent, and failed jobs can be retried.
6. Scheduled reconciliation recovers missed events and detects repository lifecycle changes.
7. New repositories receive AI-generated, evidence-backed drafts and cannot be publicly published before owner approval.
8. Existing published projects update automatically after successful validation, while field-level owner overrides remain intact.
9. The previous published version remains available if retrieval, AI generation, validation, or persistence fails.
10. Private, deleted, disabled, or inaccessible repositories cannot remain publicly exposed.
11. Repository renames preserve project identity and update links.
12. The owner workspace provides repository selection, review, overrides, sync status, and failure recovery.
13. Public project pages are database-backed and display only published, eligible records.
14. AI output is schema-validated, evidence-linked, prompt-injection-resistant, and cost-bounded.
15. Existing manually curated projects are migrated/matched without accidental removal or replacement.
16. Existing public portfolio sections, themes, languages, accessibility, SEO, and responsive behavior remain functional.
17. CI covers lint, typecheck, tests, and production build; integration tests cover GitHub event processing and publication policy.

## 18. Future direction

MorphFolio's long-term goal is a SaaS product. Once the personal-first workflow is useful and validated, plan a dedicated SaaS phase covering customer discovery, authentication, persistent storage, tenant isolation, billing, quotas, onboarding, operations, and migration. Do not build those systems in the current release.
