import { Badge } from "@/components/ui/badge";
import { severityMeta, type Severity } from "@/lib/security-meta";
import { cn } from "@/lib/utils";

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const meta = severityMeta[severity];
  const Icon = meta.icon;

  return (
    <Badge variant={meta.badge} className={cn("gap-1 capitalize", className)}>
      <Icon className="size-3" />
      {meta.label}
    </Badge>
  );
}
