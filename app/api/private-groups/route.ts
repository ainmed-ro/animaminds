import { NextRequest, NextResponse } from "next/server";
import { insertPrivateGroupRequest, getAllPrivateGroupRequests } from "@/lib/private-groups-db";
import { sendUnifiedEmails } from "@/lib/unified-email";
import { syncToGoogleSheets } from "@/lib/unified-sheets";
import type { PrivateGroupSubmission } from "@/lib/form-types";
import { sendAdminNotifications } from "@/lib/admin-notify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      requesterName,
      email,
      phone,
      programmeRequested,
      estimatedGroupSize,
      message,
    } = body;

    // Validate required fields
    if (!requesterName || !email || !phone || !programmeRequested) {
      return NextResponse.json({ 
        error: "Câmpuri obligatorii lipsă: Nume, Email, Telefon, Program solicitat." 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Format email invalid." 
      }, { status: 400 });
    }

    // Validate group size
    if (!estimatedGroupSize || estimatedGroupSize < 3) {
      return NextResponse.json({ 
        error: "Dimensiunea minimă a grupului este 3 persoane." 
      }, { status: 400 });
    }

    const createdAt = new Date();

    let request;
    try {
      request = await insertPrivateGroupRequest({
        requesterName,
        email,
        phone,
        programmeRequested,
        estimatedGroupSize: Number(estimatedGroupSize),
        message: message || "",
        requestType: "Private Group",
      });
    } catch (dbErr) {
      const err = dbErr as Error;
      console.error("[PrivateGroup] Supabase error:", err.message);
      return NextResponse.json({ error: "Eroare la salvarea cererii. Te rugăm încercă din nou.", details: err.message }, { status: 500 });
    }

    const submission: PrivateGroupSubmission = {
      requestType: 'private_group_request',
      programmeName: programmeRequested,
      format: 'Grup privat',
      price: 'Pe bază de ofertă',
      estimatedParticipants: Number(estimatedGroupSize),
      participantName: requesterName,
      participantEmail: email,
      participantPhone: phone,
      message: message || undefined,
      createdAt: createdAt.toISOString(),
    };

    await Promise.allSettled([
      sendUnifiedEmails(submission).catch(e => console.error("[PrivateGroup] Email error:", e)),
      syncToGoogleSheets(submission).catch(e => console.error("[PrivateGroup] Sheets error:", e)),
      sendAdminNotifications(submission).catch(e => console.error("[PrivateGroup] Admin notify error:", e)),
    ]);

    return NextResponse.json({ 
      success: true, 
      message: "Cererea ta pentru grup privat a fost trimisă cu succes. Vei primi în curând un răspuns cu detaliile ofertei.",
      requestId: request.id,
    });

  } catch (error) {
    console.error("Private Group request error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la trimiterea cererii. Te rugăm să încerci din nou." 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await getAllPrivateGroupRequests();
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Get Private Group requests error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la încărcarea cererilor de grupuri private." 
    }, { status: 500 });
  }
}
