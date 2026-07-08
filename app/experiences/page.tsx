import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AnimaMinds Experiences — Experiențe care schimbă perspective",
  description:
    "AnimaMinds reunește experiențe de învățare create pentru oameni, echipe și organizații care aleg să evolueze conștient. Claritate mentală, leadership, AI, wellbeing și mai mult.",
  openGraph: {
    title: "AnimaMinds Experiences",
    description: "Experiențe care schimbă perspective.",
    url: "https://animaminds.ro/experiences",
  },
};

const experiences = [
  {
    id: "busola-interioara",
    name: "BUSOLA INTERIOARĂ",
    subtitle: "Claritate și direcție într-o lume plină de opțiuni",
    accentColor: "#9B7EBD",
    active: true,
    link: "/retreats/busola-interioara",
    description:
      "O experiență pentru oamenii care se află într-un moment de schimbare, alegere sau restart și au nevoie de mai multă claritate înainte de următorul pas.",
  },
  {
    id: "ai-fara-haos",
    name: "AI FĂRĂ HAOS",
    subtitle: "Cum folosim inteligența artificială fără să ne pierdem judecata",
    accentColor: "#C4714F",
    active: false,
    link: null,
    description:
      "O experiență practică despre integrarea responsabilă a inteligenței artificiale în activitatea profesională.",
  },
  {
    id: "oameni-grei",
    name: "OAMENI GREI, CONVERSAȚII GRELE",
    subtitle: "Cum gestionezi conflictele și personalitățile dificile",
    accentColor: "#8B6F5E",
    active: false,
    link: null,
    description:
      "O experiență despre gestionarea tensiunilor și menținerea profesionalismului în relațiile dificile.",
  },
  {
    id: "mintea-2-0",
    name: "MINTEA 2.0",
    subtitle: "Cum să gândești clar într-o lume care îți fură atenția",
    accentColor: "#7C9A7E",
    active: false,
    link: null,
    description:
      "Experiență dedicată clarității mentale, atenției și luării deciziilor într-un mediu dominat de suprastimulare și zgomot informațional.",
  },
  {
    id: "human-upgrade",
    name: "HUMAN UPGRADE",
    subtitle: "Abilități umane pentru era inteligenței artificiale",
    accentColor: "#C4714F",
    active: false,
    link: null,
    description:
      "O explorare a competențelor care rămân esențial umane: gândire critică, adaptabilitate, creativitate și discernământ.",
  },
  {
    id: "conversatii-care-schimba-tot",
    name: "CONVERSAȚII CARE SCHIMBĂ TOT",
    subtitle: "Puterea dialogului în relații, echipe și organizații",
    accentColor: "#8B6F5E",
    active: false,
    link: null,
    description:
      "Despre feedback, limite, ascultare activă și conversații care produc schimbare.",
  },
  {
    id: "emotii-sub-control",
    name: "EMOȚII SUB CONTROL",
    subtitle: "Cum reacționezi inteligent când ești sub presiune",
    accentColor: "#8B6F5E",
    active: false,
    link: null,
    description:
      "Instrumente practice pentru autoreglare emoțională și gestionarea situațiilor dificile.",
  },
  {
    id: "leadership-fara-masca",
    name: "LEADERSHIP FĂRĂ MASCĂ",
    subtitle: "Cum conduci oameni reali, nu organigrame",
    accentColor: "#4A6FA5",
    active: false,
    link: null,
    description:
      "Leadership autentic bazat pe încredere, comunicare și influență pozitivă.",
  },
  {
    id: "reset-mental",
    name: "RESET MENTAL",
    subtitle: "O pauză pentru claritate, energie și echilibru",
    accentColor: "#9B7EBD",
    active: false,
    link: null,
    description:
      "O experiență dedicată regăsirii echilibrului și reconectării cu ceea ce contează cu adevărat.",
  },
  {
    id: "attention-lab",
    name: "THE ATTENTION LAB",
    subtitle: "Reconstruirea atenției într-o lume a distragerilor",
    accentColor: "#7C9A7E",
    active: false,
    link: null,
    description:
      "Un proces de conștientizare și dezvoltare a capacității de concentrare și focus profund.",
  },
];

