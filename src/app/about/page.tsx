import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Lightbulb, Search, Wrench } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Victor Ikaraoha, his approach to software building, and his current interests."
};

const principles = [
  { icon: Search, title: "Understand the problem", description: "Start by clarifying who a product is for, what problem it addresses, and what a useful outcome looks like." },
  { icon: Lightbulb, title: "Think before adding complexity", description: "Prefer clear requirements and deliberate trade-offs over adding technology or features without a reason." },
  { icon: Wrench, title: "Learn by building", description: "Turn concepts into working software, test assumptions, review what happened, and improve the next iteration." }
];

export default function AboutPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="shell py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">About me</div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-.07em] sm:text-6xl">A builder's mindset, grounded in curiosity.</h1>
          <p className="mt-7 text-lg leading-8 text-muted">I'm Victor Ikaraoha, a software developer based in Nigeria. I'm developing my craft by building independent software products and exploring practical applications of AI, automation, and modern web engineering.</p>
        </div>
        <section className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><div className="eyebrow mb-3">What interests me</div><h2 className="text-2xl font-semibold tracking-[-.05em]">Useful software over unnecessary complexity.</h2></div>
          <div className="max-w-2xl space-y-5 text-sm leading-7 text-muted">
            <p>I'm particularly interested in the space where software engineering and AI meet: integrating language models into real applications, designing dependable workflows, and building tools that help people move from an idea to a useful result.</p>
            <p>My current work includes AI Slop Checker, Blueprint AI, and experiments with AI-agent workflows. Each project is an opportunity to learn, make decisions, and improve how I build.</p>
            <p>This portfolio is a record of that process. I aim to be clear about what is live, what is being developed, and what is still exploratory.</p>
          </div>
        </section>
        <section className="mt-16">
          <div className="eyebrow mb-3">How I approach building</div>
          <h2 className="text-3xl font-semibold tracking-[-.06em]">A few principles I try to follow.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {principles.map(({icon: Icon,title,description},i)=>(
              <article className="surface-card p-6" key={title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={19} aria-hidden="true"/></div>
                <div className="mt-6 text-xs font-bold text-brand">0{i+1}</div>
                <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="mt-16 flex flex-wrap gap-3">
          <Link href="/projects" className="primary-button">Explore my projects <ArrowRight size={14}/></Link>
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="secondary-button"><Github size={15}/> GitHub profile</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
