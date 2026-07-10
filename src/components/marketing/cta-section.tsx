import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#231b57] via-[#2c1f6b] to-[#120c2e] px-8 py-16 text-center text-white sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(circle at 20% 20%, rgba(139,123,255,0.5), transparent 45%)" }}
            aria-hidden
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to see every threat before it becomes a breach?
            </h2>
            <p className="max-w-xl text-balance text-sm text-white/70 sm:text-base">
              Join thousands of security teams running their operations on ThreatForge. Deploy in minutes,
              see value on day one.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="glow" asChild>
                <Link href="/dashboard">
                  Start free trial <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/dashboard">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
