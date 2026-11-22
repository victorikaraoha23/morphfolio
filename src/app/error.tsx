"use client";

import { useEffect, useSyncExternalStore } from "react";
import { RefreshCw } from "lucide-react";

function subscribeToDocumentLanguage(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  return () => observer.disconnect();
}

function getDocumentLocale(): "en" | "fr" | "es" {
  const value = document.documentElement.lang;
  return value === "fr" || value === "es" ? value : "en";
}

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useSyncExternalStore(subscribeToDocumentLanguage, getDocumentLocale, () => "en");
  const copy = {
    en: { title: "Something went wrong", heading: "This page did not load as expected.", body: "Please try again. If the problem continues, return to the portfolio and try another page.", retry: "Try again" },
    fr: { title: "Une erreur s'est produite", heading: "Cette page ne s'est pas chargée comme prévu.", body: "Veuillez réessayer. Si le problème persiste, revenez au portfolio et ouvrez une autre page.", retry: "Réessayer" },
    es: { title: "Se ha producido un error", heading: "Esta página no se ha cargado como se esperaba.", body: "Inténtalo de nuevo. Si el problema continúa, vuelve al portfolio y abre otra página.", retry: "Intentar de nuevo" }
  } as const;
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="shell flex min-h-screen flex-col items-start justify-center py-20">
      <p className="eyebrow">{copy[locale].title}</p>
      <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.07em] sm:text-6xl">
        {copy[locale].heading}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-muted">
        {copy[locale].body}
      </p>
      <button type="button" onClick={reset} className="primary-button mt-8">
        <RefreshCw size={15} aria-hidden="true" />
        {copy[locale].retry}
      </button>
    </main>
  );
}
