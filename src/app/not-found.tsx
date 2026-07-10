import Link from "next/link";
import { CompassIcon, ShieldHalf } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-bottom" aria-hidden />
      <div className="relative flex flex-col items-center gap-6">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6d5bf6] to-[#3d2fc9] text-white shadow-lg">
          <ShieldHalf className="size-7" />
        </span>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-sm text-muted-foreground">ERROR 404 · SIGNAL LOST</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">This page went dark</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            We couldn&apos;t locate the resource you requested. It may have been moved, renamed, or never
            existed in this environment.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/dashboard">
              <CompassIcon /> Back to dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
