"use client";

import * as React from "react";
import { Search } from "lucide-react";

import type { Threat } from "@/db/schema";
import { severityMeta, severityOrder, threatStatusMeta, type Severity } from "@/lib/security-meta";
import { relativeTime, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThreatsTable({ threats }: { threats: Threat[] }) {
  const [query, setQuery] = React.useState("");
  const [severity, setSeverity] = React.useState<Severity | "all">("all");

  const filtered = React.useMemo(() => {
    return threats
      .filter((t) => (severity === "all" ? true : t.severity === severity))
      .filter((t) =>
        query.trim() === ""
          ? true
          : [t.name, t.category, t.indicator, t.source].join(" ").toLowerCase().includes(query.toLowerCase()),
      );
  }, [threats, query, severity]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search threats, IOCs, sources…"
            className="pl-8"
          />
        </div>
        <Select value={severity} onValueChange={(v) => setSeverity(v as Severity | "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All severities</SelectItem>
            {severityOrder.map((s) => (
              <SelectItem key={s} value={s}>
                {severityMeta[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Threat</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Indicator</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Assets</TableHead>
              <TableHead>Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-sm text-muted-foreground">
                  No threats match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((threat) => (
                <TableRow key={threat.id}>
                  <TableCell className="max-w-[280px] whitespace-normal">
                    <p className="font-medium leading-tight">{threat.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{threat.category} · {threat.source}</p>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={threat.severity} />
                  </TableCell>
                  <TableCell>
                    <Badge variant={threatStatusMeta[threat.status].badge === "destructive" ? "critical" : threatStatusMeta[threat.status].badge}>
                      {threatStatusMeta[threat.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-mono text-xs">{threat.indicatorType}</span>
                      </TooltipTrigger>
                      <TooltipContent>{threat.indicator}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium tabular-nums">{threat.confidence}%</span>
                  </TableCell>
                  <TableCell className="tabular-nums">{threat.affectedAssets}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-xs text-muted-foreground">{relativeTime(threat.lastSeen)}</span>
                      </TooltipTrigger>
                      <TooltipContent>{formatDateTime(threat.lastSeen)}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {threats.length} tracked threats
      </p>
    </div>
  );
}
