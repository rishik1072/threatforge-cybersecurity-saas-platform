import type { Metadata } from "next";

import { listAssets } from "@/server/queries";
import { AssetsTable } from "@/components/dashboard/assets-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = { title: "Assets" };

export default async function AssetsPage() {
  const assets = await listAssets();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Inventory</CardTitle>
        <CardDescription>
          Real-time visibility across servers, workstations, cloud workloads, containers, and network devices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AssetsTable assets={assets} />
      </CardContent>
    </Card>
  );
}
