import type { Metadata } from "next";
import { ArrowUpRight, Github } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, translate as tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "{tr(locale, "contact")}",
  description: "Get in touch with Victor Ikaraoha about software, AI, and potential collaborations."
};

export default async function {tr(locale, "contact")}Page() {
  const locale = await getLocale();
  return (
    <>
      <a href="#main-content" className="skip-link">{tr(locale, "skip")}</a>
      <SiteHeader />
      <main id="main-content" className="shell py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">{tr(locale, "contact")}</div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-.07em] sm:text-6xl">{tr(locale, "contactTitle")}</h1>
          <p className="mt-7 text-lg leading-8 text-muted">{tr(locale, "contactIntroPage")}</p>
        </div>
        <section className="surface-card mt-12 flex flex-col justify-between gap-8 p-7 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <div className="eyebrow mb-3">{tr(locale, "connect")}</div>
            <h2 className="text-2xl font-semibold tracking-[-.05em]">{tr(locale, "findGithub")}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{tr(locale, "githubContact")}</p>
          </div>
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" className="primary-button shrink-0">{tr(locale, "openGithub")} <Github size={15}/><ArrowUpRight size={13}/></a>
        </section>
        <p className="mt-6 max-w-2xl text-xs leading-6 text-muted">{tr(locale, "contactFormNote")}</p>
      </main>
      <SiteFooter />
    </>
  );
}
