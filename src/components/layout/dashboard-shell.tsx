"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopNav } from "@/components/layout/top-nav";

const pageMeta: Record<string, { title: string; description?: string }> = {
  "/dashboard": {
    title: "Security Overview",
    description: "Real-time posture across your entire attack surface",
  },
  "/dashboard/threats": {
    title: "Threat Intelligence",
    description: "Correlated indicators and adversary activity",
  },
  "/dashboard/incidents": {
    title: "Incidents",
    description: "Track, triage, and respond to active investigations",
  },
  "/dashboard/assets": {
    title: "Asset Inventory",
    description: "Every endpoint, workload, and identity we protect",
  },
  "/dashboard/vulnerabilities": {
    title: "Vulnerability Management",
    description: "Prioritized exposure across your infrastructure",
  },
  "/dashboard/reports": {
    title: "Reports & Analytics",
    description: "Executive-ready security posture reporting",
  },
  "/dashboard/settings": {
    title: "Settings",
    description: "Manage your organization, team, and integrations",
  },
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Dashboard" };

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border lg:block">
        <SidebarNav />
      </aside>

      <div className="flex min-h-svh w-full flex-1 flex-col lg:pl-64">
        <TopNav title={meta.title} description={meta.description} />
        <main className="flex-1 bg-grid">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
