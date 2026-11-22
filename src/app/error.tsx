"use client";

import { startTransition, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const english = {
  eyebrow: "Something went wrong",
  title: "This page did not load as expected.",
  instructions: "Please try again. If the problem continues, return to the portfolio and try another page.",
  retry: "Try again",
  backHome: "Back home"
};

const messages: Record<Locale, Partial<typeof english>> = {
  en: english,
  fr: {
    eyebrow: "Un problème est survenu",
    title: "Cette page ne s’est pas chargée correctement.",
    instructions: "Réessayez. Si le problème persiste, revenez au portfolio et ouvrez une autre page.",
    retry: "Réessayer",
    backHome: "Retour à l’accueil"
  },
  es: {
    eyebrow: "Algo salió mal",
    title: "Esta página no se ha cargado correctamente.",
    instructions: "Inténtalo de nuevo. Si el problema persiste, vuelve al portfolio y abre otra página.",
    retry: "Volver a intentarlo",
    backHome: "Volver al inicio"
  }
};

function subscribeToLocale(onChange: () => void) {
  window.addEventListener("morphfolio:locale-change", onChange);
  return () => window.removeEventListener("morphfolio:locale-change", onChange);
}

function readLocale(): Locale {
  const locale = document.documentElement.lang;
  return locale === "fr" || locale === "es" ? locale : "en";
}

function defaultLocale(): Locale {
  return "en";
}

export default function ErrorPage({
  error,
  reset,
  retry
}: {
  error: unknown;
  reset: () => void;
  retry?: () => void;
}) {
  const router = useRouter();
  const locale = useSyncExternalStore(subscribeToLocale, readLocale, defaultLocale);
  const t = (key: keyof typeof english) => messages[locale][key] ?? english[key];

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  function handleRetry() {
    if (retry) {
      retry();
      return;
    }

    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <main className="shell flex min-h-screen flex-col items-start justify-center py-20">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.07em] sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-muted">
        {t("instructions")}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={handleRetry} className="primary-button">
          <RefreshCw size={15} aria-hidden="true" />
          {t("retry")}
        </button>
        <Link href="/" className="secondary-button">{t("backHome")}</Link>
      </div>
    </main>
  );
}
