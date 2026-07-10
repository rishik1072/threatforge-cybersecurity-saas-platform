import "server-only";
import { desc } from "drizzle-orm";

import { db } from "@/db";
import { activityLogs, assets, incidents, threats, vulnerabilities } from "@/db/schema";
import type { Severity } from "@/lib/security-meta";

export async function listThreats() {
  return db.select().from(threats).orderBy(desc(threats.lastSeen));
}

export async function listIncidents() {
  return db.select().from(incidents).orderBy(desc(incidents.createdAt));
}

export async function listAssets() {
  return db.select().from(assets).orderBy(desc(assets.riskScore));
}

export async function listVulnerabilities() {
  return db.select().from(vulnerabilities).orderBy(desc(vulnerabilities.cvssScore));
}

export async function listActivity(limit = 20) {
  return db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(limit);
}

export interface DashboardStats {
  totalThreats: number;
  activeThreats: number;
  openIncidents: number;
  criticalIncidents: number;
  assetsAtRisk: number;
  totalAssets: number;
  openVulnerabilities: number;
  criticalVulnerabilities: number;
  avgRiskScore: number;
  severityBreakdown: Record<Severity, number>;
}

export async function getDashboardData() {
  const [allThreats, allIncidents, allAssets, allVulns, activity] = await Promise.all([
    listThreats(),
    listIncidents(),
    listAssets(),
    listVulnerabilities(),
    listActivity(10),
  ]);

  const severityBreakdown: Record<Severity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    informational: 0,
  };

  for (const threat of allThreats) {
    severityBreakdown[threat.severity] += 1;
  }

  const stats: DashboardStats = {
    totalThreats: allThreats.length,
    activeThreats: allThreats.filter((t) => t.status === "active").length,
    openIncidents: allIncidents.filter((i) => i.status !== "resolved").length,
    criticalIncidents: allIncidents.filter((i) => i.severity === "critical" && i.status !== "resolved").length,
    assetsAtRisk: allAssets.filter((a) => a.status === "at_risk" || a.status === "compromised").length,
    totalAssets: allAssets.length,
    openVulnerabilities: allVulns.filter((v) => v.status === "open" || v.status === "patching").length,
    criticalVulnerabilities: allVulns.filter((v) => v.severity === "critical").length,
    avgRiskScore: allAssets.length
      ? Math.round(allAssets.reduce((sum, a) => sum + a.riskScore, 0) / allAssets.length)
      : 0,
    severityBreakdown,
  };

  return { stats, threats: allThreats, incidents: allIncidents, assets: allAssets, vulnerabilities: allVulns, activity };
}
