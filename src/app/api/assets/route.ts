import { NextResponse } from "next/server";
import { listAssets } from "@/server/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const assets = await listAssets();
    return NextResponse.json({ assets });
  } catch (error) {
    console.error("Failed to load assets", error);
    return NextResponse.json({ error: "Failed to load assets" }, { status: 500 });
  }
}
