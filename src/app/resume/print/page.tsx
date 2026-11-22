import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

import { resume } from "@/lib/portfolio/resume";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Print CV",
  description: "Print-ready curriculum vitae for Chibueze Victor Ikaraoha.",
  robots: { index: false, follow: false },
};

export default function PrintResumePage() {
  return (
    <main className="cv-print-page mx-auto max-w-5xl px-5 py-8 sm:px-10">
      <div className="print-controls mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/resume" className="secondary-button"><ArrowLeft size={14} /> Back to resume</Link>
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          <span className="self-center text-xs text-muted">Choose “Save as PDF” in your browser’s print destination.</span>
        </div>
      </div>

      <article className="cv-document">
        <header className="border-b border-line pb-5">
          <h1 className="text-3xl font-bold tracking-tight">{resume.name}</h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[.08em] text-brand">{resume.headline}</p>
          <p className="mt-2 text-xs text-muted">{resume.location} · <a href={resume.links[0].href}>LinkedIn</a> · <a href={resume.links[1].href}>GitHub</a></p>
        </header>

        <section className="cv-section">
          <h2>Professional Summary</h2>
          <p>{resume.summary}</p>
        </section>

        <section className="cv-section">
          <h2>Technical Skills</h2>
          <div className="cv-skills">
            {resume.skills.map((skill) => <p key={skill.category}><strong>{skill.category}:</strong> {skill.items}</p>)}
          </div>
        </section>

        <section className="cv-section">
          <h2>Selected Projects</h2>
          {resume.projects.map((project) => (
            <div className="cv-project" key={project.name}>
              <h3>{project.name}</h3>
              <p className="cv-meta">{project.status}{project.href ? <> · <a href={project.href}>{project.href.replace("https://", "")}</a></> : null}</p>
              <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Additional Engineering & Product Work</h2>
          <ul>{resume.additionalWork.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="cv-section">
          <h2>Core Strengths</h2>
          <p>{resume.strengths.join(" · ")}</p>
        </section>

        <section className="cv-section">
          <h2>Education</h2>
          <p><strong>{resume.education.degree}</strong> — {resume.education.institution}</p>
          <p>{resume.education.graduation}</p>
          <p className="cv-meta">Relevant areas: {resume.education.relevant}.</p>
        </section>
      </article>
    </main>
  );
}
