"use client";
import Link from "next/link";
import { Star, Calendar, MapPin, Users, BookOpen, Coffee, Utensils, Bed, Wifi, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function LaunchFeaturedSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-sage-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Sparkles className="w-6 h-6 text-sage-600" />
            <span className="text-sage-600 font-bold text-xl tracking-wide uppercase">
              Lansăm programul complet - 3 formate disponibile
            </span>
            <Sparkles className="w-6 h-6 text-sage-600" />
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Conversații care Contează - Program complet cu 3 formate disponibile
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Online Live",
              description: "3 întâlniri + 1h individual - 8, 15, 22 Septembrie - 199 lei"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Experience Edition",
              description: "Rezidențial la munte - 3 zile intensive - 1.200-1.400 lei"
            },
            {
              icon: <Coffee className="w-8 h-8" />,
              title: "Pentru organizații",
              description: "Online sau la sediu - 3.500-5.000 lei/grup - personalizat"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-700 delay-${index * 100} ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-6 text-sage-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Price Comparison */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-16">
          <h3
            className={`text-2xl font-bold mb-8 text-center transition-all duration-700 delay-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--charcoal)" }}
          >
            Ofertă exclusivă de lansare
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Price */}
            <div
              className={`border-2 border-gray-300 rounded-xl p-6 transition-all duration-700 delay-400 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="text-gray-500 text-sm font-medium mb-2">Tarif standard</div>
              <div className="text-3xl font-bold text-gray-400 mb-2 line-through">1.490 lei</div>
              <div className="text-gray-600 text-sm">per participant – cameră dublă</div>
            </div>

            {/* Launch Price */}
            <div
              className={`border-2 border-amber-500 bg-amber-50 rounded-xl p-6 relative transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                -20%
              </div>
              <div className="text-amber-600 text-sm font-medium mb-2">Tarif de lansare</div>
              <div className="text-4xl font-bold text-amber-700 mb-2">1.200 lei</div>
              <div className="text-amber-600 text-sm">per participant – cameră dublă</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              ⚠️ Tariful de lansare este valabil exclusiv pentru prima ediție Experience Edition
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>Camera single: 1.400 lei (lansare) vs 1.690 lei (standard)</span>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-gradient-to-r from-sage-100 to-blue-100 p-8 rounded-xl mb-16">
          <h3
            className={`text-2xl font-bold mb-8 text-center transition-all duration-700 delay-600 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "var(--charcoal)" }}
          >
            Ce este inclus în Experience Edition
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Participarea la programul de formare profesională",
              "Workshop-uri experiențiale și activități aplicate",
              "Certificat de participare recunoscut CPD",
              "Fișa competențelor dobândite",
              "Resurse digitale și materiale de curs",
              "Activități de reflecție profesională",
              "Networking profesional și schimb de experiență",
              "Acces la sala de conferințe dedicată",
              "2 nopți de cazare la Hotel Afrodita****",
              "Cină de bun venit (vineri)",
              "Mic dejun (sâmbătă și duminică)",
              "Prânz (sâmbătă)",
              "Cină (sâmbătă)",
              "Coffee break premium (sâmbătă și duminică)",
              "Acces la Rooftop8 cu vedere panoramică",
              "Activități complementare de învățare contextualizată"
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 transition-all duration-700 delay-${700 + index * 50} ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              >
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location and CTA */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Locație premium
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sage-600" />
                  <Link 
                    href="https://hotelafrodita.ro/valeni/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-sage-600 transition-colors underline decoration-dotted"
                  >
                    Hotel Afrodita**** – Vălenii de Munte
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-sage-600" />
                  <span className="text-gray-700">23–25 octombrie 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-sage-600" />
                  <span className="text-gray-700">20–30 participanți (grupă limitată)</span>
                </div>
              </div>
              
              <Link
                href="https://hotelafrodita.ro/valeni/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 font-medium transition-colors"
              >
                Vizitează hotelul
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="text-center">
              <div className="bg-emerald-800/90 backdrop-blur-sm text-white rounded-xl p-6 mb-6 border border-emerald-600/30">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Users className="w-6 h-6 text-yellow-200" />
                  <span className="font-bold text-lg text-yellow-200">Participanți</span>
                </div>
                <div className="text-3xl font-bold mb-2">20–30</div>
                <div className="text-sm opacity-90 mb-2">Grupa se formează la minimum 20 participanți</div>
                <div className="text-sm text-yellow-200 font-medium">Număr maxim: 30 participanți</div>
                <div className="text-sm text-yellow-200 mt-2">Plata se realizează doar după confirmarea formării grupei minime</div>
              </div>
              
              <Link
                href="/programe/conversatii-care-conteaza#online-live"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-lg font-bold text-lg hover:bg-sage-700 transition-all transform hover:scale-105 shadow-lg w-full"
              >
                Rezervă un loc acum
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
