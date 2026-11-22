import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, translate as tr } from "@/lib/i18n";
import { resume } from "@/lib/portfolio/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Chibueze Victor Ikaraoha: AI software engineering, full-stack development, AI agents, automation, and independent product work.",
};

export default async function ResumePage() {
  const locale = await getLocale();

  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" className="shell py-14 sm:py-20">
        <header className="border-b border-line pb-9">
          <div className="eyebrow mb-4">{tr(locale, "profile")}</div>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-[-.065em] sm:text-6xl">{resume.name}</h1>
              <p className="mt-4 text-sm font-bold uppercase leading-6 tracking-[.08em] text-brand">{resume.headline}</p>
              <p className="mt-3 text-sm text-muted">{resume.location}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a className="inline-flex items-center gap-2 text-muted hover:text-brand" href={resume.links[0].href} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={12} /></a>
                <a className="inline-flex items-center gap-2 text-muted hover:text-brand" href={resume.links[1].href} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={12} /></a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/resume/print" className="primary-button"><ArrowDownToLine size={15} /> {locale === "fr" ? "Imprimer / enregistrer en PDF" : locale === "es" ? "Imprimir / guardar como PDF" : "Print / Save as PDF"}</Link>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)]">
          <aside className="space-y-9">
            <section>
              <h2 className="eyebrow">{locale === "fr" ? "Compétences techniques" : locale === "es" ? "Competencias técnicas" : "Technical skills"}</h2>
              <div className="mt-4 space-y-4">
                {resume.skills.map((skill) => (
                  <div key={skill.category}>
                    <h3 className="text-sm font-semibold">{skill.category}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{skill.items}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="eyebrow">{locale === "fr" ? "Points forts" : locale === "es" ? "Fortalezas" : "Core strengths"}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {resume.strengths.map((strength) => <li key={strength} className="tag">{strength}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="eyebrow">{locale === "fr" ? "Formation" : locale === "es" ? "Formación" : "Education"}</h2>
              <h3 className="mt-4 text-sm font-semibold">{resume.education.degree}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{resume.education.institution}</p>
              <p className="mt-2 text-sm text-muted">{resume.education.graduation}</p>
              <p className="mt-2 text-xs leading-5 text-muted">{resume.education.relevant}</p>
            </section>
          </aside>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold tracking-[-.045em]">{locale === "fr" ? "Résumé professionnel" : locale === "es" ? "Resumen profesional" : "Professional summary"}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{resume.summary}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-[-.045em]">{locale === "fr" ? "Projets sélectionnés" : locale === "es" ? "Proyectos seleccionados" : "Selected projects"}</h2>
              <div className="mt-5 space-y-4">
                {resume.projects.map((project) => (
                  <article key={project.name} className="surface-card p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className="status-pill">{project.status}</span>
                    </div>
                    {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand">{project.href.replace("https://", "")} <ArrowUpRight size={12} /></a>}
                    {project.secondaryHref && <a href={project.secondaryHref} target="_blank" rel="noreferrer" className="ml-3 inline-flex items-center gap-1 text-xs font-semibold text-muted">Source code <ArrowUpRight size={12} /></a>}
                    <ul className="mt-3 space-y-2">
                      {project.bullets.map((bullet) => <li key={bullet} className="text-sm leading-6 text-muted">• {bullet}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-[-.045em]">{locale === "fr" ? "Autres activités" : locale === "es" ? "Trabajo adicional" : "Additional engineering & product work"}</h2>
              <ul className="mt-4 space-y-2">
                {resume.additionalWork.map((item) => <li key={item} className="text-sm leading-6 text-muted">• {item}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
