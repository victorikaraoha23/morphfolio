import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { getLocale, translate } from "@/lib/i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  return (
    <footer className="section-divider py-8">
      <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Link href="/" className="flex items-center gap-3" aria-label="Victor Ikaraoha — home">
          <span className="brand-mark" aria-hidden="true">VI</span>
          <span className="text-sm font-bold tracking-[-.04em]">Victor Ikaraoha<span className="text-brand">.</span></span>
        </Link>
        <p className="text-xs text-muted">© {new Date().getFullYear()} Victor Ikaraoha. {translate(locale, "footer")}</p>
        <nav aria-label={translate(locale, "socialProfiles")} className="flex items-center gap-4">
          <a href="https://github.com/victorikaraoha23" target="_blank" rel="me noreferrer" aria-label={translate(locale, "github")} className="text-muted transition hover:text-brand"><Github size={17} aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/in/victor-ikaraoha-ba0152440/" target="_blank" rel="me noreferrer" aria-label={translate(locale, "linkedInProfile")} className="text-muted transition hover:text-brand"><Linkedin size={17} aria-hidden="true" /></a>
          <a href="https://x.com/ikaraoha23" target="_blank" rel="me noreferrer" aria-label={translate(locale, "xProfile")} className="text-muted transition hover:text-brand"><Twitter size={17} aria-hidden="true" /></a>
        </nav>
      </div>
    </footer>
  );
}
