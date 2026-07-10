import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { Features } from "@/components/marketing/features";
import { StatsSection } from "@/components/marketing/stats-section";
import { Testimonials } from "@/components/marketing/testimonials";
import { Pricing } from "@/components/marketing/pricing";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <LogoCloud />
        <Features />
        <StatsSection />
        <Testimonials />
        <Pricing />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
