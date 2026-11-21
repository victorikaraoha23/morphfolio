import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectsExplorer } from "@/components/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software projects and experiments by Victor Ikaraoha."
};

export default function ProjectsPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="shell min-h-[70vh] py-16 sm:py-24">
        <Link href="/" className="nav-link inline-flex items-center gap-2"><ArrowLeft size={14} aria-hidden="true" /> Back home</Link>
        <div className="mt-12 max-w-2xl">
          <div className="eyebrow mb-4">Selected work</div>
          <h1 className="text-4xl font-semibold tracking-[-.07em] sm:text-6xl">Projects & experiments.</h1>
          <p className="mt-5 text-base leading-7 text-muted">A collection of products I'm building and technical ideas I'm exploring. Project status is shown clearly so work in progress is not confused with completed releases.</p>
        </div>
        <div className="mt-10"><ProjectsExplorer /></div>
      </main>
      <SiteFooter />
    </>
  );
}
