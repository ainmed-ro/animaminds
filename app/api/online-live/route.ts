import { NextRequest, NextResponse } from "next/server";
import { insertOnlineLiveRegistration } from "@/lib/online-live-db";
import { sendUnifiedEmails } from "@/lib/unified-email";
import { syncToGoogleSheets } from "@/lib/unified-sheets";
import type { OnlineLiveSubmission } from "@/lib/form-types";
import { sendAdminNotifications } from "@/lib/admin-notify";

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

    const submission: OnlineLiveSubmission = {
      requestType: 'online_live_registration',
      programmeName: 'Conversații care Contează',
      programmeSlug: 'conversatii-care-conteaza',
      format: 'Online Live',
      price: 199,
      duration: 7.5,
      cpdCredits: 8,
      dates: '8, 15, 22 Septembrie 2026',
      participantName: name,
      participantEmail: email,
      participantPhone: phone,
      institution: institution || undefined,
      role: role || undefined,
      gdprConsent,
      calendarConfirmation,
      createdAt: createdAt.toISOString(),
    };

    // Supabase insert - blocking, must succeed
    let registration;
    try {
      registration = await insertOnlineLiveRegistration({
        programme: submission.programmeName,
        format: submission.format,
        price: submission.price,
        duration: submission.duration,
        cpd: submission.cpdCredits,
        dates: submission.dates,
        name,
        email,
        phone,
        institution: institution || "",
        role: role || "",
        gdprConsent,
        calendarConfirmation,
      });
    } catch (dbErr) {
      const err = dbErr as Error;
      console.error("[OnlineLive] Supabase error:", err.message);
      return NextResponse.json({ error: "Eroare la salvarea înregistrării. Te rugăm încearcă din nou.", details: err.message }, { status: 500 });
    }

    // Email + Sheets + WhatsApp - non-blocking
    sendUnifiedEmails(submission).catch(e => console.error("[OnlineLive] Email error:", e));
    syncToGoogleSheets(submission).catch(e => console.error("[OnlineLive] Sheets error:", e));
    sendAdminNotifications(submission).catch(e => console.error("[OnlineLive] WhatsApp error:", e));

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

