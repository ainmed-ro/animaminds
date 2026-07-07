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
    id: "mintea-2-0",
    name: "MINTEA 2.0",
    subtitle: "Cum să gândești clar într-o lume care îți fură atenția",
    category: "Mind",
    categoryColor: "#7C9A7E",
    description:
      "Experiență dedicată clarității mentale, atenției și luării deciziilor într-un mediu dominat de suprastimulare și zgomot informațional.",
  },
  {
    id: "human-upgrade",
    name: "HUMAN UPGRADE",
    subtitle: "Abilități umane pentru era inteligenței artificiale",
    category: "Future",
    categoryColor: "#C4714F",
    description:
      "O explorare a competențelor care rămân esențial umane: gândire critică, adaptabilitate, creativitate și discernământ.",
  },
  {
    id: "ai-fara-haos",
    name: "AI FĂRĂ HAOS",
    subtitle: "Cum folosim inteligența artificială fără să ne pierdem judecata",
    category: "Future",
    categoryColor: "#C4714F",
    description:
      "O experiență practică despre integrarea responsabilă a inteligenței artificiale în activitatea profesională.",
  },
  {
    id: "attention-lab",
    name: "THE ATTENTION LAB",
    subtitle: "Reconstruirea atenției într-o lume a distragerilor",
    category: "Mind",
    categoryColor: "#7C9A7E",
    description:
      "Un proces de conștientizare și dezvoltare a capacității de concentrare și focus profund.",
  },
  {
    id: "emotii-sub-control",
    name: "EMOȚII SUB CONTROL",
    subtitle: "Cum reacționezi inteligent când ești sub presiune",
    category: "Human",
    categoryColor: "#8B6F5E",
    description:
      "Instrumente practice pentru autoreglare emoțională și gestionarea situațiilor dificile.",
  },
  {
    id: "conversatii-care-schimba-tot",
    name: "CONVERSAȚII CARE SCHIMBĂ TOT",
    subtitle: "Puterea dialogului în relații, echipe și organizații",
    category: "Human",
    categoryColor: "#8B6F5E",
    description:
      "Despre feedback, limite, ascultare activă și conversații care produc schimbare.",
  },
  {
    id: "oameni-grei",
    name: "OAMENI GREI, CONVERSAȚII GRELE",
    subtitle: "Cum gestionezi conflictele și personalitățile dificile",
    category: "Human",
    categoryColor: "#8B6F5E",
    description:
      "O experiență despre gestionarea tensiunilor și menținerea profesionalismului în relațiile dificile.",
  },
  {
    id: "leadership-fara-masca",
    name: "LEADERSHIP FĂRĂ MASCĂ",
    subtitle: "Cum conduci oameni reali, nu organigrame",
    category: "Leadership",
    categoryColor: "#4A6FA5",
    description:
      "Leadership autentic bazat pe încredere, comunicare și influență pozitivă.",
  },
  {
    id: "reset-mental",
    name: "RESET MENTAL",
    subtitle: "O pauză pentru claritate, energie și echilibru",
    category: "Wellbeing",
    categoryColor: "#9B7EBD",
    description:
      "O experiență dedicată regăsirii echilibrului și reconectării cu ceea ce contează cu adevărat.",
  },
  {
    id: "busola-interioara",
    name: "BUSOLA INTERIOARĂ",
    subtitle: "Claritate și direcție într-o lume plină de opțiuni",
    category: "Wellbeing",
    categoryColor: "#9B7EBD",
    description:
      "Pentru oamenii aflați în perioade de schimbare, căutare sau redefinire personală și profesională.",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="pt-20 bg-white">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C4714F 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-32 w-full">
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

      {/* INTRO */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-10"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Nu vindem informație.{" "}
            <span className="italic" style={{ color: "var(--sage)" }}>
              Creăm experiențe.
            </span>
          </h2>
          <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            <p>
              Într-o lume în care informația este disponibilă peste tot, adevărata provocare este transformarea ei în claritate, acțiune și rezultate reale.
            </p>
            <p>
              Experiențele AnimaMinds sunt construite pentru a provoca reflecție, conversații autentice și dezvoltare personală și profesională cu impact pe termen lung.
            </p>
            <p>
              Fiecare experiență pornește de la o provocare reală a lumii moderne: atenția, relațiile, leadershipul, adaptarea la inteligența artificială, echilibrul personal și performanța sustenabilă.
            </p>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px" style={{ backgroundColor: "rgba(0,0,0,0.07)" }} />
      </div>

      {/* EXPERIENCES GRID */}
      <section id="experiences" className="py-32" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="group bg-white rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${exp.categoryColor}15`, color: exp.categoryColor }}
                  >
                    {exp.category}
                  </span>
                  <div className="w-8 h-8 rounded-full opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: exp.categoryColor }} />
                </div>

                <h3
                  className="text-xl font-bold mb-3 leading-tight"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)", letterSpacing: "-0.01em" }}
                >
                  {exp.name}
                </h3>

                <p className="text-sm font-medium mb-4 italic" style={{ color: exp.categoryColor }}>
                  {exp.subtitle}
                </p>

                <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: "var(--charcoal-soft)" }}>
                  {exp.description}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                  style={{ color: "var(--charcoal)" }}
                >
                  Află mai mult
                  <span className="text-base transition-transform group-hover:translate-x-1" style={{ color: exp.categoryColor }}>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "var(--sage)" }}>
            Începe conversația
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-8 leading-tight"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Poate următoarea experiență{" "}
            <span className="italic" style={{ color: "var(--terracotta)" }}>
              începe cu o conversație.
            </span>
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--charcoal-soft)" }}>
            Fie că reprezentați o instituție, o companie, o organizație sau căutați o experiență pentru dezvoltarea personală, vă invităm să descoperim împreună ceea ce se potrivește cel mai bine contextului și obiectivelor dumneavoastră.
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
