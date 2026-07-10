"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";

export function Hero() {
  return (
    <section id="platform" className="relative overflow-hidden pt-20 pb-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-bottom" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #6d5bf6, transparent)" }}
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="gap-1.5 rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-primary">
            <Sparkles className="size-3.5" />
            Introducing ThreatForge AI Copilot
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          AI-Powered Threat Intelligence &amp;{" "}
          <span className="bg-gradient-to-r from-[#8b7bff] to-[#3d2fc9] bg-clip-text text-transparent">
            Security Operations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          ThreatForge unifies threat intel, incident response, vulnerability management, and asset
          visibility into a single command center — so your team can detect, investigate, and respond
          before attackers gain ground.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" variant="glow" asChild>
            <Link href="/dashboard">
              Start free trial <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard">
              <PlayCircle className="size-4" /> View live demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <ShieldCheck className="size-3.5 text-success" />
          SOC 2 Type II · ISO 27001 · GDPR ready — no credit card required
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 w-full"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}
