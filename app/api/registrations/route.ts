import { NextRequest, NextResponse } from "next/server";
import { insert, readAll, getSpotsByEdition } from "@/lib/registrations-db";
import { participantEmailHtml, adminEmailHtml } from "@/lib/email-templates";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "contact@animaminds.ro";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "AnimaMinds <noreply@animaminds.ro>";

export async function GET() {
  const all = await readAll();
  const spots = await getSpotsByEdition();
  return NextResponse.json({ registrations: all, spotsOccupied: spots });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nume, email, telefon, editie, participanti, observatii, experience } = body;

    if (!nume || !email || !telefon || !editie) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
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
    });

    // Trimitere date către Google Sheets
    try {
      const googleSheetsData = {
        formType: "ÎNSCRIERI",
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

    // Email towards participant
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [reg.email],
        subject: "Manifestarea dumneavoastră de interes a fost înregistrată — BUSOLA INTERIOARĂ",
        html: participantEmailHtml(reg),
      });
    } catch (emailErr) {
      console.error("Participant email failed:", emailErr);
    }

    // Notification email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `[AnimaMinds] Înscriere nouă — ${reg.nume} — ${reg.editie}`,
        html: adminEmailHtml(reg),
      });
    } catch (emailErr) {
      console.error("Admin email failed:", emailErr);
    }

    return NextResponse.json({ success: true, id: reg.id }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
