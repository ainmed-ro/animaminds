import type { Registration } from "./registrations-db";

export function participantEmailHtml(reg: Registration): string {
  return `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#1C2B1E;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#7C9A7E;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">AnimaMinds</p>
            <h1 style="margin:8px 0 0;color:#fff;font-size:24px;font-weight:normal;font-family:Georgia,serif;">BUSOLA INTERIOARĂ</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;font-size:16px;color:#3D3530;font-family:Arial,sans-serif;">Bună ziua, <strong>${reg.nume}</strong>,</p>
            <p style="margin:0 0 24px;font-size:15px;color:#6B5E58;line-height:1.7;font-family:Arial,sans-serif;">
              Vă mulțumim pentru interesul acordat programului <strong>BUSOLA INTERIOARĂ</strong>.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#6B5E58;line-height:1.7;font-family:Arial,sans-serif;">
              Solicitarea dumneavoastră a fost înregistrată.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;border-radius:12px;padding:24px;margin-bottom:24px;">
              <tr><td>
                <p style="margin:0 0 8px;font-size:11px;color:#9B7EBD;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Detalii manifestare de interes</p>
                <p style="margin:0 0 6px;font-size:14px;color:#3D3530;font-family:Arial,sans-serif;"><strong>Ediția preferată:</strong> ${reg.editie}</p>
                <p style="margin:0 0 6px;font-size:14px;color:#3D3530;font-family:Arial,sans-serif;"><strong>Participanți:</strong> ${reg.participanti}</p>
                <p style="margin:0;font-size:14px;color:#3D3530;font-family:Arial,sans-serif;"><strong>Data înregistrării:</strong> ${new Date(reg.createdAt).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}</p>
              </td></tr>
            </table>
            <p style="margin:0 0 16px;font-size:15px;color:#6B5E58;line-height:1.7;font-family:Arial,sans-serif;">
              Detaliile finale privind calendarul, locația și investiția vor fi publicate după 15 iunie.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#6B5E58;line-height:1.7;font-family:Arial,sans-serif;">
              Vă invităm să reveniți pe website-ul AnimaMinds pentru actualizări.
            </p>
            <p style="margin:0;font-size:14px;color:#3D3530;font-family:Arial,sans-serif;font-weight:bold;">Echipa AnimaMinds</p>
          </td>
        </tr>
        <tr>
          <td style="background:#F5F0E8;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9B8E88;font-family:Arial,sans-serif;">animaminds.ro · contact@animaminds.ro</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function adminEmailHtml(reg: Registration): string {
  return `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#9B7EBD;padding:20px 32px;">
          <p style="margin:0;color:#fff;font-size:14px;font-weight:bold;">🔔 Manifestare de interes nouă — BUSOLA INTERIOARĂ</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="6" cellspacing="0">
            <tr><td style="color:#666;font-size:13px;width:140px;">Nume:</td><td style="font-size:14px;color:#333;font-weight:bold;">${reg.nume}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Email:</td><td style="font-size:14px;color:#333;">${reg.email}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Telefon:</td><td style="font-size:14px;color:#333;">${reg.telefon}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Ediția:</td><td style="font-size:14px;color:#333;">${reg.editie}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Participanți:</td><td style="font-size:14px;color:#333;">${reg.participanti}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Observații:</td><td style="font-size:14px;color:#333;">${reg.observatii || "—"}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Data:</td><td style="font-size:14px;color:#333;">${new Date(reg.createdAt).toLocaleString("ro-RO")}</td></tr>
            <tr><td style="color:#666;font-size:13px;">ID:</td><td style="font-size:12px;color:#999;">${reg.id}</td></tr>
          </table>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #eee;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://animaminds.ro"}/admin/registrations" style="display:inline-block;padding:10px 20px;background:#9B7EBD;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:bold;">
              Deschide dashboard-ul
            </a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
