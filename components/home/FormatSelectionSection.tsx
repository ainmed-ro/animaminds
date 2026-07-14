"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Globe, CheckCircle } from "lucide-react";

export default function FormatSelectionSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const formats = [
    {
      id: "online-live",
      title: "Online Live",
      description: "Participi online, în timp real, prin întâlniri live și activitate individuală în Google Classroom.",
      features: ["7,5 ore", "8 CPD", "acces de oriunde"],
      icon: Globe,
      color: "var(--sage)",
      buttonText: "Vezi ediția online",
      buttonLink: "/programe/conversatii-care-conteaza#online-live"
    },
    {
      id: "experience-edition",
      title: "Experience Edition™",
      description: "Participi la program la Hotel Afrodita, Vălenii de Munte, alături de ceilalți participanți, într-un format care încurajează dialogul, colaborarea și schimbul de experiență.",
      features: ["Hotel Afrodita", "grup restrâns", "experiență aplicată"],
      icon: MapPin,
      color: "var(--terracotta)",
      buttonText: "Vezi edițiile disponibile",
      buttonLink: "/programe/experience-edition/conversatii-care-conteaza",
      location: "📍 Hotel Afrodita, Vălenii de Munte",
      locationLink: "https://hotelafrodita.ro/valeni/"
    },
    {
      id: "organizations",
      title: "Pentru organizații",
      description: "Programe dedicate școlilor, spitalelor, instituțiilor publice, ONG-urilor și companiilor, livrate online dedicat sau la sediul beneficiarului.",
      features: ["școlilor", "spitalelor", "instituțiilor publice", "ONG-urilor", "companiilor"],
      icon: Users,
      color: "var(--sage)",
      buttonText: "Solicită ofertă",
      buttonLink: "/colaboreaza#solicita-oferta"
    },
  ];

  return (
    <section className="pt-12 pb-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Alege formatul potrivit
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fiecare format este conceput pentru a oferi aceeași calitate și rezultate, adaptat nevoilor tale specifice.
          </p>
        </div>

        {/* Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {formats.map((format, index) => {
            const Icon = format.icon;
            return (
              <div
                key={format.id}
                className={`group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  borderTopWidth: index === 1 ? "3px" : "1px",
                  borderTopColor: index === 1 ? "var(--terracotta)" : "transparent"
                }}
              >
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${format.color}15` }}
                >
                  <Icon 
                    size={24} 
                    style={{ color: format.color }}
                  />
                </div>

                {/* Title */}
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--charcoal)" }}
                >
                  {format.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {format.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {format.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle 
                        size={14} 
                        style={{ color: format.color }}
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={format.buttonLink}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 group-hover:shadow-lg ${
                    format.id === "experience-edition" 
                      ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-700 hover:to-amber-600"
                      : "text-white hover:shadow-lg"
                  }`}
                  style={{ 
                    backgroundColor: format.id !== "experience-edition" ? format.color : undefined
                  }}
                >
                  {format.buttonText}
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Location info for Experience Edition */}
                {format.id === "experience-edition" && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      {format.location}
                    </p>
                    <a
                      href={format.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                      style={{ color: format.color }}
                    >
                      Vezi locația
                      <svg 
                        className="w-3 h-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Hover Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: format.color }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-6">
            Nu ești sigur ce format ți se potrivește?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
          >
            Discută cu un specialist
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
