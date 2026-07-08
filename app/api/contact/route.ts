import { NextRequest, NextResponse } from "next/server";
import { insertContactMessage, getAllContactMessages } from "@/lib/contact-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
    }

    // Salvare în baza de date Supabase
    const contactMessage = await insertContactMessage({
      name,
      email,
      phone: phone || "",
      subject,
      message,
    });

    // Trimitere date către Google Sheets
    try {
      const googleSheetsData = {
        formType: "CONTACT",
        nume: name,
        email,
        organizatie: organization || "Nespecificat",
        subiect: subject,
        mesaj: message,
      };

      const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL || "https://script.google.com/macros/s/AKfycbxyU8hC9f8cVZzLqQhJkXmN3pL7wR6sT4vK2nY5fG8bH9cJdA/exec";

      await fetch(googleSheetsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleSheetsData),
        mode: "no-cors",
      });

      console.log("Date contact trimise în Google Sheets pentru:", name);
    } catch (googleSheetsErr) {
      console.error("Google Sheets contact error:", googleSheetsErr);
      // Nu blocăm procesul dacă Google Sheets eșuează; mesajul rămâne salvat în Supabase
    }

    return NextResponse.json({ 
      success: true, 
      message: "Mesajul a fost trimis cu succes.",
      data: contactMessage 
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
