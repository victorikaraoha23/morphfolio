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
- OpenRouter + Vercel AI SDK + Zod
- GitHub Actions
- Vitest + Playwright
- Vercel deployment

## Getting started

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The current milestone delivers the application shell and public product landing page. GitHub OAuth, persistence and AI analysis are implemented in subsequent milestones.

## Environment variables

See [.env.example](.env.example). Keep all secrets server-side. Never commit `.env.local`, GitHub private keys, Supabase service-role keys or OpenRouter API keys.

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
