import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CheckCircle, Star, Users, Calendar, Clock, Coffee, Utensils, Bed, Wifi, Car, Building, BookOpen, Lightbulb, Award, FileText } from "lucide-react";
import ExperienceEditionFormWrapper from "@/components/ExperienceEditionFormWrapper";

export const metadata: Metadata = {
  title: "Conversații care Contează - Experience Edition | AnimaMinds",
  description: "Prima ediție Experience Edition - program rezidențial de comunicare și colaborare. 23-25 octombrie 2026, Hotel Afrodita**** Vălenii de Munte.",
};

export default function ConversatiiCareConteazaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-bold">
              <Star className="w-4 h-4 mr-2" />
              ✨ Ediție de lansare Experience Edition
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Conversații care Contează
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience Edition - Program rezidențial de comunicare și colaborare
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-terracotta-600" />
              <span>23–25 octombrie 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-terracotta-600" />
              <span>Hotel Afrodita**** – Vălenii de Munte</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#rezerva-loc"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Rezervă un loc acum
              <Calendar className="w-5 h-5" />
            </Link>
            
            <Link
              href="/programe/experience-edition"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-terracotta-600 text-terracotta-600 rounded-lg font-bold text-lg hover:bg-terracotta-50 transition-colors"
            >
              Vezi toate edițiile
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Launch Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ofertă exclusivă de lansare
            </h2>
            <p className="text-lg text-gray-600">
              Tarif special valabil exclusiv pentru prima ediție Experience Edition
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Price */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-300">
              <div className="text-center mb-6">
                <span className="text-gray-500 text-sm font-medium">Tarif standard</span>
                <div className="text-3xl font-bold text-gray-400 mt-2 line-through">1.490 lei</div>
                <div className="text-gray-600 text-sm">per participant – cameră dublă</div>
              </div>
            </div>

            {/* Launch Price */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg border-2 border-green-500 relative">
              <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                -20%
              </div>
              <div className="text-center mb-6">
                <span className="text-green-600 text-sm font-bold">TARIF DE LANSARE</span>
                <div className="text-4xl font-bold text-green-700 mt-2">1.200 lei</div>
                <div className="text-green-600 text-sm">per participant – cameră dublă</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 text-sm mb-2">Camera single: 1.400 lei</div>
                <div className="text-xs text-orange-600 font-medium">
                  ⚠️ Valabil exclusiv pentru prima ediție
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Locuri limitate: 20-30 participanți pentru experiență premium
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce este inclus în Experience Edition
            </h2>
            <p className="text-lg text-gray-600">
              O experiență completă de învățare și dezvoltare profesională
            </p>
          </div>
          
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
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Locație premium
            </h2>
            <p className="text-lg text-gray-600">
              Hotel Afrodita**** – Vălenii de Munte
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--charcoal)" }}>
                De ce Hotel Afrodita?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-terracotta-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-terracotta-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Cazare premium 4 stele</h4>
                    <p className="text-gray-600 text-sm">Camere moderne și confortabile pentru o experiență de neuitat</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-terracotta-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Coffee className="w-4 h-4 text-terracotta-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Restaurant și facilități complete</h4>
                    <p className="text-gray-600 text-sm">Mese gourmet și spații dedicate pentru workshop-uri</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-terracotta-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-terracotta-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Locație pitorească</h4>
                    <p className="text-gray-600 text-sm">Vălenii de Munte - liniște și natură pentru învățare profundă</p>
                  </div>
                </div>
              </div>
              
              <Link
                href="https://hotelafrodita.ro/valeni/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
              >
                Vizitează hotelul
                <MapPin className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--charcoal)" }}>
                Program rezidențial
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-terracotta-500 pl-4">
                  <div className="font-semibold text-terracotta-600">Vineri, 23 octombrie</div>
                  <div className="text-sm text-gray-600">Check-in, cina de bun venit, sesiune de networking</div>
                </div>
                
                <div className="border-l-4 border-terracotta-500 pl-4">
                  <div className="font-semibold text-terracotta-600">Sâmbătă, 24 octombrie</div>
                  <div className="text-sm text-gray-600">Workshop-uri intensive, activități experiențiale, cină tematică</div>
                </div>
                
                <div className="border-l-4 border-terracotta-500 pl-4">
                  <div className="font-semibold text-terracotta-600">Duminică, 25 octombrie</div>
                  <div className="text-sm text-gray-600">Reflecție ghidată, planificare profesională, check-out</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-terracotta-50 rounded-lg">
                <div className="flex items-center gap-2 text-terracotta-700 text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Grupă limitată: 20-30 participanți
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Cum dorești să participi?
            </h2>
            <p className="text-lg text-gray-600">
              Alege opțiunea potrivită pentru tine și începe experiența AnimaMinds
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Participare individuală */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Participare individuală
              </h3>
              <p className="text-gray-600 mb-6">
                Pentru participanții care doresc să se înscrie individual la Experience Edition.
              </p>
              <div className="mb-6">
                <p className="text-sm font-medium mb-3" style={{ color: "var(--sage)" }}>
                  Potrivit pentru:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    cadre didactice
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    formatori
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    manageri
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    specialiști
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    profesioniști interesați de dezvoltare profesională
                  </li>
                </ul>
              </div>
              <Link
                href="#rezerva-loc"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
              >
                Rezervă un loc
                <Calendar className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 - Grup organizat */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Grup organizat
              </h3>
              <p className="text-gray-600 mb-6">
                Pentru grupuri de persoane care doresc să participe împreună la Experience Edition.
              </p>
              <div className="mb-6">
                <p className="text-sm font-medium mb-3" style={{ color: "var(--sage)" }}>
                  Exemple:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    grupuri de profesori
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    echipe de proiect
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    comunități profesionale
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    grupuri de colegi
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    organizații profesionale
                  </li>
                </ul>
              </div>
              <Link
                href="/colaboreaza#solicita-oferta"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Solicită ofertă
                <Building className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 - Instituție / Organizație */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-terracotta-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Instituție / Organizație
              </h3>
              <p className="text-gray-600 mb-6">
                Pentru instituții și organizații care doresc să organizeze Experience Edition pentru echipele lor.
              </p>
              <div className="mb-6">
                <p className="text-sm font-medium mb-3" style={{ color: "var(--sage)" }}>
                  Potrivit pentru:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    unități de învățământ
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    instituții publice
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    companii private
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    unități sanitare
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ONG-uri și fundații
                  </li>
                </ul>
              </div>
              <Link
                href="/colaboreaza#solicita-oferta"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta-600 text-white rounded-lg font-medium hover:bg-terracotta-700 transition-colors"
              >
                Solicită ofertă
                <Building className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="rezerva-loc" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Rezervă un loc la Ediția de Lansare
            </h2>
            <p className="text-lg text-gray-600">
              Completează formularul și vei fi contactat pentru confirmarea rezervării
            </p>
          </div>
          
          <ExperienceEditionFormWrapper />
        </div>
      </section>

      {/* Transport Support Notice */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-yellow-900 font-bold text-sm">!</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--charcoal)" }}>
                  Transport Support Notice
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Transportul nu este inclus în tariful programului.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  La solicitarea beneficiarului sau a grupurilor organizate, AnimaMinds poate facilita contactul cu operatori autorizați de transport în vederea identificării unei soluții adecvate de deplasare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
