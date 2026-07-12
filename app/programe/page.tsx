import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProgramList from "@/components/ProgramList";

export const metadata: Metadata = {
  title: "Programe",
  description:
    "Cele 5 programe fundamentale AnimaMinds: AI Fără Haos, Conversații care Contează, Calm sub Presiune, Busola Deciziilor, Avantajul Uman.",
};

export const dynamic = 'force-dynamic'

const programs = [
  {
    image: "/images/workshop-group-raise.jpg",
    badge: "LEADERSHIP & SCHIMBARE",
    badgeColor: "#A0715A",
    gradient: "linear-gradient(135deg, #7A5C3A 0%, #A0715A 50%, #C9A070 100%)",
    symbol: "✦",
    slogan: "Claritate și direcție atunci când lucrurile par neclare.",
    title: "Busola Deciziilor",
    description:
      "Un program experiențial de trei zile pentru persoane, echipe și organizații care vor să-și facă ordine în gânduri, să-și regăsească direcția și să construiască perspective noi împreună.",
    for: "Persoane · Echipe · Companii · Instituții publice · Organizații",
    formats: "Online · La sediul organizației · Open cohort · Experience Edition",
    active: true,
    status: "Disponibil acum",
    href: "/inscriere?programme=busola-deciziilor",
    cta: "Înscrie-te",
    tags: ["open", "organization", "experience"],
  },
  {
    image: "/images/digital-training.jpg",
    badge: "AI & FUTURE SKILLS",
    badgeColor: "var(--sage)",
    gradient: "linear-gradient(135deg, #2D4A5C 0%, #3d6b8a 50%, #5d8fa8 100%)",
    symbol: "✦",
    slogan: "Folosește AI. Păstrează controlul.",
    title: "AI Fără Haos",
    description:
      "Inteligența artificială nu vine să ia locul omului, ci să preia ce este plictisitor, repetitiv și consumator de timp — eliberând spațiu pentru ceea ce contează cu adevărat. Fără jargon, fără frică, cu aplicații concrete.",
    for: "Profesori · Manageri · Lideri de echipă · Specialiști · Antreprenori",
    formats: "Online · La sediul organizației · Open cohort · Experience Edition",
    active: false,
    status: "În curând",
    href: "/contact",
    cta: "Contactează-ne",
    tags: ["upcoming", "organization"],
  },
  {
    image: "/images/celebration.jpg",
    badge: "COMUNICARE & COLABORARE",
    badgeColor: "var(--terracotta)",
    gradient: "linear-gradient(135deg, #8B3A2A 0%, #C4785A 50%, #d9956e 100%)",
    symbol: "◇",
    slogan: "Cuvintele potrivite schimbă totul.",
    title: "Conversații care Contează",
    description:
      "Cum construim încredere, colaborare și feedback care produce rezultate. Un program practic despre comunicare eficientă, relații profesionale sănătoase și conversații care contribuie la performanță.",
    for: "Profesioniști · Manageri · Profesori · Tineri la început de carieră",
    formats: "Online · La sediul organizației · Open cohort · Experience Edition",
    active: false,
    status: "În curând",
    tags: ["upcoming"],
  },
  {
    image: "/images/workshop-collab.jpg",
    badge: "CONFLICTE & REZILIENȚĂ PROFESIONALĂ",
    badgeColor: "var(--sage)",
    gradient: "linear-gradient(135deg, #4a7c59 0%, #7C9A7E 50%, #a8c5a0 100%)",
    symbol: "◎",
    slogan: "Pauză. Respirație. Reconstrucție.",
    title: "Calm sub Presiune",
    description:
      "Un program practic pentru profesioniști care gestionează conversații dificile, tensiuni și situații cu miză ridicată. Participanții învață să răspundă cu claritate, calm și profesionalism atunci când presiunea crește.",
    for: "Profesori · Manageri · Personal medical · Administrație publică · Echipe din companii",
    formats: "Online · La sediul organizației · Open cohort · Experience Edition",
    active: false,
    status: "În curând",
    tags: ["upcoming", "organization", "experience"],
  },
  {
    image: "/images/workshop-activity.jpg",
    badge: "COMPETENȚE UMANE PENTRU VIITOR",
    badgeColor: "var(--terracotta)",
    gradient: "linear-gradient(135deg, #5C3D6B 0%, #8a5da8 50%, #a87dc5 100%)",
    symbol: "△",
    slogan: "Mintea este cel mai puternic instrument pe care îl avem la dispoziție.",
    title: "Avantajul Uman",
    description:
      "Într-o lume în care inteligența artificială poate genera informații și conținut, avantajul competitiv devine uman: gândirea critică, adaptabilitatea, creativitatea și discernământul. Programul dezvoltă competențele care completează tehnologia și rămân esențiale în viitorul muncii.",
    for: "Studenți și tineri · Profesioniști în reconversie · Profesori · Oricine vrea să progreseze",
    formats: "Online · La sediul organizației · Open cohort · Experience Edition",
    active: false,
    status: "În curând",
    tags: ["upcoming", "organization", "experience"],
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
              Dezvoltăm competențele esențiale pentru profesioniști, echipe și organizații într-o lume aflată în continuă schimbare.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-5" style={{ color: "var(--charcoal-soft)" }}>
              Cele 5 programe fundamentale AnimaMinds sunt pentru profesori, echipe din companii, tineri și organizații. Experiențe de învățare care se văd în comportamentul de zi cu zi — online, în locații dedicate, la sediul organizației sau în format Experience Edition, la munte sau la mare.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 bg-white">
        <ProgramList programs={programs} />
      </section>

      {/* CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--sage)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold text-white mb-5"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Busola Deciziilor este disponibilă acum
          </h2>
          <p className="text-base sm:text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            Pentru celelalte programe, filtrează după interesul tău sau solicită o ofertă pentru organizație.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscriere?programme=busola-deciziilor"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-white transition-all hover:shadow-lg"
              style={{ color: "var(--sage)" }}
            >
              Înscrie-te acum
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/colaboreaza"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium transition-all border hover:bg-white/10"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
            >
              Pentru organizații
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
