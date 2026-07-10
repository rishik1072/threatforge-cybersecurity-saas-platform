"use client";

import * as React from "react";
import { Search } from "lucide-react";

import type { Incident } from "@/db/schema";
import { incidentStatusMeta, type IncidentStatus } from "@/lib/security-meta";
import { relativeTime, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SeverityBadge } from "@/components/dashboard/severity-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const statuses: IncidentStatus[] = ["open", "investigating", "contained", "resolved"];

export function IncidentsTable({ incidents }: { incidents: Incident[] }) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<IncidentStatus | "all">("all");

  const filtered = React.useMemo(() => {
    return incidents
      .filter((i) => (status === "all" ? true : i.status === status))
      .filter((i) =>
        query.trim() === ""
          ? true
          : [i.title, i.assignee, i.mitreTactic].join(" ").toLowerCase().includes(query.toLowerCase()),
      );
  }, [incidents, query, status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search incidents, assignees, tactics…"
            className="pl-8"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as IncidentStatus | "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {incidentStatusMeta[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Incident</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>MITRE Tactic</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Assets</TableHead>
              <TableHead>Opened</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-sm text-muted-foreground">
                  No incidents match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((incident) => {
                const meta = incidentStatusMeta[incident.status];
                const Icon = meta.icon;
                return (
                  <TableRow key={incident.id}>
                    <TableCell className="max-w-[300px] whitespace-normal">
                      <p className="font-medium leading-tight">{incident.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{incident.description}</p>
                    </TableCell>
                    <TableCell>
                      <SeverityBadge severity={incident.severity} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={meta.badge === "destructive" ? "critical" : meta.badge} className="gap-1">
                        <Icon className="size-3" />
                        {meta.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{incident.mitreTactic}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">{initials(incident.assignee)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{incident.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell className="tabular-nums">{incident.affectedAssets}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground">{relativeTime(incident.createdAt)}</span>
                        </TooltipTrigger>
                        <TooltipContent>{formatDateTime(incident.createdAt)}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {incidents.length} incidents
      </p>
    </div>
  );
}
