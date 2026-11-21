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

## Planned stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + shadcn/ui + Lucide
- Supabase (PostgreSQL, Auth, Storage where needed)
- GitHub App + GitHub REST API
- OpenRouter + Vercel AI SDK + Zod
- GitHub Actions
- Vitest + Playwright
- Vercel deployment

## Product workflow

1. Owner authenticates and connects GitHub.
2. Owner selects repositories to include.
3. Synchronizer retrieves permitted metadata and README content.
4. AI creates structured project profiles with evidence references.
5. Portfolio architect proposes featured projects and a layout configuration.
6. Zod and application-level rules validate the proposal.
7. Owner reviews and approves the change.
8. The renderer publishes the approved configuration.
9. Every evolution run and published version is recorded for audit and rollback.

## Repository status

This repository is at the **foundation / specification stage**. Implementation must follow the acceptance criteria in [docs/BUILD_PLAN.md](docs/BUILD_PLAN.md). Do not add production secrets to the repository.

## Local development

The application scaffold and exact dependency versions will be added in the next implementation milestone. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [AGENTS.md](AGENTS.md) before making architectural changes.

## Documentation

- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [AI system design](docs/AI_SYSTEM.md)
- [Security model](docs/SECURITY.md)
- [Build plan and acceptance criteria](docs/BUILD_PLAN.md)
