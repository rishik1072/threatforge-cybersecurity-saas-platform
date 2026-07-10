import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  tone = "default",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  tone?: "default" | "critical" | "success";
}) {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Card className="relative overflow-hidden py-0">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p
            className={cn(
              "text-2xl font-semibold tracking-tight tabular-nums",
              tone === "critical" && "text-destructive",
              tone === "success" && "text-success",
            )}
          >
            {value}
          </p>
          {trend !== undefined ? (
            <div className="flex items-center gap-1 text-xs">
              <span
                className={cn(
                  "flex items-center gap-0.5 font-medium",
                  isPositive ? "text-destructive" : "text-success",
                )}
              >
                {isPositive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {Math.abs(trend)}%
              </span>
              <span className="text-muted-foreground">{trendLabel ?? "vs last week"}</span>
            </div>
          ) : null}
        </div>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            tone === "critical" && "bg-destructive/10 text-destructive",
            tone === "success" && "bg-success/10 text-success",
            tone === "default" && "bg-primary/10 text-primary",
          )}
        >
          <Icon className="size-4.5" />
        </span>
      </CardContent>
    </Card>
  );
}
