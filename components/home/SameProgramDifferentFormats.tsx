"use client";

import { useEffect, useState } from "react";
import { Globe, MapPin, Users, Calendar, CheckCircle } from "lucide-react";

export default function SameProgramDifferentFormats() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const formats = [
    {
      name: "Online Live",
      icon: Globe,
      color: "var(--sage)",
      suitableFor: "Participanți individuali",
      description: "Participi online, în timp real, din orice locație"
    },
    {
      name: "Experience Edition™",
      icon: MapPin,
      color: "var(--terracotta)",
      suitableFor: "Participanți care preferă interacțiune față în față",
      description: "Program la Hotel Afrodita, Vălenii de Munte, cu accent pe dialog și colaborare"
    },
    {
      name: "Pentru organizații",
      icon: Users,
      color: "var(--sage)",
      suitableFor: "Școli, spitale, ONG-uri, companii",
      description: "Programe dedicate și personalizate pentru nevoile organizației"
    },
  ];

  return (
    <section className="pt-12 pb-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Același program. Formate diferite.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Toate programele AnimaMinds sunt disponibile în multiple formate pentru a se potrivi nevoilor tale specifice.
          </p>
        </div>

        {/* Formats Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--sage)" }} className="text-white">
                  <th className="px-6 py-4 text-left font-semibold">Format</th>
                  <th className="px-6 py-4 text-left font-semibold">Potrivit pentru</th>
                  <th className="px-6 py-4 text-left font-semibold hidden md:table-cell">Descriere</th>
                </tr>
              </thead>
              <tbody>
                {formats.map((format, index) => {
                  const Icon = format.icon;
                  return (
                    <tr 
                      key={format.name}
                      className={`border-b border-gray-100 transition-all duration-300 hover:bg-gray-50 ${
                        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${format.color}15` }}
                          >
                            <Icon 
                              size={20} 
                              style={{ color: format.color }}
                            />
                          </div>
                          <span 
                            className="font-semibold"
                            style={{ color: "var(--charcoal)" }}
                          >
                            {format.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {format.suitableFor}
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                        {format.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <CheckCircle size={16} style={{ color: "var(--sage)" }} />
            <span className="text-sm text-blue-800">
              Fiecare format oferă aceleași competențe și rezultate, adaptat modului tău preferat de învățare
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
