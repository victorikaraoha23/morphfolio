"use client";

import { Suspense, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

const loginErrorMessages: Record<string, string> = {
  auth: "The sign-in link is invalid or has expired. Request a new link.",
  unauthorized: "This account is not authorized to manage this portfolio.",
  "owner-claim": "Your owner account is recognized, but its database access has not been provisioned yet.",
  profile: "Your profile could not be initialized. Please try signing in again.",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dismissUrlError, setDismissUrlError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const urlError = loginErrorMessages[searchParams.get("error") ?? ""];
  const visibleError = error ?? (dismissUrlError ? null : urlError ?? null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setDismissUrlError(true);
    setIsSending(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signInError) {
        throw signInError;
      }

      setMessage("Check your inbox. We sent you a secure sign-in link.");
    } catch {
      setError("We couldn't send the sign-in link. Check the email address and try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[600px]" />
      <section className="surface-card relative z-10 w-full max-w-md p-7 sm:p-9">
        <Link href="/" className="eyebrow">MorphFolio</Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-.06em]">Owner sign-in.</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Use a passwordless email link to manage your repositories, project profiles, and portfolio.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label htmlFor="email" className="block text-xs font-medium text-muted">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="form-input"
          />
          <button type="submit" disabled={isSending} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60">
            {isSending ? "Sending link..." : "Email me a sign-in link"}
          </button>
        </form>

        {message ? <p role="status" className="mt-5 rounded-xl border notice-success">{message}</p> : null}
        {visibleError ? <p role="alert" className="mt-5 rounded-xl border notice-error">{visibleError}</p> : null}

        <p className="mt-8 text-xs text-muted">
          Your session is secured by Supabase Auth. <Link href="/" className="text-brand hover:underline">Return to portfolio</Link>
        </p>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
