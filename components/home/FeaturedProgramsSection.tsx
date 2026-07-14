"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const availablePrograms = [
  {
    symbol: "◇",
    title: "Conversații care Contează",
    description: "Comunicare, feedback și colaborare.",
    color: "#C4785A",
    bg: "rgba(196,120,90,0.08)",
    status: "available",
    formats: ["Online Live", "Experience Edition™", "Pentru organizații", "Grupuri private"]
  }
];

const preparationPrograms = [
  {
    symbol: "✦",
    title: "AI Fără Haos",
    description: "Utilizarea practică și responsabilă a instrumentelor AI.",
    color: "#2D4A5C",
    bg: "rgba(45,74,92,0.08)",
    status: "preparation"
  },
  {
    symbol: "◎",
    title: "Calm sub Presiune",
    description: "Gestionarea presiunii și autoreglare.",
    color: "#7C9A7E",
    bg: "rgba(124,154,126,0.08)",
    status: "preparation"
  },
  {
    symbol: "✦",
    title: "Busola Deciziilor",
    description: "Claritate și luarea deciziilor în contexte complexe.",
    color: "#A0715A",
    bg: "rgba(160,113,90,0.08)",
    status: "preparation"
  },
  {
    symbol: "△",
    title: "Avantajul Uman",
    description: "Competențe umane esențiale într-o lume tot mai digitală.",
    color: "#8a5da8",
    bg: "rgba(138,93,168,0.08)",
    status: "preparation"
  }
];

export default function FeaturedProgramsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-10 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Available Programs Section */}
        <div
          className={`max-w-2xl mb-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-label">Disponibil acum</span>
          <div className="line-accent my-4" />
          <h2
            className="text-2xl sm:text-3xl font-semibold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Programe de dezvoltare profesională
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            Programe acreditate CPD cu aplicabilitate imediată în practica profesională.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {availablePrograms.map((program, i) => (
            <div
              key={program.title}
              className={`p-6 rounded-2xl card-hover transition-all duration-700 border-2 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                backgroundColor: "white",
                borderColor: "var(--sage)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: program.bg }}
                >
                  <span style={{ color: program.color, fontSize: "1.5rem" }}>
                    {program.symbol}
                  </span>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                  >
                    {program.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.formats.map((format, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{ backgroundColor: "var(--sage)", color: "white" }}
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/programe/conversatii-care-conteaza"
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: program.color }}
                  >
                    Află mai multe
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Programs in Preparation Section */}
        <div
          className={`max-w-2xl mb-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="section-label">În pregătire</span>
          <div className="line-accent my-4" />
          <h2
            className="text-2xl sm:text-3xl font-semibold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Programe în dezvoltare
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            Detaliile vor fi comunicate la lansare.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {preparationPrograms.map((program, i) => (
            <div
              key={program.title}
              className={`p-5 rounded-2xl transition-all duration-700 border border-gray-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                backgroundColor: "white",
                transitionDelay: `${(i + 3) * 80}ms`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: program.bg }}
              >
                <span style={{ color: program.color, fontSize: "1.25rem" }}>
                  {program.symbol}
                </span>
              </div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                {program.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                {program.description}
              </p>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                  În pregătire
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
