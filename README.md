# MorphFolio

**An AI-assisted developer portfolio product, initially built for one person.**

MorphFolio is both the public developer portfolio and the product being developed toward a future SaaS offering. The current release is personal-first: one portfolio, one operator, no user accounts, no login, no public registration, and no customer workspace.

The immediate goal is to make the portfolio useful and credible while developing its AI-assisted workflows. SaaS capabilities are a future product phase, not a reason to add authentication, multi-tenancy, billing, or infrastructure prematurely.

## Product direction
- **Now:** a single-user personal portfolio product, operated through the repository and Vercel deployment workflow.
- **Later:** evaluate a hosted SaaS experience with customer accounts, persistence, tenant isolation, billing, and self-service onboarding as a separate architectural phase.
- **Do not build now:** login, registration, an admin dashboard, a database, user accounts, or multi-tenant abstractions.

Portfolio content is maintained as typed, version-controlled data in the repository. Updates are reviewed as code changes and published through the normal deployment workflow. AI-generated suggestions remain proposals until reviewed and incorporated.

## Core principles
- **Evidence before claims:** AI-generated descriptions must be traceable to repository evidence. Never invent metrics, users, revenue, performance, or achievements.
- **Configuration, not generated application code:** AI proposes validated portfolio data and layout configuration. The application owns and renders the React components.
- **Human control:** AI suggestions do not publish themselves. Approved content changes are reviewed and versioned through Git.
- **Least privilege:** GitHub access begins read-only and requests only the permissions required for selected features.
- **Provider independence:** OpenRouter is the initial AI gateway; model IDs are configuration, not application logic.
- **Safe failure:** Failed analysis must never replace the last known-good published portfolio.

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS 4 + Lucide React
- GitHub App + GitHub REST API (integration work in progress)
- OpenRouter + Vercel AI SDK 7 + Zod 4
- GitHub Actions and Vercel

There is currently no application database, authentication provider, or file-storage service.

## Getting started
Requirements: Node.js 26.x and npm 10+.

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current implementation
- Responsive public portfolio with homepage, About, projects index/detail pages, services, resume, and contact pages.
- Light/dark themes, English/French/Spanish localization, responsive navigation, and visitor command palette.
- Evidence-conscious project catalogue for AI Slop Checker, Blueprint AI, AgentsChat, Prismbyte, n8n workflow experiments, and a labelled RAG learning prototype.
- GitHub, LinkedIn, and X links, development timeline, and collaboration/focus sections.
- CI for lint, TypeScript checks, and production builds.
- Server-only OpenRouter configuration, Zod evidence/profile schemas, and bounded repository analysis.

The AI analyst is an internal service, not a public endpoint. It requires `OPENROUTER_API_KEY` and `OPENROUTER_ANALYSIS_MODEL`. It currently produces analysis in memory; durable drafts, repository synchronization, and automated publishing are future milestones. The public portfolio uses maintained project data rather than a live GitHub synchronization pipeline.

## Environment variables
See [.env.example](.env.example). Configure only providers and integrations used by the feature being developed. Keep API keys and GitHub private keys server-side. Never commit `.env.local`, private keys, webhook secrets, or OpenRouter API keys.

## Content and persistence
The source of truth is version-controlled portfolio data under `src/lib/portfolio/`. This keeps the single-user release inspectable, portable, inexpensive, and easy to deploy. Introduce persistent storage only when a validated workflow cannot be served cleanly by repository-managed content.

## Quality checks
```bash
npm run check
```
GitHub Actions runs lint, typecheck, and production build for pull requests and pushes to `main` and `update-dev`.

## Documentation
- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [AI system design](docs/AI_SYSTEM.md)
- [Security model](docs/SECURITY.md)
- [Build plan](docs/BUILD_PLAN.md)
- [Engineering rules](AGENTS.md)
