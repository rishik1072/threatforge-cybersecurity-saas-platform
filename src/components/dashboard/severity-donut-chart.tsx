"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { severityMeta, type Severity } from "@/lib/security-meta";

const colorBySeverity: Record<Severity, string> = {
  critical: "var(--destructive)",
  high: "var(--warning)",
  medium: "var(--info)",
  low: "var(--chart-3)",
  informational: "var(--muted-foreground)",
};

export function SeverityDonutChart({ data }: { data: Record<Severity, number> }) {
  const entries = (Object.keys(data) as Severity[])
    .map((severity) => ({ severity, value: data[severity] }))
    .filter((entry) => entry.value > 0);

  const total = entries.reduce((sum, e) => sum + e.value, 0);

  if (total === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
        No active threats recorded.
      </div>
    );
  }

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={entries}
            dataKey="value"
            nameKey="severity"
            innerRadius={62}
            outerRadius={88}
            paddingAngle={3}
            strokeWidth={0}
          >
            {entries.map((entry) => (
              <Cell key={entry.severity} fill={colorBySeverity[entry.severity]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              value as number,
              severityMeta[name as Severity]?.label ?? String(name),
            ]}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--popover-foreground)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold tabular-nums">{total}</span>
        <span className="text-[11px] text-muted-foreground">Active Threats</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
        {entries.map((entry) => (
          <div key={entry.severity} className="flex items-center gap-1.5 text-xs">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: colorBySeverity[entry.severity] }}
            />
            <span className="text-muted-foreground">{severityMeta[entry.severity].label}</span>
            <span className="ml-auto font-medium tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
