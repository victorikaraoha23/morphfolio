import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, translate as tr } from "@/lib/i18n";
import { projects } from "@/lib/portfolio/projects";
import { getLocalizedProject } from "@/lib/portfolio/project-translations";

export const metadata: Metadata = {
  title: "Professional Profile",
  description: "A concise overview of Victor Ikaraoha's current technical focus and selected project work."
};

const focusKeys = ["focus1", "focus2", "focus3", "focus4"] as const;
const tools = ["TypeScript", "JavaScript", "Next.js", "React", "Supabase", "OpenRouter", "Vercel AI SDK"];

export default async function ResumePage() {
  const locale = await getLocale();
  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" className="shell py-16 sm:py-24">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">{tr(locale, "profile")}</div>
            <h1 className="text-4xl font-semibold tracking-[-.07em] sm:text-6xl">Victor Ikaraoha.</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{tr(locale, "resumeIntro")}</p>
          </div>
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="secondary-button shrink-0"><Github size={15}/> GitHub <ArrowUpRight size={13}/></a>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <aside>
            <section>
              <h2 className="eyebrow">{tr(locale, "focus")}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">{focusKeys.map((key)=><li key={key}>{tr(locale, key)}</li>)}</ul>
            </section>
            <section className="mt-10">
              <h2 className="eyebrow">{tr(locale, "tools")}</h2>
              <div className="mt-4 flex flex-wrap gap-2">{tools.map((tool)=><span className="tag" key={tool}>{tool}</span>)}</div>
            </section>
            <section className="mt-10">
              <h2 className="eyebrow">{tr(locale, "location")}</h2>
              <p className="mt-3 text-sm text-muted">Nigeria</p>
            </section>
          </aside>
          <div>
            <section>
              <h2 className="text-2xl font-semibold tracking-[-.05em]">{tr(locale, "selectedWork")}</h2>
              <div className="mt-5 space-y-4">
                {projects.map((sourceProject)=>{ const project = getLocalizedProject(sourceProject, locale); return <article key={project.slug} className="surface-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-semibold">{project.name}</h3><span className="status-pill">{project.status}</span></div>
                  <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
                  <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-brand">{tr(locale, "projectDetails")} <ArrowUpRight size={13}/></Link>
                </article>;})}
              </div>
            </section>
            <section className="mt-12 border-t border-line pt-8">
              <h2 className="text-2xl font-semibold tracking-[-.05em]">{tr(locale, "experience")}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{tr(locale, "resumeDisclaimer")}</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
