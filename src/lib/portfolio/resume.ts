import type { Locale } from "@/lib/i18n";

export const resumeIdentity = {
  name: "Chibueze Victor Ikaraoha",
  location: "Nigeria",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/victor-ikaraoha-ba0152440/" },
    { label: "GitHub", href: "https://github.com/victorikaraoha23" },
    { label: "X", href: "https://x.com/ikaraoha23" }
  ]
} as const;

type ResumeContent = {
  headline: string;
  summary: string;
  disclaimer: string;
  sections: {
    skills: string;
    projects: string;
    additional: string;
    strengths: string;
    print: string;
    back: string;
    savePdf: string;
    source: string;
  };
  skills: { category: string; items: string }[];
  projects: {
    name: string;
    status: string;
    href?: string;
    source?: string;
    bullets: string[];
  }[];
  additionalWork: string[];
  strengths: string[];
};

export const resumeContent: Record<Locale, ResumeContent> = {
  en: {
    headline: "Software developer · Independent product builder",
    summary:
      "I am a software developer developing my craft by building independent software products. My current work focuses on practical AI applications, full-stack web development, LLM integrations, and automation. I document what is live, what is being built, and what remains experimental rather than presenting learning projects as professional production experience.",
    disclaimer:
      "This is a project-focused profile, not a claim of conventional employment history. Education, certifications, and formal work experience are intentionally omitted until their details are verified.",
    sections: {
      skills: "Technologies & current practice",
      projects: "Selected projects",
      additional: "Additional exploration",
      strengths: "Working principles",
      print: "Print / Save as PDF",
      back: "Back to profile",
      savePdf: "Choose “Save as PDF” in your browser’s print destination.",
      source: "Source code"
    },
    skills: [
      { category: "Languages", items: "TypeScript, JavaScript, Python; currently developing practical depth through project work." },
      { category: "Web development", items: "Next.js, React, Tailwind CSS, responsive interfaces, server-rendered applications." },
      { category: "Backend & data", items: "Supabase, PostgreSQL, authentication, row-level security, REST API integration." },
      { category: "AI application development", items: "LLM integrations, OpenAI-compatible APIs, structured outputs, prompt design, evidence-aware workflows." },
      { category: "Automation & experimentation", items: "n8n, AI-agent workflows, retrieval-augmented generation (RAG), FastAPI, MQL5." },
      { category: "Tools & delivery", items: "Git, GitHub, Vercel, code review, debugging, TypeScript checks, and automated testing." }
    ],
    projects: [
      {
        name: "AI Slop Checker",
        status: "Live product",
        href: "https://ai-slop-checker-five.vercel.app/",
        source: "https://github.com/victorikaraoha23/Ai-slop-checker",
        bullets: [
          "Built a public web product that reviews text, documents, websites, and screenshots for signals associated with low-quality or AI-generated content.",
          "Combines weighted text-analysis engines with confidence indicators and improvement suggestions; results are indicators, not proof of authorship."
        ]
      },
      {
        name: "Blueprint AI",
        status: "In development",
        href: "https://github.com/victorikaraoha23/BlueprintAI",
        bullets: [
          "Developing an AI product-architecture assistant that turns rough software ideas into researched, structured, reviewable blueprints.",
          "The planned workflow separates verified information, assumptions, recommendations, and approved decisions, with independent review and human approval."
        ]
      },
      {
        name: "AgentsChat",
        status: "Experimental",
        href: "https://github.com/victorikaraoha23/Agentschat",
        bullets: [
          "Exploring a conversational workspace for AI agents, with the product interface separated from the agent execution runtime.",
          "Work has focused on application boundaries, user-owned conversations, API behavior, and integration architecture."
        ]
      },
      {
        name: "Prismbyte",
        status: "Live publication",
        href: "https://prismbyte.site",
        source: "https://github.com/victorikaraoha23/prismbyte",
        bullets: [
          "Built an independent editorial publication covering AI, SaaS, automation, software troubleshooting, and practical technology.",
          "Implemented content collections and foundational publishing metadata, including structured data and sitemap support."
        ]
      },
      {
        name: "n8n Workflow Vault",
        status: "Experimental archive",
        href: "https://github.com/victorikaraoha23/N8N-PROJECTS",
        bullets: [
          "Maintains a repository of workflow exports and automation experiments, including AI-assisted software-engineering and publishing workflows.",
          "Workflows are experiments and archived assets; this profile does not imply every workflow is continuously running."
        ]
      },
      {
        name: "AI Engineering RAG Prototype",
        status: "Learning prototype",
        href: "https://github.com/victorikaraoha23/Ai-engineer",
        bullets: [
          "Built a Python learning prototype for PDF ingestion, chunking, embeddings, vector storage, and semantic retrieval.",
          "The separate FastAPI query endpoint is not yet connected to the retrieval pipeline."
        ]
      }
    ],
    additionalWork: [
      "Learning and applying software architecture through small, independently developed products.",
      "Exploring agent orchestration, retrieval systems, and practical LLM integration patterns.",
      "Studying systematic trading automation as a separate technical interest."
    ],
    strengths: [
      "Product-minded problem solving",
      "Structured implementation planning",
      "Learning through building",
      "Debugging and iterative improvement",
      "Attention to evidence and limitations"
    ]
  },
  fr: {
    headline: "Développeur logiciel · Créateur de produits indépendants",
    summary:
      "Je suis développeur logiciel et je développe mes compétences en créant des produits logiciels indépendants. Mon travail actuel porte sur les applications pratiques de l’IA, le développement web full-stack, les intégrations de modèles de langage et l’automatisation. Je distingue les produits en ligne, les développements en cours et les expérimentations, sans présenter mes projets d’apprentissage comme une expérience professionnelle de production.",
    disclaimer:
      "Ce profil est centré sur les projets et ne prétend pas représenter un parcours professionnel classique. La formation, les certifications et l’expérience professionnelle formelle sont volontairement omises jusqu’à vérification des informations.",
    sections: {
      skills: "Technologies et pratique actuelle",
      projects: "Projets sélectionnés",
      additional: "Autres explorations",
      strengths: "Principes de travail",
      print: "Imprimer / Enregistrer en PDF",
      back: "Retour au profil",
      savePdf: "Choisissez « Enregistrer au format PDF » dans les options d’impression du navigateur.",
      source: "Code source"
    },
    skills: [
      { category: "Langages", items: "TypeScript, JavaScript, Python ; approfondissement pratique par le développement de projets." },
      { category: "Développement web", items: "Next.js, React, Tailwind CSS, interfaces adaptatives et applications rendues côté serveur." },
      { category: "Backend et données", items: "Supabase, PostgreSQL, authentification, sécurité au niveau des lignes et intégration d’API REST." },
      { category: "Applications IA", items: "Intégrations LLM, API compatibles OpenAI, sorties structurées, conception de prompts et flux fondés sur des preuves." },
      { category: "Automatisation et expérimentation", items: "n8n, flux d’agents IA, génération augmentée par récupération (RAG), FastAPI et MQL5." },
      { category: "Outils et livraison", items: "Git, GitHub, Vercel, revue de code, débogage, vérifications TypeScript et tests automatisés." }
    ],
    projects: [
      {
        name: "AI Slop Checker",
        status: "Produit en ligne",
        href: "https://ai-slop-checker-five.vercel.app/",
        source: "https://github.com/victorikaraoha23/Ai-slop-checker",
        bullets: [
          "Création d’un produit web public qui examine des textes, documents, sites web et captures d’écran à la recherche de signaux associés aux contenus de faible qualité ou générés par IA.",
          "Combine des moteurs d’analyse textuelle pondérés, des indicateurs de confiance et des suggestions d’amélioration ; les résultats ne prouvent pas l’origine d’un contenu."
        ]
      },
      {
        name: "Blueprint AI",
        status: "En développement",
        href: "https://github.com/victorikaraoha23/BlueprintAI",
        bullets: [
          "Développement d’un assistant d’architecture produit qui transforme des idées logicielles initiales en plans documentés, structurés et révisables.",
          "Le flux prévu distingue les informations vérifiées, les hypothèses, les recommandations et les décisions approuvées, avec revue indépendante et validation humaine."
        ]
      },
      {
        name: "AgentsChat",
        status: "Expérimental",
        href: "https://github.com/victorikaraoha23/Agentschat",
        bullets: [
          "Exploration d’un espace conversationnel pour agents IA, séparant l’interface produit de l’environnement d’exécution des agents.",
          "Travail consacré aux frontières applicatives, aux conversations appartenant aux utilisateurs, au comportement de l’API et à l’architecture d’intégration."
        ]
      },
      {
        name: "Prismbyte",
        status: "Publication en ligne",
        href: "https://prismbyte.site",
        source: "https://github.com/victorikaraoha23/prismbyte",
        bullets: [
          "Création d’une publication éditoriale indépendante sur l’IA, le SaaS, l’automatisation, le dépannage logiciel et les technologies pratiques.",
          "Mise en place de collections de contenu et de métadonnées de publication, notamment les données structurées et le sitemap."
        ]
      },
      {
        name: "n8n Workflow Vault",
        status: "Archive expérimentale",
        href: "https://github.com/victorikaraoha23/N8N-PROJECTS",
        bullets: [
          "Conservation d’exports de workflows et d’expérimentations d’automatisation, notamment des flux d’ingénierie logicielle assistés par IA et de publication.",
          "Ces workflows sont des expérimentations et des ressources archivées ; leur présence ne signifie pas qu’ils fonctionnent en continu."
        ]
      },
      {
        name: "Prototype RAG d’ingénierie IA",
        status: "Prototype d’apprentissage",
        href: "https://github.com/victorikaraoha23/Ai-engineer",
        bullets: [
          "Création d’un prototype Python d’apprentissage pour l’ingestion de PDF, le découpage en segments, les embeddings, le stockage vectoriel et la recherche sémantique.",
          "Le point d’accès FastAPI distinct n’est pas encore connecté au pipeline de récupération."
        ]
      }
    ],
    additionalWork: [
      "Apprentissage et mise en pratique de l’architecture logicielle à travers de petits produits indépendants.",
      "Exploration de l’orchestration d’agents, des systèmes de récupération et des intégrations LLM pratiques.",
      "Étude de l’automatisation systématique du trading comme intérêt technique distinct."
    ],
    strengths: [
      "Résolution de problèmes orientée produit",
      "Planification structurée de l’implémentation",
      "Apprentissage par la pratique",
      "Débogage et amélioration itérative",
      "Attention portée aux preuves et aux limites"
    ]
  },
  es: {
    headline: "Desarrollador de software · Creador de productos independientes",
    summary:
      "Soy desarrollador de software y desarrollo mis habilidades creando productos de software independientes. Mi trabajo actual se centra en aplicaciones prácticas de IA, desarrollo web full-stack, integraciones de modelos de lenguaje y automatización. Distingo entre productos publicados, desarrollos en curso y experimentos, sin presentar proyectos de aprendizaje como experiencia profesional en producción.",
    disclaimer:
      "Este perfil se centra en proyectos y no pretende representar una trayectoria laboral convencional. La formación académica, las certificaciones y la experiencia profesional formal se omiten deliberadamente hasta verificar sus datos.",
    sections: {
      skills: "Tecnologías y práctica actual",
      projects: "Proyectos seleccionados",
      additional: "Otras exploraciones",
      strengths: "Principios de trabajo",
      print: "Imprimir / Guardar como PDF",
      back: "Volver al perfil",
      savePdf: "Elige «Guardar como PDF» en el destino de impresión del navegador.",
      source: "Código fuente"
    },
    skills: [
      { category: "Lenguajes", items: "TypeScript, JavaScript y Python; desarrollando profundidad práctica mediante proyectos." },
      { category: "Desarrollo web", items: "Next.js, React, Tailwind CSS, interfaces adaptables y aplicaciones renderizadas en servidor." },
      { category: "Backend y datos", items: "Supabase, PostgreSQL, autenticación, seguridad a nivel de fila e integración de API REST." },
      { category: "Desarrollo de aplicaciones de IA", items: "Integraciones LLM, API compatibles con OpenAI, salidas estructuradas, diseño de prompts y flujos basados en evidencias." },
      { category: "Automatización y experimentación", items: "n8n, flujos de agentes de IA, generación aumentada por recuperación (RAG), FastAPI y MQL5." },
      { category: "Herramientas y entrega", items: "Git, GitHub, Vercel, revisión de código, depuración, comprobaciones de TypeScript y pruebas automatizadas." }
    ],
    projects: [
      {
        name: "AI Slop Checker",
        status: "Producto disponible",
        href: "https://ai-slop-checker-five.vercel.app/",
        source: "https://github.com/victorikaraoha23/Ai-slop-checker",
        bullets: [
          "Creé un producto web público que analiza textos, documentos, sitios web y capturas de pantalla en busca de señales asociadas con contenido de baja calidad o generado por IA.",
          "Combina motores ponderados de análisis de texto, indicadores de confianza y sugerencias de mejora; los resultados son indicadores, no pruebas de autoría."
        ]
      },
      {
        name: "Blueprint AI",
        status: "En desarrollo",
        href: "https://github.com/victorikaraoha23/BlueprintAI",
        bullets: [
          "Desarrollo un asistente de arquitectura de producto que convierte ideas iniciales de software en planes investigados, estructurados y revisables.",
          "El flujo previsto separa información verificada, suposiciones, recomendaciones y decisiones aprobadas, con revisión independiente y aprobación humana."
        ]
      },
      {
        name: "AgentsChat",
        status: "Experimental",
        href: "https://github.com/victorikaraoha23/Agentschat",
        bullets: [
          "Exploro un espacio conversacional para agentes de IA que separa la interfaz del producto del entorno de ejecución de los agentes.",
          "El trabajo se ha centrado en límites de aplicación, conversaciones propiedad del usuario, comportamiento de API y arquitectura de integración."
        ]
      },
      {
        name: "Prismbyte",
        status: "Publicación activa",
        href: "https://prismbyte.site",
        source: "https://github.com/victorikaraoha23/prismbyte",
        bullets: [
          "Creé una publicación editorial independiente sobre IA, SaaS, automatización, resolución de problemas de software y tecnología práctica.",
          "Implementé colecciones de contenido y metadatos de publicación fundamentales, incluidos datos estructurados y soporte para sitemap."
        ]
      },
      {
        name: "n8n Workflow Vault",
        status: "Archivo experimental",
        href: "https://github.com/victorikaraoha23/N8N-PROJECTS",
        bullets: [
          "Mantengo un repositorio de exportaciones de flujos y experimentos de automatización, incluidos flujos de ingeniería de software y publicación asistidos por IA.",
          "Los flujos son experimentos y recursos archivados; su presencia no implica que todos se ejecuten continuamente."
        ]
      },
      {
        name: "Prototipo RAG de ingeniería de IA",
        status: "Prototipo de aprendizaje",
        href: "https://github.com/victorikaraoha23/Ai-engineer",
        bullets: [
          "Creé un prototipo educativo en Python para ingerir PDF, dividir texto en fragmentos, generar embeddings, almacenar vectores y realizar búsquedas semánticas.",
          "El endpoint FastAPI independiente todavía no está conectado al flujo de recuperación."
        ]
      }
    ],
    additionalWork: [
      "Aprendizaje y aplicación de arquitectura de software mediante productos pequeños e independientes.",
      "Exploración de orquestación de agentes, sistemas de recuperación e integración práctica de LLM.",
      "Estudio de automatización sistemática del trading como interés técnico independiente."
    ],
    strengths: [
      "Resolución de problemas con enfoque de producto",
      "Planificación estructurada de implementaciones",
      "Aprender creando",
      "Depuración y mejora iterativa",
      "Atención a las evidencias y las limitaciones"
    ]
  }
};
