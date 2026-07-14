import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CheckCircle, Star, Users, Calendar, Clock, Coffee, Utensils, Bed, Wifi, Car, Building, BookOpen, Lightbulb, Award, FileText } from "lucide-react";
import ExperienceEditionFormWrapper from "@/components/ExperienceEditionFormWrapper";
import CPDTrustBlock from "@/components/CPDTrustBlock";
import ExperienceEditionHero from "@/components/ExperienceEditionHero";

export const metadata: Metadata = {
  title: "Conversații care Contează - Experience Edition | AnimaMinds",
  description: "Prima ediție Experience Edition - program rezidențial de comunicare și colaborare. 23-25 octombrie 2026, Hotel Afrodita**** Vălenii de Munte.",
};

export default function ConversatiiCareConteazaPage() {
  return (
    <div className="min-h-screen bg-white">
      <ExperienceEditionHero />

      {/* De ce această primă ediție? */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-700 mb-4">Prima ediție</span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            De ce această primă ediție?
          </h2>

          <div className="space-y-5 text-gray-700 text-lg leading-relaxed text-left md:text-center">
            <p>
              <strong>Experience Edition începe aici.</strong>
            </p>
            <p>
              Pentru prima ediție, ne-am dorit mai mult decât o locație. Ne-am dorit un loc care să creeze cadrul potrivit pentru oameni, pentru conversații autentice, pentru învățare și pentru momente care rămân cu tine mult timp după încheierea programului.
            </p>
            <p>
              De aceea am ales <strong><a href="https://hotelafrodita.ro/valeni/contact/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80 transition-opacity">Hotel Afrodita din Vălenii de Munte</a></strong>. Nu doar pentru confort și facilități, ci pentru atmosfera pe care o oferă. Un loc care invită la reflecție, conectare și dezvoltare, departe de ritmul alert al fiecărei zile.
            </p>
          </div>

          {/* Citat evidențiat */}
          <blockquote className="my-10 px-6 py-8 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-2xl text-left">
            <p className="text-xl md:text-2xl font-semibold italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              „Am ales această primă ediție cu sufletul și cu gândul la oameni."
            </p>
          </blockquote>

          <div className="space-y-5 text-gray-700 text-lg leading-relaxed text-left md:text-center">
            <p>
              Această primă ediție este specială pentru noi. Este începutul unei povești construite cu grijă, cu suflet și cu respect pentru fiecare participant. Ne dorim ca fiecare persoană care ne trece pragul să simtă că face parte dintr-o experiență autentică, în care învățarea, inspirația și conexiunile umane sunt cu adevărat importante.
            </p>
            <p className="font-medium text-gray-900">
              Experience Edition nu este doar un eveniment. Este începutul unei comunități și al unei experiențe create în jurul oamenilor.
            </p>
          </div>
        </div>
      </section>

      {/* Launch Pricing Section */}
      <section className="py-14 px-4 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ofertă exclusivă de lansare
            </h2>
            <p className="text-gray-600">Tarif special valabil exclusiv pentru prima ediție · Locuri limitate</p>
          </div>

          <div className="rounded-2xl border-2 border-amber-400 overflow-hidden shadow-xl">
            {/* Header banner */}
            <div className="bg-amber-500 px-6 py-3 flex items-center justify-between">
              <span className="text-white font-black uppercase tracking-wider text-sm">🔥 OFERTĂ LANSARE – PRIMA EDIȚIE</span>
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">−17%</span>
            </div>

            <div className="bg-white p-8">
              {/* Cameră dublă – principal */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Cameră dublă</p>
                <span className="text-gray-400 line-through text-base">1.450 lei</span>
                <div className="flex items-end gap-3 mt-1">
                  <span className="text-6xl font-black text-gray-900 leading-none">1.200</span>
                  <span className="text-xl font-semibold text-gray-700 mb-2">lei</span>
                </div>
                <span className="inline-block bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full mt-2">🎁 Economisești 250 lei</span>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-100 pt-5">
                <p className="text-gray-400 text-sm mb-1">Cameră single</p>
                <span className="text-gray-400 line-through text-sm">1.650 lei</span>
                <div className="flex items-end gap-2 mt-0.5">
                  <span className="text-3xl font-black text-gray-800 leading-none">1.400</span>
                  <span className="text-gray-600 font-semibold mb-1">lei</span>
                </div>
              </div>

              <p className="text-xs text-amber-700 font-medium mt-5 text-center">⚠️ Tarif valabil exclusiv pentru prima ediție · Max 30 locuri disponibile</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="#rezerva-loc"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg hover:scale-105 transform"
            >
              Rezervă acum la tariful de lansare
              <Calendar className="w-5 h-5" />
            </Link>
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
              <a href="https://hotelafrodita.ro/valeni/contact/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-900 transition-colors">Hotel Afrodita****</a> – Vălenii de Munte
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--charcoal)" }}>
                De ce <a href="https://hotelafrodita.ro/valeni/contact/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">Hotel Afrodita</a>?
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
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href="https://hotelafrodita.ro/valeni/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
                >
                  Vizitează hotelul
                  <MapPin className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.google.com/maps/dir//Hotel+Afrodita,+Bulevardul+Nicolae+Iorga+14,+106400+V%C4%83lenii+de+Munte/@44.3711488,26.1292032,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40b3affed454b427:0xaa58f43d712816dd!2m2!1d26.0356329!2d45.1781049?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Deschide în Google Maps
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
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

      {/* CPD Info Block */}
      <section className="py-12 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce primești la finalul programului
            </h2>
            <p className="text-gray-600 text-sm">Conversații care Contează · 7,5 ore total · 8 credite CPD</p>
          </div>
          <CPDTrustBlock variant="full" credits={8} />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              { label: "7,5 ore total", sub: "program" },
              { label: "6,5 ore", sub: "activitate sincronă" },
              { label: "1 oră", sub: "activitate individuală ghidată" },
              { label: "8 credite", sub: "CPD" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-amber-200 rounded-lg py-3 px-2">
                <p className="font-bold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            ))}
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
