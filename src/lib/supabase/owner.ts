import "server-only";

const configuredOwnerEmail = process.env.MORPHFOLIO_OWNER_EMAIL?.trim().toLowerCase();

export function isPortfolioOwner(email: string | null | undefined): boolean {
  if (!configuredOwnerEmail || !email) {
    return false;
  }

  return email.trim().toLowerCase() === configuredOwnerEmail;
}

export function hasPortfolioOwnerClaim(appMetadata: unknown): boolean {
  if (typeof appMetadata !== "object" || appMetadata === null) {
    return false;
  }

  return "morphfolio_owner" in appMetadata
    && appMetadata.morphfolio_owner === true;
}
