// Email Templates for AnimaMinds Programs
// Complete automated email flow for all program formats

export interface EmailTemplate {
  subject: string;
  body: string;
  variables?: string[];
}

// EXPERIENCE EDITION™ EMAIL TEMPLATES

export const experienceEditionEmails = {
  // Immediate confirmation after form submission
  immediateConfirmation: {
    subject: "✅ Solicitarea a fost înregistrată",
    body: `Bună, {{Nume}},

Ai selectat:

Program: {{Program}}
Ediție: {{Ediție}}
Tip cameră: {{Tip Cameră}}

Vei primi în scurt timp informațiile privind următorii pași.

Echipa AnimaMinds`,
    variables: ["Nume", "Program", "Ediție", "Tip Cameră"]
  } as EmailTemplate,

  // After group is confirmed
  groupConfirmed: {
    subject: "🎉 Grupa a fost confirmată",
    body: `Bună, {{Nume}},

Grupa pentru ediția {{Ediție}} a fost confirmată.

În acest mesaj găsești:

✅ factura;
✅ informațiile privind plata;
✅ programul evenimentului;
✅ detaliile privind cazarea;
✅ informațiile de acces.

Ne vedem la Vălenii de Munte!

Echipa AnimaMinds`,
    variables: ["Nume", "Ediție"]
  } as EmailTemplate,

  // 7 days before event
  reminder7Days: {
    subject: "📅 Ne vedem în curând",
    body: `Bună, {{Nume}},

Programul începe peste o săptămână.

În acest mesaj găsești toate informațiile logistice și administrative necesare participării.

Echipa AnimaMinds`,
    variables: ["Nume"]
  } as EmailTemplate,

  // After event completion
  postEvent: {
    subject: "🎓 Mulțumim pentru participare",
    body: `Bună, {{Nume}},

În perioada următoare vei primi:

certificatul de participare;
fișa competențelor dezvoltate;
resursele programului;
formularul de feedback.

Echipa AnimaMinds`,
    variables: ["Nume"]
  } as EmailTemplate
};

// ONLINE LIVE EMAIL TEMPLATES

export const onlineLiveEmails = {
  // Immediate confirmation after registration
  immediateConfirmation: {
    subject: "✅ Înscriere înregistrată",
    body: `Bună, {{Nume}},

Ai solicitat participarea la:

{{Program}} – Online Live

În următoarele zile vei primi:

confirmarea înscrierii;
informațiile privind plata;
datele de acces.

Echipa AnimaMinds`,
    variables: ["Nume", "Program"]
  } as EmailTemplate,

  // 3 days before first session
  reminder3Days: {
    subject: "📅 Începe mâine",
    body: `Bună, {{Nume},

Programul începe mâine.

În acest mesaj găsești toate informațiile logistice și administrative necesare participării.

Echipa AnimaMinds`,
    variables: ["Nume"]
  } as EmailTemplate,

  // After program completion
  postEvent: {
    subject: "🎓 Mulțumim pentru participare",
    body: `Bună, {{Nume}},

În perioada următoare vei primi:

certificatul de participare;
fișa competențelor dezvoltate;
resursele programului;
formularul de feedback.

Echipa AnimaMinds`,
    variables: ["Nume"]
  } as EmailTemplate
};

// ORGANIZATIONS EMAIL TEMPLATES

export const organizationsEmails = {
  // Immediate confirmation after request
  immediateConfirmation: {
    subject: "✅ Solicitare primită",
    body: `Mulțumim.

Am primit solicitarea transmisă de:

{{Organizație}}

Program: {{Program}}
Format: {{Format}}

Vom reveni cu o ofertă personalizată.

Echipa AnimaMinds`,
    variables: ["Organizație", "Program", "Format"]
  } as EmailTemplate,

  // Personalized for educational institutions
  educationInstitution: {
    subject: "✅ Solicitare primită",
    body: `Mulțumim.

Am primit solicitarea transmisă de:

{{Instituție}}

Program: {{Program}}

Vom reveni cu o ofertă personalizată.

Echipa AnimaMinds`,
    variables: ["Instituție", "Program"]
  } as EmailTemplate,

  // Personalized for medical organizations
  medicalOrganization: {
    subject: "✅ Solicitare primită",
    body: `Mulțumim.

Am primit solicitarea transmisă de:

{{Organizație}}

Program: {{Program}}

Vom reveni cu o ofertă personalizată.

Echipa AnimaMinds`,
    variables: ["Organizație", "Program"]
  } as EmailTemplate,

  // For companies
  company: {
    subject: "✅ Solicitare primită",
    body: `Mulțumim.

Am primit solicitarea pentru programul {{Program}}.

Vom reveni cu o ofertă personalizată.

Echipa AnimaMinds`,
    variables: ["Program"]
  } as EmailTemplate
};

// PRIVATE GROUPS EMAIL TEMPLATES

export const privateGroupsEmails = {
  // Immediate confirmation after request
  immediateConfirmation: {
    subject: "Solicitare primită – Grup privat – {{Nume}}",
    body: `Bună, {{Nume}},

Mulțumim pentru interesul acordat programelor AnimaMinds.

Am primit solicitarea pentru organizarea unui grup privat:

👥 Număr participanți: {{NumarParticipanti}}
📚 Program dorit: {{Program}}
📝 Mesaj: {{Mesaj}}

Vom reveni cu o propunere personalizată care va include:

🎯 formatul recomandat;
📅 calendarul de desfășurare;
📋 condițiile de participare;
💰 oferta financiară.

Abia așteptăm să colaborăm!

Echipa AnimaMinds`,
    variables: ["Nume", "NumarParticipanti", "Program", "Mesaj"]
  } as EmailTemplate
};

// Helper function to personalize email content
export function personalizeEmail(template: EmailTemplate, variables: Record<string, string>): string {
  let personalizedBody = template.body;
  
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    personalizedBody = personalizedBody.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return personalizedBody;
}

// Helper function to get appropriate organization email template
export function getOrganizationEmailTemplate(organizationType: string): EmailTemplate {
  switch (organizationType) {
    case 'education':
      return organizationsEmails.educationInstitution;
    case 'medical':
      return organizationsEmails.medicalOrganization;
    case 'company':
      return organizationsEmails.company;
    default:
      return organizationsEmails.immediateConfirmation;
  }
}

// Export all templates for easy access
export const allEmailTemplates = {
  experienceEdition: experienceEditionEmails,
  onlineLive: onlineLiveEmails,
  organizations: organizationsEmails,
  privateGroups: privateGroupsEmails
};
