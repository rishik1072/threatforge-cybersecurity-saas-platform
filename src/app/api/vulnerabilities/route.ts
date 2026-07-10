import { NextResponse } from "next/server";
import { listVulnerabilities } from "@/server/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const vulnerabilities = await listVulnerabilities();
    return NextResponse.json({ vulnerabilities });
  } catch (error) {
    console.error("Failed to load vulnerabilities", error);
    return NextResponse.json({ error: "Failed to load vulnerabilities" }, { status: 500 });
  }
}
