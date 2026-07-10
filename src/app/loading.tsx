import { ShieldHalf } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background">
      <span className="flex size-12 animate-pulse items-center justify-center rounded-xl bg-gradient-to-br from-[#6d5bf6] to-[#3d2fc9] text-white">
        <ShieldHalf className="size-6" />
      </span>
      <p className="text-sm text-muted-foreground">Loading ThreatForge…</p>
    </div>
  );
}
