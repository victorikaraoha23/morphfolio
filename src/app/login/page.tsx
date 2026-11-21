"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setIsSending(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[600px]" />
      <section className="panel relative z-10 w-full max-w-md p-7 sm:p-9">
        <Link href="/" className="eyebrow">MorphFolio</Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-.06em]">Sign in to your workspace.</h1>
        <p className="mt-3 text-sm leading-6 text-white/45">
          Use a passwordless email link to manage your repositories, project profiles, and portfolio.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label htmlFor="email" className="block text-xs font-medium text-white/65">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/50"
          />
          <button type="submit" disabled={isSending} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60">
            {isSending ? "Sending link..." : "Email me a sign-in link"}
          </button>
        </form>

        {message ? <p role="status" className="mt-5 rounded-xl border border-lime-300/20 bg-lime-300/[.06] p-3 text-sm text-lime-100">{message}</p> : null}
        {error ? <p role="alert" className="mt-5 rounded-xl border border-red-300/20 bg-red-300/[.06] p-3 text-sm text-red-100">{error}</p> : null}

        <p className="mt-8 text-xs text-white/35">
          Your session is secured by Supabase Auth. <Link href="/" className="text-white/65 hover:text-lime-200">Return to portfolio</Link>
        </p>
      </section>
    </main>
  );
}
