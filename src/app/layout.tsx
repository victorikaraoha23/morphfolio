import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Victor Ikaraoha — Software Builder & AI Engineering",
    template: "%s | MorphFolio"
  },
  description:
    "Selected software projects and explorations in AI engineering, automation, and autonomous software.",
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
