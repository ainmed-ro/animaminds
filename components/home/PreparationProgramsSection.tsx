"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, AlertCircle, Mail } from "lucide-react";

export default function PreparationProgramsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const preparationPrograms = [
    {
      title: "AI Fără Haos",
      status: "În pregătire",
      category: "Program complex",
      duration: "7.5 ore",
      cpd: "8 CPD",
      description: "Program dedicat utilizării clare, practice și responsabile a instrumentelor AI.",
      color: "var(--sage)"
    },
    {
      title: "Busola Deciziilor",
      status: "În pregătire",
      category: "Program complex",
      duration: "7.5 ore",
      cpd: "8 CPD",
      description: "Program dedicat clarității, analizei și luării deciziilor în contexte profesionale.",
      color: "var(--terracotta)"
    },
    {
      title: "Calm sub Presiune",
      status: "În pregătire",
      category: "Program focalizat",
      duration: "7 ore",
      cpd: "7 CPD",
      description: "Program dedicat gestionării presiunii, autoreglării și rezilienței profesionale.",
      color: "var(--charcoal)"
    },
    {
      title: "Avantajul Uman",
      status: "În pregătire",
      category: "Program focalizat",
      duration: "7 ore",
      cpd: "7 CPD",
      description: "Program dedicat dezvoltării competențelor umane relevante într-un context profesional tot mai digitalizat.",
      color: "var(--sage)"
    }
  ];

  return (
    <section className="py-16 px-4" style={{ backgroundColor: "var(--gray-warm)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <span className="section-label">Programe în pregătire</span>
            <div className="line-accent my-4 mx-auto" />
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Programe în dezvoltare
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lucrăm constant la dezvoltarea de noi programe pentru a răspunde nevoilor actuale de dezvoltare profesională.
            </p>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {preparationPrograms.map((program, index) => (
            <div
              key={program.title}
              className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all duration-700 hover:shadow-md ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4" style={{ color: program.color }} />
                <span 
                  className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${program.color}15`,
                    color: program.color 
                  }}
                >
                  {program.status}
                </span>
              </div>

              {/* Program Info */}
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: "var(--charcoal)" }}
              >
                {program.title}
              </h3>
              
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <span className="font-medium">{program.category}</span>
                <span>•</span>
                <span>{program.duration}</span>
                <span>•</span>
                <span>{program.cpd}</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {program.description}
              </p>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                style={{ 
                  backgroundColor: program.color,
                  color: "white"
                }}
              >
                <Mail className="w-4 h-4" />
                Notifică-mă la lansare
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <p className="text-gray-600 mb-4">
            Vrei să fii primul care află despre lansările noastre?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
            style={{ 
              backgroundColor: "var(--sage)",
              color: "white"
            }}
          >
            <Mail className="w-5 h-5" />
            Contactează-ne
          </Link>
        </div>
      </div>
    </section>
  );
}
