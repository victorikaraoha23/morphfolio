import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/lib/portfolio/projects";
import { getLocale, translate as tr } from "@/lib/i18n";
import { getLocalizedProject } from "@/lib/portfolio/project-translations";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const sourceProject = projects.find((item) => item.slug === slug);
  const project = sourceProject ? getLocalizedProject(sourceProject, locale) : undefined;
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description,
    openGraph: { title: project.name, description: project.description }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" className="shell min-h-[70vh] py-16 sm:py-24">
        <Link href="/projects" className="nav-link inline-flex items-center gap-2"><ArrowLeft size={14} aria-hidden="true" /> {tr(locale, "allProjects")}</Link>
        <div className="mt-12 max-w-3xl">
          <div className="eyebrow">{project.number} / {project.category}</div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-[-.07em] sm:text-6xl">{project.name}</h1>
            <span className="status-pill">{project.status}</span>
          </div>
          <p className="mt-6 text-lg leading-8 text-muted">{project.overview}</p>
          <div className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-2">
            <div><p className="eyebrow">{tr(locale, "involvement")}</p><p className="mt-2 text-sm">{project.role}</p></div>
            <div><p className="eyebrow">{tr(locale, "stage")}</p><p className="mt-2 text-sm">{project.stage}</p></div>
          </div>
        </div>
        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-[-.05em]">{tr(locale, "notes")}</h2>
          <ul className="mt-6 space-y-4">
            {project.details.map((detail) => (
              <li key={detail} className="surface-card p-5 text-sm leading-7 text-muted">{detail}</li>
            ))}
          </ul>
        </section>
        <div className="mt-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        {("externalHref" in project && project.externalHref) ? (
          <a href={project.externalHref} target="_blank" rel="noreferrer" className="primary-button mt-10">{project.externalLabel} <ExternalLink size={14} aria-hidden="true" /></a>
        ) : null}
        <div className="mt-16 border-t border-line pt-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">{tr(locale, "moreProjects")} <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
