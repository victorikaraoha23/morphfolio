import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { getLocale } from "@/lib/i18n";

const themeInitialization = `(() => {
  try {
    const savedTheme = window.localStorage.getItem("morphfolio-theme");
    const theme = savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export const metadata: Metadata = {
  title: {
    default: "Victor Ikaraoha — Software Developer & AI Builder",
    template: "%s | Victor Ikaraoha"
  },
  description:
    "The personal portfolio of Victor Ikaraoha, documenting independent software products, practical AI explorations, developer tools, and the process of learning through building.",
  applicationName: "MorphFolio",
  openGraph: {
    type: "website",
    title: "Victor Ikaraoha — Software Developer & AI Builder",
    description:
      "Independent software products, practical AI explorations, developer tools, and the process of learning through building.",
    siteName: "MorphFolio"
  },
  twitter: {
    card: "summary",
    title: "Victor Ikaraoha — Software Developer & AI Builder",
    description:
      "Independent software products, practical AI explorations, and the process of learning through building."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#121210" }
  ],
  colorScheme: "light dark"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Script id="morphfolio-theme-init" strategy="beforeInteractive">
          {themeInitialization}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
