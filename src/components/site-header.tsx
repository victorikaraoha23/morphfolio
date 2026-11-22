import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { getLocale, translate } from "@/lib/i18n";

const links = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/services", label: "services" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" }
] as const;

export async function SiteHeader() {
  const locale = await getLocale();
  return (
    <header className="site-header">
      <div className="shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Victor Ikaraoha — home">
          <span className="brand-mark" aria-hidden="true">VI</span>
          <span className="text-sm font-bold tracking-[-.04em]">Victor Ikaraoha<span className="text-brand">.</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label={translate(locale, "mainNavigation")}>
          {links.map((link) => <Link className="nav-link" href={link.href} key={link.href}>{translate(locale, link.label)}</Link>)}
        </nav>
        <details className="mobile-menu relative md:hidden">
          <summary aria-label={translate(locale, "menu")}><Menu size={19} aria-hidden="true" /><span>{translate(locale, "menu")}</span></summary>
          <nav className="mobile-menu-panel absolute right-0 top-12 z-50 flex min-w-44 flex-col gap-4 rounded-2xl border border-line bg-background p-5 shadow-xl" aria-label={translate(locale, "mobileNavigation")}>
            {links.map((link) => <Link className="nav-link" href={link.href} key={link.href}>{translate(locale, link.label)}</Link>)}
          </nav>
        </details>
        <div className="flex items-center gap-2">
          <CommandPalette initialLocale={locale} />
          <ThemeToggle locale={locale} />
          <Link href="/contact" className="primary-button hidden !min-h-10 !px-4 !text-xs sm:inline-flex">{translate(locale, "talk")} <ArrowUpRight size={13} aria-hidden="true" /></Link>
        </div>
      </div>
    </header>
  );
}
