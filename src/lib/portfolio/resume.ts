export const resume = {
  name: "Chibueze Victor Ikaraoha",
  headline: "AI Software Engineering | Full-Stack Development | AI Agents & Automation",
  location: "Lagos, Nigeria",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/victor-ikaraoha-ba0152440/" },
    { label: "GitHub", href: "https://github.com/victorikaraoha23" },
  ],
  summary:
    "AI-focused software developer and independent product builder working across AI-powered applications, agentic systems, full-stack web development, API integration, workflow automation, and algorithmic trading systems. Builds and prototypes software products from concept through implementation, with emphasis on practical AI use cases, modern web stacks, modular development, testing, and deployment. Current project work spans an AI-agent workspace, a conversational sales assistant, AI content analysis, and rule-based trading systems. Focused on building useful, maintainable software and developing deeper expertise in production-ready AI applications.",
  skills: [
    { category: "Programming", items: "Python, JavaScript, TypeScript, C#, MQL5" },
    { category: "Frontend", items: "Next.js, React ecosystem, responsive web application development" },
    { category: "Backend & APIs", items: "FastAPI, REST APIs, HTTP methods and status codes, async/await, Pydantic validation concepts, exception handling" },
    { category: "AI & Agent Systems", items: "LLM integration, AI assistants, agentic AI concepts, prompt engineering, tool-use workflows, AI output evaluation, Hermes Agent, PydanticAI learning and implementation" },
    { category: "Data & Storage", items: "PostgreSQL, Supabase, relational database concepts, application data persistence" },
    { category: "Testing & Quality", items: "Python/API testing, frontend tests, Ruff, TypeScript type checking, regression testing, debugging, code review" },
    { category: "Deployment & Tools", items: "Vercel, Git, GitHub, cloud deployment concepts, environment configuration, Upstash integration considerations" },
    { category: "Trading & Automation", items: "MetaTrader 5, MQL5 Expert Advisors, cTrader/cAlgo, opening-range breakout strategies, technical indicators, multi-timeframe analysis, SL/TP logic" },
    { category: "Engineering Practices", items: "SaaS architecture, API-first design, modular development, atomic implementation plans, repository audits, iterative delivery" },
  ],
  projects: [
    {
      name: "AgentsChat — Hosted AI Agent Workspace",
      status: "Independent software product · Active development",
      href: "https://github.com/victorikaraoha23/Agentschat",
      bullets: [
        "Developing a beginner-friendly web application concept designed to make a hosted AI-agent workspace easier for everyday users to access.",
        "Building around the Hermes Agent ecosystem, with product direction focused on simplifying setup and usability.",
        "Evaluating deployment and integration architecture involving Vercel, Supabase, and Upstash.",
        "Repository quality work has included API and frontend test runs, Ruff checks, TypeScript validation, and structured code audits. A recorded checkpoint reported 345 API tests and 131 web tests passing.",
      ],
    },
    {
      name: "Sales Agent AI — Telegram Sales Assistant",
      status: "Independent AI product concept",
      href: "https://t.me/SalesAgentHQBot",
      bullets: [
        "Defined a conversational AI sales-assistant concept for business workflows delivered through Telegram.",
        "Established the product identity and assistant persona, Avery, with the goal of supporting sales conversations and customer interactions.",
        "Product direction emphasizes practical conversational assistance and AI-supported business workflows.",
      ],
    },
    {
      name: "AI Slop Checker — AI Content Analysis",
      status: "Live independent software product",
      href: "https://ai-slop-checker-five.vercel.app/",
      secondaryHref: "https://github.com/victorikaraoha23/Ai-slop-checker",
      bullets: [
        "Built a web product for reviewing content quality signals across websites, writing, documents, and screenshots.",
        "Explores heuristic analysis, confidence indicators, and improvement suggestions; scores are indicators, not proof of AI authorship.",
      ],
    },
    {
      name: "Blueprint AI — Product Architecture Assistant",
      status: "Independent product · In development",
      href: "https://github.com/victorikaraoha23/BlueprintAI",
      bullets: [
        "Developing an AI product-architecture assistant that turns rough software ideas into researched, structured, reviewable blueprints.",
        "Explores research, clarification, structured decisions, document generation, independent review, and human approval; designed to complement rather than replace coding agents.",
      ],
    },
    {
      name: "Algorithmic Trading Systems & Expert Advisors",
      status: "Independent automation projects · MetaTrader 5/MQL5 and cTrader/cAlgo",
      bullets: [
        "Developing and refining rule-based trading automation for MetaTrader 5 and cTrader environments.",
        "Worked on an MT5 Expert Advisor concept for Bitcoin and a cTrader opening-range breakout strategy using the New York session, a 15-minute opening range, M5 entry timing, and M15 structure.",
        "Strategy work covers entry and exit rules, breakout confirmation, stop-loss/take-profit logic, and systematic risk considerations.",
        "Explores separating market-data tooling from execution logic, including lightweight MCP-style data tools.",
      ],
    },
    {
      name: "Multi-Timeframe Market Analysis Workflow",
      status: "Independent trading research · Forex, indices, metals, and cryptocurrency",
      bullets: [
        "Designed a repeatable analysis process covering major FX pairs, equity indices, gold, Bitcoin, and Ethereum.",
        "Uses support/resistance alerts as potential triggers and candle-close confirmation on the relevant timeframe before pair-specific analysis.",
        "Considers market structure, break of structure/change of character, momentum, volatility, liquidity, price action, and trade invalidation.",
      ],
    },
    {
      name: "FastAPI AI Backend Learning & Practice",
      status: "Project-based backend engineering development",
      bullets: [
        "Practiced HTTP communication, routes and endpoints, GET health checks, and asynchronous Python.",
        "Planned validation and error-handling exercises using Pydantic field validators, HTTPException, a global 500 handler, and automated tests.",
        "Learning focus is on reliable backend services for AI- and LLM-powered applications.",
      ],
    },
  ],
  additionalWork: [
    "AI engineering development: progressing across Python backend services, FastAPI, PydanticAI, Next.js, databases, and LLM integrations.",
    "Prompt-driven development: produces structured implementation plans for multi-step builds, emphasizing architecture, testing, and deployment.",
    "Product entrepreneurship: explores focused SaaS products and software business models, from problem definition to implementation planning.",
    "Trading strategy design: studies systematic intraday approaches and rule-based execution across forex, indices, metals, and crypto.",
  ],
  strengths: [
    "Product-minded problem solving",
    "Independent learning",
    "Structured implementation planning",
    "Debugging and testing discipline",
    "AI-assisted development",
    "Systems thinking",
    "Iterative delivery",
  ],
  education: {
    degree: "Bachelor’s Degree in Information Technology",
    institution: "Bayero University Kano (BUK), Kano State, Nigeria",
    graduation: "Expected graduation year: 2026",
    relevant: "Software Development, Computer Systems, Databases, Networking, and Information Technology",
  },
} as const;
