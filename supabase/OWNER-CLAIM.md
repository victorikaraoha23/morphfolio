# MorphFolio owner claim

MorphFolio's public-schema RLS policies require both:
- the authenticated JWT subject to match the row owner; and
- the signed `app_metadata.morphfolio_owner` claim to be exactly `true`.

The claim must be set by Supabase Auth Admin API. Never set it in `user_metadata`, from a browser, or from an ordinary user-facing route.

## Provision the existing owner account

1. Confirm `MORPHFOLIO_OWNER_EMAIL` matches the existing Supabase Auth account.
2. On a trusted local machine, set `NEXT_PUBLIC_SUPABASE_URL`, `MORPHFOLIO_OWNER_EMAIL`, and `SUPABASE_SERVICE_ROLE_KEY` in the shell. The service-role/secret key must never be committed or exposed to the browser.
3. Run:

   ```sh
   node scripts/provision-owner-claim.mjs
   ```

4. Confirm the script reports success. It refuses to modify anything unless exactly one existing Auth user matches the configured owner email.
5. Sign out and sign in again so Supabase issues a fresh JWT containing the claim.

The script is idempotent and preserves existing `app_metadata` keys.

## Deploy the RLS migration

Apply the migration `20261122165000_enforce_single_owner_rls` only after the owner claim has been provisioned and verified. Applying it first will intentionally deny the current owner access until the claim exists.

After applying it:
- verify the owner can read and update their own profile and application rows;
- verify a different authenticated user with no owner claim cannot read, insert, update, or delete rows;
- verify a user with `user_metadata.morphfolio_owner=true` but no matching `app_metadata` claim is denied;
- verify `anon` cannot access the tables;
- verify trusted server-side service-role operations still work.

A JWT claim change is not reflected in an already-issued access token; sign in again to refresh it.
