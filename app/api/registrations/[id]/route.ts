import { NextRequest, NextResponse } from "next/server";
import { updateStatus, type RegistrationStatus, type PaymentStatus } from "@/lib/registrations-db";

const VALID_STATUSES: RegistrationStatus[] = ["INTERESAT", "ÎNSCRIS", "CONFIRMAT", "ANULAT"];
const VALID_PAYMENTS: PaymentStatus[] = ["NEACHITAT", "AVANS PLĂTIT", "ACHITAT INTEGRAL"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { status, paymentStatus } = body;

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Status invalid." }, { status: 400 });
  }
  if (paymentStatus && !VALID_PAYMENTS.includes(paymentStatus)) {
    return NextResponse.json({ error: "Status plată invalid." }, { status: 400 });
  }
  if (!status && !paymentStatus) {
    return NextResponse.json({ error: "Niciun câmp de actualizat." }, { status: 400 });
  }

  const updated = await updateStatus(id, { status, paymentStatus });
  if (!updated) {
    return NextResponse.json({ error: "Înscrierea nu a fost găsită." }, { status: 404 });
  }

  return NextResponse.json({ success: true, registration: updated });
}
