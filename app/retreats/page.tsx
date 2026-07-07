import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AnimaMinds Retreats — Experiențe imersive de transformare",
  description:
    "Retreat-uri de 2–3 zile în locații speciale — munte, mare, natură. Versiuni extinse ale experiențelor AnimaMinds pentru un nivel mai profund de reflecție, dezvoltare și reconectare.",
  openGraph: {
    title: "AnimaMinds Retreats",
    description: "Experiențe imersive de transformare în natură.",
    url: "https://animaminds.ro/retreats",
  },
};

const retreats = [
  {
    id: "mintea-2-0-retreat",
    name: "MINTEA 2.0",
    tag: "Retreat",
    subtitle: "Claritate mentală profundă în liniștea naturii",
    duration: "3 zile · 2 nopți",
    setting: "Munte · Locație secretă",
    category: "Mind",
    categoryColor: "#7C9A7E",
    description:
      "Departe de zgomotul digital, în mijlocul naturii, reconstruim modul în care gândim, decidem și ne concentrăm. Un retreat complet dedicat clarității mentale și calității atenției.",
    includes: ["Sesiuni de reflecție ghidată", "Practici de focus profund", "Timp în natură structurat", "Jurnal de claritate", "Grup mic — maxim 12 persoane"],
  },
  {
    id: "busola-interioara-retreat",
    name: "BUSOLA INTERIOARĂ",
    tag: "Retreat",
    subtitle: "Redescoperă direcția când totul pare neclaru",
    duration: "3 zile · 2 nopți",
    setting: "Natură · Spațiu de retreat",
    category: "Wellbeing",
    categoryColor: "#9B7EBD",
    description:
      "Un retreat pentru oamenii aflați în momente de schimbare, căutare sau redefinire. Trei zile de introspecție ghidată, conversații autentice și reconectare cu valorile profunde.",
    includes: ["Cartografiere personală", "Conversații 1:1 cu facilitatorul", "Exerciții de redefinire a direcției", "Seară de reflecție în natură", "Plan personal post-retreat"],
  },
  {
    id: "reset-mental-retreat",
    name: "RESET MENTAL",
    tag: "Retreat",
    subtitle: "Oprește-te. Respiră. Reîncarcă-te complet.",
    duration: "2 zile · 1 noapte",
    setting: "Mare sau munte · Liniște totală",
    category: "Wellbeing",
    categoryColor: "#9B7EBD",
    description:
      "Un weekend de deconectare completă și reconectare profundă. Fără agende încărcate, fără presiune. Doar spațiu, natură și instrumente reale pentru a-ți reîncărca resursele interioare.",
    includes: ["Sesiuni de respirație și mișcare", "Timp liber structurat în natură", "Practici de prezență", "Cină comunitară", "Ritual de închidere și intenție"],
  },
  {
    id: "human-upgrade-retreat",
    name: "HUMAN UPGRADE",
    tag: "Retreat",
    subtitle: "Ce rămâne esențial uman în era inteligenței artificiale",
    duration: "3 zile · 2 nopți",
    setting: "Spațiu de inovație · Natură",
    category: "Future",
    categoryColor: "#C4714F",
    description:
      "Un retreat imersiv despre identitate, adaptabilitate și competențele umane care nu pot fi automatizate. Explorăm ce înseamnă să fii uman, cu adevărat, în lumea de azi.",
    includes: ["Workshop-uri de gândire critică", "Sesiuni de creativitate aplicată", "Conversații despre viitorul muncii", "Exerciții de adaptabilitate", "Manifesto personal"],
  },
  {
    id: "leadership-fara-masca-retreat",
    name: "LEADERSHIP FĂRĂ MASCĂ",
    tag: "Retreat",
    subtitle: "Conducere autentică dintr-un loc de forță, nu de frică",
    duration: "3 zile · 2 nopți",
    setting: "Locație premium · Natură",
    category: "Leadership",
    categoryColor: "#4A6FA5",
    description:
      "Un retreat exclusivist pentru lideri care vor să conducă cu autenticitate. Explorăm vulnerabilitatea, încrederea, comunicarea și leadershipul bazat pe valori în sesiuni intensive și conversații profunde.",
    includes: ["Sesiuni intensive de leadership", "Coaching individual", "Exerciții de vulnerabilitate și încredere", "Masterclass cu facilitatori seniori", "Comunitate de lideri post-retreat"],
  },
];

