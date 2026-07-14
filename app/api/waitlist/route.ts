import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "contact@animaminds.ro";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@animaminds.ro";

export async function POST(req: NextRequest) {
  try {
    const { email, name, programme } = await req.json();

    if (!email || !programme) {
      return NextResponse.json({ error: "Email și program sunt obligatorii." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format email invalid." }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ error: "Database indisponibil." }, { status: 500 });
    }

    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email, name: name || null, programme }]);

    if (dbError) {
      console.error("[Waitlist] DB error:", dbError.message);
      return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });
    }

    await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Te-am înregistrat pentru ${programme} – AnimaMinds`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
            <h2 style="color:#2d4a3e;">Bună${name ? `, ${name}` : ''}!</h2>
            <p>Ai fost înregistrat pe lista de așteptare pentru programul <strong>${programme}</strong>.</p>
            <p>Când programul va fi lansat, vei fi printre primii care vor afla.</p>
            <p style="margin-top:24px;color:#888;font-size:13px;">AnimaMinds · contact@animaminds.ro</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `[Waitlist] ${programme} – ${email}`,
        html: `
          <p><strong>Program:</strong> ${programme}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Nume:</strong> ${name || 'nespecificat'}</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Database indisponibil." }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return NextResponse.json({ waitlist: data });
  } catch (error) {
    console.error("[Waitlist] GET error:", error);
    return NextResponse.json({ error: "Eroare la încărcare." }, { status: 500 });
  }
}
