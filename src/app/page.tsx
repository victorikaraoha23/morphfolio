import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  MoveUpRight,
  Sparkles
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "AI Slop Checker",
    type: "AI PRODUCT",
    status: "LIVE",
    description: "A forensic lab for machine-made content, analyzing AI text, websites, documents and screenshots.",
    tags: ["AI", "Web", "Product"],
    href: "https://ai-slop-checker-five.vercel.app/",
    action: "Visit live product",
    accent: "lime"
  },
  {
    number: "02",
    name: "Blueprint AI",
    type: "DEVELOPER TOOL",
    status: "IN DEVELOPMENT",
    description: "Turns rough software ideas into researched, validated, implementation-ready blueprints.",
    tags: ["Next.js", "LLMs", "Supabase"],
    href: "https://github.com/victorikaraoha23",
    action: "Explore GitHub",
    accent: "violet"
  },
  {
    number: "03",
    name: "AgentsChat",
    type: "OPEN-SOURCE EXPLORATION",
    status: "IN DEVELOPMENT",
    description: "A hosted AI-agent workspace for turning plain-language requests into executed work.",
    tags: ["TypeScript", "AI Agents", "Automation"],
    href: "https://github.com/victorikaraoha23/Agentschat",
    action: "View repository",
    accent: "blue"
  }
];

const focusAreas = [
  { number: "01", title: "AI engineering", text: "LLM integrations, structured outputs, and useful AI-powered applications." },
  { number: "02", title: "Autonomous software", text: "Building systems that can handle repeatable work with less manual intervention." },
  { number: "03", title: "Product engineering", text: "Turning rough ideas into dependable, maintainable software products." }
];

function Brand() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Victor Ikaraoha home">
      <span className="grid h-8 w-8 place-items-center rounded-xl border border-lime-200/20 bg-lime-300/10 text-lime-200"><Sparkles size={16} /></span>
      <span className="text-[13px] font-semibold tracking-[-.035em]">Victor Ikaraoha<span className="text-lime-300">.</span></span>
    </a>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const accent = project.accent === "lime"
    ? "border-lime-200/15 bg-lime-200/[.06] text-lime-200"
    : project.accent === "violet"
      ? "border-violet-200/15 bg-violet-200/[.06] text-violet-200"
      : "border-sky-200/15 bg-sky-200/[.06] text-sky-200";

  return (
    <article className="panel group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[.12em] text-white/35">{project.number} / {project.type}</span>
        <span className={`rounded-full border px-2.5 py-1 text-[8px] font-bold tracking-[.12em] ${accent}`}>{project.status}</span>
      </div>
      <div className="mt-10 flex items-end justify-between gap-3">
        <h3 className="text-[25px] font-semibold tracking-[-.055em] text-white sm:text-[29px]">{project.name}</h3>
        <span className={`mb-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${accent}`}><MoveUpRight size={16} /></span>
      </div>
      <p className="mt-3 min-h-[54px] text-[13px] leading-6 text-white/48">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[.08] px-2.5 py-1 text-[10px] text-white/45">{tag}</span>)}
      </div>
      <a href={project.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-t border-white/[.07] pt-4 text-[11px] font-semibold text-white/65 transition group-hover:text-lime-200">
        {project.action} <ExternalLink size={12} />
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[760px]" />
      <header className="relative z-10 border-b border-white/[.06]">
        <div className="shell flex h-[72px] items-center justify-between">
          <Brand />
          <nav className="hidden items-center gap-8 text-[12px] text-white/48 md:flex" aria-label="Main navigation">
            <a className="transition hover:text-white" href="#work">Selected work</a>
            <a className="transition hover:text-white" href="#focus">What I focus on</a>
            <a className="transition hover:text-white" href="#about">About</a>
          </nav>
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="secondary-button !px-3 !py-2 text-[11px]">GitHub profile <ArrowUpRight size={12} /></a>
        </div>
      </header>

      <section className="shell relative grid gap-12 pb-24 pt-24 sm:pt-32 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:pb-32">
        <div className="relative z-10">
          <div className="eyebrow mb-7 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_#b8f36b]" /> SOFTWARE BUILDER · AI ENGINEERING</div>
          <h1 className="max-w-[760px] text-[clamp(3.4rem,8vw,6.8rem)] font-semibold leading-[.94] tracking-[-.08em]">Building useful<br /><span className="text-lime-300">software</span> for what&apos;s<br />next.</h1>
          <p className="mt-8 max-w-[530px] text-[15px] leading-7 text-white/50">I build practical software products and explore the intersection of AI engineering, automation, and autonomous systems.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="primary-button">Explore selected work <ArrowDownRight size={14} /></a>
            <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="secondary-button"><Github size={14} /> GitHub profile <ArrowUpRight size={12} /></a>
          </div>
        </div>
        <aside id="about" className="panel relative overflow-hidden p-6 sm:p-7">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-300/[.07] blur-3xl" />
          <div className="relative">
            <div className="eyebrow mb-5">A little about me</div>
            <h2 className="text-xl font-semibold tracking-[-.04em]">Curious by default.<br /><span className="text-white/45">Intentional by design.</span></h2>
            <p className="mt-4 text-[12px] leading-6 text-white/45">I enjoy taking ideas apart, understanding the problem beneath them, and building software that makes the solution useful. My current work is centered on AI-powered products and developer tools.</p>
            <div className="mt-7 border-t border-white/[.08] pt-5">
              <div className="text-[10px] tracking-[.12em] text-white/30">CURRENTLY EXPLORING</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["TypeScript", "Next.js", "LLM systems", "AI agents", "Automation"].map((item) => <span key={item} className="rounded-full border border-white/[.09] bg-white/[.025] px-2.5 py-1.5 text-[10px] text-white/55">{item}</span>)}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section id="work" className="border-y border-white/[.06] bg-white/[.015] py-20 sm:py-24">
        <div className="shell">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><div className="eyebrow mb-4">Selected work</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-4xl">Things I&apos;m building.</h2></div>
            <a href="https://github.com/victorikaraoha23?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] text-white/45 transition hover:text-lime-200">Browse all repositories <ArrowUpRight size={13} /></a>
          </div>
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
          </div>
        </div>
      </section>

      <section id="focus" className="shell py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><div className="eyebrow mb-4">Areas of focus</div><h2 className="text-3xl font-semibold tracking-[-.055em] sm:text-4xl">Where I&apos;m putting my energy.</h2><p className="mt-4 max-w-[340px] text-sm leading-6 text-white/45">Learning through building, shipping, and improving real software.</p></div>
          <div className="divide-y divide-white/[.08] border-y border-white/[.08]">
            {focusAreas.map((item) => <div key={item.number} className="grid gap-3 py-6 sm:grid-cols-[54px_1fr]"><span className="pt-1 text-[11px] text-lime-200">{item.number}</span><div><h3 className="text-[15px] font-semibold tracking-[-.025em]">{item.title}</h3><p className="mt-2 max-w-[460px] text-[12px] leading-5 text-white/42">{item.text}</p></div></div>)}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.06] py-8">
        <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Brand />
          <p className="text-[11px] text-white/30">Made with curiosity and a bias toward building.</p>
          <a aria-label="GitHub" href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="text-white/40 transition hover:text-lime-200"><Github size={15} /></a>
        </div>
      </footer>
    </main>
  );
}