const busolaExperience = experiences.find((e) => e.id === "busola-interioara")!;
const otherExperiences = experiences.filter((e) => e.id !== "busola-interioara");

export default function ExperiencesPage() {
  return (
    <div className="pt-20 bg-white">
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C4714F 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-8" style={{ color: "var(--sage)" }}>
            AnimaMinds Experiences
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 leading-tight"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Experiențe care{" "}
            <span className="italic" style={{ color: "var(--terracotta)" }}>
              schimbă perspective.
            </span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mb-12" style={{ color: "var(--charcoal-soft)" }}>
            AnimaMinds reunește experiențe de învățare create pentru oameni, echipe și organizații care aleg să evolueze conștient într-o lume aflată în continuă schimbare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#experiences"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "var(--sage)" }}
            >
              Descoperă experiențele
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:bg-white border"
              style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}
            >
              Programează o discuție
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE HERO - BUSOLA INTERIOARĂ */}
      <section id="experiences" className="py-16" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--sage)" }}>
              Experiențele noastre
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Alege experiența potrivită
            </h2>
          </div>

          {busolaExperience && (
            <div
              className="relative rounded-3xl p-8 lg:p-10 mb-16 overflow-hidden"
              style={{ backgroundColor: "white", boxShadow: "0 8px 40px rgba(155, 126, 189, 0.18)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: "#9B7EBD" }} />
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1">
                  <span
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full text-white mb-6"
                    style={{ backgroundColor: "#9B7EBD" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    ÎNSCRIERI DESCHISE
                  </span>
                  <h3
                    className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                    style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                  >
                    {busolaExperience.name}
                  </h3>
                  <p className="text-lg font-medium italic mb-6" style={{ color: "#9B7EBD" }}>
                    {busolaExperience.subtitle}
                  </p>
                  <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--charcoal-soft)" }}>
                    {busolaExperience.description}
                  </p>
                  <Link
                    href="/retreats/busola-interioara"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 text-lg"
                    style={{ backgroundColor: "#9B7EBD" }}
                  >
                    ÎNSCRIE-TE ACUM
                    <span>→</span>
                  </Link>
                </div>
                <div className="lg:w-1/3 w-full">
                  <div
                    className="rounded-2xl p-8 text-center"
                    style={{ backgroundColor: "rgba(155, 126, 189, 0.08)" }}
                  >
                    <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#9B7EBD" }}>
                      Disponibil acum
                    </p>
                    <p className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                      Busola Interioară
                    </p>
                    <p className="text-sm mt-2" style={{ color: "var(--charcoal-soft)" }}>
                      Claritate și direcție într-un weekend experiențial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-10">
            <h3
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Alte experiențe în pregătire
            </h3>
            <p className="mt-2 text-base" style={{ color: "var(--charcoal-soft)" }}>
              Vor deveni disponibile în curând. Te anunțăm când deschidem înscrierile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherExperiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{ backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: `${exp.accentColor}15`, color: exp.accentColor }}
                >
                  În curând
                </span>
                <h4
                  className="text-lg font-bold mb-2 leading-tight"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                >
                  {exp.name}
                </h4>
                <p className="text-sm font-medium mb-3 italic" style={{ color: exp.accentColor }}>
                  {exp.subtitle}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--sage)" }}>
            Începe conversația
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-8 leading-tight"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Nu știi care experiență{" "}
            <span className="italic" style={{ color: "var(--terracotta)" }}>
              ți se potrivește?
            </span>
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--charcoal-soft)" }}>
            Hai să discutăm despre obiectivele, provocările și contextul tău. Împreună alegem experiența potrivită pentru tine, echipa sau organizația ta.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:shadow-lg text-lg"
            style={{ backgroundColor: "var(--sage)" }}
          >
            Hai să discutăm
          </Link>
        </div>
      </section>
    </div>
  );
}
