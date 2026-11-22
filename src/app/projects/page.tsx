import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, translate as tr } from "@/lib/i18n";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { getLocale, translate as tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software projects and experiments by Victor Ikaraoha."
};

export default async function ProjectsPage() {
  const locale = await getLocale();
  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" className="shell min-h-[70vh] py-16 sm:py-24">
        <Link href="/" className="nav-link inline-flex items-center gap-2"><ArrowLeft size={14} aria-hidden="true" /> {tr(locale, "backHome")}</Link>
        <div className="mt-12 max-w-2xl">
          <div className="eyebrow mb-4">{tr(locale, "selected")}</div>
          <h1 className="text-4xl font-semibold tracking-[-.07em] sm:text-6xl">{tr(locale, "projectsTitle")}</h1>
          <p className="mt-5 text-base leading-7 text-muted">{tr(locale, "projectsIntro")}</p>
        </div>
        <div className="mt-10"><ProjectsExplorer /></div>
      </main>
      <SiteFooter />
    </>
  );
}
