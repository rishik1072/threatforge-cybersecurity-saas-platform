import type { Metadata } from "next";

import { listVulnerabilities } from "@/server/queries";
import { VulnerabilitiesTable } from "@/components/dashboard/vulnerabilities-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = { title: "Vulnerabilities" };

export default async function VulnerabilitiesPage() {
  const vulnerabilities = await listVulnerabilities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vulnerability Management</CardTitle>
        <CardDescription>
          Prioritized CVEs mapped to affected assets, ranked by CVSS score and exploitability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
      </CardContent>
    </Card>
  );
}
