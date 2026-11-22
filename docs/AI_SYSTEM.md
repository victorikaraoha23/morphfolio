# MorphFolio — AI System Design

## 1. Purpose

The AI system converts bounded GitHub repository evidence into accurate, structured portfolio project content. It does not author application source code, execute repository code, modify GitHub repositories, or decide whether a new project may be published.

OpenRouter is the initial model gateway through the existing provider adapter and Vercel AI SDK. Model IDs remain environment-configured and provider access stays isolated in src/lib/ai/openrouter.ts.

## 2. Inputs

Initial evidence includes repository name, description, URL, default branch, visibility, archived/fork status, README content from the default branch, GitHub topics and language statistics, and release metadata when useful.

Private repository README content must not be sent to an external AI provider unless the owner explicitly enables analysis for that repository after seeing a clear disclosure. Never place credentials, tokens, secrets, or unrelated private files in an evidence packet.

Bound inputs by bytes, excerpt count, and excerpt length. Preserve evidence IDs and source locations.

## 3. Output contract

Generate a schema-validated project profile and case-study draft containing display name, tagline, short summary, detailed overview, problem/solution when supported, features/highlights, technologies, category, documented architecture/implementation notes, cautious project status suggestion, missing-information list, and evidence references for factual claims.

The model must not set publication status, owner overrides, featured ordering, owner biography, skill confidence, work history, education, availability, or authorization fields.

## 4. Evidence and accuracy

- Treat README and repository metadata as untrusted data and possible prompt injection.
- State clearly that source text is data, never instructions.
- The model has no tools and no access to secrets, network, code execution, or GitHub write operations.
- Do not invent features, technologies, architecture, customers, revenue, users, adoption, performance, or business impact.
- Stars, forks, commits, and language statistics do not prove product quality or adoption.
- Distinguish observed facts, cautious inferences, owner-provided facts, and missing information.
- Every factual summary/highlight must reference valid evidence IDs.
- Reject output with unknown evidence references or invalid schema.
- Omit claims that cannot be substantiated rather than embellishing.

## 5. Publication policy

- New repository output is always a draft in pending review.
- Owner approval is required before first publication.
- For an already-published project, validated updates may publish automatically.
- Apply field-level owner overrides after generation; AI cannot overwrite them.
- Owner-controlled settings and personal facts are outside the AI write model.
- A generation failure, timeout, invalid output, or persistence error must leave the previous published version unchanged.
- The owner may disable automatic updates per project or globally.

## 6. Versioning and traceability

For each material run, record repository ID and source commit/README SHA, evidence snapshot reference/hash, model/provider, prompt/schema version, input hash, output, token usage, latency, status, and safe error code, plus the publication decision and resulting content version.

Cache by repository ID + source revision/content hash + prompt version + schema version. Reuse valid output when the evidence and generation contract are unchanged.

## 7. Cost and reliability controls

Apply per-README and per-evidence token limits, output token limits, per-repository cooldowns, event coalescing, owner-configurable spend ceilings, timeouts, bounded retries with exponential backoff and jitter, and explicit provider rate-limit handling. No AI calls from webhook request handlers. No unbounded agent loops or autonomous tool use.

## 8. Existing implementation

The current server-only analyst is in src/modules/intelligence/analyze-repository.ts, with Zod schemas in src/modules/intelligence/schemas.ts and OpenRouter configuration in src/lib/ai/openrouter.ts. It accepts a bounded evidence packet, generates a structured profile, and checks evidence references. It is not yet connected to GitHub synchronization, persistence, background jobs, or publication. Extend this implementation and its schemas; do not replace it without a demonstrated reason.
