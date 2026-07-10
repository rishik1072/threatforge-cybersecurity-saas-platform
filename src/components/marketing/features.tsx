import {
  Bot,
  Fingerprint,
  GitBranch,
  Radar,
  ShieldAlert,
  Siren,
  Server,
  Waypoints,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";

const features = [
  {
    icon: Radar,
    title: "Unified Threat Intelligence",
    description:
      "Correlate indicators from global sensors, dark web monitoring, and analyst research into a single prioritized feed.",
  },
  {
    icon: Siren,
    title: "Automated Incident Response",
    description:
      "Trigger playbooks the moment an alert fires — contain hosts, revoke sessions, and notify responders automatically.",
  },
  {
    icon: Server,
    title: "Full Asset Visibility",
    description:
      "Discover and score every server, workstation, cloud workload, and container the instant it joins your network.",
  },
  {
    icon: ShieldAlert,
    title: "Continuous Vulnerability Management",
    description:
      "Prioritize CVEs by real-world exploitability and blast radius, not just raw CVSS score.",
  },
  {
    icon: Bot,
    title: "AI Threat Copilot",
    description:
      "Ask natural-language questions about your environment and get investigative answers with cited evidence.",
  },
  {
    icon: Waypoints,
    title: "MITRE ATT&CK Mapping",
    description:
      "Every incident is automatically mapped to adversary tactics and techniques for faster triage and reporting.",
  },
  {
    icon: Fingerprint,
    title: "Identity Threat Detection",
    description:
      "Detect credential abuse, impossible travel, and privilege escalation across your identity providers.",
  },
  {
    icon: GitBranch,
    title: "DevSecOps Integrations",
    description:
      "Ship findings straight into Jira, Slack, PagerDuty, and your CI/CD pipeline without leaving your workflow.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform"
          title="Everything your SOC needs, in one place"
          description="Replace a dozen disconnected tools with a single, AI-native security operations platform built for speed."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
