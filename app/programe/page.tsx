import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Programe",
  description:
    "Programe AnimaMinds pentru profesori, echipe din mediul privat și tineri: reziliență, comunicare, AI, metacogniție și educație parentală.",
};

const programs = [
  {
    image: "/images/workshop-indoor.jpg",
    badge: "Dezvoltare umană & profesională",
    badgeColor: "#A0715A",
    gradient: "linear-gradient(135deg, #7A5C3A 0%, #A0715A 50%, #C9A070 100%)",
    symbol: "✦",
    slogan: "Claritate și direcție atunci când lucrurile par neclare.",
    title: "BUSOLA INTERIOARĂ",
    description:
      "Un program experiențial de trei zile pentru persoane, echipe și organizații care vor să-și facă ordine în gânduri, să-și regăsească direcția și să construiască perspective noi împreună.",
    for: "Persoane · Echipe · Companii · Instituții publice · Organizații",
    active: true,
    status: "Disponibil acum",
    href: "/retreats/busola-interioara",
    cta: "Descoperă programul",
  },
  {
    image: "/images/workshop-activity.jpg",
    badge: "Reziliență & Wellbeing",
    badgeColor: "var(--sage)",
    gradient: "linear-gradient(135deg, #4a7c59 0%, #7C9A7E 50%, #a8c5a0 100%)",
    symbol: "◎",
    slogan: "Pauză. Respirație. Reconstrucție.",
    title: "Ancorare când totul în jur se mișcă prea repede",
    description:
      "Un program pentru cei care simt că nu mai au timp să respire. Explorăm împreună ce epuizează, ce reîncarcă și cum se construiesc resurse interne care rezistă în timp — indiferent de presiunea din jur.",
    for: "Profesori · Echipe din companii · Manageri · Oricine se simte copleșit",
    active: false,
    status: "În curând"
  },
  {
    image: "/images/engaged-audience.jpg",
    badge: "Comunicare",
    badgeColor: "var(--terracotta)",
    gradient: "linear-gradient(135deg, #8B3A2A 0%, #C4785A 50%, #d9956e 100%)",
    symbol: "◇",
    slogan: "Cuvintele potrivite schimbă totul.",
    title: "Cum să fie auzite mesajele importante",
    description:
      "Nu este despre tehnici de convingere sau discursuri perfecte. Este despre claritate, curaj și conexiune reală — despre a spune ce contează fără a răni și fără a tăcea.",
    for: "Profesioniști · Manageri · Profesori · Tineri la început de carieră",
    active: false,
    status: "În curând"
  },
  {
    image: "/images/digital-training.jpg",
    badge: "AI & Digital",
    badgeColor: "var(--sage)",
    gradient: "linear-gradient(135deg, #2D4A5C 0%, #3d6b8a 50%, #5d8fa8 100%)",
    symbol: "✦",
    slogan: "Folosește AI. Păstrează controlul.",
    title: "Viitorul nu este pentru cei care știu mai mult. Este pentru cei care știu să întreabe mai bine.",
    description:
      "Inteligența artificială nu vine să ia locul omului, ci să preia ce este plictisitor, repetitiv și consumator de timp — eliberând spațiu pentru ceea ce contează cu adevărat. Fără jargon, fără frică, cu aplicații concrete.",
    for: "Profesori · Corporatiști · Antreprenori · Tineri care vor să rămână relevanți",
    active: false,
    status: "În curând"
  },
  {
    image: "/images/workshop-indoor.jpg",
    badge: "Dezvoltare personală",
    badgeColor: "var(--terracotta)",
    gradient: "linear-gradient(135deg, #5C3D6B 0%, #8a5da8 50%, #a87dc5 100%)",
    symbol: "△",
    slogan: "Mintea este cel mai puternic instrument pe care îl avem la dispoziție.",
    title: "Nu este despre cât se știe. Este despre cum se gândește.",
    description:
      "De ce unii oameni absorb și aplică rapid, iar alții simt că se învârt în cerc? Răspunsul este în cum gândim despre gândire. Acest program oferă instrumentele necesare pentru a învăța mai eficient — la orice vârstă, în orice domeniu.",
    for: "Studenți și tineri · Profesioniști în reconversie · Profesori · Oricine vrea să progreseze",
    active: false,
    status: "În curând"
  },
  {
    image: "/images/workshop-group-raise.jpg",
    badge: "Familie & Comunitate",
    badgeColor: "var(--sage)",
    gradient: "linear-gradient(135deg, #7A5C3A 0%, #b08050 50%, #c9a070 100%)",
    symbol: "♡",
    slogan: "Prezența contează mai mult decât perfecțiunea.",
    title: "Copiii nu vin cu instrucțiuni. Dar putem învăța împreună.",
    description:
      "Nu există părinți perfecți — și nici nu trebuie să existe. Există părinți prezenți, care încearcă să înțeleagă. Acest program este un spațiu în care explorăm împreună ce au nevoie copiii noștri și cum construim relații care durează.",
    for: "Părinți · Cadre didactice · ONG-uri și școli · Companii cu programe de wellbeing familial",
    active: false,
    status: "În curând"
  },
];

export default function ProgramePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-12" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">Programe</span>
            <div className="line-accent my-4" />
            <h1
              className="text-3xl sm:text-4xl font-semibold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Experiențe care{" "}
              <span className="italic" style={{ color: "var(--sage)" }}>
                schimbă ceva
              </span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-5" style={{ color: "var(--charcoal-soft)" }}>
              Programele noastre sunt pentru profesori, echipe din companii, tineri și părinți. Nu livrăm teorie — livrăm experiențe practice care se văd în comportamentul de zi cu zi.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              style={{ borderColor: "var(--cream-dark)" }}
            >
              {/* Image panel */}
              <div className={`relative min-h-64 lg:min-h-80 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={program.image}
                  alt={program.badge}
                  fill
                  className="object-cover"
                  quality={85}
                />
              </div>

              {/* Content */}
              <div className={`p-8 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`} style={{ backgroundColor: i % 2 === 0 ? "white" : "var(--cream)" }}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: program.badgeColor }}
                  >
                    {program.badge}
                  </span>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{ color: "var(--charcoal-soft)", borderColor: "var(--cream-dark)" }}
                  >
                    {program.status || "În curând"}
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-semibold mb-3"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                >
                  {program.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                  {program.description}
                </p>
                <p className="text-xs mb-5" style={{ color: "var(--charcoal-soft)" }}>
                  <span className="font-semibold">Pentru: </span>{program.for}
                </p>
                {program.active && program.href && (
                  <Link
                    href={program.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "#A0715A" }}
                  >
                    {program.cta || "Află mai multe"}
                    <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--sage)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold text-white mb-5"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Busola Interioară este disponibilă acum
          </h2>
          <p className="text-base sm:text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            Pentru celelalte programe, să purtăm o conversație despre nevoile și calendarul de lansare.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-white transition-all hover:shadow-lg"
            style={{ color: "var(--sage)" }}
          >
            Contactează-ne
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
