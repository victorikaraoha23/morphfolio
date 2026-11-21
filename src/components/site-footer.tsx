import Link from "next/link";
import { Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="section-divider py-8">
      <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Link href="/" className="flex items-center gap-3" aria-label="Victor Ikaraoha — home">
          <span className="brand-mark" aria-hidden="true">VI</span>
          <span className="text-sm font-bold tracking-[-.04em]">Victor Ikaraoha<span className="text-brand">.</span></span>
        </Link>
        <p className="text-xs text-muted">© {new Date().getFullYear()} Victor Ikaraoha. Built with intention.</p>
        <a href="https://github.com/victorikaraoha23" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-muted transition hover:text-brand"><Github size={17} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
