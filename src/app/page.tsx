import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Code2,
  ExternalLink,
  Github,
  Layers3,
  Menu,
  Sparkles,
  Workflow
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/lib/portfolio/projects";



const capabilities = [
  { icon: Bot, title: "AI-powered applications", description: "Integrating language models and structured AI workflows into useful software." },
  { icon: Code2, title: "Web application development", description: "Building responsive product experiences with modern web technologies." },
  { icon: Workflow, title: "Automation and agents", description: "Exploring systems that coordinate repeatable tasks and reduce manual work." },
  { icon: Layers3, title: "Product engineering", description: "Turning early ideas into scoped, maintainable software products." }
];

const currentTools = ["TypeScript", "JavaScript", "Next.js", "React", "Supabase", "OpenRouter", "AI SDK"];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="project-card group">
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow">{project.number} / {project.category}</span>
        <span className="status-pill">{project.status}</span>
      </div>
      <h3 className="mt-9 text-2xl font-semibold tracking-[-.055em]">{project.name}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </div>
      <a href={project.href} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 border-t border-line pt-5 text-xs font-bold text-brand">
        <span className="mt-6">{project.action}</span><ExternalLink size={13} className="mt-6" aria-hidden="true" />
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="shell flex h-[76px] items-center justify-between gap-4">
          <Brand />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="/projects">Projects</a>
            <a className="nav-link" href="#capabilities">Capabilities</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
          <details className="mobile-menu relative md:hidden">
            <summary aria-label="Open navigation menu"><Menu size={19} aria-hidden="true" /><span>Menu</span></summary>
            <nav className="mobile-menu-panel absolute right-0 top-12 z-50 flex min-w-44 flex-col gap-4 rounded-2xl border border-line bg-background p-5 shadow-xl" aria-label="Mobile navigation">
              <a className="nav-link" href="#about">About</a>
              <a className="nav-link" href="#work">Projects</a>
              <a className="nav-link" href="#capabilities">Capabilities</a>
              <a className="nav-link" href="#contact">Contact</a>
            </nav>
          </details>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#contact" className="primary-button !min-h-10 !px-4 !text-xs">Let's talk <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section id="home" className="relative overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[650px]" />
          <div className="shell relative grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <div>
              <div className="eyebrow mb-7 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" /> Software development · AI engineering</div>
              <h1 className="max-w-[780px] text-[clamp(3.3rem,8vw,6.8rem)] font-semibold leading-[.96] tracking-[-.085em]">
                Building software<br />with <span className="text-brand">purpose.</span>
              </h1>
              <p className="mt-8 max-w-[590px] text-base leading-8 text-muted sm:text-lg">
                I'm Victor Ikaraoha. I build software products and explore how AI, automation, and thoughtful engineering can turn ideas into useful tools.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#work" className="primary-button">Explore my work <ArrowDown size={15} aria-hidden="true" /></a>
                <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="secondary-button"><Github size={15} aria-hidden="true" /> GitHub profile <ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-positive" /> Building and learning in public</span>
                <span>Based in Nigeria</span>
              </div>
            </div>

            <aside className="surface-card relative overflow-hidden p-7 sm:p-8" aria-label="Current focus">
              <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-brand-soft blur-3xl" />
              <div className="relative">
                <div className="eyebrow mb-6 flex items-center gap-2"><Sparkles size={14} aria-hidden="true" /> Current focus</div>
                <h2 className="text-2xl font-semibold leading-tight tracking-[-.05em]">Learning by building real products.</h2>
                <p className="mt-4 text-sm leading-6 text-muted">My work currently sits around practical AI applications, developer tools, and the engineering behind dependable software.</p>
                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-muted">Tools I'm working with</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentTools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="about" className="section-divider py-20 sm:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div><div className="eyebrow mb-4">About</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-4xl">Curious about how things work. Motivated to build what comes next.</h2></div>
            <div className="max-w-2xl">
              <p className="text-base leading-8 text-muted">I'm a software developer focused on learning through building. I enjoy breaking down complex ideas, understanding the problem behind them, and turning what I learn into practical software.</p>
              <p className="mt-5 text-base leading-8 text-muted">I'm especially interested in AI engineering, LLM integrations, autonomous workflows, and the craft of building products that are useful, understandable, and maintainable.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Independent software projects", "AI engineering", "Continuous learning"].map((item) => <span className="tag" key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section-divider bg-panel/40 py-20 sm:py-24">
          <div className="shell">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><div className="eyebrow mb-4">Selected projects</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">Built, being built, explored.</h2></div>
              <a href="https://github.com/victorikaraoha23?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">Browse GitHub repositories <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.name} project={project} />)}
            </div>
          </div>
        </section>

        <section id="capabilities" className="section-divider py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-2xl"><div className="eyebrow mb-4">Areas of focus</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">What I'm working towards.</h2><p className="mt-5 text-sm leading-7 text-muted">These are the areas shaping my current learning and project work. They describe my direction, not a claim of mastery.</p></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, description }, index) => (
                <article className="surface-card p-6 sm:p-7" key={title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={19} aria-hidden="true" /></div>
                  <div className="mt-6 text-xs font-bold text-brand">0{index + 1}</div>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-.04em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-divider py-20 sm:py-24">
          <div className="shell">
            <div className="surface-card relative overflow-hidden p-8 sm:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-soft blur-3xl" />
              <div className="relative max-w-2xl">
                <div className="eyebrow mb-4">Get in touch</div>
                <h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">Have an idea worth building?</h2>
                <p className="mt-5 text-sm leading-7 text-muted">I'm open to thoughtful conversations about software, AI, collaboration, and interesting problems.</p>
                <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="primary-button mt-8">Connect on GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="section-divider py-8">
        <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Brand />
          <p className="text-xs text-muted">© {new Date().getFullYear()} Victor Ikaraoha. Built with intention.</p>
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-muted transition hover:text-brand"><Github size={17} aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  );
}
