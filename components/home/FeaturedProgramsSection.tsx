"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const programs = [
  {
    symbol: "◇",
    title: "Conversații care Contează",
    description: "Claritate, curaj și conexiune reală în mesajele care contează.",
    color: "#C4785A",
    bg: "rgba(196,120,90,0.08)",
  },
  {
    symbol: "✦",
    title: "AI Fără Haos",
    description: "Folosește AI. Păstrează controlul. Fără jargon, cu aplicații concrete.",
    color: "#2D4A5C",
    bg: "rgba(45,74,92,0.08)",
  },
  {
    symbol: "◎",
    title: "Calm sub Presiune",
    description: "Resurse interne care rezistă în timp, indiferent de presiunea din jur.",
    color: "#7C9A7E",
    bg: "rgba(124,154,126,0.08)",
  },
  {
    symbol: "✦",
    title: "Busola Deciziilor",
    description: "Claritate și direcție atunci când lucrurile par neclare. Program activ.",
    color: "#A0715A",
    bg: "rgba(160,113,90,0.08)",
  },
  {
    symbol: "△",
    title: "Avantajul Uman",
    description: "Gândire critică, curiozitate, empatie și adaptabilitate în era AI-ului.",
    color: "#8a5da8",
    bg: "rgba(138,93,168,0.08)",
  },
];

export default function FeaturedProgramsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-10 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mb-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-label">Cele 5 programe fundamentale</span>
          <div className="line-accent my-4" />
          <h2
            className="text-2xl sm:text-3xl font-semibold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Experiențe de învățare{" "}
            <span className="italic" style={{ color: "var(--sage)" }}>
              pentru oameni și organizații
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            Fiecare program poate fi accesat Online Live, La sediul instituției / organizații sau sub formă de Experience Edition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`p-5 rounded-2xl card-hover transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                backgroundColor: "white",
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                transitionDelay: `${i * 80}ms`,
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
              <Link
                href="/programe"
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: program.color }}
              >
                Vezi programul
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
