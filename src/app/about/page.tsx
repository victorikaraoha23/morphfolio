import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Lightbulb, Search, Wrench } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, translate as tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Victor Ikaraoha, his approach to software building, and his current interests."
};

const principles = [
  { icon: Search, titleKey: "principle1", descriptionKey: "principle1Desc", title: "Understand the problem", description: "Start by clarifying who a product is for, what problem it addresses, and what a useful outcome looks like." },
  { icon: Lightbulb, titleKey: "principle2", descriptionKey: "principle2Desc", title: "Think before adding complexity", description: "Prefer clear requirements and deliberate trade-offs over adding technology or features without a reason." },
  { icon: Wrench, titleKey: "principle3", descriptionKey: "principle3Desc", title: "Learn by building", description: "Turn concepts into working software, test assumptions, review what happened, and improve the next iteration." }
];

export default async function AboutPage() {
  const locale = await getLocale();
  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="shell py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">{tr(locale, "aboutMe")}</div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-.07em] sm:text-6xl">{tr(locale, "aboutTitle")}</h1>
          <p className="mt-7 text-lg leading-8 text-muted">{tr(locale, "aboutIntro")}</p>
        </div>
        <section className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><div className="eyebrow mb-3">{tr(locale, "interests")}</div><h2 className="text-2xl font-semibold tracking-[-.05em]">{tr(locale, "useful")}</h2></div>
          <div className="max-w-2xl space-y-5 text-sm leading-7 text-muted">
            <p>{tr(locale, "aboutBody1")}</p>
            <p>{tr(locale, "aboutBody2")}</p>
            <p>{tr(locale, "aboutBody3")}</p>
          </div>
        </section>
        <section className="mt-16">
          <div className="eyebrow mb-3">{tr(locale, "approach")}</div>
          <h2 className="text-3xl font-semibold tracking-[-.06em]">{tr(locale, "principles")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {principles.map(({icon: Icon,titleKey,descriptionKey},i)=>(
              <article className="surface-card p-6" key={titleKey}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={19} aria-hidden="true"/></div>
                <div className="mt-6 text-xs font-bold text-brand">0{i+1}</div>
                <h3 className="mt-2 text-lg font-semibold">{tr(locale, titleKey as never)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{tr(locale, descriptionKey as never)}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="mt-16 flex flex-wrap gap-3">
          <Link href="/projects" className="primary-button">{tr(locale, "explore")} <ArrowRight size={14}/></Link>
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="secondary-button"><Github size={15}/> {tr(locale, "github")}</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
