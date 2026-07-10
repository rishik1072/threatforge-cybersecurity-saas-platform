import Link from "next/link";
import { ShieldHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 font-semibold tracking-tight", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#6d5bf6] to-[#3d2fc9] text-white shadow-[0_2px_10px_-2px_rgba(109,91,246,0.7)]">
        <ShieldHalf className="size-4.5" strokeWidth={2.4} />
      </span>
      <span className="text-[15px] leading-none">
        Threat<span className="text-primary">Forge</span>
      </span>
    </Link>
  );
}
