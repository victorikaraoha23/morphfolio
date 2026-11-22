import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Code2, Github, Layers3, Linkedin, Sparkles, Twitter, Workflow } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/lib/portfolio/projects";
import { getLocalizedProject } from "@/lib/portfolio/project-translations";
import { getLocale, translate as tr } from "@/lib/i18n";

const capabilities = [
  { icon: Bot, titleKey: "cap1", descriptionKey: "cap1Desc" },
  { icon: Code2, titleKey: "cap2", descriptionKey: "cap2Desc" },
  { icon: Workflow, titleKey: "cap3", descriptionKey: "cap3Desc" },
  { icon: Layers3, titleKey: "cap4", descriptionKey: "cap4Desc" }
];
const tools = ["TypeScript", "JavaScript", "Next.js", "React", "OpenRouter", "Vercel AI SDK"];
const milestones = [
  { number: "01", title: "AI Slop Checker", metaKey: "timelineMeta1", descriptionKey: "timelineDesc1", statusKey: "statusLive" },
  { number: "02", title: "Blueprint AI", metaKey: "timelineMeta2", descriptionKey: "timelineDesc2", statusKey: "statusDevelopment" },
  { number: "03", title: "AgentsChat", metaKey: "timelineMeta3", descriptionKey: "timelineDesc3", statusKey: "statusExperimental" }
];
const faqs = [["faqQuestion1", "faqAnswer1"], ["faqQuestion2", "faqAnswer2"], ["faqQuestion3", "faqAnswer3"], ["faqQuestion4", "faqAnswer4"]] as const;

