import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import { profile } from "@/data/profile";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aseem Kishore | Content Strategy, Editorial Operations & AI",
    template: "%s — Aseem Kishore",
  },
  description:
    "Aseem Kishore is a content strategy and editorial operations leader who has built technology publications reaching millions of monthly readers and now develops AI-assisted workflows and SaaS products.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.name,
    title: "Aseem Kishore | Content Strategy, Editorial Operations & AI",
    description:
      "Aseem Kishore is a content strategy and editorial operations leader who has built technology publications reaching millions of monthly readers and now develops AI-assisted workflows and SaaS products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aseem Kishore | Content Strategy, Editorial Operations & AI",
    description:
      "Content strategy and editorial operations leader. Digital publishing, AI-enabled workflows, and SaaS products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JsonLd data={personJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
