import { NextRequest, NextResponse } from "next/server";
import { sendAdminExperienceEditionEmail } from "@/lib/notifications";
import { syncExperienceEditionToGoogleSheets } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      programme,
      accommodation,
      preferredPeriod,
      message,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !programme) {
      return NextResponse.json({ 
        error: "Câmpuri obligatorii lipsă: Nume, Email, Telefon, Program." 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Format email invalid." 
      }, { status: 400 });
    }

    const createdAt = new Date();

    // Send admin notification
    try {
      await sendAdminExperienceEditionEmail({
        name,
        email,
        phone,
        company: company || "",
        programme,
        accommodation: accommodation || "",
        preferredPeriod: preferredPeriod || "",
        message: message || "",
        createdAt,
      });
    } catch (emailErr) {
      console.error("Admin Experience Edition email error:", emailErr);
    }

    // Sync to Google Sheets
    try {
      await syncExperienceEditionToGoogleSheets({
        formType: "EXPERIENCE_EDITION_INTEREST",
        name,
        email,
        phone,
        company: company || "",
        programme,
        accommodation: accommodation || "",
        preferredPeriod: preferredPeriod || "",
        message: message || "",
        createdAt,
      });
    } catch (googleSheetsErr) {
      console.error("Google Sheets Experience Edition error:", googleSheetsErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Exprimarea de interes a fost trimisă cu succes. Vă vom contacta în curând cu detalii despre prima ediție Experience Edition.",
    });

  } catch (error) {
    console.error("Experience Edition form error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la trimiterea exprimării de interes. Te rugăm să încerci din nou." 
    }, { status: 500 });
  }
}
