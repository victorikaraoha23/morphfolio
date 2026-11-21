import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Command,
  Github,
  GitBranch,
  Layers3,
  LockKeyhole,
  Orbit,
  Plus,
  ScanSearch,
  Sparkles,
  WandSparkles
} from "lucide-react";

const projects = [
  { name: "AI Slop Checker", detail: "Detect low-quality, generic AI-generated writing", stack: ["TypeScript", "React", "AI"], status: "Live", color: "lime", mark: "AS" },
  { name: "Blueprint AI", detail: "Turn rough software ideas into implementation-ready blueprints", stack: ["Next.js", "Supabase", "LLMs"], status: "Building", color: "violet", mark: "BP" },
  { name: "AgentsChat", detail: "An agent-oriented workspace for conversational workflows", stack: ["TypeScript", "Agents", "API"], status: "Exploring", color: "blue", mark: "AC" }
];

function Brand() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label="MorphFolio home">
      <span className="grid h-8 w-8 place-items-center rounded-xl border border-lime-200/20 bg-lime-300/10 text-lime-200"><Orbit size={17} /></span>
      <span className="text-[15px] font-semibold tracking-[-.04em]">morph<span className="text-lime-300">folio</span></span>
    </a>
  );
}

function ProjectPreview() {
  return (
    <div className="panel relative overflow-hidden p-3 shadow-[0_32px_120px_rgba(0,0,0,.45)] sm:p-4">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-lime-300/[.08] blur-3xl" />
      <div className="relative flex items-center justify-between border-b border-white/[.07] px-2 pb-3">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-lime-300" /><span className="text-[11px] font-medium text-white/80">Portfolio preview</span></div>
        <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /><span className="text-[10px] text-lime-200">Synced just now</span></div>
      </div>
      <div className="relative grid gap-4 py-5 sm:grid-cols-[.82fr_1.18fr] sm:gap-5 sm:py-7">
        <div className="flex flex-col justify-between px-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 text-[9px] text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> AVAILABLE FOR SELECT PROJECTS</div>
            <div className="text-[27px] font-semibold leading-[1.08] tracking-[-.06em] text-white sm:text-[34px]">Building useful<br /><span className="text-lime-300">things with AI.</span></div>
            <p className="mt-3 max-w-[230px] text-[11px] leading-5 text-white/45">Developer focused on practical AI products, autonomous software and thoughtful engineering.</p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-[10px] text-white/45"><Github size={12} /> github.com/victorikaraoha23 <ArrowUpRight size={10} /></div>
        </div>
        <div className="rounded-xl border border-white/[.07] bg-black/20 p-3">
          <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-semibold text-white/75">Selected work</span><span className="text-[9px] text-white/35">03 projects</span></div>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.name} className="project-row flex items-center gap-3 rounded-lg border border-white/[.055] p-2.5">
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[9px] font-bold ${project.color === "lime" ? "bg-lime-300/10 text-lime-200" : project.color === "violet" ? "bg-violet-300/10 text-violet-200" : "bg-sky-300/10 text-sky-200"}`}>{project.mark}</div>
                <div className="min-w-0 flex-1"><div className="truncate text-[10px] font-semibold text-white/85">{project.name}</div><div className="mt-0.5 truncate text-[9px] text-white/35">{project.detail}</div></div>
                <span className={`shrink-0 rounded-full px-2 py-1 text-[8px] ${project.status === "Live" ? "bg-lime-300/10 text-lime-200" : "bg-white/[.06] text-white/45"}`}>{project.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between px-1 text-[9px] text-white/35"><span>Curated from GitHub</span><span className="flex items-center gap-1 text-lime-200"><Sparkles size={10} /> AI organized</span></div>
        </div>
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-3 rounded-xl border border-lime-200/10 bg-lime-200/[.045] px-3 py-2.5">
        <div className="flex items-center gap-2 text-[10px] text-white/65"><WandSparkles size={13} className="text-lime-200" /> <span>Evolution proposal ready for review</span></div>
        <span className="rounded-full border border-lime-200/20 px-2 py-1 text-[8px] font-semibold text-lime-200">REVIEW CHANGE <ArrowUpRight size={9} className="ml-1 inline" /></span>
      </div>
    </div>
  );
}

const capabilities = [
  { icon: ScanSearch, title: "Understands your work", description: "Reads repository metadata and documentation to build evidence-backed project profiles." },
  { icon: WandSparkles, title: "Thinks about presentation", description: "Chooses what to feature and how to organize your portfolio as your body of work grows." },
  { icon: LockKeyhole, title: "Keeps you in control", description: "Reviews every meaningful proposal, preserves published versions and never invents achievements." }
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[760px]" />
      <header className="relative z-10 border-b border-white/[.06]">
        <div className="shell flex h-[72px] items-center justify-between">
          <Brand />
          <nav className="hidden items-center gap-8 text-[12px] text-white/50 md:flex" aria-label="Main navigation">
            <a className="transition hover:text-white" href="#how-it-works">How it works</a>
            <a className="transition hover:text-white" href="#capabilities">Capabilities</a>
            <a className="transition hover:text-white" href="https://github.com/victorikaraoha23/morphfolio">GitHub <ArrowUpRight className="ml-1 inline" size={11} /></a>
          </nav>
          <a href="https://github.com/victorikaraoha23/morphfolio" className="secondary-button !px-3 !py-2 text-[11px]"><Github size={13} /> View repository</a>
        </div>
      </header>

      <section className="shell relative grid gap-14 pb-24 pt-20 sm:pt-28 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-12 lg:pb-32 lg:pt-32">
        <div className="relative z-10">
          <div className="eyebrow mb-6 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_#b8f36b]" /> A portfolio that grows with you</div>
          <h1 className="max-w-[620px] text-[clamp(3.2rem,7vw,5.8rem)] font-semibold leading-[.98] tracking-[-.075em]">Your work,<br /> <span className="text-lime-300">intelligently</span><br /> presented.</h1>
          <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-white/50">MorphFolio understands the projects behind your GitHub profile, turns them into clear stories, and evolves your portfolio as your engineering journey moves forward.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="https://github.com/victorikaraoha23/morphfolio" className="primary-button">Explore the project <ArrowUpRight size={15} /></a>
            <a href="#how-it-works" className="secondary-button">See how it works <ArrowDownRight size={14} /></a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-white/35"><span className="flex items-center gap-1.5"><Github size={12} /> GitHub connected</span><span className="h-1 w-1 rounded-full bg-white/20" /><span className="flex items-center gap-1.5"><LockKeyhole size={11} /> Owner-controlled</span><span className="h-1 w-1 rounded-full bg-white/20" /><span className="flex items-center gap-1.5"><Sparkles size={11} /> AI-assisted</span></div>
        </div>
        <div className="relative"><div className="absolute -inset-8 rounded-full bg-lime-300/[.055] blur-3xl" /><ProjectPreview /></div>
      </section>

      <section id="how-it-works" className="border-y border-white/[.06] bg-white/[.015] py-20 sm:py-24">
        <div className="shell">
          <div className="max-w-[560px]"><div className="eyebrow mb-4">From repositories to a story</div><h2 className="text-3xl font-semibold tracking-[-.055em] sm:text-4xl">A portfolio should reflect the work you actually do.</h2><p className="mt-4 text-sm leading-6 text-white/45">Not another static grid. MorphFolio builds a living picture of your engineering work from the evidence already in your repositories.</p></div>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[{ n: "01", icon: Github, title: "Connect GitHub", text: "Choose the repositories you want your portfolio to understand." }, { n: "02", icon: Sparkles, title: "Build understanding", text: "AI turns project documentation and metadata into structured, verifiable profiles." }, { n: "03", icon: Layers3, title: "Evolve your portfolio", text: "Review layout and content proposals before the new version goes live." }].map((item) => (
              <div key={item.n} className="panel p-6 sm:p-7"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold text-lime-200">{item.n}</span><item.icon size={18} className="text-white/45" /></div><h3 className="mt-9 text-lg font-semibold tracking-[-.03em]">{item.title}</h3><p className="mt-2 text-[12px] leading-6 text-white/45">{item.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="shell py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><div className="eyebrow mb-4">Designed to evolve safely</div><h2 className="text-3xl font-semibold tracking-[-.055em] sm:text-4xl">Autonomy with a safety net.</h2><p className="mt-4 max-w-[360px] text-sm leading-6 text-white/45">AI proposes. Your rules validate. You stay in control of what gets published.</p></div>
          <div className="space-y-3">
            {capabilities.map((item) => <div key={item.title} className="panel flex gap-4 p-5 sm:p-6"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-lime-200/15 bg-lime-200/[.06] text-lime-200"><item.icon size={18} /></div><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-1.5 text-[12px] leading-5 text-white/45">{item.description}</p></div></div>)}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.06] py-8">
        <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><Brand /><p className="text-[11px] text-white/30">Built to make your work easier to understand. <span className="text-lime-200/70">© {new Date().getFullYear()} MorphFolio</span></p><a href="https://github.com/victorikaraoha23/morphfolio" className="flex items-center gap-2 text-[11px] text-white/45 transition hover:text-white">Open source on GitHub <ArrowUpRight size={12} /></a></div>
      </footer>
    </main>
  );
}
