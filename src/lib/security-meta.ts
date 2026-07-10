import type { LucideIcon } from "lucide-react";
import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  ShieldX,
  Info,
  CircleDot,
  CircleCheck,
  CircleSlash,
  Eye,
  Server,
  Laptop,
  Cloud,
  Box,
  Router,
  Smartphone,
} from "lucide-react";

export type Severity = "critical" | "high" | "medium" | "low" | "informational";

export const severityOrder: Severity[] = ["critical", "high", "medium", "low", "informational"];

export const severityMeta: Record<
  Severity,
  { label: string; badge: "critical" | "warning" | "info" | "muted"; color: string; icon: LucideIcon }
> = {
  critical: { label: "Critical", badge: "critical", color: "var(--destructive)", icon: ShieldX },
  high: { label: "High", badge: "warning", color: "var(--warning)", icon: ShieldAlert },
  medium: { label: "Medium", badge: "info", color: "var(--info)", icon: ShieldQuestion },
  low: { label: "Low", badge: "muted", color: "var(--muted-foreground)", icon: ShieldCheck },
  informational: { label: "Info", badge: "muted", color: "var(--muted-foreground)", icon: Info },
};

export type ThreatStatus = "active" | "contained" | "mitigated" | "monitoring";

export const threatStatusMeta: Record<ThreatStatus, { label: string; badge: "destructive" | "warning" | "success" | "info" }> = {
  active: { label: "Active", badge: "destructive" },
  contained: { label: "Contained", badge: "warning" },
  mitigated: { label: "Mitigated", badge: "success" },
  monitoring: { label: "Monitoring", badge: "info" },
};

export type IncidentStatus = "open" | "investigating" | "contained" | "resolved";

export const incidentStatusMeta: Record<
  IncidentStatus,
  { label: string; badge: "destructive" | "warning" | "info" | "success"; icon: LucideIcon }
> = {
  open: { label: "Open", badge: "destructive", icon: CircleDot },
  investigating: { label: "Investigating", badge: "warning", icon: Eye },
  contained: { label: "Contained", badge: "info", icon: CircleSlash },
  resolved: { label: "Resolved", badge: "success", icon: CircleCheck },
};

export type AssetType = "server" | "workstation" | "cloud" | "container" | "network_device" | "mobile";

export const assetTypeMeta: Record<AssetType, { label: string; icon: LucideIcon }> = {
  server: { label: "Server", icon: Server },
  workstation: { label: "Workstation", icon: Laptop },
  cloud: { label: "Cloud Resource", icon: Cloud },
  container: { label: "Container", icon: Box },
  network_device: { label: "Network Device", icon: Router },
  mobile: { label: "Mobile", icon: Smartphone },
};

export type AssetStatus = "healthy" | "at_risk" | "compromised" | "offline";

export const assetStatusMeta: Record<AssetStatus, { label: string; badge: "success" | "warning" | "destructive" | "muted" }> = {
  healthy: { label: "Healthy", badge: "success" },
  at_risk: { label: "At Risk", badge: "warning" },
  compromised: { label: "Compromised", badge: "destructive" },
  offline: { label: "Offline", badge: "muted" },
};

export type VulnStatus = "open" | "patching" | "patched" | "accepted_risk";

export const vulnStatusMeta: Record<VulnStatus, { label: string; badge: "destructive" | "warning" | "success" | "muted" }> = {
  open: { label: "Open", badge: "destructive" },
  patching: { label: "Patching", badge: "warning" },
  patched: { label: "Patched", badge: "success" },
  accepted_risk: { label: "Accepted Risk", badge: "muted" },
};
