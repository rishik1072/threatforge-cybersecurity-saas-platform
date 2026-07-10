import { NextResponse } from "next/server";
import { listThreats } from "@/server/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const threats = await listThreats();
    return NextResponse.json({ threats });
  } catch (error) {
    console.error("Failed to load threats", error);
    return NextResponse.json({ error: "Failed to load threats" }, { status: 500 });
  }
}
