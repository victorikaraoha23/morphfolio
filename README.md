# MorphFolio

**A personal AI-assisted developer portfolio for Victor Ikaraoha.**

MorphFolio is a personal developer portfolio documenting selected software products, experiments, technical interests, and the work-in-progress journey behind them. Public pages include project details, an About profile, areas of focus, services/collaboration interests, a development timeline, and contact links. The private owner dashboard is a separate management foundation; portfolio content is not yet automatically synchronized from GitHub.

## Product direction

The first release is a **single-owner personal portfolio**. There is no public registration, multi-user workspace, billing, or customer onboarding. The architecture should remain straightforward and maintainable, with future SaaS expansion treated as a separate product decision.

## Core principles

- **Evidence before claims:** AI-generated descriptions must be traceable to repository evidence. Never invent metrics, users, revenue, performance, or achievements.
- **Configuration, not generated application code:** AI proposes validated portfolio data and layout configuration. The application owns and renders the React components.
- **Human control:** The owner can review, edit, approve, reject, pause, and roll back proposed changes.
- **Least privilege:** GitHub access begins read-only and requests only the permissions required for selected features.
- **Provider independence:** OpenRouter is the initial AI gateway; model IDs are configuration, not application logic.
- **Safe failure:** Failed analysis must never replace the last known-good published portfolio.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS 4 + Lucide React
- Supabase (PostgreSQL, Auth, Storage where needed)
- GitHub App + GitHub REST API
- OpenRouter + Vercel AI SDK 7 + Zod 4
- GitHub Actions
- Vitest + Playwright (to be introduced with the test milestone)
- Vercel deployment

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

- Responsive public portfolio experience with homepage, About, projects index and detail pages, services, resume, and contact pages.
- Light and dark themes, English/French/Spanish localization, responsive navigation, and a visitor command palette.
- Project catalog with lifecycle labels and evidence-based descriptions for AI Slop Checker, Blueprint AI, AgentsChat, Prismbyte, n8n workflow experiments, and an explicitly labelled RAG learning prototype.
- Supplied GitHub, LinkedIn, and X profile links integrated into public contact surfaces.
- Development timeline and collaboration/focus sections that avoid claiming unverified employment history or credentials.
- CI workflow for linting, TypeScript checks, and production builds.
- Server-only OpenRouter provider configuration.
- Zod schemas for repository evidence packets and generated project profiles.
- Repository analyst service with bounded output, evidence-ID validation, and a request timeout.
- Supabase browser/server client utilities using cookie-based SSR sessions and the publishable key.
- Server-side identity lookup using `auth.getUser()`; protected operations must not trust browser-supplied user IDs.
- Passwordless email-link sign-in, PKCE callback handling, profile upsert, and an authenticated dashboard with sign-out.
- Initial Supabase schema migration prepared with owner-scoped RLS, evidence-linked project profiles, evolution runs, portfolio versions, and append-only approval history.

The AI analyst is an internal service, not a public endpoint. It requires `OPENROUTER_API_KEY` and `OPENROUTER_ANALYSIS_MODEL`. The initial schema and hardening migrations are applied to the dedicated Supabase project. All 11 tables have RLS enabled, anonymous table privileges are revoked, approval history is append-only, and security advisors report no findings. Composite foreign-key indexes are in place. GitHub App installation flow, repository synchronization, persisted end-to-end analysis, and automated public publishing remain future milestones. The public portfolio currently uses maintained project data rather than a live GitHub synchronization pipeline.

## Environment variables

See [.env.example](.env.example). Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_APP_URL`. In Supabase Auth URL Configuration, set the Site URL to your deployed app and allow the callback URL `<your-app-url>/auth/callback` (plus `http://localhost:3000/auth/callback` for local development). Keep all secrets server-side. Never commit `.env.local`, GitHub private keys, Supabase secret/service-role keys or OpenRouter API keys.

## Database foundation

See [the data model](docs/DATA_MODEL.md) and the initial migration in `supabase/migrations/`. The migration intentionally does not grant anonymous access to private portfolio data. Public portfolio delivery will be implemented as a separate, explicitly scoped read path.

## Quality checks

```bash
npm run check
```

The same lint, type-check, and production-build gates run in GitHub Actions for pull requests and pushes to `main`. A successful lint step alone is not sufficient for release approval.

Or run the individual checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Documentation

- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [AI system design](docs/AI_SYSTEM.md)
- [Security model](docs/SECURITY.md)
- [Build plan and acceptance criteria](docs/BUILD_PLAN.md)
- [Engineering rules](AGENTS.md)
