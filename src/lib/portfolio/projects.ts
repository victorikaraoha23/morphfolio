export const projects = [
  {
    slug: "ai-slop-checker", number: "01", name: "AI Slop Checker", category: "AI Products", status: "Live",
    description: "A live content-analysis product that examines websites, writing, documents, and screenshots for signals associated with low-quality or machine-generated output.",
    overview: "AI Slop Checker is a practical analysis tool for reviewing content quality signals across multiple formats. It combines heuristic analysis with evidence and improvement suggestions, while treating detection scores as indicators rather than proof of authorship.",
    role: "Product builder", stage: "Live", tags: ["Next.js", "TypeScript", "AI analysis", "Content tooling"],
    href: "https://ai-slop-checker-five.vercel.app/", action: "Visit live product", featured: true,
    details: [
      "Website analysis checks supported builder fingerprints, HTML and design signals, and on-page copy; an optional AI second opinion can add a separate review.",
      "Text analysis combines eight weighted heuristic engines, with quick scoring, per-paragraph indicators, confidence labels, and a practical improvement plan.",
      "Document analysis extracts text from PDF, DOCX, TXT, and Markdown files before applying the text-analysis pipeline.",
      "Screenshot analysis performs visual-signal checks in the browser, so screenshot pixels are not uploaded for that analysis path.",
      "The API uses shared response envelopes, input and upload limits, rate limiting, and URL-fetch protections including redirect destination re-validation."
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
      "The backend architecture uses durable Inngest workflows and persisted PostgreSQL state so long-running work is not tied to one HTTP request.",
      "The system is designed to distinguish verified information, assumptions, recommendations, and approved decisions, with traceable sources and document versions.",
      "The project is still in development; the repository's implementation plan and tests define what is complete."
    ],
    externalLabel: "View source on GitHub", externalHref: "https://github.com/victorikaraoha23/BlueprintAI"
  },
  {
    slug: "agentschat", number: "03", name: "AgentsChat", category: "AI Agents", status: "Experimental",
    description: "An experimental hosted AI-agent workspace that combines a conversational product experience with a separate agent-execution runtime.",
    overview: "AgentsChat is an experimental AI-agent workspace with a web application, authenticated API, persistent conversations, and a separate Hermes execution runtime. A signed-in user can submit a message, stream an agent reply, and have the exchange persisted to the conversation.",
    role: "Independent project", stage: "Experimental", tags: ["Next.js", "FastAPI", "Supabase", "AI agents", "Hermes runtime"],
    href: "", action: "View project details", featured: true,
    details: [
      "The web application supports sign-up, sign-in, sign-out, session detection, and a conversation interface backed by Supabase Auth.",
      "The FastAPI service resolves the authenticated user and supports creating, listing, reading, renaming, and deleting conversations owned by that user.",
      "Users can submit messages for execution through a runtime boundary and Hermes adapter; the conversation page streams the assistant reply and confirms the persisted message.",
      "The product layer owns accounts, conversation data, authorization, and product operations, while Hermes remains a separate agent-execution dependency.",
      "Important gaps remain: conversation history is not yet retrieved across visits, and there is no production deployment. AgentsChat is experimental, not a hosted production service."
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
