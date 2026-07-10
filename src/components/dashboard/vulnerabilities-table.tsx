"use client";

import * as React from "react";
import { Search } from "lucide-react";

import type { Vulnerability } from "@/db/schema";
import { vulnStatusMeta, type VulnStatus } from "@/lib/security-meta";
import { formatDateTime, relativeTime } from "@/lib/utils";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const statuses: VulnStatus[] = ["open", "patching", "patched", "accepted_risk"];

export function VulnerabilitiesTable({ vulnerabilities }: { vulnerabilities: Vulnerability[] }) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<VulnStatus | "all">("all");

  const filtered = React.useMemo(() => {
    return vulnerabilities
      .filter((v) => (status === "all" ? true : v.status === status))
      .filter((v) =>
        query.trim() === ""
          ? true
          : [v.cveId, v.title, v.affectedAsset, v.packageName].join(" ").toLowerCase().includes(query.toLowerCase()),
      );
  }, [vulnerabilities, query, status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search CVEs, packages, assets…"
            className="pl-8"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as VulnStatus | "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {vulnStatusMeta[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CVE</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>CVSS</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Affected Asset</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-sm text-muted-foreground">
                  No vulnerabilities match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((vuln) => {
                const meta = vulnStatusMeta[vuln.status];
                return (
                  <TableRow key={vuln.id}>
                    <TableCell className="max-w-[300px] whitespace-normal">
                      <p className="font-mono text-xs font-medium">{vuln.cveId}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{vuln.title}</p>
                    </TableCell>
                    <TableCell>
                      <SeverityBadge severity={vuln.severity} />
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-semibold tabular-nums">{vuln.cvssScore.toFixed(1)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={meta.badge === "destructive" ? "critical" : meta.badge}>{meta.label}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{vuln.affectedAsset}</TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-muted-foreground">{vuln.packageName}</span>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground">{relativeTime(vuln.publishedAt)}</span>
                        </TooltipTrigger>
                        <TooltipContent>{formatDateTime(vuln.publishedAt)}</TooltipContent>
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
        Showing {filtered.length} of {vulnerabilities.length} tracked vulnerabilities
      </p>
    </div>
  );
}