export default function RetreatsPage() {
  return (
    <div className="pt-20 bg-white">

      {/* HERO */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#1C2B1E" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #C4714F 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-32 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7C9A7E" }}>
              AnimaMinds
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>×</span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#C4714F" }}>
              Retreats
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 leading-tight text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Unele schimbări au nevoie{" "}
            <span className="italic" style={{ color: "#7C9A7E" }}>
              de spațiu.
            </span>
          </h1>

          <p className="text-xl leading-relaxed max-w-2xl mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
            AnimaMinds Retreats sunt experiențe imersive de 2–3 zile organizate în locații speciale — munte, mare, natură.
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mb-14" style={{ color: "rgba(255,255,255,0.5)" }}>
            Versiuni extinse ale experiențelor AnimaMinds, pentru cei care aleg un nivel mai profund de reflecție, transformare și reconectare.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#retreats"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "#7C9A7E" }}
            >
              Descoperă retreat-urile
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all border"
              style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              Rezervă un loc
            </Link>
          </div>
        </div>
      </section>

      {/* DIFERENȚĂ RETREATS VS EXPERIENCES */}
      <section className="py-28" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#7C9A7E" }}>
                De ce Retreats?
              </p>
              <h2
                className="text-4xl font-semibold mb-8 leading-tight"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Unele transformări nu pot fi comprimate într-o zi.
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                Experiențele AnimaMinds sunt construite pentru impact real. Retreat-urile merg și mai departe — oferă spațiu, timp și profunzime pentru transformări care rămân.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                Natura, liniștea și contextul imersiv creează condițiile în care oamenii se deschid cu adevărat — față de ei înșiși și față de ceilalți.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: "◎", title: "Grup mic", desc: "Maxim 12–15 participanți per retreat" },
                { icon: "◇", title: "Locații speciale", desc: "Munte, mare, natură — departe de zgomot" },
                { icon: "△", title: "Imersiv complet", desc: "2–3 zile de experiență neîntreruptă" },
                { icon: "○", title: "Facilitatori seniori", desc: "Alina Niculae & Mihaela Spina" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-5 p-5 rounded-xl bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <span className="text-2xl mt-0.5" style={{ color: "#7C9A7E" }}>{item.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RETREATS GRID */}
      <section id="retreats" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#7C9A7E" }}>
              Experiențe imersive
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Retreat-urile AnimaMinds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {retreats.map((retreat) => (
              <div
                key={retreat.id}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
              >
                {/* Card top bar */}
                <div className="h-2 w-full" style={{ backgroundColor: retreat.categoryColor }} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${retreat.categoryColor}15`, color: retreat.categoryColor }}
                      >
                        {retreat.category}
                      </span>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-50 text-gray-500">
                      {retreat.duration}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: retreat.categoryColor }}>
                      {retreat.tag}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                  >
                    {retreat.name}
                  </h3>

                  <p className="text-sm font-medium italic mb-4" style={{ color: retreat.categoryColor }}>
                    {retreat.subtitle}
                  </p>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                    {retreat.description}
                  </p>

                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--charcoal-soft)" }}>
                      Inclus
                    </p>
                    <ul className="space-y-2">
                      {retreat.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--charcoal-soft)" }}>
                          <span style={{ color: retreat.categoryColor }} className="mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <span className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                      📍 {retreat.setting}
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                      style={{ color: retreat.categoryColor }}
                    >
                      Rezervă un loc →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-32"
        style={{ backgroundColor: "#1C2B1E" }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#7C9A7E" }}>
            Locuri limitate
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-8 leading-tight text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Fiecare retreat este{" "}
            <span className="italic" style={{ color: "#7C9A7E" }}>
              o experiență unică.
            </span>
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.6)" }}>
            Fie că reprezentați o instituție, o companie sau căutați o transformare personală profundă, vă invităm să descoperim împreună retreat-ul potrivit pentru dumneavoastră.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 text-base"
              style={{ backgroundColor: "#7C9A7E" }}
            >
              Hai să discutăm
            </Link>
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all border text-base"
              style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              Vezi toate experiențele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
