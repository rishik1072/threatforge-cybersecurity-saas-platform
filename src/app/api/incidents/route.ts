import { NextResponse } from "next/server";
import { listIncidents } from "@/server/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const incidents = await listIncidents();
    return NextResponse.json({ incidents });
  } catch (error) {
    console.error("Failed to load incidents", error);
    return NextResponse.json({ error: "Failed to load incidents" }, { status: 500 });
  }
}
