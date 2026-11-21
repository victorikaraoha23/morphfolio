# MorphFolio

**A self-evolving AI-powered developer portfolio.**

MorphFolio connects to a developer's GitHub account, analyzes selected repositories, turns verifiable project evidence into polished project profiles, and recommends portfolio presentation changes as the developer's work grows.

## Product direction

The first release is a **single-user product with SaaS-ready boundaries**. It will prove the complete workflow for one portfolio before introducing multi-user billing or commercial administration.

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

Requirements: Node.js 22 or newer and npm 10+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current implementation

- Next.js application shell and dark MorphFolio landing page.
- CI workflow for linting, TypeScript checks, and production builds.
- Server-only OpenRouter provider configuration.
- Zod schemas for repository evidence packets and generated project profiles.
- Repository analyst service with bounded output, evidence-ID validation, and a request timeout.
- Supabase browser/server client utilities using cookie-based SSR sessions and the publishable key.
- Server-side identity lookup using `auth.getUser()`; protected operations must not trust browser-supplied user IDs.
- Initial Supabase schema migration prepared with owner-scoped RLS, evidence-linked project profiles, evolution runs, portfolio versions, and append-only approval history.

The AI analyst is an internal service, not a public endpoint. It requires `OPENROUTER_API_KEY` and `OPENROUTER_ANALYSIS_MODEL`. The initial schema and hardening migrations are applied to the dedicated Supabase project. All 11 tables have RLS enabled; security advisors report no findings, and the foreign-key index advisories have been addressed. GitHub installation flow, authenticated dashboard, persisted end-to-end analysis, and public publishing remain future milestones.

## Environment variables

See [.env.example](.env.example). Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the Supabase project. Keep all secrets server-side. Never commit `.env.local`, GitHub private keys, Supabase secret/service-role keys or OpenRouter API keys.

## Database foundation

See [the data model](docs/DATA_MODEL.md) and the initial migration in `supabase/migrations/`. The migration intentionally does not grant anonymous access to private portfolio data. Public portfolio delivery will be implemented as a separate, explicitly scoped read path.

## Quality checks

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
