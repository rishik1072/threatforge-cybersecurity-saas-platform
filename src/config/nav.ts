import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ShieldAlert,
  Siren,
  Server,
  Bug,
  FileBarChart,
  Settings,
  Radar,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const primaryNav: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Threat Intel", href: "/dashboard/threats", icon: Radar },
  { title: "Incidents", href: "/dashboard/incidents", icon: Siren },
  { title: "Assets", href: "/dashboard/assets", icon: Server },
  { title: "Vulnerabilities", href: "/dashboard/vulnerabilities", icon: Bug },
  { title: "Reports", href: "/dashboard/reports", icon: FileBarChart },
];

export const secondaryNav: NavItem[] = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const orgName = "Nimbus Financial Group";
export const orgPlan = "Enterprise";
