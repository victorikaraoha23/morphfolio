"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

import { projects } from "@/lib/portfolio/projects";
import { getLocalizedProject } from "@/lib/portfolio/project-translations";

const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

export function ProjectsExplorer() {
  const [locale, setLocale] = useState<"en" | "fr" | "ha">("en");
  const labels = {
    en: { search: "Search projects, technologies, or topics", showing: "Showing", of: "of", none: "No projects found", try: "Try another search term or category.", clear: "Clear filters", details: "Read project details", searchLabel: "Search projects", clearSearch: "Clear search", filterLabel: "Filter projects by category", projectCount: "projects", all: "All", ai: "AI Products", tools: "Developer Tools", agents: "AI Agents" },
    fr: { search: "Rechercher des projets, technologies ou sujets", showing: "Affichage de", of: "sur", none: "Aucun projet trouvé", try: "Essayez un autre terme ou une autre catégorie.", clear: "Effacer les filtres", details: "Voir les détails du projet", searchLabel: "Rechercher des projets", clearSearch: "Effacer la recherche", filterLabel: "Filtrer les projets par catégorie", projectCount: "projets", all: "Tous", ai: "Produits IA", tools: "Outils pour développeurs", agents: "Agents IA" },
    ha: { search: "Nemo ayyuka, fasahohi ko batutuwa", showing: "Ana nuna", of: "cikin", none: "Ba a sami aiki ba", try: "Gwada wata kalma ko rukuni.", clear: "Share matattara", details: "Karanta cikakken bayani", searchLabel: "Nemo ayyuka", clearSearch: "Share bincike", filterLabel: "Tace ayyuka bisa rukuni", projectCount: "ayyuka", all: "Duka", ai: "Kayayyakin AI", tools: "Kayan aikin masu haɓakawa", agents: "Wakilan AI" }
  } as const;
  const t = labels[locale];
  const localizedProjects = projects.map((project) => getLocalizedProject(project, locale));
  useEffect(() => {
    const saved = window.localStorage.getItem("morphfolio-locale");
    if (saved === "fr" || saved === "ha") setLocale(saved);
    const sync = (event: Event) => {
      const next = (event as CustomEvent<"en" | "fr" | "ha">).detail;
      if (next === "en" || next === "fr" || next === "ha") setLocale(next);
    };
    window.addEventListener("morphfolio:locale-change", sync);
    return () => window.removeEventListener("morphfolio:locale-change", sync);
  }, []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return localizedProjects.filter((project) => {
      const original = projects.find((item) => item.slug === project.slug)!;
      const matchesCategory = category === "All" || original.category === category;
      const searchableText = [project.name, project.description, project.category, ...project.tags].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">{t.searchLabel}</span>
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} className="w-full rounded-full border border-line bg-background py-3 pl-11 pr-11 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-brand" />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label={t.clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted hover:text-foreground"><X size={15} aria-hidden="true" /></button> : null}
        </label>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" aria-label={t.filterLabel}>
        {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${category === item ? "border-brand bg-brand-soft text-brand" : "border-line bg-panel text-muted hover:border-brand hover:text-foreground"}`}>{item === "All" ? t.all : item === "AI Products" ? t.ai : item === "Developer Tools" ? t.tools : item === "AI Agents" ? t.agents : item}</button>)}
      </div>
      <p className="mt-6 text-xs text-muted" aria-live="polite">{t.showing} {filteredProjects.length} {t.of} {projects.length} {t.projectCount}</p>
      {filteredProjects.length ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <article key={project.slug} className="project-card">
              <div className="flex items-start justify-between gap-3"><span className="eyebrow">{project.number} / {project.category}</span><span className="status-pill">{project.status}</span></div>
              <h2 className="mt-8 text-2xl font-semibold tracking-[-.055em]">{project.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <Link href={`/projects/${project.slug}`} className="mt-auto inline-flex items-center gap-2 border-t border-line pt-5 text-xs font-bold text-brand"><span className="mt-6">{t.details}</span><ArrowUpRight size={13} className="mt-6" aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="surface-card mt-5 px-6 py-12 text-center">
          <h2 className="text-lg font-semibold">{t.none}</h2>
          <p className="mt-2 text-sm text-muted">{t.try}</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="secondary-button mt-5">{t.clear} <ArrowUpRight size={13} aria-hidden="true" /></button>
        </div>
      )}
    </div>
  );
}
