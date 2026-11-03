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
    default: "Aseem Kishore | Consulting, Content Strategy & AI Automation",
    template: "%s — Aseem Kishore",
  },
  description:
    "Consulting in content strategy, editorial operations, SEO/AEO and practical AI automation. Built on experience running technology publications since 2007.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.name,
    title: "Aseem Kishore | Consulting, Content Strategy & AI Automation",
    description:
      "Consulting in content strategy, editorial operations, SEO/AEO and practical AI automation. Built on experience running technology publications since 2007.",
    images: [
      {
        url: profile.photo,
        alt: profile.photoAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aseem Kishore | Consulting, Content Strategy & AI Automation",
    description:
      "Consulting in content strategy, editorial operations, SEO/AEO and practical AI automation. Built on experience running technology publications since 2007.",
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
