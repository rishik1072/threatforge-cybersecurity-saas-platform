"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const preferences = [
  {
    id: "critical-alerts",
    title: "Critical severity alerts",
    description: "Immediate notification for critical threats and incidents",
    defaultChecked: true,
  },
  {
    id: "weekly-digest",
    title: "Weekly security digest",
    description: "Summary of posture changes delivered every Monday",
    defaultChecked: true,
  },
  {
    id: "vuln-updates",
    title: "New vulnerability disclosures",
    description: "Alerts when a new CVE affects your tracked assets",
    defaultChecked: true,
  },
  {
    id: "product-updates",
    title: "Product updates",
    description: "News about new ThreatForge features and detections",
    defaultChecked: false,
  },
];

export function NotificationPreferences() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(preferences.map((p) => [p.id, p.defaultChecked])),
  );

  return (
    <div className="flex flex-col divide-y">
      {preferences.map((pref) => (
        <div key={pref.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor={pref.id} className="text-sm font-medium">
              {pref.title}
            </Label>
            <p className="text-xs text-muted-foreground">{pref.description}</p>
          </div>
          <Switch
            id={pref.id}
            checked={state[pref.id]}
            onCheckedChange={(checked) => {
              setState((prev) => ({ ...prev, [pref.id]: checked }));
              toast.success(`${pref.title} ${checked ? "enabled" : "disabled"}`);
            }}
          />
        </div>
      ))}
      <Separator className="hidden" />
    </div>
  );
}
