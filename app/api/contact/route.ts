import { NextRequest, NextResponse } from "next/server";
import { insertContactMessage, getAllContactMessages } from "@/lib/contact-db";
import { sendAdminNewContactEmail, sendUserContactConfirmationEmail } from "@/lib/notifications";
import { syncContactToGoogleSheets } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, programInteres, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
    }

    // Salvare în baza de date Supabase (non-blocking pentru email/Sheets)
    let createdAt = new Date();
    try {
      const contactMessage = await insertContactMessage({
        name,
        email,
        phone: phone || "",
        organization: organization || "",
        programInteres: programInteres || "",
        subject,
        message,
      });
      createdAt = new Date(contactMessage.created_at);
    } catch (dbErr) {
      console.error("Contact Supabase storage error:", dbErr);
      // Continuăm cu notificarea și sincronizarea chiar dacă stocarea eșuează
    }

    // Notificare admin
    try {
      await sendAdminNewContactEmail({
        name,
        email,
        phone: phone || "",
        organization: organization || "",
        programInteres: programInteres || "",
        subject,
        message,
        createdAt,
      });
    } catch (emailErr) {
      console.error("Admin contact email error:", emailErr);
    }

    // Send user confirmation email
    try {
      await sendUserContactConfirmationEmail({
        name,
        email,
        phone: phone || "",
        organization: organization || "",
        programInteres: programInteres || "",
        subject,
        message,
        createdAt,
      });
    } catch (emailErr) {
      console.error("User contact confirmation email error:", emailErr);
    }

    // Trimitere date către Google Sheets
    try {
      await syncContactToGoogleSheets({
        formType: "CONTACT",
        name,
        email,
        phone: phone || "",
        organization: organization || "",
        programInteres: programInteres || "",
        subject,
        message,
        createdAt,
      });
    } catch (googleSheetsErr) {
      console.error("Google Sheets contact error:", googleSheetsErr);
    }

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
