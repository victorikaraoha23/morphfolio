# MorphFolio — Product Requirements Document

**Status:** Requirements baseline for the personal-first release  
**Version:** 1.0.0  
**Product owner:** Victor Ikaraoha  
**Product type:** AI-assisted personal developer portfolio product; future SaaS

## 1. Product direction

MorphFolio is an AI-assisted developer portfolio product. Its first deployment is built and operated for one person: Victor Ikaraoha. It presents his software development and AI engineering work to potential clients, collaborators, recruiters, and other technical audiences.

The first release is deliberately **personal-first and single-user**. There is no login, registration, private admin dashboard, customer account, database, tenant management, subscription, billing, or customer workspace.

MorphFolio is intended to evolve into a SaaS product. The current release must stay simple and useful for one person; future SaaS requirements will be designed and validated as a separate phase.

## 2. Product goals

1. Present a credible, distinctive, professional identity.
2. Demonstrate real engineering ability through detailed, evidence-based project case studies.
3. Make it easy for clients, recruiters, and collaborators to understand the owner's capabilities and make contact.
4. Keep portfolio content current through AI-assisted proposals and a version-controlled review/deployment workflow.
5. Make the public site fast, responsive, accessible, discoverable, and usable in multiple languages.
6. Preserve owner control over every public change.

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

A configured, read-only GitHub App can inspect explicitly selected repositories; no in-app GitHub account login is required.

Initial access is read-only and limited to the permissions required. The system may retrieve repository metadata, README content, languages, topics, releases, links, and permitted public activity.

- Repository selection is explicit; do not publish every repository by default.
- Exclude forks and archived repositories by default, with owner override.
- Support manual synchronization and clear sync status.
- Show a concise GitHub activity/repository summary on the public portfolio when useful.
- Do not create a separate open-source contributions section.
- Never infer users, revenue, customer count, production usage, business impact, or performance from repository activity alone.
- GitHub-derived content remains a proposal until reviewed and incorporated into version-controlled portfolio data.

## 7. AI Portfolio Assistant

AI is an internal portfolio-development capability, not the author of record and not an autonomous publisher.

It may:
- Analyze selected repository evidence.
- Draft project summaries and case studies.
- Suggest categories, technologies, and skill evidence.
- Draft biography, service descriptions, FAQ answers, and translations.
- Identify stale, inconsistent, incomplete, or unsupported content.
- Recommend improvements to information hierarchy and content quality.

Controls:
- AI output is always a draft.
- Separate verified evidence, inferences, and owner-provided facts.
- Link repository-derived claims to source evidence.
- Validate all structured output at runtime.
- Treat repository content as untrusted input and potential prompt injection.
- Do not allow models to execute code, modify repositories, access secrets, or publish content.
- The owner must review and explicitly approve public changes.
- Failed AI runs must not damage or replace published content.
- Record model, prompt/schema version, evidence references, usage, and outcome for material runs.
- Apply request limits, token/cost budgets, timeouts, and bounded retries.

## 8. Personal operation and content workflow

There is no in-app login, account system, or private admin dashboard in the personal-first release.

The source repository is the control plane for profile, biography, social links, projects, case studies, skills, services, FAQs, timeline, resume content, languages, availability, SEO metadata, and public site configuration.

Content workflow: **Evidence → AI proposal → Human review → Version-controlled change → Vercel deployment**. AI does not publish directly. The owner reviews changes through the development workflow, and Git history provides the change record.

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

- No login, user accounts, sessions, or user-specific database records in the personal-first release.
- Keep GitHub private keys, installation tokens, webhook secrets, and AI API keys server-side.
- Validate external input and treat repository/AI content as untrusted.
- Do not expose the internal AI analyst as an unauthenticated public endpoint.
- Protect any externally callable contact or integration endpoint with rate limits and abuse controls.
- Review public content changes through Git and CI before deployment.
- Preserve the last known-good deployment when an analysis or build fails.

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
- Blog/articles publishing section.
- Testimonials.
- Newsletter or update subscriptions.
- Public service pricing.
- Dedicated open-source contributions page.
- Multiple visual layout modes or visitor-selectable portfolio designs.
- Autonomous AI publishing or AI-generated application source code.
- GitHub write permissions or automated commits.
- A complex recruiter CRM or job-application tracker.

## 17. Release acceptance criteria

The personal-first release is ready only when:
1. The public portfolio presents the owner's real identity and approved content across all required sections.
2. Public project pages support detailed, evidence-conscious case studies and media.
3. Visitors can browse, search, filter, switch language/theme, download the CV, and submit a contact enquiry.
4. English, French, and Spanish content works with correct locale navigation and SEO metadata.
5. The owner can maintain public content through the version-controlled repository workflow.
6. GitHub imports are read-only, explicitly selected, and never auto-published.
7. AI drafts are evidence-aware, validated, reviewable, and never published without owner approval.
8. Valid contact enquiries are delivered to the owner's chosen contact channel without an in-app inbox.
9. Analytics are private, aggregated, and privacy-conscious.
10. SEO, responsive behavior, accessibility, and performance checks pass.
11. Server-side secret handling, external-input validation, and public content boundaries are tested.
12. CI includes lint, typecheck, automated tests, and a production build.
13. The production domain and Vercel deployment work without duplicate-indexing issues.

## 18. Future direction

MorphFolio's long-term goal is a SaaS product. Once the personal-first workflow is useful and validated, plan a dedicated SaaS phase covering customer discovery, authentication, persistent storage, tenant isolation, billing, quotas, onboarding, operations, and migration. Do not build those systems in the current release.
