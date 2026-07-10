"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { primaryNav, secondaryNav, orgName, orgPlan } from "@/config/nav";
import { Logo } from "@/components/layout/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  icon: Icon,
  title,
  badge,
  active,
  onNavigate,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge?: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
      )}
    >
      {active && (
        <span className="absolute left-0 h-4 w-0.5 rounded-full bg-primary" aria-hidden />
      )}
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{title}</span>
      {badge ? (
        <Badge variant="critical" className="ml-auto px-1.5 py-0 text-[10px]">
          {badge}
        </Badge>
      ) : null}
    </Link>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Logo href="/dashboard" className="text-sidebar-foreground" />
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4 scrollbar-thin">
        <nav className="flex flex-col gap-1">
          <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
            Security Operations
          </p>
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={
                item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)
              }
              onNavigate={onNavigate}
            />
          ))}
        </nav>

        <nav className="flex flex-col gap-1">
          <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
            Configuration
          </p>
          {secondaryNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={pathname.startsWith(item.href)}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <p className="text-xs font-medium text-sidebar-foreground/90">All systems operational</p>
          </div>
          <p className="mt-2 truncate text-[11px] text-sidebar-foreground/50">{orgName}</p>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant="secondary" className="bg-primary/15 text-primary text-[10px]">
              {orgPlan}
            </Badge>
            <span className="flex items-center gap-1 text-[10px] text-sidebar-foreground/50">
              <AlertTriangle className="size-3" /> 3 alerts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
