import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { resumeIdentity, resumeContent } from "@/lib/portfolio/resume";
import { PrintButton } from "@/components/print-button";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Print CV",
  description: "Print-ready project profile for Victor Ikaraoha.",
  robots: { index: false, follow: false }
};

export default async function PrintResumePage() {
  const locale = await getLocale();
  const content = resumeContent[locale];

  return (
    <main className="cv-print-page mx-auto max-w-5xl px-5 py-8 sm:px-10">
      <div className="print-controls mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/resume" className="secondary-button"><ArrowLeft size={14} aria-hidden="true" /> {content.sections.back}</Link>
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          <span className="self-center text-xs text-muted">{content.sections.savePdf}</span>
        </div>
      </div>

      <article className="cv-document">
        <header className="border-b border-line pb-5">
          <h1 className="text-3xl font-bold tracking-tight">{resumeIdentity.name}</h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[.08em] text-brand">{content.headline}</p>
          <p className="mt-2 text-xs text-muted">{resumeIdentity.location} · <a href={resumeIdentity.links[0].href}>LinkedIn</a> · <a href={resumeIdentity.links[1].href}>GitHub</a> · <a href={resumeIdentity.links[2].href}>X</a></p>
          <p className="mt-4 text-xs leading-5 text-muted">{content.disclaimer}</p>
        </header>

        <section className="cv-section">
          <h2>{locale === "fr" ? "Profil" : locale === "es" ? "Perfil" : "Profile"}</h2>
          <p>{content.summary}</p>
        </section>

        <section className="cv-section">
          <h2>{content.sections.skills}</h2>
          <div className="cv-skills">
            {content.skills.map((skill) => <p key={skill.category}><strong>{skill.category}:</strong> {skill.items}</p>)}
          </div>
        </section>

        <section className="cv-section">
          <h2>{content.sections.projects}</h2>
          {content.projects.map((project) => (
            <div className="cv-project" key={project.name}>
              <h3>{project.name}</h3>
              <p className="cv-meta">{project.status}{project.href ? <> · <a href={project.href}>{project.href.replace("https://", "")}</a></> : null}</p>
              <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>{content.sections.additional}</h2>
          <ul>{content.additionalWork.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="cv-section">
          <h2>{content.sections.strengths}</h2>
          <p>{content.strengths.join(" · ")}</p>
        </section>
      </article>
    </main>
  );
}
