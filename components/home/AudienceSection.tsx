"use client";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";

const audiences = [
  {
    emoji: "👩‍🏫",
    title: "Profesori & Formatori",
    description:
      "Predare mai eficientă, metode actualizate și acces la o comunitate care înțelege provocările profesionale.",
  },
  {
    emoji: "🧭",
    title: "Lideri & Manageri",
    description:
      "Instrumente practice de leadership, comunicare și construire de echipă — nu teorie, ci soluții aplicabile imediat.",
  },
  {
    emoji: "🏢",
    title: "Organizații & Companii",
    description:
      "Programe de formare personalizate pentru echipă, adaptate culturii și obiectivelor organizației.",
  },
  {
    emoji: "🤝",
    title: "ONG-uri & Instituții",
    description:
      "Implicare în educație, comunitate sau impact social și căutare de parteneri care înțeleg misiunea organizației.",
  },
  {
    emoji: "🌱",
    title: "Profesioniști în creștere",
    description:
      "Pentru cei care consideră că evoluția continuă este o responsabilitate, nu o opțiune.",
  },
  {
    emoji: "🔬",
    title: "Echipe de proiect",
    description:
      "Lucrul în proiecte complexe și nevoia de programe care îmbunătățesc colaborarea, comunicarea și performanța.",
  },
];

export default function AudienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-10 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/laptop-training.jpg"
                alt="Comunitate AnimaMinds"
                fill
                className="object-cover"
                quality={80}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(124,154,126,0.3) 100%)",
                }}
              />
            </div>
            {/* Floating card */}
            <div
              className="absolute bottom-4 right-4 p-4 rounded-xl shadow-xl"
              style={{ backgroundColor: "white", maxWidth: "180px" }}
            >
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--sage)", fontFamily: "Playfair Display, serif" }}
              >
                7.000+
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--charcoal-soft)" }}>
                participanți la programele noastre
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <span className="section-label">Cui ne adresăm</span>
            <div className="line-accent my-4" />
            <h2
              className="text-2xl sm:text-3xl font-semibold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Cine se alătură?
            </h2>
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: "var(--charcoal-soft)" }}
            >
              AnimaMinds se adresează tuturor celor care cred că învățarea nu
              se termină niciodată și că cele mai valoroase lecții vin din
              comunitate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audiences.map((audience, i) => (
                <div
                  key={audience.title}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-500 hover:shadow-md ${
                    inView ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundColor: "var(--gray-warm)",
                    transitionDelay: `${300 + i * 80}ms`,
                  }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">
                    {audience.emoji}
                  </span>
                  <div>
                    <h4
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--charcoal)" }}
                    >
                      {audience.title}
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--charcoal-soft)" }}
                    >
                      {audience.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
