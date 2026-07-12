import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica cookies",
  description: "Politica de utilizare a cookie-urilor pe website-ul AnimaMinds.",
};

export const dynamic = 'force-dynamic'

export default function CookiesPage() {
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
            Politica cookies
          </h1>
          <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
            Ultima actualizare: Iulie 2025
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {[
              {
                title: "Ce sunt cookie-urile",
                content:
                  "Cookie-urile sunt fișiere mici de text stocate pe dispozitivul tău atunci când vizitezi un website. Ele permit site-ului să-și amintească preferințele tale și să funcționeze corect.",
              },
              {
                title: "Ce cookie-uri folosim",
                content:
                  "Folosim cookie-uri esențiale pentru funcționarea website-ului (sesiune, preferințe). Nu folosim cookie-uri de tracking publicitar sau de profilare. Dacă integrăm servicii de analiză (ex. Google Analytics) în viitor, îți vom cere acordul explicit.",
              },
              {
                title: "Cum poți controla cookie-urile",
                content:
                  "Poți configura browserul tău să refuze cookie-urile sau să te anunțe când sunt plasate. Reține că dezactivarea cookie-urilor esențiale poate afecta funcționalitatea website-ului.",
              },
              {
                title: "Contact",
                content:
                  "Pentru întrebări legate de cookie-uri, contactează-ne la contact@animaminds.ro.",
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
