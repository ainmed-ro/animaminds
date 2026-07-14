import { NextRequest, NextResponse } from "next/server";
import { insertOnlineLiveRegistration } from "@/lib/online-live-db";
import { sendAdminOnlineLiveEmail, sendUserOnlineLiveConfirmationEmail } from "@/lib/notifications";
import { syncOnlineLiveToGoogleSheets } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      institution,
      role,
      gdprConsent,
      calendarConfirmation,
    } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ 
        error: "Câmpuri obligatorii lipsă: Nume, Email, Telefon." 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Format email invalid." 
      }, { status: 400 });
    }

    // Validate consent checkboxes
    if (!gdprConsent || !calendarConfirmation) {
      return NextResponse.json({ 
        error: "Consentimentele GDPR și confirmarea calendarului sunt obligatorii." 
      }, { status: 400 });
    }

    const createdAt = new Date();

    // Fixed programme data for Online Live
    const programmeData = {
      programme: "Conversații care Contează",
      format: "Online Live",
      price: 199,
      duration: 7.5,
      cpd: 8,
      dates: "8, 15, 22 Septembrie 2026",
    };

    // Salvare în baza de date Supabase
    let registration;
    try {
      console.log("Attempting to insert Online Live registration with data:", {
        ...programmeData,
        name,
        email,
        phone,
        institution: institution || "",
        role: role || "",
        gdprConsent,
        calendarConfirmation,
      });
      
      registration = await insertOnlineLiveRegistration({
        ...programmeData,
        name,
        email,
        phone,
        institution: institution || "",
        role: role || "",
        gdprConsent,
        calendarConfirmation,
      });
      
      console.log("Successfully inserted registration:", registration);
    } catch (dbErr) {
      console.error("Online Live Supabase storage error:", dbErr);
      const error = dbErr as Error;
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      return NextResponse.json({ 
        error: "Eroare la salvarea înregistrării. Te rugăm încercă din nou.",
        details: error.message
      }, { status: 500 });
    }

    // Send admin notification
    try {
      await sendAdminOnlineLiveEmail({
        ...programmeData,
        name,
        email,
        phone,
        institution: institution || "",
        role: role || "",
        createdAt,
      });
    } catch (emailErr) {
      console.error("Admin Online Live email error:", emailErr);
    }

    // Send user confirmation email
    try {
      await sendUserOnlineLiveConfirmationEmail({
        ...programmeData,
        name,
        email,
        phone,
        institution: institution || "",
        role: role || "",
        createdAt,
      });
    } catch (emailErr) {
      console.error("User Online Live confirmation email error:", emailErr);
    }

    // Sync to Google Sheets
    try {
      await syncOnlineLiveToGoogleSheets({
        formType: "ONLINE_LIVE_REGISTRATION",
        ...programmeData,
        name,
        email,
        phone,
        institution: institution || "",
        role: role || "",
        gdprConsent,
        calendarConfirmation,
        createdAt,
      });
    } catch (googleSheetsErr) {
      console.error("Google Sheets Online Live error:", googleSheetsErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Înscrierea ta la programul Online Live a fost confirmată. Vei primi pe email detaliile de plată și acces.",
      registrationId: registration.id,
    });

  } catch (error) {
    console.error("Online Live registration error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la trimiterea înscrierii. Te rugăm să încerci din nou." 
    }, { status: 500 });
  }
}

