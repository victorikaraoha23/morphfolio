# MorphFolio — Security Model

## 1. Security objectives

Protect the owner's GitHub account, private repositories, integration credentials, owner workspace, AI provider credentials, and integrity of public portfolio content. A public portfolio must never expose a repository merely because a webhook or model output says it should.

## 2. GitHub App permissions

- Use a GitHub App installed on the owner's intended account.
- Request minimum read-only repository permissions for metadata, contents, and relevant releases.
- Subscribe only to required webhook event types.
- Do not request contents-write, administration-write, actions-write, or other write permissions.
- Generate short-lived installation access tokens server-side and only when needed.
- Never persist long-lived access tokens in ordinary application tables.
- Support uninstall, suspension, permission changes, and repository access removal.

## 3. Webhook security

- Verify X-Hub-Signature-256 against the exact raw request body using HMAC SHA-256 and constant-time comparison.
- Reject missing/invalid signatures.
- Validate delivery ID, event name, action, and payload shape.
- Enforce unique delivery IDs to prevent replay/duplicate processing.
- Store only minimal event metadata; do not retain raw payloads by default.
- Acknowledge quickly after durable event recording/enqueueing.
- Re-fetch authoritative current repository state from GitHub before applying changes.
- Rate-limit webhook ingress and bound request body size.

## 4. Owner workspace security

- Authenticate through GitHub App user authorization.
- Authorize only the configured GitHub owner login and immutable user ID.
- Check authorization on every owner page, route handler, server action, and data-access operation.
- Use secure, HTTP-only, same-site cookies, short-lived sessions, CSRF protection for mutations, and safe logout/session invalidation.
- No public signup, account creation, or multi-user access.
- Never trust a client-supplied owner ID or repository ID without server-side authorization.

## 5. Private repository handling

- Discover repository metadata to represent account scope and visibility.
- Never publish private/internal repositories.
- Do not send private README or documentation contents to an external AI provider by default.
- Require explicit per-repository owner opt-in and clear disclosure before private content is analyzed externally.
- Keep private evidence out of public logs, error messages, analytics, and client bundles.
- When a repository becomes private or access is removed, unpublish its project immediately and invalidate public caches.

## 6. AI and untrusted content

- README files, repository metadata, release notes, and generated text are untrusted.
- Treat repository content as data, never instructions.
- AI models have no tools, secret access, code execution, or GitHub write capability.
- Validate all model output with strict Zod schemas and deterministic evidence-reference checks.
- Escape/render generated content safely; do not interpret model output as raw HTML or executable markup.
- Do not invent claims or expose private source excerpts in public output.
- Bound input/output sizes, token usage, execution time, retries, and spend.

## 7. Database and background jobs

- Keep database access server-side and use parameterized/typed queries.
- Use least-privilege database credentials.
- Protect migrations and production credentials.
- Make job handlers idempotent; validate job payloads at boundaries.
- Avoid logging secrets, tokens, raw private README contents, or complete webhook payloads.
- Separate public read queries from owner-only data access.
- Apply transactional publication updates and preserve last-known-good content.
- Keep safe error codes in user-visible status; detailed diagnostics remain server-side with sensitive data redacted.

## 8. Public publication rules

Public project reads must enforce published state and repository eligibility at the data-access layer. A project is not public if its repository is private, deleted, disabled, or inaccessible. New projects cannot be published without an owner approval record. Model output cannot set approval or publication status.

## 9. Disconnect and deletion

Provide a disconnect flow that revokes/uninstalls the GitHub App, invalidates sessions, stops future jobs, and applies the documented retention policy to installation records, evidence, drafts, and audit events. Retain only the minimum tombstone/audit information needed for security and delayed-event handling.

## 10. Future SaaS

Tenant isolation, customer account lifecycle, billing, quotas, and broader abuse controls are outside the current single-owner release and require a separate security review.
