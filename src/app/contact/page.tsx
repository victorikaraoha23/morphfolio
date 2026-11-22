import type { Metadata } from "next";
import { ArrowUpRight, Github } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Victor Ikaraoha about software, AI, and potential collaborations."
};

export default function ContactPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="shell py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">Contact</div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-.07em] sm:text-6xl">Let's talk about something worth building.</h1>
          <p className="mt-7 text-lg leading-8 text-muted">I'm open to thoughtful conversations about software development, AI applications, automation, and potential collaborations.</p>
        </div>
        <section className="surface-card mt-12 flex flex-col justify-between gap-8 p-7 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <div className="eyebrow mb-3">Connect</div>
            <h2 className="text-2xl font-semibold tracking-[-.05em]">Find me on GitHub.</h2>
            <p className="mt-3 text-sm leading-7 text-muted">GitHub is the public contact point linked on this portfolio. You can review my work and reach out through my profile.</p>
          </div>
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="primary-button shrink-0">Open GitHub profile <Github size={15}/><ArrowUpRight size={13}/></a>
        </section>
        <p className="mt-6 max-w-2xl text-xs leading-6 text-muted">A direct contact form will be added with secure submission handling. I have not enabled a form that would appear to send a message without a working delivery service behind it.</p>
      </main>
      <SiteFooter />
    </>
  );
}
