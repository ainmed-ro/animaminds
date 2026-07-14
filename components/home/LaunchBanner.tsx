"use client";
import Link from "next/link";
import { Star, Calendar, MapPin, Users, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function LaunchBanner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-700 overflow-hidden">
      {/* Elegant celebration background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-yellow-100 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-amber-200 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-yellow-300 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Launch Badge */}
          <div
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-yellow-300 font-bold text-xl tracking-wide uppercase">
              ✨ Lansare program - 3 formate disponibile
            </span>
            <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          {/* Main Title */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ fontFamily: "Playfair Display, serif", color: "white" }}
          >
            Conversații care Contează
          </h1>

          {/* Formats Available */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-white">
            <div
              className={`flex items-center gap-2 transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <Calendar className="w-5 h-5 text-yellow-200" />
              <span className="font-medium text-lg">Online Live • Experience Edition™ • Pentru organizații</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <MapPin className="w-5 h-5 text-yellow-200" />
              <span className="font-medium text-lg">Online • Vălenii de Munte • La sediul beneficiarului</span>
            </div>
          </div>

          {/* Format Options */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-10">
            <div
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-700 delay-400 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="text-yellow-200 text-xs font-bold mb-3 uppercase tracking-wider">Online Live</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-6xl font-black text-white leading-none">199</span>
                <span className="text-xl font-semibold text-white/90 mb-1">lei</span>
              </div>
              <div className="text-white/70 text-xs mb-2">/ participant</div>
              <div className="text-white/80 text-sm">3 sesiuni interactive</div>
            </div>

            <div
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="text-yellow-200 text-xs font-bold mb-3 uppercase tracking-wider">Experience Edition™</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-6xl font-black text-white leading-none">1.200</span>
                <span className="text-xl font-semibold text-white/90 mb-1">lei</span>
              </div>
              <div className="text-white/70 text-xs mb-2">/ participant</div>
              <div className="text-white/80 text-sm mb-2">Program intensiv de dezvoltare profesională</div>
              <div className="text-white/80 text-sm">în cadru rezidențial, grup restrâns</div>
            </div>

            <div
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-700 delay-600 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="text-yellow-200 text-xs font-bold mb-3 uppercase tracking-wider">Pentru organizații</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-6xl font-black text-white leading-none">3.500</span>
                <span className="text-xl font-semibold text-white/90 mb-1">lei</span>
              </div>
              <div className="text-white/70 text-xs mb-2">/ grup</div>
              <div className="text-white/80 text-sm mb-2">Programe dedicate școlilor, instituțiilor</div>
              <div className="text-white/80 text-sm">ONG-urilor, spitalelor și companiilor</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/programe"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-emerald-800 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl border-2 border-yellow-500"
            >
              Alege formatul
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/programe"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-xl border-2 border-emerald-600"
            >
              Află mai multe
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Location Button */}
          <div className={`mt-6 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}>
            <Link
              href="https://hotelafrodita.ro/valeni/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all border border-white/20"
            >
              <MapPin className="w-4 h-4" />
              Vezi locația
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </section>
  );
}
