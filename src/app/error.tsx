"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-7" />
      </span>
      <div className="flex flex-col gap-2">
        <p className="font-mono text-sm text-muted-foreground">RUNTIME EXCEPTION</p>
        <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          An unexpected error interrupted this request. Our telemetry has captured the details for review.
        </p>
        {error.digest ? (
          <p className="font-mono text-xs text-muted-foreground/70">Digest: {error.digest}</p>
        ) : null}
      </div>
      <Button onClick={reset}>
        <RotateCcw /> Try again
      </Button>
    </div>
  );
}
