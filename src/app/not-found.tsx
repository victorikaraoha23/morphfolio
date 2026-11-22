import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale, translate } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <>
      <SiteHeader />
      <main className="shell flex min-h-[65vh] flex-col justify-center py-20">
        <p className="eyebrow">404 / Not found</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.07em] sm:text-6xl">
          {translate(locale, "notFoundTitle")}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted">
          {translate(locale, "notFoundDescription")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="primary-button">
            <ArrowLeft size={15} aria-hidden="true" />
            {translate(locale, "backHome")}
          </Link>
          <Link href="/projects" className="secondary-button">
            {translate(locale, "allProjects")}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
