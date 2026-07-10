import {
  pgTable,
  text,
  timestamp,
  integer,
  doublePrecision,
  pgEnum,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const severityEnum = pgEnum("severity", [
  "critical",
  "high",
  "medium",
  "low",
  "informational",
]);

export const threatStatusEnum = pgEnum("threat_status", [
  "active",
  "contained",
  "mitigated",
  "monitoring",
]);

export const incidentStatusEnum = pgEnum("incident_status", [
  "open",
  "investigating",
  "contained",
  "resolved",
]);

export const assetTypeEnum = pgEnum("asset_type", [
  "server",
  "workstation",
  "cloud",
  "container",
  "network_device",
  "mobile",
]);

export const assetStatusEnum = pgEnum("asset_status", [
  "healthy",
  "at_risk",
  "compromised",
  "offline",
]);

export const vulnStatusEnum = pgEnum("vuln_status", [
  "open",
  "patching",
  "patched",
  "accepted_risk",
]);

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

export const threats = pgTable("threats", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  severity: severityEnum("severity").notNull(),
  status: threatStatusEnum("status").notNull().default("active"),
  source: text("source").notNull(),
  indicator: text("indicator").notNull(),
  indicatorType: text("indicator_type").notNull(),
  description: text("description").notNull(),
  confidence: integer("confidence").notNull().default(50),
  affectedAssets: integer("affected_assets").notNull().default(0),
  firstSeen: timestamp("first_seen", { withTimezone: true }).notNull().defaultNow(),
  lastSeen: timestamp("last_seen", { withTimezone: true }).notNull().defaultNow(),
});

export const incidents = pgTable("incidents", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  severity: severityEnum("severity").notNull(),
  status: incidentStatusEnum("status").notNull().default("open"),
  assignee: text("assignee").notNull(),
  description: text("description").notNull(),
  mitreTactic: text("mitre_tactic").notNull(),
  affectedAssets: integer("affected_assets").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: assetTypeEnum("type").notNull(),
  ipAddress: text("ip_address").notNull(),
  os: text("os").notNull(),
  owner: text("owner").notNull(),
  riskScore: integer("risk_score").notNull().default(0),
  status: assetStatusEnum("status").notNull().default("healthy"),
  agentInstalled: boolean("agent_installed").notNull().default(true),
  lastSeen: timestamp("last_seen", { withTimezone: true }).notNull().defaultNow(),
});

export const vulnerabilities = pgTable("vulnerabilities", {
  id: uuid("id").primaryKey().defaultRandom(),
  cveId: text("cve_id").notNull(),
  title: text("title").notNull(),
  severity: severityEnum("severity").notNull(),
  cvssScore: doublePrecision("cvss_score").notNull(),
  status: vulnStatusEnum("status").notNull().default("open"),
  affectedAsset: text("affected_asset").notNull(),
  packageName: text("package_name").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  target: text("target").notNull(),
  severity: severityEnum("severity").notNull().default("informational"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Threat = typeof threats.$inferSelect;
export type NewThreat = typeof threats.$inferInsert;
export type Incident = typeof incidents.$inferSelect;
export type NewIncident = typeof incidents.$inferInsert;
export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;
export type Vulnerability = typeof vulnerabilities.$inferSelect;
export type NewVulnerability = typeof vulnerabilities.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
