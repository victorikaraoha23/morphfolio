import { getLocale, translate } from "@/lib/i18n";

export default async function Loading() {
  const locale = await getLocale();
  return (
    <main className="shell min-h-[65vh] py-16 sm:py-24" aria-label={translate(locale, "loading")}>
      <div className="h-3 w-24 animate-pulse rounded bg-panel" />
      <div className="mt-8 h-12 max-w-xl animate-pulse rounded-xl bg-panel sm:h-16" />
      <div className="mt-5 h-4 max-w-2xl animate-pulse rounded bg-panel" />
      <div className="mt-3 h-4 max-w-xl animate-pulse rounded bg-panel" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="h-56 animate-pulse rounded-2xl border border-line bg-panel" />
        <div className="h-56 animate-pulse rounded-2xl border border-line bg-panel" />
      </div>
    </main>
  );
}
