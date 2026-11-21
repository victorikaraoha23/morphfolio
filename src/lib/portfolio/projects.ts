export const projects = [
  {
    slug: "ai-slop-checker",
    number: "01",
    name: "AI Slop Checker",
    category: "AI Products",
    status: "Live",
    description: "A web product focused on examining content for signs of low-quality or machine-generated output.",
    tags: ["AI", "Web application", "Content analysis"],
    href: "https://ai-slop-checker-five.vercel.app/",
    action: "Visit live product",
    featured: true
  },
  {
    slug: "blueprint-ai",
    number: "02",
    name: "Blueprint AI",
    category: "Developer Tools",
    status: "In development",
    description: "An AI-assisted product-planning tool designed to turn rough software ideas into researched, structured, implementation-ready blueprints.",
    tags: ["Next.js", "LLM workflows", "Supabase"],
    href: "https://github.com/victorikaraoha23",
    action: "Explore GitHub",
    featured: true
  },
  {
    slug: "agentschat",
    number: "03",
    name: "AgentsChat",
    category: "AI Agents",
    status: "Experimental",
    description: "An exploration of an AI-agent workspace for coordinating conversational requests and software-agent workflows.",
    tags: ["TypeScript", "AI agents", "Automation"],
    href: "https://github.com/victorikaraoha23/Agentschat",
    action: "View repository",
    featured: false
  }
] as const;

export type PortfolioProject = (typeof projects)[number];
