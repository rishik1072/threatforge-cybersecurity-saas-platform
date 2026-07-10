"use client";

import * as React from "react";
import { Search, ShieldOff } from "lucide-react";

import type { Asset } from "@/db/schema";
import { assetStatusMeta, assetTypeMeta, type AssetStatus } from "@/lib/security-meta";
import { relativeTime, formatDateTime, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const statuses: AssetStatus[] = ["healthy", "at_risk", "compromised", "offline"];

function riskTone(score: number) {
  if (score >= 75) return "bg-destructive";
  if (score >= 45) return "bg-warning";
  return "bg-success";
}

export function AssetsTable({ assets }: { assets: Asset[] }) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<AssetStatus | "all">("all");

  const filtered = React.useMemo(() => {
    return assets
      .filter((a) => (status === "all" ? true : a.status === status))
      .filter((a) =>
        query.trim() === ""
          ? true
          : [a.name, a.owner, a.os, a.ipAddress].join(" ").toLowerCase().includes(query.toLowerCase()),
      );
  }, [assets, query, status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets, owners, IPs…"
            className="pl-8"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as AssetStatus | "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {assetStatusMeta[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-sm text-muted-foreground">
                  No assets match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((asset) => {
                const typeMeta = assetTypeMeta[asset.type];
                const TypeIcon = typeMeta.icon;
                const statusMeta = assetStatusMeta[asset.status];
                return (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <p className="font-medium leading-tight">{asset.name}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">{asset.ipAddress}</p>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <TypeIcon className="size-3.5" />
                        {typeMeta.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{asset.owner}</TableCell>
                    <TableCell className="w-36">
                      <div className="flex items-center gap-2">
                        <Progress value={asset.riskScore} className="h-1.5" indicatorClassName={riskTone(asset.riskScore)} />
                        <span className="w-7 shrink-0 text-xs tabular-nums">{asset.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusMeta.badge === "destructive" ? "critical" : statusMeta.badge}>
                        {statusMeta.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {asset.agentInstalled ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <ShieldOff className={cn("size-3.5")} /> None
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground">{relativeTime(asset.lastSeen)}</span>
                        </TooltipTrigger>
                        <TooltipContent>{formatDateTime(asset.lastSeen)}</TooltipContent>
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
        Showing {filtered.length} of {assets.length} monitored assets
      </p>
    </div>
  );
}
