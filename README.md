# MorphFolio

**An AI-powered developer portfolio that stays synchronized with GitHub.**

MorphFolio connects to the owner's GitHub account, discovers repositories, monitors README and repository lifecycle changes, and uses AI to generate evidence-backed portfolio content. The public portfolio updates as projects evolve, while the owner retains control over first publication and manual content overrides.

## How it works

1. Connect the owner's GitHub account through a read-only GitHub App.
2. Discover repositories accessible to the installation.
3. Retrieve README content and relevant repository metadata from the default branch.
4. Detect new repositories, README changes, renames, visibility changes, archives, and deletions.
5. Generate structured project summaries and case-study content with AI.
6. Require owner approval before a newly discovered project is first published.
7. Automatically update already-published projects after successful validation, preserving manual overrides.
8. Keep the last known-good public version if synchronization or AI processing fails.

Private repositories are never published. Private README content is not sent to an external AI provider unless the owner explicitly opts in. GitHub access is read-only; MorphFolio never modifies connected repositories.

## Product scope

The first release serves one owner and includes:
- A public, multilingual developer portfolio.
- A private owner workspace restricted to the configured GitHub identity.
- GitHub repository discovery and synchronization.
- AI-generated, evidence-backed project content.
- First-publication approval and automatic updates for already-published projects.
- Persistent synchronization state, content versions, overrides, and audit history.

There is no public signup, multi-user workspace, customer billing, or tenant management in this phase. A multi-user SaaS product is a future stage.

## Stack

- Next.js App Router, React, TypeScript, Tailwind CSS 4
- GitHub App + GitHub REST API (read-only)
- Neon PostgreSQL + Drizzle ORM
- Inngest durable background jobs
- OpenRouter + Vercel AI SDK
- Zod validation
- Vercel hosting and GitHub Actions CI

## Current implementation

The public portfolio and project pages are implemented. The repository also contains a server-only OpenRouter integration and an evidence-aware repository analyst in src/modules/intelligence/. GitHub App connection, persistent storage, webhooks, background synchronization, owner workspace, and dynamic database-backed project pages are planned implementation work; they must not be assumed to exist yet.

## Getting started

Requirements: Node.js 26.x and npm 10+.

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Environment

See .env.example. Configure only the integrations used by the feature being developed. GitHub App private keys, OAuth credentials, webhook secrets, database credentials, and AI API keys must remain server-side. Never commit .env.local or real credentials.

## Quality checks

```bash
npm run check
```

CI runs lint, TypeScript checks, and production build. Add automated unit and integration coverage as backend capabilities are implemented.

## Documentation

- Product requirements: docs/PRD.md
- System architecture: docs/ARCHITECTURE.md
- GitHub synchronization: docs/GITHUB_SYNC_SPEC.md
- Persistence and data model: docs/DATA_MODEL.md
- AI system design: docs/AI_SYSTEM.md
- Security model: docs/SECURITY.md
- Build plan: docs/BUILD_PLAN.md
- Engineering rules: AGENTS.md
