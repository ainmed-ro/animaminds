import { NextRequest, NextResponse } from "next/server";
import { insertExperienceEditionRequest } from "@/lib/experience-edition-db";
import { sendUnifiedEmails } from "@/lib/unified-email";
import { syncToGoogleSheets } from "@/lib/unified-sheets";
import type { ExperienceEditionSubmission } from "@/lib/form-types";

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
      console.error("[ExperienceEdition] Supabase error:", err.message);
      return NextResponse.json({ error: "Eroare la salvarea exprimării de interes. Te rugăm încercă din nou.", details: err.message }, { status: 500 });
    }

    const submission: ExperienceEditionSubmission = {
      requestType: 'experience_edition_reservation',
      programmeName: 'Conversații care Contează',
      programmeSlug: 'conversatii-care-conteaza',
      format: 'Experience Edition™',
      selectedEdition: preferredPeriod || 'octombrie-2026',
      selectedRoomType: accommodation || 'nespecificat',
      price: accommodation === 'camera-single' ? 1400 : 1200,
      duration: 7.5,
      cpdCredits: 8,
      location: 'Hotel Afrodita, Vălenii de Munte',
      participantName: name,
      participantEmail: email,
      participantPhone: phone,
      institution: company || undefined,
      message: message || undefined,
      createdAt: createdAt.toISOString(),
    };

    sendUnifiedEmails(submission).catch(e => console.error("[ExperienceEdition] Email error:", e));
    syncToGoogleSheets(submission).catch(e => console.error("[ExperienceEdition] Sheets error:", e));

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