export default async function Home() {
  const locale = await getLocale();
  const featuredProjects = projects.filter((project) => project.featured);
  return <>
    <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
    <SiteHeader />
    <main id="main-content">
      <section id="home" className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[720px]" />
        <div className="shell relative grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <div className="eyebrow mb-6 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" />{tr(locale, "homeRole")}</div>
            <p className="mb-4 text-sm font-semibold tracking-wide text-muted">Victor Ikaraoha <span className="text-brand">/</span> Nigeria</p>
            <h1 className="max-w-[760px] text-[clamp(3.2rem,7.5vw,6.6rem)] font-semibold leading-[.94] tracking-[-.085em]">{tr(locale, "homeHero")}</h1>
            <p className="mt-7 max-w-[600px] text-base leading-8 text-muted sm:text-lg">{tr(locale, "heroIntro")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="primary-button">{tr(locale, "exploreWork")} <ArrowUpRight size={15}/></Link>
              <a href="https://github.com/victorikaraoha23" target="_blank" rel="me noreferrer" className="secondary-button"><Github size={15}/> GitHub <ArrowUpRight size={13}/></a>
              <a href="https://www.linkedin.com/in/victor-ikaraoha-ba0152440/" target="_blank" rel="me noreferrer" aria-label="LinkedIn profile" className="secondary-button"><Linkedin size={15}/> LinkedIn <ArrowUpRight size={13}/></a>
              <a href="https://x.com/ikaraoha23" target="_blank" rel="me noreferrer" aria-label="X profile" className="secondary-button"><Twitter size={15}/> X <ArrowUpRight size={13}/></a>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-positive"/>{tr(locale, "building")}</span><span>{tr(locale, "based")}</span>
            </div>
          </div>
          <aside className="relative mx-auto w-full max-w-[430px] overflow-hidden rounded-[28px] border border-line bg-panel p-5 sm:p-7" aria-label={tr(locale, "profileCardLabel")}>
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-soft blur-3xl"/>
            <div className="relative">
              <div className="flex items-center justify-between"><span className="eyebrow">{tr(locale, "profileCardLabel")}</span><Sparkles size={16} className="text-brand"/></div>
              <div className="profile-monogram mt-7 grid aspect-[4/4.2] place-items-center rounded-[22px] border border-line">
                <div className="text-center"><div className="mx-auto grid h-28 w-28 place-items-center rounded-[30px] border border-brand/30 bg-brand-soft text-5xl font-black tracking-[-.1em] text-brand sm:h-32 sm:w-32 sm:text-6xl">VI</div><p className="mt-5 text-xs font-semibold uppercase tracking-[.2em] text-muted">{tr(locale, "profilePlaceholder")}</p></div>
              </div>
              <div className="mt-6 flex items-end justify-between gap-4"><div><h2 className="text-xl font-semibold tracking-[-.05em]">Victor Ikaraoha</h2><p className="mt-1 text-sm text-muted">{tr(locale, "profileSubtitle")}</p></div><span className="rounded-full border border-line px-3 py-1.5 text-[10px] font-semibold text-muted">NG</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section id="about" className="section-divider py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div><div className="eyebrow mb-4">{tr(locale, "about")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-4xl">{tr(locale, "aboutHeading")}</h2><Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">{tr(locale, "readAbout")} <ArrowRight size={14}/></Link></div>
          <div className="max-w-2xl"><p className="text-base leading-8 text-muted">{tr(locale, "aboutParagraph")}</p><p className="mt-5 text-base leading-8 text-muted">{tr(locale, "interestsParagraph")}</p><div className="mt-7 flex flex-wrap gap-2">{[tr(locale, "interestTag1"),tr(locale, "interestTag2"),tr(locale, "interestTag3")].map((item)=><span className="tag" key={item}>{item}</span>)}</div></div>
        </div>
      </section>

      <section id="work" className="section-divider bg-panel/40 py-20 sm:py-24">
        <div className="shell">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="eyebrow mb-4">{tr(locale, "selectedProjects")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">{tr(locale, "built")}</h2></div><Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">{tr(locale, "allProjectsLink")} <ArrowUpRight size={14}/></Link></div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {featuredProjects.map((sourceProject)=>{const project=getLocalizedProject(sourceProject,locale);return <article className="project-card min-h-[330px]" key={project.slug}>
              <div className="flex items-start justify-between gap-3"><span className="eyebrow">{project.number} / {project.category}</span><span className="status-pill">{project.status}</span></div>
              <h3 className="mt-9 text-2xl font-semibold tracking-[-.055em]">{project.name}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-muted">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag)=><span className="tag" key={tag}>{tag}</span>)}</div>
              <Link href={`/projects/${project.slug}`} className="mt-auto inline-flex items-center gap-2 border-t border-line pt-5 text-xs font-bold text-brand">{tr(locale,"readDetails")} <ArrowUpRight size={13}/></Link>
            </article>})}
          </div>
        </div>
      </section>

      <section id="capabilities" className="section-divider py-20 sm:py-24">
        <div className="shell">
          <div className="max-w-2xl"><div className="eyebrow mb-4">{tr(locale,"areasFocus")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">{tr(locale,"workingTowards")}</h2><p className="mt-5 text-sm leading-7 text-muted">{tr(locale,"focusDisclaimer")}</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">{capabilities.map(({icon:Icon,titleKey,descriptionKey},i)=><article className="surface-card p-6 sm:p-7" key={titleKey}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={19}/></div><div className="mt-6 text-xs font-bold text-brand">0{i+1}</div><h3 className="mt-2 text-xl font-semibold tracking-[-.04em]">{tr(locale,titleKey as never)}</h3><p className="mt-3 text-sm leading-6 text-muted">{tr(locale,descriptionKey as never)}</p>
          </article>)}</div>
          <div className="mt-9 rounded-2xl border border-line bg-panel p-6 sm:p-7"><p className="eyebrow">{tr(locale,"toolsWorking")}</p><div className="mt-4 flex flex-wrap gap-2">{tools.map(tool=><span className="tag" key={tool}>{tool}</span>)}</div></div>
        </div>
      </section>

      <section id="services" className="section-divider bg-panel/40 py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><div className="eyebrow mb-4">{tr(locale,"services")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-4xl">{tr(locale,"servicesTitle")}</h2><p className="mt-5 text-sm leading-7 text-muted">{tr(locale,"servicesIntro")}</p><Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">{tr(locale,"viewServices")} <ArrowUpRight size={14}/></Link></div>
          <div className="grid gap-3 sm:grid-cols-2">{["service1","service2","service3","service4"].map((key,i)=><div key={key} className="rounded-2xl border border-line bg-background p-5"><span className="text-xs font-bold text-brand">0{i+1}</span><h3 className="mt-5 text-base font-semibold tracking-[-.03em]">{tr(locale,key as never)}</h3><p className="mt-2 text-sm leading-6 text-muted">{tr(locale,`${key}Desc` as never)}</p></div>)}</div>
        </div>
      </section>

      <section id="journey" className="section-divider py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div><div className="eyebrow mb-4">{tr(locale,"journeyEyebrow")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-4xl">{tr(locale,"journeyTitle")}</h2><p className="mt-5 max-w-sm text-sm leading-7 text-muted">{tr(locale,"journeyIntro")}</p></div>
          <ol className="relative space-y-4 border-l border-line pl-6 sm:pl-8">{milestones.map(item=><li key={item.number} className="relative rounded-2xl border border-line bg-panel p-5 sm:p-6">
            <span className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-background bg-brand sm:-left-[39px]"/>
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="eyebrow">{tr(locale,item.metaKey as never)}</span><span className="status-pill">{tr(locale,item.statusKey as never)}</span></div>
            <h3 className="mt-3 text-xl font-semibold tracking-[-.04em]">{item.title}</h3><p className="mt-2 text-sm leading-7 text-muted">{tr(locale,item.descriptionKey as never)}</p>
          </li>)}</ol>
        </div>
      </section>

      <section id="faq" className="section-divider bg-panel/40 py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><div className="eyebrow mb-4">{tr(locale,"faqEyebrow")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-4xl">{tr(locale,"faqTitle")}</h2></div>
          <div className="space-y-3">{faqs.map(([q,a])=><details key={q} className="rounded-2xl border border-line bg-background p-5 sm:p-6"><summary className="cursor-pointer list-none pr-5 text-sm font-semibold leading-6">{tr(locale,q as never)}</summary><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{tr(locale,a as never)}</p></details>)}</div>
        </div>
      </section>

      <section id="contact" className="section-divider py-20 sm:py-24"><div className="shell"><div className="relative overflow-hidden rounded-[28px] border border-line bg-panel p-8 sm:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-soft blur-3xl"/><div className="relative max-w-2xl"><div className="eyebrow mb-4">{tr(locale,"getInTouch")}</div><h2 className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl">{tr(locale,"idea")}</h2><p className="mt-5 text-sm leading-7 text-muted">{tr(locale,"contactIntro")}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="primary-button">{tr(locale,"contact")} <ArrowUpRight size={14}/></Link><a href="https://github.com/victorikaraoha23" target="_blank" rel="me noreferrer" className="secondary-button"><Github size={15}/> GitHub <ArrowUpRight size={13}/></a>
          <a href="https://www.linkedin.com/in/victor-ikaraoha-ba0152440/" target="_blank" rel="me noreferrer" className="secondary-button"><Linkedin size={15}/> LinkedIn <ArrowUpRight size={13}/></a>
          <a href="https://x.com/ikaraoha23" target="_blank" rel="me noreferrer" className="secondary-button"><Twitter size={15}/> X <ArrowUpRight size={13}/></a></div>
        </div>
      </div></div></section>
    </main>
    <SiteFooter />
  </>;
}
