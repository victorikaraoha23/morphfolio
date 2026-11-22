import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, translate as tr } from "@/lib/i18n";
import { resumeIdentity, resumeContent } from "@/lib/portfolio/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "A project-focused profile of Victor Ikaraoha's independent software products and current technical practice."
};

export default async function ResumePage() {
  const locale = await getLocale();
  const content = resumeContent[locale];

  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" className="shell py-14 sm:py-20">
        <header className="border-b border-line pb-9">
          <div className="eyebrow mb-4">{tr(locale, "profile")}</div>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-[-.065em] sm:text-6xl">{resumeIdentity.name}</h1>
              <p className="mt-4 text-sm font-bold uppercase leading-6 tracking-[.08em] text-brand">{content.headline}</p>
              <p className="mt-3 text-sm text-muted">{resumeIdentity.location}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a className="inline-flex items-center gap-2 text-muted hover:text-brand" href={resumeIdentity.links[0].href} target="_blank" rel="noreferrer"><Linkedin size={15} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
                <a className="inline-flex items-center gap-2 text-muted hover:text-brand" href={resumeIdentity.links[1].href} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" /> GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
                <a className="inline-flex items-center gap-2 text-muted hover:text-brand" href={resumeIdentity.links[2].href} target="_blank" rel="noreferrer">X <ArrowUpRight size={12} aria-hidden="true" /></a>
              </div>
            </div>
            <Link href="/resume/print" className="primary-button"><ArrowDownToLine size={15} aria-hidden="true" /> {content.sections.print}</Link>
          </div>
        </header>

        <p className="mt-7 border-l-2 border-brand pl-4 text-sm leading-6 text-muted">{content.disclaimer}</p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)]">
          <aside className="space-y-9">
            <section>
              <h2 className="eyebrow">{content.sections.skills}</h2>
              <div className="mt-4 space-y-4">
                {content.skills.map((skill) => (
                  <div key={skill.category}>
                    <h3 className="text-sm font-semibold">{skill.category}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{skill.items}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="eyebrow">{content.sections.strengths}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {content.strengths.map((strength) => <li key={strength} className="tag">{strength}</li>)}
              </ul>
            </section>
          </aside>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold tracking-[-.045em]">{locale === "fr" ? "Profil" : locale === "es" ? "Perfil" : "Profile"}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{content.summary}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-[-.045em]">{content.sections.projects}</h2>
              <div className="mt-5 space-y-4">
                {content.projects.map((project) => (
                  <article key={project.name} className="surface-card p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className="status-pill">{project.status}</span>
                    </div>
                    {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand">{project.href.replace("https://", "")} <ArrowUpRight size={12} aria-hidden="true" /></a>}
                    {project.source && <a href={project.source} target="_blank" rel="noreferrer" className="ml-3 inline-flex items-center gap-1 text-xs font-semibold text-muted">{content.sections.source} <ArrowUpRight size={12} aria-hidden="true" /></a>}
                    <ul className="mt-3 space-y-2">
                      {project.bullets.map((bullet) => <li key={bullet} className="text-sm leading-6 text-muted">• {bullet}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-[-.045em]">{content.sections.additional}</h2>
              <ul className="mt-4 space-y-2">
                {content.additionalWork.map((item) => <li key={item} className="text-sm leading-6 text-muted">• {item}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
