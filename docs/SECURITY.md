# MorphFolio — Security Baseline

## Security objectives

Protect GitHub credentials, Supabase data, owner identity, repository content, and the integrity of the published portfolio.

## Identity and authorization

- Use Supabase Auth for application identity.
- Verify the authenticated user server-side for every protected operation.
- Do not trust user IDs supplied by the browser.
- Apply Row Level Security to user-owned tables.
- Use service-role credentials only in trusted server-side code.
- Keep admin routes and public portfolio routes explicitly separated.

## GitHub

- Use a GitHub App with minimum read-only permissions initially.
- Store private keys and installation tokens server-side.
- Encrypt sensitive credentials at rest where persisted.
- Verify webhook signatures using constant-time comparison.
- Validate webhook event type, repository, installation, and delivery ID.
- Make webhook handling idempotent.
- Never log access tokens, private keys, or authorization headers.

## AI and untrusted repository content

- Treat README and repository files as hostile input.
- Do not allow prompt content to override system policy.
- Do not expose tools, secrets, database write capabilities, or code execution to content-analysis models.
- Validate every output and evidence reference.
- Render generated text as text; do not interpret it as HTML.
- Apply output length limits and safe URL validation.

## Data protection

- Collect only fields needed for portfolio functionality.
- Public routes must return only explicitly public data.
- Private repository content is out of scope for the initial release unless separately enabled with clear consent and access controls.
- Define retention and deletion behavior before public multi-user onboarding.
- Avoid storing entire source trees; begin with repository metadata and README content.

## Operational controls

- Rate-limit authentication, GitHub sync, AI generation, and webhook endpoints.
- Add CSRF protections where applicable.
- Validate all external inputs.
- Use secure cookies and HTTPS in production.
- Keep dependencies patched and review automated security alerts.
- Add audit records for connection, sync, approval, publish, and rollback actions.
- Never commit secrets or real personal data in fixtures.

## Incident response

If a credential is exposed: revoke/rotate it, inspect audit logs, identify affected resources, remove it from active configuration, and document the incident. Do not assume deleting a commit fully removes a leaked secret.
