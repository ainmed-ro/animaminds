"use client";
import Link from "next/link";
import { Star, Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function LaunchBanner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          {/* Launch Badge */}
          <div
            className={`inline-flex items-center gap-2 mb-4 transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Star className="w-6 h-6 text-white animate-pulse" />
            <span className="text-white font-bold text-xl tracking-wide uppercase">
              EDIȚIE DE LANSARE
            </span>
            <Star className="w-6 h-6 text-white animate-pulse" />
          </div>

          {/* Main Title */}
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ fontFamily: "Playfair Display, serif", color: "white" }}
          >
            Experience Edition – Conversații care Contează
          </h1>

          {/* Date and Location */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-white">
            <div
              className={`flex items-center gap-2 transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">23–25 octombrie 2026</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Hotel Afrodita**** – Vălenii de Munte</span>
            </div>
          </div>

          {/* Price and Urgency */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
            <div
              className={`bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 transition-all duration-700 delay-400 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="text-white text-sm font-medium mb-2">Tarif special de lansare</div>
              <div className="text-4xl font-bold text-white mb-2">1.200 lei</div>
              <div className="text-white/80 text-sm">per participant – cameră dublă</div>
            </div>

            <div
              className={`bg-red-600 text-white rounded-xl p-6 border-2 border-red-700 transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-bold">Locuri limitate</span>
              </div>
              <div className="text-2xl font-bold">20–30 participanți</div>
              <div className="text-sm opacity-90">Grupa minimă necesară</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/experience-edition/conversatii-care-conteaza#rezerva-loc"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Rezervă un loc
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/experience-edition/conversatii-care-conteaza"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-lg font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg border-2 border-orange-700"
            >
              Află mai multe
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Urgency Note */}
          <div
            className={`mt-6 text-white/90 text-sm font-medium transition-all duration-700 delay-700 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            ⚠️ Tariful de lansare este valabil exclusiv pentru prima ediție Experience Edition
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
