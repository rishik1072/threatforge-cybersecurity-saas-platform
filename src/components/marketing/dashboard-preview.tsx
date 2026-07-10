import { Radar, Siren, Server, Bug, ShieldHalf } from "lucide-react";

import { severityMeta } from "@/lib/security-meta";

const previewStats = [
  { label: "Active Threats", value: "27", icon: Radar, tone: "text-destructive" },
  { label: "Open Incidents", value: "8", icon: Siren, tone: "text-primary" },
  { label: "Assets Monitored", value: "1,204", icon: Server, tone: "text-info" },
  { label: "Critical CVEs", value: "5", icon: Bug, tone: "text-warning" },
];

const bars = [42, 58, 39, 71, 63, 80, 52, 66, 74, 88, 61, 69, 77, 91];

export function DashboardPreview() {
  return (
    <div className="glow-primary mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-card text-left shadow-2xl">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-warning/70" />
        <span className="size-2.5 rounded-full bg-success/70" />
        <span className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldHalf className="size-3.5" /> app.threatforge.io/dashboard
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-[220px_1fr]">
        <div className="hidden flex-col gap-1 bg-sidebar p-3 text-sidebar-foreground md:flex">
          {["Overview", "Threat Intel", "Incidents", "Assets", "Vulnerabilities", "Reports"].map((item, i) => (
            <div
              key={item}
              className={`rounded-md px-2.5 py-2 text-xs font-medium ${
                i === 0 ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/60"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="bg-card p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {previewStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border p-3">
                <stat.icon className={`size-4 ${stat.tone}`} />
                <p className="mt-2 text-lg font-semibold tabular-nums">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Detection trend — last 14 days</p>
              <span className="flex items-center gap-1 text-[11px] font-medium text-success">
                <span className="size-1.5 rounded-full bg-success" /> Live
              </span>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {bars.map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/70 to-primary"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(["critical", "high"] as const).map((severity) => (
              <div key={severity} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: severityMeta[severity].color }}
                  />
                  <span className="text-xs font-medium">{severityMeta[severity].label} severity</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {severity === "critical" ? "6 active" : "12 active"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
