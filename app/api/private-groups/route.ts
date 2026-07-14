import { NextRequest, NextResponse } from "next/server";
import { insertPrivateGroupRequest, getAllPrivateGroupRequests } from "@/lib/private-groups-db";
import { sendAdminPrivateGroupEmail, sendUserPrivateGroupConfirmationEmail } from "@/lib/notifications";
import { syncPrivateGroupToGoogleSheets } from "@/lib/google-sheets";

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

    // Salvare în baza de date Supabase
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
      console.error("Private Group Supabase storage error:", dbErr);
      return NextResponse.json({ 
        error: "Eroare la salvarea cererii. Te rugăm încercă din nou." 
      }, { status: 500 });
    }

    // Send admin notification
    try {
      await sendAdminPrivateGroupEmail({
        requesterName,
        email,
        phone,
        programmeRequested,
        estimatedGroupSize: Number(estimatedGroupSize),
        message: message || "",
        createdAt,
      });
    } catch (emailErr) {
      console.error("Admin Private Group email error:", emailErr);
    }

    // Send user confirmation email
    try {
      await sendUserPrivateGroupConfirmationEmail({
        requesterName,
        email,
        phone,
        programmeRequested,
        estimatedGroupSize: Number(estimatedGroupSize),
        message: message || "",
        createdAt,
      });
    } catch (emailErr) {
      console.error("User Private Group confirmation email error:", emailErr);
    }

    // Sync to Google Sheets
    try {
      await syncPrivateGroupToGoogleSheets({
        formType: "PRIVATE_GROUP_REQUEST",
        requesterName,
        email,
        phone,
        programmeRequested,
        estimatedGroupSize: Number(estimatedGroupSize),
        message: message || "",
        requestType: "Private Group",
        createdAt,
      });
    } catch (googleSheetsErr) {
      console.error("Google Sheets Private Group error:", googleSheetsErr);
    }

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
