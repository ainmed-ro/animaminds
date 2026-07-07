import { NextRequest, NextResponse } from "next/server";
import { insert, readAll, getSpotsByEdition } from "@/lib/registrations-db";
import { participantEmailHtml, adminEmailHtml } from "@/lib/email-templates";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "contact@animaminds.ro";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "AnimaMinds <noreply@animaminds.ro>";

export async function GET() {
  const all = readAll();
  const spots = getSpotsByEdition();
  return NextResponse.json({ registrations: all, spotsOccupied: spots });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nume, email, telefon, editie, participanti, observatii, experience } = body;

    if (!nume || !email || !telefon || !editie) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
    }

    const reg = insert({
      experience: experience ?? "BUSOLA INTERIOARĂ",
      editie,
      nume,
      email,
      telefon,
      participanti: Number(participanti) || 1,
      observatii: observatii ?? "",
    });

    // Email towards participant
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [reg.email],
        subject: "Rezervarea dumneavoastră a fost înregistrată",
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
