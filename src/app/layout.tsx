import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: "Victor Ikaraoha — Software Developer & AI Engineering",
    template: "%s | MorphFolio"
  },
  description:
    "The personal portfolio of Victor Ikaraoha: software projects, AI engineering explorations, developer tools, and practical software building.",
  applicationName: "MorphFolio"
};

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
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
      <body>{children}</body>
    </html>
  );
}
