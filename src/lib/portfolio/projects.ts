export const projects = [
  {
    slug: "ai-slop-checker",
    number: "01",
    name: "AI Slop Checker",
    category: "AI Products",
    status: "Live",
    description: "A web product focused on examining content for signs of low-quality or machine-generated output.",
    overview: "AI Slop Checker is a web product built around a practical question: does a piece of content show signs commonly associated with low-quality or machine-generated writing?",
    role: "Product builder",
    stage: "Live",
    tags: ["AI", "Web application", "Content analysis"],
    href: "https://ai-slop-checker-five.vercel.app/",
    action: "Visit live product",
    featured: true,
    details: [
      "The product is available as a live website.",
      "Its focus is content examination rather than replacing editorial judgement."
    ],
    externalLabel: "Open AI Slop Checker",
    externalHref: "https://ai-slop-checker-five.vercel.app/"
  },
  {
    slug: "blueprint-ai",
    number: "02",
    name: "Blueprint AI",
    category: "Developer Tools",
    status: "In development",
    description: "An AI-assisted product-planning tool designed to turn rough software ideas into researched, structured, implementation-ready blueprints.",
    overview: "Blueprint AI is being designed as a product-architecture assistant. It helps turn an early software idea into a coherent plan by combining research, structured documentation, persistent decisions, and independent review.",
    role: "Product and engineering",
    stage: "In development",
    tags: ["Next.js", "LLM workflows", "Supabase"],
    href: "",
    action: "View project details",
    featured: true,
    details: [
      "The intended output includes product requirements, user flows, scope, business rules, design direction, architecture, data and API plans, security, testing, deployment, and delivery documentation.",
      "The workflow is designed to distinguish verified information, assumptions, recommendations, and decisions.",
      "Generated plans are intended to remain reviewable, traceable, and subject to approval."
    ]
  },
  {
    slug: "agentschat",
    number: "03",
    name: "AgentsChat",
    category: "AI Agents",
    status: "Experimental",
    description: "An exploration of an AI-agent workspace for coordinating conversational requests and software-agent workflows.",
    overview: "AgentsChat is an experimental exploration of an AI-agent workspace, informed by the idea of bringing conversational interaction and software-agent workflows into one working environment.",
    role: "Independent project",
    stage: "Experimental",
    tags: ["TypeScript", "AI agents", "Automation"],
    href: "https://github.com/victorikaraoha23/Agentschat",
    action: "View project details",
    featured: false,
    details: [
      "The repository is an experimental project rather than a finished commercial product.",
      "The work explores agent-oriented workflows and the surrounding application experience."
    ],
    externalLabel: "View GitHub repository",
    externalHref: "https://github.com/victorikaraoha23/Agentschat"
  }
] as const;

export type PortfolioProject = (typeof projects)[number];
