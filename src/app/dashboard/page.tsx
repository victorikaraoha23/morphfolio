import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardPage() {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, username")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load your MorphFolio profile.");
  }

  const displayName = profile?.display_name || user.email || "Developer";

  return (
    <main className="min-h-screen">
      <header className="border-b border-white/[.06]">
        <div className="shell flex h-[72px] items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-[-.03em]">MorphFolio<span className="text-lime-300">.</span></Link>
          <form action={signOut}>
            <button type="submit" className="secondary-button !px-3 !py-2 text-[11px]">Sign out</button>
          </form>
        </div>
      </header>

      <div className="shell py-14 sm:py-20">
        <div className="eyebrow mb-4">Your workspace</div>
        <h1 className="text-4xl font-semibold tracking-[-.065em] sm:text-5xl">Welcome, {displayName}.</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
          Your account is connected. The next step is linking GitHub so MorphFolio can inspect selected repositories and build evidence-backed project profiles.
        </p>

        <section className="mt-10 grid gap-3 md:grid-cols-2">
          <article className="panel p-6">
            <div className="eyebrow">01 / GitHub</div>
            <h2 className="mt-4 text-xl font-semibold tracking-[-.04em]">Connect your repositories</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">GitHub App installation and repository selection are the next integration milestone.</p>
            <span className="mt-6 inline-flex rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/45">Not connected yet</span>
          </article>
          <article className="panel p-6">
            <div className="eyebrow">02 / Portfolio</div>
            <h2 className="mt-4 text-xl font-semibold tracking-[-.04em]">Review your project profiles</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">Generated descriptions will be linked to repository evidence and require your approval before publishing.</p>
            <span className="mt-6 inline-flex rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/45">Waiting for repositories</span>
          </article>
        </section>
      </div>
    </main>
  );
}
