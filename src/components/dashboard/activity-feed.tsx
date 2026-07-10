"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Bot, ShieldCheck, UserRound } from "lucide-react";

import type { ActivityLog } from "@/db/schema";
import { severityMeta } from "@/lib/security-meta";
import { relativeTime, cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchActivity(): Promise<ActivityLog[]> {
  const res = await fetch("/api/activity");
  if (!res.ok) throw new Error("Failed to load activity");
  const data = (await res.json()) as { activity: ActivityLog[] };
  return data.activity;
}

function actorIcon(actor: string) {
  if (actor.toLowerCase().includes("ai") || actor.toLowerCase().includes("engine")) return Bot;
  if (actor.toLowerCase().includes("agent") || actor.toLowerCase().includes("scanner") || actor.toLowerCase().includes("waf") || actor.toLowerCase().includes("sensor") || actor.toLowerCase().includes("engine") || actor.toLowerCase().includes("policy"))
    return ShieldCheck;
  return UserRound;
}

export function ActivityFeed({ initialData }: { initialData: ActivityLog[] }) {
  const { data, isLoading } = useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivity,
    initialData,
    refetchInterval: 20_000,
  });

  const items = data ?? [];

  return (
    <ScrollArea className="h-[420px] pr-3">
      <ol className="relative flex flex-col gap-5 border-l border-border pl-5">
        {isLoading && items.length === 0
          ? Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex flex-col gap-2">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </li>
            ))
          : items.map((item) => {
              const Icon = actorIcon(item.actor);
              const meta = severityMeta[item.severity];
              return (
                <li key={item.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[26px] flex size-4 items-center justify-center rounded-full ring-4 ring-background",
                      item.severity === "critical" || item.severity === "high"
                        ? "bg-destructive/15 text-destructive"
                        : "bg-primary/15 text-primary",
                    )}
                  >
                    <Icon className="size-2.5" />
                  </span>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{item.actor}</span>{" "}
                      <span className="text-muted-foreground">{item.action}</span>
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate font-mono text-[11px]">{item.target}</span>
                    <span aria-hidden>·</span>
                    <span className="shrink-0">{relativeTime(item.createdAt)}</span>
                    {(item.severity === "critical" || item.severity === "high") && (
                      <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: meta.color }}>
                        <AlertCircle className="size-3" />
                        {meta.label}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
      </ol>
    </ScrollArea>
  );
}
