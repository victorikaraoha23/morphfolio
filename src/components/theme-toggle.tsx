"use client";

import { useEffect } from "react";
import { SunMoon } from "lucide-react";

const labels = {
  en: "Toggle light and dark theme",
  fr: "Basculer entre les thèmes clair et sombre",
  es: "Alternar entre el tema claro y oscuro"
} as const;

export function ThemeToggle({ locale }: { locale: keyof typeof labels }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const saved = window.localStorage.getItem("morphfolio-theme");
    document.documentElement.dataset.theme =
      saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light";

    function followSystemPreference(event: MediaQueryListEvent) {
      if (!window.localStorage.getItem("morphfolio-theme")) {
        document.documentElement.dataset.theme = event.matches ? "dark" : "light";
      }
    }

    media.addEventListener("change", followSystemPreference);
    return () => media.removeEventListener("change", followSystemPreference);
  }, []);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("morphfolio-theme", next);
    window.dispatchEvent(new CustomEvent("morphfolio:theme-change", { detail: next }));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-button"
      aria-label={labels[locale]}
      title={labels[locale]}
    >
      <SunMoon size={17} aria-hidden="true" />
    </button>
  );
}
