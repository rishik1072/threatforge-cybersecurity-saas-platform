import Link from "next/link";
import { Globe, Mail, Rss } from "lucide-react";

import { Logo } from "@/components/layout/logo";

const columns = [
  {
    title: "Platform",
    links: ["Threat Intelligence", "Incident Response", "Vulnerability Management", "Asset Inventory", "Reporting"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Security", "Trust Center", "Blog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Status", "Changelog", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "SOC 2 Report", "GDPR"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-6 lg:px-8">
        <div className="col-span-2 flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            AI-powered threat intelligence and security operations for teams who can&apos;t afford to miss a
            signal.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Blog" className="text-muted-foreground hover:text-foreground">
              <Rss className="size-4.5" />
            </a>
            <a href="#" aria-label="Website" className="text-muted-foreground hover:text-foreground">
              <Globe className="size-4.5" />
            </a>
            <a href="#" aria-label="Contact" className="text-muted-foreground hover:text-foreground">
              <Mail className="size-4.5" />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} ThreatForge, Inc. All rights reserved.</p>
          <p>Made for security teams who never sleep.</p>
        </div>
      </div>
    </footer>
  );
}
