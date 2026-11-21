import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MorphFolio — Your work, intelligently presented",
    template: "%s | MorphFolio"
  },
  description:
    "An AI-powered developer portfolio that understands your GitHub projects and evolves how your work is presented.",
  applicationName: "MorphFolio"
};

export const viewport: Viewport = {
  themeColor: "#090b0a",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
