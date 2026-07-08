import { NextResponse } from "next/server";
import { getSpotsByEdition } from "@/lib/registrations-db";

export async function GET() {
  const spots = await getSpotsByEdition();
  return NextResponse.json({ spotsOccupied: spots });
}
