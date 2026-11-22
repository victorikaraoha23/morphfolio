import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bot, Code2, Workflow, ClipboardList } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, translate as tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Collaboration",
  description: "Areas of software and AI work that Victor Ikaraoha is currently exploring."
};

const areas = [
  { icon: Code2, titleKey: "service1", descriptionKey: "service1Desc", title: "Web product development", description: "Building responsive web application experiences, from a clearly scoped interface to the supporting application logic." },
  { icon: Bot, titleKey: "service2", descriptionKey: "service2Desc", title: "AI application prototypes", description: "Exploring practical LLM integrations, structured outputs, and AI-assisted features inside software products." },
  { icon: Workflow, titleKey: "service3", descriptionKey: "service3Desc", title: "Automation and agent workflows", description: "Designing and experimenting with workflows that coordinate repeatable tasks and connect software tools." },
  { icon: ClipboardList, titleKey: "service4", descriptionKey: "service4Desc", title: "Product planning and technical structure", description: "Breaking early ideas into requirements, user flows, implementation steps, and documented technical decisions." }
];

export default async function ServicesPage() {
  const locale = await getLocale();
  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" className="shell py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">{tr(locale, "collaboration")}</div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-.07em] sm:text-6xl">{tr(locale, "servicesTitle")}</h1>
          <p className="mt-7 text-lg leading-8 text-muted">{tr(locale, "servicesIntro")}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {areas.map(({icon: Icon,titleKey,descriptionKey},i)=>(
            <article className="surface-card p-7" key={title}>
              <div className="flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={20}/></div><span className="eyebrow">0{i+1}</span></div>
              <h2 className="mt-7 text-xl font-semibold tracking-[-.04em]">{tr(locale, titleKey as never)}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{tr(locale, descriptionKey as never)}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-6 text-muted">{tr(locale, "servicesDisclaimer")}</p>
        <Link href="/contact" className="primary-button mt-8">{tr(locale, "discuss")} <ArrowUpRight size={14}/></Link>
      </main>
      <SiteFooter />
    </>
  );
}
