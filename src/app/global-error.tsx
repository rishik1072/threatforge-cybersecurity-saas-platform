"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col items-center justify-center gap-4 bg-[#0d0c17] px-6 text-center text-white">
        <h1 className="text-2xl font-semibold">ThreatForge encountered a critical error</h1>
        <p className="max-w-md text-sm text-white/60">
          The application failed to render. Please refresh the page or try again shortly.
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-[#6d5bf6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5b49e0]"
        >
          Reload application
        </button>
      </body>
    </html>
  );
}
