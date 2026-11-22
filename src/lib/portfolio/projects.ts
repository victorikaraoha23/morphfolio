export const projects = [
  {
    slug: "ai-slop-checker", number: "01", name: "AI Slop Checker", category: "AI Products", status: "Live",
    description: "A live content-analysis product that examines websites, writing, documents, and screenshots for signals associated with low-quality or machine-generated output.",
    overview: "AI Slop Checker is a practical analysis tool for reviewing content quality signals across multiple formats. It combines heuristic analysis with evidence and improvement suggestions, while treating detection scores as indicators rather than proof of authorship.",
    role: "Product builder", stage: "Live", tags: ["Next.js", "TypeScript", "AI analysis", "Content tooling"],
    href: "https://ai-slop-checker-five.vercel.app/", action: "Visit live product", featured: true,
    details: [
      "Website analysis combines supported website-builder fingerprints with HTML, design, and on-page copy signals. An optional OpenRouter-powered second opinion is kept separate from the heuristic findings.",
      "Text analysis combines eight weighted heuristic engines covering stock phrases, burstiness, vocabulary, repetition, readability, predictability, structure, and sentiment. Short samples are adjusted toward a neutral result, and confidence is reduced when evidence is limited or ambiguous.",
      "Document analysis extracts text from PDF, DOCX, TXT, and Markdown files before applying the text-analysis pipeline.",
      "Screenshot analysis performs visual-signal checks client-side in the browser; screenshot pixels are not uploaded on this analysis path.",
      "The API uses a shared JSON response envelope, input and request-size limits, rate limiting, and URL-fetch protections that re-validate destinations after redirects to reduce SSRF risk."
    ],
    externalLabel: "View source on GitHub", externalHref: "https://github.com/victorikaraoha23/Ai-slop-checker"
  },
  {
    slug: "blueprint-ai", number: "02", name: "Blueprint AI", category: "Developer Tools", status: "In development",
    description: "An AI-assisted product-architecture system designed to turn rough software ideas into researched, structured, implementation-ready blueprints.",
    overview: "Blueprint AI is being developed as a product-architecture assistant. Its workflow brings research, clarification, structured decisions, document generation, independent review, and human approval into one traceable process.",
    role: "Product and engineering", stage: "In development", tags: ["Next.js", "Mastra", "Inngest", "PostgreSQL", "LLM workflows"],
    href: "", action: "View project details", featured: true,
    details: [
      "The planned blueprint covers product requirements, user flows, scope, business rules, design direction, architecture, data and API contracts, security, testing, deployment, and delivery.",
      "Agent roles are separated into research, clarification, decision support, generation, and independent review, with structured outputs validated through Zod schemas.",
      "The current engineering direction combines Mastra agent orchestration, the Vercel AI SDK and provider adapters, Inngest durable workflows, Neon PostgreSQL with Drizzle ORM, Supabase Auth/SSR, and Vercel Blob storage. This separates model work, background execution, identity, persistence, and document storage.",
      "The system is designed to distinguish verified information, assumptions, recommendations, and owner-approved decisions, with traceable sources, auditable approvals, and document versions. Structured model outputs are validated with Zod before use.",
      "The project is still in development. Route handlers and architecture documents do not by themselves prove that every provider integration or end-to-end workflow is operational. Blueprint AI is intended to complement coding agents, not replace them."
    ],
    externalLabel: "View source on GitHub", externalHref: "https://github.com/victorikaraoha23/BlueprintAI"
  },
  {
    slug: "agentschat", number: "03", name: "AgentsChat", category: "AI Agents", status: "Experimental",
    description: "An experimental AI-agent workspace that combines a conversational product experience with a separate agent-execution runtime.",
    overview: "AgentsChat is an experimental AI-agent workspace with a web application, authenticated API, persistent conversations, and a separate Hermes execution runtime. A signed-in user can submit a message, stream an agent reply, and have the exchange persisted to the conversation.",
    role: "Independent project", stage: "Experimental", tags: ["Next.js", "FastAPI", "Supabase", "AI agents", "Hermes runtime"],
    href: "", action: "View project details", featured: true,
    details: [
      "The Next.js web app supports sign-up, sign-in, sign-out, and session detection through Supabase Auth. Its conversation page lets a signed-in user submit a request and view the streamed assistant reply.",
      "The FastAPI service verifies the caller, resolves their profile, and provides owner-scoped conversation creation, listing, reading, renaming, and deletion. Supabase migrations define the profiles and conversations tables with Row Level Security.",
      "A signed-in user can submit a message for execution through the API runtime contract and Hermes adapter. The request and assistant reply are persisted as messages in the same conversation, and the streaming endpoint returns the reply to the conversation page.",
      "The product layer owns accounts, conversation data, authorization, and product operations, while Hermes remains a separate agent-execution dependency.",
      "Important gaps remain: there is no message-history retrieval endpoint for restoring prior messages across visits, no durable run-state or cancellation controls, and no production deployment. The current UI displays streamed replies and messages confirmed during the current visit. AgentsChat is experimental, not a hosted production service."
    ],
    externalLabel: "View source on GitHub", externalHref: "https://github.com/victorikaraoha23/Agentschat"
  },
  {
    slug: "prismbyte", number: "04", name: "Prismbyte", category: "Web Publishing", status: "Live",
    description: "An independent editorial publication helping solo founders and small online businesses make clearer decisions about AI, SaaS, automation, and software.",
    overview: "Prismbyte is a content-driven website focused on practical software education. It organizes articles around AI and SaaS, automation, and troubleshooting, supported by a static publishing and search-discovery foundation.",
    role: "Product and site development", stage: "Live", tags: ["Astro", "TypeScript", "Cloudflare", "Content publishing", "SEO"],
    href: "https://prismbyte.site", action: "Visit website", featured: true,
    details: [
      "The site uses Astro Content Collections to structure articles and generate category, listing, and article pages.",
      "Its publishing foundation includes canonical metadata, Open Graph and X metadata, structured data, an XML sitemap, and robots.txt.",
      "A Cloudflare Worker handles configured affiliate redirects, with disclosure components included in the site.",
      "The publication is live; affiliate or newsletter integrations should not be assumed operational merely because supporting UI or infrastructure exists."
    ],
    externalLabel: "View source on GitHub", externalHref: "https://github.com/victorikaraoha23/prismbyte"
  },
  {
    slug: "n8n-workflow-vault", number: "05", name: "n8n Workflow Vault", category: "Automation", status: "Experimental",
    description: "A versioned archive of n8n workflow exports and automation experiments, including AI gateway and software-engineering workflow designs.",
    overview: "The n8n Workflow Vault organizes exported workflow definitions into dated snapshots so automations can be inspected, revised, and recovered through Git history.",
    role: "Workflow design and automation", stage: "Experimental", tags: ["n8n", "Workflow automation", "OpenRouter", "GitHub"],
    href: "", action: "View project details", featured: false,
    details: [
      "The archive contains a configurable OpenAI-compatible AI gateway workflow with request validation and provider settings separated from credential storage.",
      "It includes an AI software-engineering department experiment with specialist agent roles such as CTO, backend, frontend, DevOps, QA, and security.",
      "The repository also contains social publishing and other workflow experiments organized by export date.",
      "A midnight backup schedule is the intended design, but continuous scheduled-backup reliability is not claimed without verified execution history."
    ],
    externalLabel: "View workflow repository", externalHref: "https://github.com/victorikaraoha23/N8N-PROJECTS"
  },
  {
    slug: "ai-engineering-rag", number: "06", name: "AI Engineering RAG Prototype", category: "AI Engineering", status: "Learning experiment",
    description: "A Python learning prototype exploring document ingestion, embeddings, vector retrieval, and context-grounded LLM responses.",
    overview: "This repository records hands-on exploration of a retrieval-augmented generation pipeline using a local vector store and an OpenAI-compatible model endpoint.",
    role: "Learning prototype", stage: "Experimental", tags: ["Python", "FastAPI", "ChromaDB", "Embeddings", "RAG"],
    href: "", action: "View project details", featured: false,
    details: [
      "The ingestion script extracts text from a PDF, tokenizes it, and creates overlapping chunks before generating embeddings.",
      "ChromaDB stores the document chunks and vectors for semantic retrieval.",
      "A separate command-line RAG example retrieves a context chunk and asks a language model to answer from that context.",
      "The FastAPI query endpoint is currently a separate API exercise and is not yet connected to the retrieval pipeline; this is not a production service."
    ],
    externalLabel: "View source on GitHub", externalHref: "https://github.com/victorikaraoha23/Ai-engineer"
  }
] as const;

export type PortfolioProject = (typeof projects)[number];
