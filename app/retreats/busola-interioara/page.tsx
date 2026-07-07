import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BUSOLA INTERIOARĂ – Weekend Experience | AnimaMinds Retreats",
  description:
    "Un weekend de claritate, reflecție și reconectare la Zărnești – Piatra Craiului. Trei zile de conversații cu sens, activități experiențiale și timp pentru tine.",
  openGraph: {
    title: "BUSOLA INTERIOARĂ – Weekend Experience",
    description: "Claritate și direcție atunci când lucrurile par neclare.",
    url: "https://animaminds.ro/retreats/busola-interioara",
  },
};

const includes = [
  "2 nopți de cazare",
  "Activități experiențiale AnimaMinds",
  "Exerciții individuale și de grup",
  "Materiale de lucru",
  "Conexiuni autentice între participanți",
];

const details = [
  { icon: "📍", label: "Locație", value: "Zărnești – Deny Inn Resort & Spa" },
  { icon: "📅", label: "Durată", value: "3 zile · 2 nopți" },
  { icon: "👥", label: "Grup", value: "20–25 participanți" },
  { icon: "🛏️", label: "Cazare", value: "Inclusă" },
  { icon: "🌲", label: "Cadru natural", value: "Piatra Craiului" },
  { icon: "📆", label: "Perioadă", value: "În curs de stabilire" },
];

export default function BusolaInterioarePage() {
  return (
    <div className="pt-20 bg-white">

      {/* HERO */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #9B7EBD 0%, transparent 70%)", transform: "translate(25%, -25%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(-25%, 25%)" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-28 w-full">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/retreats"
              className="text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              style={{ color: "#9B7EBD" }}
            >
              AnimaMinds Retreats
            </Link>
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.25)" }}>→</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(0,0,0,0.4)" }}>
              Busola Interioară
            </span>
          </div>

          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-none"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            BUSOLA
            <br />
            <span className="italic" style={{ color: "#9B7EBD" }}>INTERIOARĂ</span>
          </h1>

          <p className="text-2xl font-medium mb-8 max-w-2xl" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>
            Claritate și direcție atunci când lucrurile par neclare.
          </p>

          <p className="text-lg leading-relaxed max-w-2xl mb-4" style={{ color: "var(--charcoal-soft)" }}>
            Un weekend pentru oamenii care simt nevoia să se oprească, să respire și să privească lucrurile cu mai multă claritate.
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mb-14" style={{ color: "var(--charcoal-soft)" }}>
            Trei zile de conversații cu sens, reflecție, natură și experiențe care te ajută să te reconectezi cu ceea ce contează cu adevărat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90 hover:shadow-xl"
              style={{ backgroundColor: "#9B7EBD" }}
            >
              Înscrie-mă
            </Link>
            <a
              href="#despre"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium text-lg transition-all border hover:bg-white"
              style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}
            >
              Află mai multe
            </a>
          </div>
        </div>
      </section>

      {/* DETALII RAPIDE */}
      <section className="py-12 bg-white border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {details.map((d) => (
              <div key={d.label} className="text-center">
                <div className="text-2xl mb-2">{d.icon}</div>
                <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "#9B7EBD" }}>
                  {d.label}
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESPRE EXPERIENȚĂ */}
      <section id="despre" className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>
                Despre experiență
              </p>
              <h2
                className="text-4xl sm:text-5xl font-semibold mb-10 leading-tight"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                De ce{" "}
                <span className="italic" style={{ color: "#9B7EBD" }}>
                  BUSOLA INTERIOARĂ?
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>
                  Uneori avem nevoie să ieșim din ritmul obișnuit al vieții pentru a vedea mai clar direcția în care mergem.
                </p>
                <p>
                  BUSOLA INTERIOARĂ este o experiență creată pentru oamenii care se află într-un moment de schimbare, alegere sau restart și care simt nevoia unui spațiu în care să gândească, să reflecteze și să exploreze noi perspective.
                </p>
                <p className="font-medium" style={{ color: "var(--charcoal)" }}>
                  Nu oferim rețete și nici soluții universale.
                </p>
                <p>
                  Construim contexte, conversații și experiențe care pot genera claritate, energie și direcție.
                </p>
              </div>
            </div>

            {/* CE INCLUDE */}
            <div
              className="rounded-2xl p-10"
              style={{ backgroundColor: "#F5F0E8" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-8" style={{ color: "#9B7EBD" }}>
                Ce include
              </p>
              <ul className="space-y-5">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                      style={{ backgroundColor: "#9B7EBD" }}
                    >
                      ✓
                    </span>
                    <span className="text-base" style={{ color: "var(--charcoal)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: "#9B7EBD" }}
                >
                  Înscrie-mă
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIE */}
      <section className="py-24" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>
            Locație
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold mb-6"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Zărnești – Piatra Craiului
          </h2>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mb-4" style={{ color: "var(--charcoal-soft)" }}>
            Ne vom întâlni la Deny Inn Resort & Spa din Zărnești, înconjurați de munți și natură, departe de zgomotul zilelor obișnuite.
          </p>
          <p className="text-base" style={{ color: "var(--charcoal-soft)" }}>
            Un loc ales cu grijă — liniștit, frumos și propice pentru reflecție.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>
            Locuri limitate
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-8 leading-tight"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Dacă simți că ai nevoie{" "}
            <span className="italic" style={{ color: "#9B7EBD" }}>
              de acest spațiu,
            </span>{" "}
            poate că ai dreptate.
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--charcoal-soft)" }}>
            Scrie-ne și îți vom oferi toate detaliile despre program, costuri și disponibilitate.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90 hover:shadow-xl"
            style={{ backgroundColor: "#9B7EBD" }}
          >
            Înscrie-mă
          </Link>
        </div>
      </section>
    </div>
  );
}
