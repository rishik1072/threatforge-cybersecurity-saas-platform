import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bug, Radar, Server, Siren } from "lucide-react";

import { getDashboardData } from "@/server/queries";
import { buildThreatTrend } from "@/lib/trend";
import { StatCard } from "@/components/dashboard/stat-card";
import { SeverityDonutChart } from "@/components/dashboard/severity-donut-chart";
import { ThreatTrendChart } from "@/components/dashboard/threat-trend-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import { incidentStatusMeta } from "@/lib/security-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { relativeTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Security Overview",
};

export default async function DashboardOverviewPage() {
  const { stats, threats, incidents, activity } = await getDashboardData();
  const trend = buildThreatTrend(14);

  const topThreats = threats.slice(0, 5);
  const openIncidents = incidents.filter((i) => i.status !== "resolved").slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Threats" value={stats.activeThreats} icon={Radar} trend={12} tone="critical" />
        <StatCard label="Open Incidents" value={stats.openIncidents} icon={Siren} trend={-8} tone="default" />
        <StatCard label="Assets at Risk" value={`${stats.assetsAtRisk}/${stats.totalAssets}`} icon={Server} trend={4} tone="default" />
        <StatCard label="Open Vulnerabilities" value={stats.openVulnerabilities} icon={Bug} trend={-15} tone="success" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Detection Trend</CardTitle>
              <CardDescription>Threats detected vs. resolved over the last 14 days</CardDescription>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[var(--chart-1)]" /> Detected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[var(--chart-3)]" /> Resolved
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ThreatTrendChart data={trend} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Threats by Severity</CardTitle>
            <CardDescription>Distribution across active indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <SeverityDonutChart data={stats.severityBreakdown} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Top Threats</CardTitle>
              <CardDescription>Highest priority indicators tracked right now</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/threats">
                View all <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {topThreats.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{threat.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {threat.category} · {threat.affectedAssets} assets affected · {relativeTime(threat.lastSeen)}
                  </p>
                </div>
                <SeverityBadge severity={threat.severity} className="shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Activity</CardTitle>
            <CardDescription>Automated & analyst actions, in real time</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeed initialData={activity} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Open Incidents</CardTitle>
            <CardDescription>Investigations currently in progress</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/incidents">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col divide-y">
          {openIncidents.map((incident) => {
            const meta = incidentStatusMeta[incident.status];
            return (
              <div key={incident.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{incident.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {incident.assignee} · {incident.mitreTactic} · opened {relativeTime(incident.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={incident.severity} />
                  <Badge variant={meta.badge === "destructive" ? "critical" : meta.badge}>{meta.label}</Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
