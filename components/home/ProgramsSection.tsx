"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const experiences = [
  { name: "CONVERSAȚII CARE CONTEAZĂ", subtitle: "Program complex de comunicare și colaborare", category: "Human", color: "#8B6F5E", status: "ACTIVE" },
  { name: "AI FĂRĂ HAOS", subtitle: "Cum folosim AI fără să ne pierdem judecata", category: "Future", color: "#C4714F", status: "ÎN PREGĂTIRE" },
  { name: "CALM SUB PRESIUNE", subtitle: "Managementul conflictelor și reziliență", category: "Human", color: "#8B6F5E", status: "ÎN PREGĂTIRE" },
  { name: "BUSOLA DECIZIILOR", subtitle: "Leadership și luarea deciziilor", category: "Leadership", color: "#4A6FA5", status: "ÎN PREGĂTIRE" },
  { name: "AVANTAJUL UMAN", subtitle: "Competențe umane pentru viitor", category: "Future", color: "#C4714F", status: "ÎN PREGĂTIRE" },
];

export default function ProgramsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      className="py-12"
      style={{ backgroundColor: "var(--gray-warm)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="section-label">AnimaMinds Experiences</span>
            <div className="line-accent my-4" />
            <h2
              className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Experiențe cu identitate proprie.
            </h2>
          </div>
          <Link
            href="/programe"
            className="flex items-center gap-2 text-sm font-medium group flex-shrink-0"
            style={{ color: "var(--sage)" }}
          >
            Toate experiențele
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {experiences.map((exp, i) => (
            <Link
              href="/programe"
              key={exp.name}
              className={`group bg-white rounded-2xl p-6 flex flex-col transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 60}ms`,
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                textDecoration: "none",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                >
                  {exp.category}
                </span>
                <div
                  className="w-2 h-2 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: exp.color }}
                />
              </div>
              <h3
                className="text-base font-bold mb-2 leading-tight"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                {exp.name}
              </h3>
              <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "var(--charcoal-soft)" }}>
                {exp.subtitle}
              </p>
              <span
                className="text-xs font-medium flex items-center gap-1 transition-all group-hover:gap-2"
                style={{ color: exp.color }}
              >
                Descoperă →
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="/programe"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl border transition-all hover:shadow-md"
            style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.1)" }}
          >
            ✦ Descoperă și AnimaMinds Retreats — experiențe imersive de 2–3 zile
          </Link>
        </div>
      </div>
    </section>
  );
}
