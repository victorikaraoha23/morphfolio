# Deployment and database migrations

MorphFolio uses Neon PostgreSQL and Drizzle Kit migrations.

## Vercel build configuration

Set the Vercel project's **Build Command** to:

```sh
npm run vercel-build
```

The command runs `npm run db:migrate` only when `VERCEL_ENV=production`, then runs the Next.js production build. Production deployments from `main` therefore apply committed migrations before the application build can succeed. Preview deployments and local builds do not run migrations.

## Safety properties

- Migration files are committed and reviewed with application changes.
- Drizzle Kit records applied migrations in its migration ledger; completed migrations are not reapplied.
- A migration failure exits with a non-zero status and prevents that deployment from being published.
- Migrations must remain backward-compatible with the currently deployed application. Use an expand/contract approach for breaking schema changes.
- Never use `drizzle-kit push` in production. Do not edit an already-applied migration; add a new migration instead.

## GitHub Actions secret

The repository-level `DATABASE_URL` secret is used only by the manually triggered **Database verification** workflow; the standard CI workflow does not receive database credentials. Production migrations run inside Vercel using the project's Production environment variable. To run the verification, open GitHub Actions → Database verification → Run workflow, select the branch to verify, and start the workflow. It checks the live schema and security invariants inside a transaction, then rolls back every fixture row. Never print or paste the secret value into logs or chat.
