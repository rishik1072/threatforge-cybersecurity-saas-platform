import type { Metadata } from "next";
import { Download } from "lucide-react";

import { getDashboardData } from "@/server/queries";
import { buildThreatTrend } from "@/lib/trend";
import { ThreatTrendChart } from "@/components/dashboard/threat-trend-chart";
import { CategoryBarChart, type CategoryDatum } from "@/components/dashboard/category-bar-chart";
import { SeverityDonutChart } from "@/components/dashboard/severity-donut-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = { title: "Reports & Analytics" };

export default async function ReportsPage() {
  const { threats, stats, vulnerabilities } = await getDashboardData();
  const trend = buildThreatTrend(30, 7);

  const categoryTotals = new Map<string, number>();
  for (const threat of threats) {
    categoryTotals.set(threat.category, (categoryTotals.get(threat.category) ?? 0) + 1);
  }
  const categoryData: CategoryDatum[] = Array.from(categoryTotals.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const avgCvss = vulnerabilities.length
    ? (vulnerabilities.reduce((sum, v) => sum + v.cvssScore, 0) / vulnerabilities.length).toFixed(1)
    : "0.0";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Executive Summary</h2>
          <p className="text-sm text-muted-foreground">30-day security posture report for your organization</p>
        </div>
        <Button variant="outline" size="sm">
          <Download /> Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Mean Time to Contain</p>
            <p className="mt-1 text-2xl font-semibold">2h 14m</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Mean Time to Resolve</p>
            <p className="mt-1 text-2xl font-semibold">9h 47m</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Avg. CVSS Score</p>
            <p className="mt-1 text-2xl font-semibold">{avgCvss}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Fleet Avg. Risk Score</p>
            <p className="mt-1 text-2xl font-semibold">{stats.avgRiskScore}/100</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>30-Day Detection Trend</CardTitle>
            <CardDescription>Threats detected and resolved across the reporting period</CardDescription>
          </CardHeader>
          <CardContent>
            <ThreatTrendChart data={trend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Severity Mix</CardTitle>
            <CardDescription>Current threat landscape composition</CardDescription>
          </CardHeader>
          <CardContent>
            <SeverityDonutChart data={stats.severityBreakdown} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Threats by Category</CardTitle>
          <CardDescription>Volume of tracked indicators grouped by attack category</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryBarChart data={categoryData} />
        </CardContent>
      </Card>
    </div>
  );
}
