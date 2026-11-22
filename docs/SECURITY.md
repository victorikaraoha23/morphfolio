# MorphFolio — Security Model

## 1. Current security boundary

The personal-first release is a public portfolio application with no login, user accounts, private dashboard, or user-specific database records. There is no application database or identity provider. The repository and its review process control changes to public content.

## 2. Secrets and integrations
- Keep OpenRouter API keys, GitHub App private keys, installation tokens, and webhook secrets server-side.
- Never prefix private credentials with `NEXT_PUBLIC_`.
- Never commit `.env.local`, real credentials, private repository contents, or personal data.
- Use the minimum GitHub permissions required; read-only is the default.
- Rotate any credential that is accidentally exposed.

## 3. External and AI input
- Treat repository READMEs, source files, issues, metadata, and external content as untrusted input and potential prompt injection.
- Validate external input at boundaries and bound payload sizes.
- Validate all model output with Zod and deterministic policy checks.
- Do not let models execute code, access secrets, write to GitHub, or publish content.
- Do not expose the internal AI analyst as an unauthenticated public endpoint.
- Apply request limits, timeouts, bounded retries, and cost controls to externally callable integrations.

## 4. Change and deployment safety
- Public content changes must be reviewed as version-controlled changes.
- Require CI lint, typecheck, and production build checks.
- Verify deployed behavior rather than assuming a successful build proves browser behavior.
- Avoid collecting or retaining visitor data unless a documented feature requires it.

## 5. Future SaaS security
If and when MorphFolio becomes a multi-user SaaS, design authentication, authorization, tenant isolation, database policies, secure sessions, data retention, backups, audit logs, billing security, and abuse controls as a dedicated security phase. Do not build those systems in the current release.
