import { ArrowDown, ArrowUpRight, Bot, Code2, Github, Layers3, Sparkles, Workflow } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/lib/portfolio/projects";
import { getLocalizedProject } from "@/lib/portfolio/project-translations";
import { getLocale, translate as tr } from "@/lib/i18n";

const capabilities = [
  { icon: Bot, titleKey: "cap1", descriptionKey: "cap1Desc", title: "AI-powered applications", description: "Integrating language models and structured AI workflows into useful software." },
  { icon: Code2, titleKey: "cap2", descriptionKey: "cap2Desc", title: "Web application development", description: "Building responsive product experiences with modern web technologies." },
  { icon: Workflow, titleKey: "cap3", descriptionKey: "cap3Desc", title: "Automation and agents", description: "Exploring systems that coordinate repeatable tasks and reduce manual work." },
  { icon: Layers3, titleKey: "cap4", descriptionKey: "cap4Desc", title: "Product engineering", description: "Turning early ideas into scoped, maintainable software products." }
];

const currentTools = ["TypeScript", "JavaScript", "Next.js", "React", "Supabase", "OpenRouter", "AI SDK"];

export default async function Home() {
  const locale = await getLocale();
  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content">
        <section id="home" className="relative overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[650px]" />
          <div className="shell relative grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <div>
              <div className="eyebrow mb-7 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" /> {tr(locale, "homeHero")}</div>
              <h1 className="max-w-[780px] text-[clamp(3.3rem,8vw,6.8rem)] font-semibold leading-[.96] tracking-[-.085em]">{tr(locale, "homeHero")}</h1>
              <p className="mt-8 max-w-[590px] text-base leading-8 text-muted sm:text-lg">{tr(locale, "heroIntro")}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#work" className="primary-button">{tr(locale, "exploreWork")} <ArrowDown size={15} aria-hidden="true" /></a>
                <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="secondary-button"><Github size={15} aria-hidden="true" /> {tr(locale, "github")} <ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-positive" /> {tr(locale, "building")}</span>
                <span>{tr(locale, "based")}</span>
              </div>
            </div>
            <aside className="surface-card relative overflow-hidden p-7 sm:p-8" aria-label={tr(locale, "current")}>
              <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-brand-soft blur-3xl" />
              <div className="relative">
                <div className="eyebrow mb-6 flex items-center gap-2"><Sparkles size={14} aria-hidden="true" /> {tr(locale, "current")}</div>
                <h2 className="text-2xl font-semibold leading-tight tracking-[-.05em]">{tr(locale, "learning")}</h2>
                <p className="mt-4 text-sm leading-6 text-muted">{tr(locale, "currentIntro")}</p>
                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-muted">{tr(locale, "toolsWorking")}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{currentTools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="about" className="section-divider py-20 sm:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div><div className="eyebrow mb-4">{tr(locale, "about")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-4xl">{tr(locale, "aboutHeading")}</h2></div>
            <div className="max-w-2xl">
              <p className="text-base leading-8 text-muted">{tr(locale, "aboutParagraph")}</p>
              <p className="mt-5 text-base leading-8 text-muted">{tr(locale, "interestsParagraph")}</p>
              <div className="mt-7 flex flex-wrap gap-2">{[tr(locale, "interestTag1"), tr(locale, "interestTag2"), tr(locale, "interestTag3")].map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="work" className="section-divider bg-panel/40 py-20 sm:py-24">
          <div className="shell">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><div className="eyebrow mb-4">{tr(locale, "selectedProjects")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">{tr(locale, "built")}</h2></div>
              <a href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">{tr(locale, "allProjectsLink")} <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {projects.filter((project) => project.featured).map((sourceProject) => { const project = getLocalizedProject(sourceProject, locale); return (
                <article className="project-card group" key={project.slug}>
                  <div className="flex items-start justify-between gap-3"><span className="eyebrow">{project.number} / {project.category}</span><span className="status-pill">{project.status}</span></div>
                  <h3 className="mt-9 text-2xl font-semibold tracking-[-.055em]">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <a href={`/projects/${project.slug}`} className="mt-auto inline-flex items-center gap-2 border-t border-line pt-5 text-xs font-bold text-brand"><span className="mt-6">{tr(locale, "readDetails")}</span><ArrowUpRight size={13} className="mt-6" aria-hidden="true" /></a>
                </article>
              ); })}
            </div>
          </div>
        </section>

        <section id="capabilities" className="section-divider py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-2xl"><div className="eyebrow mb-4">{tr(locale, "areasFocus")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">{tr(locale, "workingTowards")}</h2><p className="mt-5 text-sm leading-7 text-muted">{tr(locale, "focusDisclaimer")}</p></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, titleKey, descriptionKey }, index) => (
                <article className="surface-card p-6 sm:p-7" key={title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={19} aria-hidden="true" /></div>
                  <div className="mt-6 text-xs font-bold text-brand">0{index + 1}</div>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-.04em]">{tr(locale, titleKey as never)}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{tr(locale, descriptionKey as never)}</p>
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
                <div className="eyebrow mb-4">{tr(locale, "getInTouch")}</div>
                <h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">{tr(locale, "idea")}</h2>
                <p className="mt-5 text-sm leading-7 text-muted">{tr(locale, "contactIntro")}</p>
                <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="primary-button mt-8">{tr(locale, "connectGithub")} <ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
