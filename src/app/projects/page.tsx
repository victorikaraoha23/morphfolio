import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectsExplorer } from "@/components/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software projects and experiments by Victor Ikaraoha."
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <header className="site-header">
        <div className="shell flex h-[76px] items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-[-.04em]">VI <span className="text-brand">/</span> MorphFolio</Link>
          <Link href="/" className="nav-link inline-flex items-center gap-2"><ArrowLeft size={14} aria-hidden="true" /> Back home</Link>
        </div>
      </header>
      <section className="shell py-16 sm:py-24">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">Selected work</div>
          <h1 className="text-4xl font-semibold tracking-[-.07em] sm:text-6xl">Projects & experiments.</h1>
          <p className="mt-5 text-base leading-7 text-muted">A collection of products I'm building and technical ideas I'm exploring. Project status is shown clearly so work in progress is not confused with completed releases.</p>
        </div>
        <div className="mt-10">
          <ProjectsExplorer />
        </div>
      </section>
    </main>
  );
}
