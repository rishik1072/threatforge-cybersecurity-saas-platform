import Link from "next/link";
import { Check } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For small teams getting started with security monitoring.",
    features: ["Up to 25 monitored assets", "7-day threat intelligence retention", "Community support", "Basic vulnerability scanning"],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$799",
    period: "/mo",
    description: "For growing security teams that need automated response.",
    features: [
      "Up to 1,000 monitored assets",
      "90-day threat intelligence retention",
      "Automated incident playbooks",
      "AI Threat Copilot",
      "Slack, Jira & PagerDuty integrations",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex compliance needs.",
    features: [
      "Unlimited monitored assets",
      "Unlimited retention & audit logs",
      "Dedicated threat research team",
      "Custom SLAs & 24/7 white-glove support",
      "SSO, SCIM & advanced RBAC",
      "On-premise / VPC deployment",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          description="Start free and scale as your attack surface grows. No hidden fees, cancel anytime."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7",
                plan.highlighted ? "border-primary bg-primary/[0.04] shadow-lg" : "bg-card",
              )}
            >
              {plan.highlighted ? (
                <Badge className="absolute -top-3 left-7" variant="default">
                  Most popular
                </Badge>
              ) : null}
              <p className="text-sm font-semibold">{plan.name}</p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                {plan.period ? <span className="pb-1 text-sm text-muted-foreground">{plan.period}</span> : null}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8"
                variant={plan.highlighted ? "glow" : "outline"}
                asChild
              >
                <Link href="/dashboard">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
