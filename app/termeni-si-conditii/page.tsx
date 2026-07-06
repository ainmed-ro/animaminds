import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: "Termenii și condițiile de utilizare a platformei AnimaMinds.",
};

export default function TermeniSiConditii() {
  return (
    <div className="pt-20">
      <section className="py-20" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label">Legal</span>
          <div className="line-accent my-4" />
          <h1
            className="text-4xl sm:text-5xl font-semibold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Termeni și condiții
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
                title: "1. Acceptarea termenilor",
                content:
                  "Prin accesarea și utilizarea website-ului animaminds.ro, accepți în întregime acești termeni și condiții. Dacă nu ești de acord cu oricare dintre prevederi, te rugăm să nu utilizezi website-ul.",
              },
              {
                title: "2. Descrierea serviciilor",
                content:
                  "AnimaMinds oferă programe de formare profesională, mentorat și consultanță pentru dezvoltare personală și organizațională. Detaliile specifice ale fiecărui program sunt prezentate în ofertele individuale.",
              },
              {
                title: "3. Proprietate intelectuală",
                content:
                  "Toate conținuturile de pe acest website — texte, imagini, grafice, logo-uri și materiale de curs — sunt proprietatea AnimaMinds sau a partenerilor săi și sunt protejate de legislația privind drepturile de autor. Reproducerea fără acordul scris al AnimaMinds este interzisă.",
              },
              {
                title: "4. Limitarea răspunderii",
                content:
                  "AnimaMinds nu poate fi responsabilă pentru daune indirecte sau consecvente rezultate din utilizarea serviciilor noastre. Facem tot posibilul pentru a asigura calitatea programelor livrate.",
              },
              {
                title: "5. Modificări",
                content:
                  "AnimaMinds își rezervă dreptul de a modifica acești termeni în orice moment. Modificările vor fi publicate pe această pagină cu data actualizării.",
              },
              {
                title: "6. Legea aplicabilă",
                content:
                  "Acești termeni sunt guvernați de legislația română. Orice litigiu va fi soluționat de instanțele competente din România.",
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
