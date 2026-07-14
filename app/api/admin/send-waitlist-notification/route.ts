import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "contact@animaminds.ro";

export async function POST(req: NextRequest) {
  try {
    const { programme, launchUrl, message } = await req.json();

    if (!programme || !launchUrl) {
      return NextResponse.json({ error: "Programme și launchUrl sunt obligatorii." }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ error: "Database indisponibil." }, { status: 500 });
    }

    const { data: entries, error: fetchError } = await supabase
      .from("waitlist")
      .select("*")
      .eq("programme", programme)
      .is("notified_at", null);

    if (fetchError) throw new Error(fetchError.message);
    if (!entries || entries.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: "Nu există înregistrări nenotificate." });
    }

    const results = await Promise.allSettled(
      entries.map((entry: { email: string; name?: string }) =>
        resend.emails.send({
          from: FROM_EMAIL,
          to: entry.email,
          subject: `${programme} s-a lansat! – AnimaMinds`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
              <h2 style="color:#2d4a3e;">Bună${entry.name ? `, ${entry.name}` : ''}!</h2>
              <p>Programul <strong>${programme}</strong> pe care l-ai așteptat s-a lansat!</p>
              ${message ? `<p>${message}</p>` : ''}
              <p style="margin-top:24px;">
                <a href="${launchUrl}" style="background:#2d4a3e;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
                  Află detalii și înscrie-te
                </a>
              </p>
              <p style="margin-top:24px;color:#888;font-size:13px;">AnimaMinds · contact@animaminds.ro</p>
            </div>
          `,
        })
      )
    );

    const sent = results.filter(r => r.status === "fulfilled").length;
    const failed = results.filter(r => r.status === "rejected").length;

    await supabase
      .from("waitlist")
      .update({ notified_at: new Date().toISOString() })
      .eq("programme", programme)
      .is("notified_at", null);

    return NextResponse.json({ success: true, sent, failed });
  } catch (error) {
    console.error("[SendWaitlist] Error:", error);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
