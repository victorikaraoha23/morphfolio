import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bot, Code2, Workflow, ClipboardList } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Collaboration",
  description: "Areas of software and AI work that Victor Ikaraoha is currently exploring."
};

const areas = [
  { icon: Code2, title: "Web product development", description: "Building responsive web application experiences, from a clearly scoped interface to the supporting application logic." },
  { icon: Bot, title: "AI application prototypes", description: "Exploring practical LLM integrations, structured outputs, and AI-assisted features inside software products." },
  { icon: Workflow, title: "Automation and agent workflows", description: "Designing and experimenting with workflows that coordinate repeatable tasks and connect software tools." },
  { icon: ClipboardList, title: "Product planning and technical structure", description: "Breaking early ideas into requirements, user flows, implementation steps, and documented technical decisions." }
];

export default function ServicesPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="shell py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">Collaboration</div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-.07em] sm:text-6xl">Problems I'd be interested in working on.</h1>
          <p className="mt-7 text-lg leading-8 text-muted">My current focus is building and improving software products. These are the areas I am actively developing experience in and would be interested in discussing for a suitable collaboration.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {areas.map(({icon: Icon,title,description},i)=>(
            <article className="surface-card p-7" key={title}>
              <div className="flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={20}/></div><span className="eyebrow">0{i+1}</span></div>
              <h2 className="mt-7 text-xl font-semibold tracking-[-.04em]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-6 text-muted">These are areas of focus, not a claim of specialist credentials or a fixed agency service catalogue. Project fit, scope, and availability should be discussed before any commitment.</p>
        <Link href="/contact" className="primary-button mt-8">Discuss a project <ArrowUpRight size={14}/></Link>
      </main>
      <SiteFooter />
    </>
  );
}
