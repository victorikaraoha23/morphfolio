import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=auth", requestUrl.origin));
  }

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(new URL("/login?error=auth", requestUrl.origin));
  }

  const { data, error: userError } = await supabase.auth.getUser();

  if (userError || !data.user) {
    return NextResponse.redirect(new URL("/login?error=auth", requestUrl.origin));
  }

  const metadata = data.user.user_metadata;
  const displayName = typeof metadata?.full_name === "string" ? metadata.full_name : null;
  const avatarUrl = typeof metadata?.avatar_url === "string" ? metadata.avatar_url : null;

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: data.user.id,
      display_name: displayName,
      avatar_url: avatarUrl,
    },
    { onConflict: "id" },
  );

  if (profileError) {
    return NextResponse.redirect(new URL("/login?error=profile", requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}
