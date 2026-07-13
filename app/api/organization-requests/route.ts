import { NextRequest, NextResponse } from "next/server";
import { insertOrganizationRequest, getAllOrganizationRequests } from "@/lib/organization-requests-db";
import { sendAdminOrganizationRequestEmail } from "@/lib/notifications";
import { syncOrganizationRequestToGoogleSheets } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      organizationName,
      organizationType,
      contactName,
      contactEmail,
      contactPhone,
      contactPosition,
      programmeInterest,
      deliveryFormatPreference,
      participantCountEstimate,
      preferredTimeline,
      budgetRange,
      specificRequirements,
    } = body;

    // Validate required fields
    if (!organizationName || !organizationType || !contactName || !contactEmail) {
      return NextResponse.json({ 
        error: "Câmpuri obligatorii lipsă: Nume organizație, Tip organizație, Nume contact, Email contact." 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json({ 
        error: "Format email invalid." 
      }, { status: 400 });
    }

    // Salvare în baza de date Supabase (non-blocking pentru email/Sheets)
    let createdAt = new Date();
    try {
      const organizationRequest = await insertOrganizationRequest({
        organizationName,
        organizationType,
        contactName,
        contactEmail,
        contactPhone: contactPhone || "",
        contactPosition: contactPosition || "",
        programmeInterest: programmeInterest || "",
        deliveryFormatPreference: deliveryFormatPreference || "",
        participantCountEstimate: participantCountEstimate ? Number(participantCountEstimate) : 0,
        preferredTimeline: preferredTimeline || "",
        budgetRange: budgetRange || "",
        specificRequirements: specificRequirements || "",
      });
      createdAt = new Date(organizationRequest.createdAt);
    } catch (dbErr) {
      console.error("Organization Request Supabase storage error:", dbErr);
      // Continuăm cu notificarea și sincronizarea chiar dacă stocarea eșuează
    }

    // Notificare admin
    try {
      await sendAdminOrganizationRequestEmail({
        organizationName,
        organizationType,
        contactName,
        contactEmail,
        contactPhone: contactPhone || "",
        contactPosition: contactPosition || "",
        programmeInterest: programmeInterest || "",
        deliveryFormatPreference: deliveryFormatPreference || "",
        participantCountEstimate: participantCountEstimate ? Number(participantCountEstimate) : 0,
        preferredTimeline: preferredTimeline || "",
        budgetRange: budgetRange || "",
        specificRequirements: specificRequirements || "",
        createdAt,
      });
    } catch (emailErr) {
      console.error("Admin organization request email error:", emailErr);
    }

    // Trimitere date către Google Sheets
    try {
      await syncOrganizationRequestToGoogleSheets({
        formType: "ORGANIZATION_REQUEST",
        organizationName,
        organizationType,
        contactName,
        contactEmail,
        contactPhone: contactPhone || "",
        contactPosition: contactPosition || "",
        programmeInterest: programmeInterest || "",
        deliveryFormatPreference: deliveryFormatPreference || "",
        participantCountEstimate: participantCountEstimate ? Number(participantCountEstimate) : 0,
        preferredTimeline: preferredTimeline || "",
        budgetRange: budgetRange || "",
        specificRequirements: specificRequirements || "",
        createdAt,
      });
    } catch (googleSheetsErr) {
      console.error("Google Sheets organization request error:", googleSheetsErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Cererea de organizație a fost trimisă cu succes. Vă vom contacta în curând.",
    });

  } catch (error) {
    console.error("Organization request form error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la trimiterea cererii. Te rugăm să încerci din nou." 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await getAllOrganizationRequests();
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Get organization requests error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la încărcarea cererilor de organizații." 
    }, { status: 500 });
  }
}
