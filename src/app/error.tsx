"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="shell flex min-h-screen flex-col items-start justify-center py-20">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.07em] sm:text-6xl">
        This page did not load as expected.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-muted">
        Please try again. If the problem continues, return to the portfolio and try another page.
      </p>
      <button type="button" onClick={reset} className="primary-button mt-8">
        <RefreshCw size={15} aria-hidden="true" />
        Try again
      </button>
    </main>
  );
}
