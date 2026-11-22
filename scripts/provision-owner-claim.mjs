import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const adminKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const ownerEmail = process.env.MORPHFOLIO_OWNER_EMAIL?.trim().toLowerCase();

if (!supabaseUrl || !adminKey || !ownerEmail) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL, MORPHFOLIO_OWNER_EMAIL, and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) before running this script.",
  );
}

const supabase = createClient(supabaseUrl, adminKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const matches = [];
const perPage = 100;
for (let page = 1; ; page += 1) {
  const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
  if (error) throw new Error(`Unable to list Auth users: ${error.message}`);

  matches.push(...data.users.filter(
    (user) => user.email?.trim().toLowerCase() === ownerEmail,
  ));

  if (data.users.length < perPage) break;
}

if (matches.length !== 1) {
  throw new Error(
    `Expected exactly one existing Auth user for MORPHFOLIO_OWNER_EMAIL; found ${matches.length}. No changes were made.`,
  );
}

const user = matches[0];
const existingMetadata = user.app_metadata ?? {};

if (existingMetadata.morphfolio_owner === true) {
  console.log("Owner claim is already provisioned. No change needed.");
} else {
  const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...existingMetadata,
      morphfolio_owner: true,
    },
  });

  if (error) throw new Error(`Unable to provision owner claim: ${error.message}`);
  if (data.user?.app_metadata?.morphfolio_owner !== true) {
    throw new Error("Supabase did not return the expected owner claim after update.");
  }

  console.log("Owner claim provisioned successfully.");
}

console.log("Sign out of MorphFolio and sign in again to receive a JWT with the updated app_metadata claim.");
