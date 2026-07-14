import { NextRequest, NextResponse } from "next/server";
import { insertContactMessage, getAllContactMessages } from "@/lib/contact-db";
import { sendUnifiedEmails } from "@/lib/unified-email";
import { syncToGoogleSheets } from "@/lib/unified-sheets";
import type { ContactSubmission } from "@/lib/form-types";
import { sendAdminNotifications } from "@/lib/admin-notify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, programInteres, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
    }

    const createdAt = new Date();

    try {
      await insertContactMessage({
        name,
        email,
        phone: phone || "",
        organization: organization || "",
        programInteres: programInteres || "",
        subject,
        message,
      });
    } catch (dbErr) {
      const err = dbErr as Error;
      console.error("[Contact] Supabase error:", err.message);
      return NextResponse.json({ error: "Eroare la salvarea mesajului. Te rugăm încercă din nou.", details: err.message }, { status: 500 });
    }

    const submission: ContactSubmission = {
      requestType: 'contact_message',
      subject,
      organizationName: organization || undefined,
      programInteres: programInteres || undefined,
      participantName: name,
      participantEmail: email,
      participantPhone: phone || undefined,
      message,
      createdAt: createdAt.toISOString(),
    };

    sendUnifiedEmails(submission).catch(e => console.error("[Contact] Email error:", e));
    syncToGoogleSheets(submission).catch(e => console.error("[Contact] Sheets error:", e));
    sendAdminNotifications(submission).catch(e => console.error("[Contact] WhatsApp error:", e));

    return NextResponse.json({ 
      success: true, 
      message: "Mesajul a fost trimis cu succes.",
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou." 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await getAllContactMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Get contact messages error:", error);
    return NextResponse.json({ 
      error: "A apărut o eroare la încărcarea mesajelor." 
    }, { status: 500 });
  }
}
