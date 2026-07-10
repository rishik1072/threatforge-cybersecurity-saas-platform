import { Star } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "ThreatForge cut our mean time to detect from hours to minutes. The AI copilot alone replaced three dashboards our analysts used to tab between.",
    name: "Maria Chen",
    role: "VP of Security, Nimbus Financial Group",
    initials: "MC",
  },
  {
    quote:
      "We consolidated four point solutions into ThreatForge in under a quarter. The MITRE mapping and automated playbooks changed how fast we respond.",
    name: "David Okafor",
    role: "Director of SecOps, Vertex Health",
    initials: "DO",
  },
  {
    quote:
      "The asset risk scoring is the first thing my team checks every morning. It's the clearest picture of our attack surface we've ever had.",
    name: "Priya Sharma",
    role: "CISO, Orion Retail",
    initials: "PS",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customers"
          title="Security leaders trust ThreatForge"
          description="From fintech to healthcare, teams rely on ThreatForge to stay ahead of adversaries."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between rounded-xl border bg-card p-6">
              <div>
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
