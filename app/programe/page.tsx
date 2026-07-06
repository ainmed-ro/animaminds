import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Programe",
  description:
    "Explorează programele AnimaMinds: workshopuri, formări profesionale, mentorat și programe pentru organizații. Practică, comunitate și impact real.",
};

const programs = [
  {
    image: "/images/digital-training.jpg",
    badge: "Workshop",
    badgeColor: "var(--sage)",
    title: "Competențe digitale în educație",
    description:
      "Un program intensiv pentru profesori și formatori care vor să integreze tehnologia în procesul de predare și formare. De la instrumente colaborative la crearea de conținut interactiv.",
    duration: "2 zile",
    participants: "15–25 participanți",
    includes: [
      "Platforme digitale de colaborare",
      "Creare conținut multimedia",
      "Evaluare digitală",
      "Resurse post-program",
    ],
    for: "Profesori, formatori, educatori",
  },
  {
    image: "/images/workshop-activity.jpg",
    badge: "Program de formare",
    badgeColor: "var(--terracotta)",
    title: "Leadership autentic",
    description:
      "Un program de 3 luni pentru manageri și lideri care vor să conducă cu integritate, să construiască echipe puternice și să comunice cu impact.",
    duration: "3 luni (sesiuni bilunare)",
    participants: "8–16 participanți",
    includes: [
      "Stiluri de leadership",
      "Comunicare nonviolentă",
      "Managementul conflictelor",
      "Coaching individual inclus",
    ],
    for: "Manageri, directori, lideri de echipă",
  },
  {
    image: "/images/laptop-training.jpg",
    badge: "Mentorat",
    badgeColor: "var(--sage)",
    title: "Mentoring 1:1 pentru formatori",
    description:
      "Sesiuni individuale cu formatori experimentați din rețeaua AnimaMinds. Ideal pentru cei care vor să-și construiască sau să-și rafineze practica de formare.",
    duration: "Flexibil (min. 3 luni)",
    participants: "Individual",
    includes: [
      "Sesiuni 1:1 personalizate",
      "Plan de acțiune individual",
      "Feedback pe livrabile",
      "Acces la rețeaua AnimaMinds",
    ],
    for: "Formatori, traineri, facilitatori",
  },
  {
    image: "/images/hero-workshop.jpg",
    badge: "Organizații",
    badgeColor: "var(--terracotta)",
    title: "Programe personalizate pentru companii",
    description:
      "Proiectăm și livrăm programe de formare interne adaptate culturii, obiectivelor și echipei fiecărei organizații. De la onboarding la programe de leadership.",
    duration: "Personalizat",
    participants: "Personalizat",
    includes: [
      "Analiză de nevoi",
      "Design curricular personalizat",
      "Livrare on-site sau online",
      "Raport de impact",
    ],
    for: "Companii, instituții, ONG-uri",
  },
];

export default function ProgramePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="py-24 lg:py-28"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="section-label">Programe</span>
            <div className="line-accent my-4" />
            <h1
              className="text-5xl sm:text-6xl font-semibold mb-5"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Ce facem{" "}
              <span className="italic" style={{ color: "var(--sage)" }}>
                împreună
              </span>
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "var(--charcoal-soft)" }}
            >
              Programele AnimaMinds sunt proiectate pentru impact real, nu
              pentru certificate. Fiecare experiență este concepută cu grijă
              pentru a genera schimbare autentică.
            </p>
          </div>
        </div>
      </section>

      {/* Programs list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                  quality={75}
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: program.badgeColor }}
                >
                  {program.badge}
                </div>
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2
                  className="text-3xl sm:text-4xl font-semibold mb-4"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                >
                  {program.title}
                </h2>
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: "var(--charcoal-soft)" }}
                >
                  {program.description}
                </p>

                {/* Meta */}
                <div
                  className="flex flex-wrap gap-4 mb-6 pb-6 border-b"
                  style={{ borderColor: "var(--cream-dark)" }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={15} style={{ color: "var(--sage)" }} />
                    <span className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
                      {program.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={15} style={{ color: "var(--sage)" }} />
                    <span className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
                      {program.participants}
                    </span>
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--charcoal-soft)" }}>
                    Ce include
                  </p>
                  <ul className="space-y-2">
                    {program.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle size={15} style={{ color: "var(--sage)", flexShrink: 0 }} />
                        <span className="text-sm" style={{ color: "var(--charcoal)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* For whom */}
                <p className="text-xs mb-5" style={{ color: "var(--charcoal-soft)" }}>
                  <span className="font-semibold">Pentru: </span>
                  {program.for}
                </p>

                <Link
                  href="/contact"
                  className="btn-primary group inline-flex"
                >
                  Solicită informații
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom programs CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold mb-5"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Nu găsești ce cauți?
          </h2>
          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--charcoal-soft)" }}
          >
            Proiectăm programe personalizate pentru fiecare client. Spune-ne
            nevoile tale și construim împreună soluția potrivită.
          </p>
          <Link href="/contact" className="btn-primary group">
            Hai să vorbim
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
