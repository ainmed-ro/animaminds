import { NextRequest, NextResponse } from "next/server";
import { insertOrganizationRequest, getAllOrganizationRequests } from "@/lib/organization-requests-db";
import { sendUnifiedEmails } from "@/lib/unified-email";
import { syncToGoogleSheets } from "@/lib/unified-sheets";
import type { OrganisationSubmission } from "@/lib/form-types";
import { sendAdminNotifications } from "@/lib/admin-notify";

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

    const createdAt = new Date();

    try {
      await insertOrganizationRequest({
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
    } catch (dbErr) {
      const err = dbErr as Error;
      console.error("[OrgRequest] Supabase error:", err.message);
      return NextResponse.json({ error: "Eroare la salvarea cererii. Te rugăm încercă din nou.", details: err.message }, { status: 500 });
    }

    const formatPrice = deliveryFormatPreference === 'La sediul beneficiarului' ? 5000 : 3500;
    const submission: OrganisationSubmission = {
      requestType: 'organisation_request',
      programmeName: programmeInterest || 'Nespecificat',
      format: (deliveryFormatPreference as OrganisationSubmission['format']) || 'Online dedicat organizației',
      price: formatPrice as OrganisationSubmission['price'],
      organizationName,
      organizationType,
      estimatedParticipants: participantCountEstimate ? Number(participantCountEstimate) : 0,
      preferredTimeline: preferredTimeline || undefined,
      budgetRange: budgetRange || undefined,
      participantName: contactName,
      participantEmail: contactEmail,
      participantPhone: contactPhone || undefined,
      role: contactPosition || undefined,
      message: specificRequirements || undefined,
      createdAt: createdAt.toISOString(),
    };

    await Promise.allSettled([
      sendUnifiedEmails(submission).catch(e => console.error("[OrgRequest] Email error:", e)),
      syncToGoogleSheets(submission).catch(e => console.error("[OrgRequest] Sheets error:", e)),
      sendAdminNotifications(submission).catch(e => console.error("[OrgRequest] Admin notify error:", e)),
    ]);

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
