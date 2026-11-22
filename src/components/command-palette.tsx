"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command, Languages, Moon, Search, Sun, X } from "lucide-react";

type Locale = "en" | "fr" | "ha";
type CommandItem = {
  id: string;
  label: string;
  keywords: string;
  group: string;
  run: () => void;
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
    home: "Accueil", about: "À propos", projects: "Projets", services: "Services", resume: "Parcours", contact: "Contact",
    language: "Changer de langue"
  },
  ha: {
    placeholder: "Nemo shafuka, ayyuka da saituna…",
    navigation: "Kewayawa",
    actions: "Ayyuka",
    preferences: "Harshe",
    empty: "Ba a sami umarni da ya dace ba.",
    hint: "Matsa ↑ ↓ · Zaɓi da ↵ · Rufe da Esc",
    themeLight: "Canza zuwa haske",
    themeDark: "Canza zuwa duhu",
    home: "Gida", about: "Game da ni", projects: "Ayyuka", services: "Ayyukan hidima", resume: "Tarihin aiki", contact: "Tuntuɓa",
    language: "Canza harshe"
  }
} as const;

const locales: { id: Locale; label: string; native: string }[] = [
  { id: "en", label: "English", native: "English" },
  { id: "fr", label: "French", native: "Français" },
  { id: "ha", label: "Hausa", native: "Hausa" }
];

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeIndex, setActiveIndex] = useState(0);
  const t = copy[locale];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("morphfolio-locale");
    const savedTheme = window.localStorage.getItem("morphfolio-theme");
    if (savedLocale === "en" || savedLocale === "fr" || savedLocale === "ha") {
      setLocale(savedLocale);
      document.documentElement.lang = savedLocale;
    }
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : currentTheme);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setQuery("");
    setActiveIndex(0);
  }, []);

  const open = useCallback(() => {
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

  const items = useMemo<CommandItem[]>(() => {
    const pages = [
      { id: "home", label: t.home, href: "/" },
      { id: "about", label: t.about, href: "/about" },
      { id: "projects", label: t.projects, href: "/projects" },
      { id: "services", label: t.services, href: "/services" },
      { id: "resume", label: t.resume, href: "/resume" },
      { id: "contact", label: t.contact, href: "/contact" }
    ];
    return [
      ...pages.map((page) => ({
        id: page.id, label: page.label, keywords: page.href, group: t.navigation,
        run: () => { router.push(page.href); close(); }
      })),
      {
        id: "theme", label: theme === "dark" ? t.themeLight : t.themeDark, keywords: "appearance theme color",
        group: t.actions,
        run: () => {
          const next = theme === "dark" ? "light" : "dark";
          document.documentElement.dataset.theme = next;
          window.localStorage.setItem("morphfolio-theme", next);
          setTheme(next);
          close();
        }
      },
      ...locales.map((item) => ({
        id: `locale-${item.id}`, label: `${item.native} — ${item.label}`,
        keywords: `${t.language} ${item.id}`, group: t.preferences,
        run: () => {
          setLocale(item.id);
          document.documentElement.lang = item.id;
          window.localStorage.setItem("morphfolio-locale", item.id);
          document.cookie = `morphfolio-locale=${item.id}; path=/; max-age=31536000; samesite=lax`;
          window.dispatchEvent(new CustomEvent("morphfolio:locale-change", { detail: item.id }));
          close();
          router.refresh();
        }
      }))
    ];
  }, [close, router, t, theme]);

  const filtered = items.filter((item) => `${item.label} ${item.keywords}`.toLowerCase().includes(query.trim().toLowerCase()));
  const groups = [t.navigation, t.actions, t.preferences];

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      filtered[activeIndex].run();
    }
  }

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    function syncTheme(event: Event) {
      const next = (event as CustomEvent<"light" | "dark">).detail;
      if (next === "light" || next === "dark") setTheme(next);
    }
    window.addEventListener("morphfolio:theme-change", syncTheme);
    return () => window.removeEventListener("morphfolio:theme-change", syncTheme);
  }, []);

  return (
    <>
      <button type="button" className="command-trigger" onClick={open} aria-label="Open command palette">
        <Command size={14} aria-hidden="true" /><span>Quick actions</span><kbd>⌘ K</kbd>
      </button>
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
            <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown} placeholder={t.placeholder} aria-label="Search commands" />
            <button type="button" className="command-close" onClick={close} aria-label="Close command palette"><X size={17} /></button>
          </div>
          <div className="command-results" role="listbox" aria-label="Commands">
            {groups.map((group) => {
              const groupItems = filtered.filter((item) => item.group === group);
              if (!groupItems.length) return null;
              return <section className="command-group" key={group}>
                <h2>{group}</h2>
                {groupItems.map((item) => {
                  const index = filtered.findIndex((candidate) => candidate.id === item.id);
                  const Icon = item.id === "theme" ? (theme === "dark" ? Sun : Moon) : item.id.startsWith("locale-") ? Languages : Command;
                  return <button type="button" role="option" aria-selected={activeIndex === index}
                    className="command-option" key={item.id}
                    onMouseEnter={() => setActiveIndex(index)} onClick={item.run}>
                    <span className="command-option-icon"><Icon size={15} aria-hidden="true" /></span>
                    <span>{item.label}</span>
                    {item.id.startsWith("locale-") && item.id === `locale-${locale}` ? <span className="command-current">Current</span> : null}
                  </button>;
                })}
              </section>;
            })}
            {filtered.length === 0 && <p className="command-empty">{t.empty}</p>}
          </div>
          <div className="command-footer"><span>{t.hint}</span><span>{pathname}</span></div>
        </div>
      </dialog>
    </>
  );
}
