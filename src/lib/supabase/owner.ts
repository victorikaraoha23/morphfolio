import "server-only";

const configuredOwnerEmail = process.env.MORPHFOLIO_OWNER_EMAIL?.trim().toLowerCase();

export function isPortfolioOwner(email: string | null | undefined): boolean {
  if (!configuredOwnerEmail || !email) {
    return false;
  }

  return email.trim().toLowerCase() === configuredOwnerEmail;
}
