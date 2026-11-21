import type { Metadata, Viewport } from "next";
import "./globals.css";

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
