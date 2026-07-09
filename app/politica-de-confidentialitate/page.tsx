import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politică de confidențialitate",
  description: "Politica de confidențialitate AnimaMinds — cum colectăm, folosim și protejăm datele tale personale.",
};

export default function PoliticaConfidentialitate() {
  return (
    <div>
      <section className="py-20" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label">Legal</span>
          <div className="line-accent my-4" />
          <h1
            className="text-4xl sm:text-5xl font-semibold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Politică de confidențialitate
          </h1>
          <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
            Ultima actualizare: Iulie 2025
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none space-y-10">
            {[
              {
                title: "1. Cine suntem",
                content:
                  "AnimaMinds este o comunitate de învățare și dezvoltare profesională cu sediul în România. Această politică descrie modul în care colectăm, utilizăm și protejăm datele tale personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) și legislația română aplicabilă.",
              },
              {
                title: "2. Ce date colectăm",
                content:
                  "Colectăm datele pe care ni le furnizezi voluntar prin formularul de contact: nume, adresă de email, organizație și mesaj. De asemenea, colectăm date tehnice anonime prin cookie-uri (detalii în Politica Cookies).",
              },
              {
                title: "3. De ce colectăm aceste date",
                content:
                  "Datele tale sunt folosite exclusiv pentru a răspunde solicitărilor tale, a-ți oferi informații despre programele AnimaMinds și a menține relația de colaborare. Nu vindem și nu transmitem datele tale unor terți în scop comercial.",
              },
              {
                title: "4. Cât timp păstrăm datele",
                content:
                  "Păstrăm datele de contact pentru o perioadă de maximum 2 ani de la ultima interacțiune, după care sunt șterse din sistemele noastre. Poți solicita ștergerea în orice moment.",
              },
              {
                title: "5. Drepturile tale",
                content:
                  "Ai dreptul de acces, rectificare, ștergere, restricționare și portabilitate a datelor tale. Poți exercita aceste drepturi contactându-ne la contact@animaminds.ro. Ai de asemenea dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).",
              },
              {
                title: "6. Securitatea datelor",
                content:
                  "Luăm măsuri tehnice și organizatorice adecvate pentru a proteja datele tale împotriva accesului neautorizat, modificării, divulgării sau distrugerii.",
              },
              {
                title: "7. Contact",
                content:
                  "Pentru orice întrebare legată de prelucrarea datelor tale, ne poți contacta la: contact@animaminds.ro",
              },
            ].map((section) => (
              <div key={section.title}>
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                >
                  {section.title}
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
