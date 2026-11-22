"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command, Languages, Moon, Search, Sun, X } from "lucide-react";

import type { Locale } from "@/lib/i18n";

type Theme = "light" | "dark";
type CommandItem = {
  id: string;
  label: string;
  keywords: string;
  group: string;
  href?: string;
  themeAction?: true;
  locale?: Locale;
};

const copy = {
  en: {
    placeholder: "Search pages, actions, and settings…",
    navigation: "Navigation",
    actions: "Actions",
    preferences: "Language",
    empty: "No matching commands.",
    hint: "Navigate with ↑ ↓ · Select with ↵ · Close with Esc",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    home: "Home", about: "About", projects: "Projects", services: "Services", resume: "Resume", contact: "Contact",
    language: "Change language"
  },
  fr: {
    placeholder: "Rechercher des pages, actions et réglages…",
    navigation: "Navigation",
    actions: "Actions",
    preferences: "Langue",
    empty: "Aucune commande correspondante.",
    hint: "Naviguer avec ↑ ↓ · Sélectionner avec ↵ · Fermer avec Échap",
    themeLight: "Passer au thème clair",
    themeDark: "Passer au thème sombre",
    home: "Accueil", about: "À propos", projects: "Projets", services: "Collaboration", resume: "Parcours", contact: "Contact",
    language: "Changer de langue"
  },
  es: {
    placeholder: "Buscar páginas, acciones y ajustes…",
    navigation: "Navegación",
    actions: "Acciones",
    preferences: "Idioma",
    empty: "No hay comandos coincidentes.",
    hint: "Navegar con ↑ ↓ · Seleccionar con ↵ · Cerrar con Esc",
    themeLight: "Cambiar al tema claro",
    themeDark: "Cambiar al tema oscuro",
    home: "Inicio", about: "Sobre mí", projects: "Proyectos", services: "Colaboración", resume: "Trayectoria", contact: "Contacto",
    language: "Cambiar idioma"
  }
} as const;

const locales: { id: Locale; label: string; native: string }[] = [
  { id: "en", label: "English", native: "English" },
  { id: "fr", label: "French", native: "Français" },
  { id: "es", label: "Spanish", native: "Español" }
];

const pages = [
  { id: "home", href: "/" },
  { id: "about", href: "/about" },
  { id: "projects", href: "/projects" },
  { id: "services", href: "/services" },
  { id: "resume", href: "/resume" },
  { id: "contact", href: "/contact" }
] as const;

export function CommandPalette({ initialLocale }: { initialLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [theme, setTheme] = useState<Theme>("light");
  const [activeIndex, setActiveIndex] = useState(0);
  const t = copy[locale];

  const close = useCallback(() => {
    dialogRef.current?.close();
    setQuery("");
    setActiveIndex(0);
  }, []);

  const open = useCallback(() => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === "dark" ? "dark" : "light");
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  const items = useMemo<CommandItem[]>(() => [
    ...pages.map((page) => ({
      id: page.id,
      label: copy[locale][page.id],
      keywords: page.href,
      group: t.navigation,
      href: page.href
    })),
    {
      id: "theme",
      label: theme === "dark" ? t.themeLight : t.themeDark,
      keywords: "appearance theme color",
      group: t.actions,
      themeAction: true as const
    },
    ...locales.map((item) => ({
      id: `locale-${item.id}`,
      label: `${item.native} — ${item.label}`,
      keywords: `${t.language} ${item.id}`,
      group: t.preferences,
      locale: item.id
    }))
  ], [locale, t, theme]);

  const filtered = useMemo(
    () => items.filter((item) => `${item.label} ${item.keywords}`.toLowerCase().includes(query.trim().toLowerCase())),
    [items, query]
  );
  const groups = [t.navigation, t.actions, t.preferences];

  function runItem(item: CommandItem) {
    if (item.href) {
      close();
      router.push(item.href);
      return;
    }
    if (item.themeAction) {
      const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("morphfolio-theme", next);
      window.dispatchEvent(new CustomEvent("morphfolio:theme-change", { detail: next }));
      setTheme(next);
      close();
      return;
    }
    if (item.locale) {
      setLocale(item.locale);
      document.documentElement.lang = item.locale;
      window.localStorage.setItem("morphfolio-locale", item.locale);
      document.cookie = `morphfolio-locale=${item.locale}; path=/; max-age=31536000; samesite=lax`;
      window.dispatchEvent(new CustomEvent("morphfolio:locale-change", { detail: item.locale }));
      close();
      router.refresh();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      runItem(filtered[activeIndex]);
    }
  }

  useEffect(() => {
    function syncTheme(event: Event) {
      const next = (event as CustomEvent<Theme>).detail;
      if (next === "light" || next === "dark") setTheme(next);
    }
    window.addEventListener("morphfolio:theme-change", syncTheme);
    return () => window.removeEventListener("morphfolio:theme-change", syncTheme);
  }, []);

  return (
    <>
      <dialog
        ref={dialogRef}
        className="command-dialog"
        aria-label="Command palette"
        onClick={(event) => { if (event.target === dialogRef.current) close(); }}
        onClose={() => { setQuery(""); setActiveIndex(0); }}
      >
        <div className="command-panel">
          <div className="command-search">
            <Search size={18} aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              aria-label="Search commands"
            />
            <button type="button" className="command-close" onClick={close} aria-label="Close command palette"><X size={17} /></button>
          </div>
          <div className="command-results" role="listbox" aria-label="Commands">
            {groups.map((group) => {
              const groupItems = filtered.filter((item) => item.group === group);
              if (!groupItems.length) return null;
              return (
                <section className="command-group" key={group}>
                  <h2>{group}</h2>
                  {groupItems.map((item) => {
                    const index = filtered.findIndex((candidate) => candidate.id === item.id);
                    const Icon = item.id === "theme" ? (theme === "dark" ? Sun : Moon) : item.id.startsWith("locale-") ? Languages : Command;
                    return (
                      <button
                        type="button"
                        role="option"
                        aria-selected={activeIndex === index}
                        className="command-option"
                        key={item.id}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => runItem(item)}
                      >
                        <span className="command-option-icon"><Icon size={15} aria-hidden="true" /></span>
                        <span>{item.label}</span>
                        {item.id.startsWith("locale-") && item.id === `locale-${locale}` ? <span className="command-current">Current</span> : null}
                      </button>
                    );
                  })}
                </section>
              );
            })}
            {filtered.length === 0 && <p className="command-empty">{t.empty}</p>}
          </div>
          <div className="command-footer"><span>{t.hint}</span><span>{pathname}</span></div>
        </div>
      </dialog>
    </>
  );
}
