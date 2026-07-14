import { NextRequest, NextResponse } from "next/server";
import { insertExperienceEditionRequest } from "@/lib/experience-edition-db";
import { sendAdminExperienceEditionEmail, sendUserExperienceEditionConfirmationEmail } from "@/lib/notifications";
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

    // Salvare în baza de date Supabase
    let request;
    try {
      request = await insertExperienceEditionRequest({
        name,
        email,
        phone,
        company: company || "",
        programme,
        accommodation: accommodation || "",
        preferredPeriod: preferredPeriod || "",
        message: message || "",
      });
    } catch (dbErr) {
      const err = dbErr as Error;
      console.error("Experience Edition Supabase storage error:", err.message);
      return NextResponse.json({ 
        error: "Eroare la salvarea exprimării de interes. Te rugăm încercă din nou.",
        details: err.message
      }, { status: 500 });
    }

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

    // Send user confirmation email
    try {
      await sendUserExperienceEditionConfirmationEmail({
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
      console.error("User Experience Edition confirmation email error:", emailErr);
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
      requestId: request.id,
    });

  } catch (error) {
    console.error("Experience Edition form error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la trimiterea exprimării de interes. Te rugăm să încerci din nou." 
    }, { status: 500 });
  }
}
