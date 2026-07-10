import type { Metadata } from "next";

import { listIncidents } from "@/server/queries";
import { IncidentsTable } from "@/components/dashboard/incidents-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = { title: "Incidents" };

export default async function IncidentsPage() {
  const incidents = await listIncidents();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Response Queue</CardTitle>
        <CardDescription>
          Active and historical investigations mapped to MITRE ATT&CK tactics with assigned responders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <IncidentsTable incidents={incidents} />
      </CardContent>
    </Card>
  );
}
