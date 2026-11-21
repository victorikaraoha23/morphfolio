# MorphFolio — AI System Design

## 1. Provider strategy

OpenRouter is the initial model gateway. Model identifiers are configured through environment variables and must not be hard-coded into domain logic.

The AI integration is isolated behind an internal interface so the gateway or SDK can be replaced without changing project-analysis and portfolio domain modules.

## 2. Workloads

| Workload | Output |
|---|---|
| Repository analyst | Evidence-backed project profile |
| Technical analyzer | Observed languages, frameworks, architecture hints |
| Content writer | Concise visitor-facing project description |
| Project classifier | Category and project type |
| Portfolio architect | Versioned layout and content configuration |
| Independent reviewer | Claim and configuration risk report |

Initially these are separate typed functions, not autonomous agents with independent tools or broad permissions.

## 3. Evidence policy

Allowed evidence may include:
- GitHub repository metadata.
- README content.
- Repository topics and language statistics.
- Release metadata.
- Public documentation explicitly selected by the owner.
- Owner-supplied facts.

A repository's presence, star count, commit count, or language breakdown does not prove business impact, production usage, revenue, customer numbers, or performance.

Each factual statement should reference one or more evidence records. Inferences must be labeled as inferences. Owner-provided claims must be labeled as owner-provided.

## 4. Prompt-injection defense

Repository content is untrusted data. It must never be treated as system or developer instructions. Delimit source text, remove unnecessary content, limit token budgets, and instruct models to extract facts only. Do not give analysis models tools that can write to GitHub, execute code, access secrets, or mutate production data.

## 5. Output validation

- Use Zod schemas for every model output.
- Bound string lengths, arrays, and enum values.
- Reject unknown or unsupported fields where practical.
- Validate evidence IDs against the evidence packet.
- Reject claims that lack supporting evidence.
- Run deterministic policy checks after model output.
- Store prompt version, schema version, model ID, usage, latency, and outcome.

## 6. Cost and reliability controls

- Set per-run and per-project token budgets.
- Limit repositories and README size per run.
- Cache results by repository revision and prompt/schema version.
- Use timeouts and bounded retries with exponential backoff and jitter.
- Handle rate limits and provider errors explicitly.
- Use model fallbacks only when output capabilities and policy requirements match.
- Track usage and enforce an owner-configurable budget.
- Never silently publish fallback or partially generated output.

## 7. Publication policy

AI output always begins as a draft. Owner approval is required for v1 publication. A future hybrid policy may auto-apply low-risk metadata refreshes while retaining approval for copy, featured-project, and layout changes.
