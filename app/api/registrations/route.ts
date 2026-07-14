import { NextRequest, NextResponse } from "next/server";
import { insert, readAll, getSpotsByEdition, type RegistrationStatus, type PaymentStatus } from "@/lib/registrations-db";
import { participantEmailHtml, adminEmailHtml } from "@/lib/email-templates";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "AnimaMinds <noreply@animaminds.ro>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "contact@animaminds.ro";

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!resend) { console.error('[Registrations] Resend not available'); return; }
  try {
    const res = await resend.emails.send({ from: FROM_EMAIL, to: [to], subject, html });
    if (res.error) console.error(`[Registrations] Resend error to ${to}:`, res.error);
    else console.log(`[Registrations] Email sent to ${to}, id:`, res.data?.id);
  } catch (err) {
    console.error(`[Registrations] Failed to send to ${to}:`, err);
  }
}

export async function GET() {
  const all = await readAll();
  const spots = await getSpotsByEdition();
  return NextResponse.json({ registrations: all, spotsOccupied: spots });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nume, email, telefon, editie, participanti, observatii, experience, status, paymentStatus } = body;

    if (!nume || !email || !telefon || !editie) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
    }

    const VALID_STATUSES: RegistrationStatus[] = ["INTERESAT", "ÎNSCRIS", "CONFIRMAT", "ANULAT"];
    const VALID_PAYMENTS: PaymentStatus[] = ["NEACHITAT", "AVANS PLĂTIT", "ACHITAT INTEGRAL"];

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Status invalid." }, { status: 400 });
    }
    if (paymentStatus && !VALID_PAYMENTS.includes(paymentStatus)) {
      return NextResponse.json({ error: "Status plată invalid." }, { status: 400 });
    }

    // Salvare în baza de date locală
    const reg = await insert({
      experience: experience ?? "BUSOLA INTERIOARĂ",
      editie,
      nume,
      email,
      telefon,
      participanti: Number(participanti) || 1,
      observatii: observatii ?? "",
      status: status ?? "INTERESAT",
      paymentStatus: paymentStatus ?? "NEACHITAT",
    });

    // Trimitere date către Google Sheets
    try {
      const googleSheetsData = {
        formType: "ÎNSCRIERI",
        experience: experience ?? "BUSOLA INTERIOARĂ",
        status: status ?? "INTERESAT",
        paymentStatus: paymentStatus ?? "NEACHITAT",
        nume,
        email,
        telefon,
        editie,
        participanti: String(participanti || "1"),
        observatii: observatii ?? "",
      };

      const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL || "https://script.google.com/macros/s/AKfycbxyU8hC9f8cVZzLqQhJkXmN3pL7wR6sT4vK2nY5fG8bH9cJdA/exec";
      
      await fetch(googleSheetsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleSheetsData),
        mode: "no-cors",
      });
      
      console.log("Date trimise în Google Sheets pentru:", nume);
    } catch (googleSheetsErr) {
      console.error("Google Sheets error:", googleSheetsErr);
      // Nu blocăm procesul dacă Google Sheets eșuează
    }

    sendEmail(reg.email, "Manifestarea dumneavoastră de interes a fost înregistrată — AnimaMinds", participantEmailHtml(reg))
      .catch(e => console.error("Participant email failed:", e));
    sendEmail(ADMIN_EMAIL, `[AnimaMinds] Înscriere nouă — ${reg.nume} — ${reg.editie}`, adminEmailHtml(reg))
      .catch(e => console.error("Admin email failed:", e));

    return NextResponse.json({ success: true, id: reg.id }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
