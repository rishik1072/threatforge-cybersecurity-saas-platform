import type { Metadata } from "next";

import { listThreats } from "@/server/queries";
import { ThreatsTable } from "@/components/dashboard/threats-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = { title: "Threat Intelligence" };

export default async function ThreatsPage() {
  const threats = await listThreats();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Intelligence Feed</CardTitle>
        <CardDescription>
          Correlated indicators of compromise sourced from global sensors, dark web monitoring, and analyst research.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ThreatsTable threats={threats} />
      </CardContent>
    </Card>
  );
}
