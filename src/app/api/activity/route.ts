import { NextResponse } from "next/server";
import { listActivity } from "@/server/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const activity = await listActivity(15);
    return NextResponse.json({ activity });
  } catch (error) {
    console.error("Failed to load activity feed", error);
    return NextResponse.json({ error: "Failed to load activity feed" }, { status: 500 });
  }
}
