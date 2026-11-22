# MorphFolio — GitHub Synchronization Specification

**Status:** Approved behavior baseline  
**Scope:** One owner's GitHub account; read-only access

## 1. Source-of-truth boundaries

GitHub is authoritative for repository ID, owner/name, URL, visibility, default branch, README content, archive/deletion state, and installation access. MorphFolio is authoritative for publication approval, owner overrides, featured ordering, exclusions, generated content versions, and public presentation.

Never infer repository state from a delayed webhook payload alone. Fetch the current state from GitHub before applying a lifecycle transition.

## 2. Initial connection and import

1. Owner authorizes the GitHub App and installs it on the intended account.
2. Verify authenticated GitHub identity against server-side owner allowlist.
3. Enumerate every accessible repository using pagination.
4. Upsert repository records by immutable GitHub repository ID.
5. Record visibility, default branch, fork/archive/disabled flags, metadata, and source URLs.
6. Private repositories are recorded as private and never published. Do not send private README content to external AI unless the owner explicitly opts in.
7. Match existing curated portfolio projects to repository IDs using verified source links. Preserve their current public content while the initial synchronization is established.
8. Analyze unmatched eligible public repositories and create pending-review drafts.
9. Show discovery and processing results in the owner workspace.

## 3. Relevant GitHub events

Subscribe only to required event families:
- installation: created, deleted, suspend/unsuspend where available.
- installation_repositories: added/removed repositories.
- repository: created, edited, renamed, archived, unarchived, deleted, publicized, privatized.
- push: inspect default-branch README and metadata changes.
- release: published/edited only if release metadata is part of the project profile.

A push on a non-default branch does not change public project content until the default branch changes. A push that leaves README and relevant metadata hashes unchanged must not trigger AI generation.

## 4. Webhook processing contract

1. Enforce request body size limits.
2. Verify HMAC SHA-256 signature against raw request bytes using constant-time comparison.
3. Validate GitHub delivery ID, event name, action, and bounded payload shape.
4. Insert delivery ID under a unique constraint.
5. Duplicate delivery: acknowledge without scheduling duplicate work.
6. Persist minimal event metadata; avoid storing full raw payloads.
7. Enqueue a durable job and acknowledge promptly.
8. Job fetches current repository state from GitHub and applies idempotent transitions.

## 5. Repository lifecycle rules

| Current event/state | MorphFolio behavior |
|---|---|
| New eligible public repository | Discover, analyze, create pending-review project |
| Existing published README changed | Analyze; validate; auto-publish non-overridden fields |
| Existing published unrelated code push | Skip AI if README/relevant metadata unchanged |
| Repository renamed | Preserve repository/project IDs and stable slug; refresh URLs |
| Repository archived | Keep page with accurate archived state unless owner excluded it |
| Repository becomes private | Immediately unpublish; invalidate public cache |
| Repository deleted | Immediately unpublish; retain minimal tombstone |
| Repository disabled or access removed | Unpublish until eligibility is restored |
| Repository becomes public/restored | Reconcile and analyze if enabled; require approval if no prior published project |
| Repository excluded by owner | Do not analyze/publish until explicitly re-enabled |
| GitHub App uninstalled | Stop jobs and unpublish/disconnect according to owner-selected disconnect policy |

## 6. AI and publication state

New projects:
discovered → queued → analyzing → pending_review → published

Published projects:
published → update_queued → analyzing → validated → published

Failure:
queued/analyzing → failed, with retry available. The currently published version remains active.

A new project cannot transition to published without an owner approval record. An existing published project can receive an automatic version promotion only after schema validation, evidence-reference validation, deterministic policy checks, override merging, and successful database transaction.

## 7. Manual overrides

Store owner overrides by allowlisted content field. AI-generated updates may refresh non-overridden fields. A manual edit creates/updates an override and must not be silently overwritten. Provide an explicit reset-to-AI action. Publication state, featured status, display ordering, and owner-controlled facts are not AI-controlled.

## 8. Reconciliation

Run scheduled account-level reconciliation:
- Enumerate current installation repositories.
- Compare with stored repository IDs.
- Discover missed additions.
- Detect removals/access changes.
- Re-fetch README/default-branch metadata for enabled repositories.
- Compare source hashes and enqueue only changed repositories.
- Avoid repeated AI work for unchanged source revisions.

Reconciliation must be safe to run repeatedly and should be observable in the owner workspace.

## 9. Privacy and disconnect

Private repository metadata may be visible in the private owner workspace. Private README contents are not sent to AI without explicit opt-in and are never rendered publicly. When disconnecting, stop future jobs, invalidate sessions/tokens, uninstall or revoke the app authorization, and apply documented evidence/draft retention policy.
