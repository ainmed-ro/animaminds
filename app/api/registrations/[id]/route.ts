import { NextRequest, NextResponse } from "next/server";
import { updateStatus, RegistrationStatus } from "@/lib/registrations-db";

const VALID_STATUSES: RegistrationStatus[] = ["Nou", "Confirmat", "Achitat", "Anulat"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Status invalid." }, { status: 400 });
  }

  const updated = await updateStatus(id, status as RegistrationStatus);
  if (!updated) {
    return NextResponse.json({ error: "Înscrierea nu a fost găsită." }, { status: 404 });
  }

  return NextResponse.json({ success: true, registration: updated });
}
