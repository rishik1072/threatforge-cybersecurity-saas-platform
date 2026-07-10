import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://threatforge.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ThreatForge — AI-Powered Threat Intelligence & Security Operations Platform",
    template: "%s · ThreatForge",
  },
  description:
    "ThreatForge unifies threat intelligence, incident response, vulnerability management, and asset visibility into one AI-powered security operations platform.",
  keywords: [
    "threat intelligence",
    "SOC platform",
    "cybersecurity SaaS",
    "XDR",
    "incident response",
    "vulnerability management",
    "security operations",
  ],
  authors: [{ name: "ThreatForge" }],
  applicationName: "ThreatForge",
  category: "technology",
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    title: "ThreatForge — AI-Powered Threat Intelligence & Security Operations Platform",
    description:
      "Detect, investigate, and respond to threats across your entire attack surface in real time.",
    siteName: "ThreatForge",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreatForge — AI-Powered Threat Intelligence & Security Operations Platform",
    description:
      "Detect, investigate, and respond to threats across your entire attack surface in real time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
