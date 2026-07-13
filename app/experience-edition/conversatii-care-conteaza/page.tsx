import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CheckCircle, Star, Users, Calendar, Clock, Coffee, Utensils, Bed, Wifi, Car, Building, BookOpen, Lightbulb, Award, FileText } from "lucide-react";
import ExperienceEditionForm from "@/components/ExperienceEditionForm";

export const metadata: Metadata = {
  title: "Conversații care Contează - Experience Edition | AnimaMinds",
  description: "Program rezidențial de comunicare și colaborare în echipe profesionale. 23-25 octombrie 2026 la Hotel Afrodita**** Vălenii de Munte.",
};

export default function ConversatiiCareConteazaExperiencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-50 to-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              OPEN FOR RESERVATION
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Conversații care Contează
          </h1>
          
          <p className="text-2xl md:text-3xl mb-4" style={{ color: "var(--sage)" }}>
            Experience Edition
          </p>
          
          <p className="text-xl text-gray-600 mb-8">
            23–25 octombrie 2026 | Hotel Afrodita**** – Vălenii de Munte
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#rezerva-loc"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Rezervă un loc
              <Calendar className="w-5 h-5" />
            </Link>
            <Link
              href="/experience-edition"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sage-600 text-sage-600 rounded-lg font-medium hover:bg-sage-50 transition-colors"
            >
              Vezi toate edițiile
              <Users className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Launch */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-green-100 px-6 py-3 rounded-lg mb-6">
            <span className="text-green-800 font-bold text-lg">TARIF DE LANSARE</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--charcoal)" }}>
                Cazare cameră dublă
              </h3>
              <div className="text-4xl font-bold mb-2" style={{ color: "var(--sage)" }}>
                1.200 lei
              </div>
              <div className="text-gray-600">/ participant</div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--charcoal)" }}>
                Cazare cameră single
              </h3>
              <div className="text-4xl font-bold mb-2" style={{ color: "var(--sage)" }}>
                1.400 lei
              </div>
              <div className="text-gray-600">/ participant</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Valabil exclusiv pentru prima ediție Experience Edition
          </p>
        </div>
      </section>

      {/* Experience Description */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Experience Edition
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">
              Experience Edition combină formarea profesională, workshop-urile aplicate, activitățile experiențiale, reflecția ghidată și schimbul de bune practici într-un cadru dedicat învățării și dezvoltării profesionale.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">
              Programul este conceput pentru participanții care își doresc mai mult decât o experiență clasică de formare și urmăresc dezvoltarea competențelor într-un context care facilitează colaborarea, dialogul profesional și transferul în practică.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-700 text-center">
              Pe parcursul celor trei zile, participanții beneficiază de activități de formare, workshop-uri aplicate, exerciții colaborative, reflecție profesională, networking și experiențe complementare de învățare contextualizată.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              📍 Locația Experience Edition
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Hotel Afrodita**** – Vălenii de Munte
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <p className="text-lg text-gray-700 mb-8 text-center">
              Experience Edition se desfășoară într-o locație selectată pentru a susține învățarea, reflecția și colaborarea profesională.
            </p>
            
            <p className="text-gray-600 mb-8 text-center">
              Participanții beneficiază de:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "cazare într-o unitate clasificată la standard de 4 stele",
                "sală dedicată workshop-urilor și activităților de formare",
                "restaurant propriu",
                "coffee break-uri organizate pe durata activităților",
                "spații dedicate networkingului și schimbului de experiență",
                "acces la Rooftop8 cu vedere panoramică asupra Văii Teleajenului"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link
                href="https://hotelafrodita.ro/valeni/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Vizitează hotelul
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce include Experience Edition
            </h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "participarea la programul de formare profesională",
                "workshop-uri experiențiale și activități aplicate",
                "certificat de participare",
                "fișa competențelor dobândite",
                "resurse digitale",
                "activități de reflecție profesională",
                "networking profesional",
                "schimb de bune practici",
                "acces la sala de conferințe",
                "2 nopți de cazare",
                "cină de bun venit (vineri)",
                "mic dejun (sâmbătă)",
                "prânz (sâmbătă)",
                "cină (sâmbătă)",
                "mic dejun (duminică)",
                "coffee break premium (sâmbătă)",
                "coffee break premium (duminică)"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Activities */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Activități de învățare
            </h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "workshop-uri aplicate",
                "workshop-uri experiențiale",
                "studii de caz",
                "exerciții practice",
                "activități de reflecție ghidată",
                "activități colaborative",
                "networking profesional",
                "schimb de bune practici",
                "learning walks",
                "experiențe complementare de învățare contextualizată",
                "plan personal de transfer în practică"
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Experiences */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Experiențe complementare de învățare
            </h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <p className="text-lg text-gray-700 mb-6">
              În funcție de specificul fiecărei ediții, programul poate include activități complementare de învățare contextualizată, reflecție profesională și explorare culturală desfășurate în afara sălii de formare.
            </p>
            
            <p className="text-gray-600 mb-8">
              Aceste activități pot valorifica:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "Casa Memorială Nicolae Iorga",
                "Muzeul de Etnografie al Văii Teleajenului",
                "Muzeul de Artă Religioasă",
                "Muzeul Natura Văii Teleajenului",
                "patrimoniul cultural și natural al Văii Teleajenului"
              ].map((resource, index) => (
                <div key={index} className="flex items-start">
                  <BookOpen className="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{resource}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Notă:</strong> Activitățile complementare pot varia de la o ediție la alta și sunt comunicate participanților înainte de desfășurarea programului.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Section */}
      <section className="py-20 px-4 bg-gray-50">
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
                href="/colaboreaza"
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
                href="/colaboreaza"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta-600 text-white rounded-lg font-medium hover:bg-terracotta-700 transition-colors"
              >
                Solicită ofertă
                <Building className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transport Support Notice */}
      <section className="py-16 px-4 bg-gray-50">
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

      {/* Capacity */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Capacitate
            </h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold text-sage-600 mb-2">20</div>
                <div className="text-gray-600">participanți minim</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sage-600 mb-2">30</div>
                <div className="text-gray-600">participanți maxim</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Grupa minimă este necesară pentru confirmarea desfășurării programului.
            </p>
          </div>
        </div>
      </section>

      {/* SICAP/SEAP */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Achiziții publice
            </h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <Building className="w-16 h-16 text-sage-600 mx-auto mb-4" />
            <p className="text-lg text-gray-700">
              Achiziția programelor poate fi realizată și prin intermediul platformei SICAP/SEAP, conform procedurilor interne ale beneficiarului.
            </p>
          </div>
        </div>
      </section>

      {/* Reception Documents */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Documente de recepție
            </h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <FileText className="w-16 h-16 text-sage-600 mx-auto mb-4" />
            <p className="text-lg text-gray-700">
              La finalizarea programului, AnimaMinds poate pune la dispoziția beneficiarului documentele necesare pentru recepția serviciilor de formare, inclusiv proces-verbal de recepție, conform cerințelor contractuale.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="rezerva-loc" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Rezervă un loc
            </h2>
            <p className="text-lg text-gray-600">
              Completează formularul de mai jos pentru a-ți rezerva un loc la ediția Experience Edition.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Plata se realizează doar după confirmarea formării grupei minime de 20 participanți.
              </p>
            </div>
            <ExperienceEditionForm />
          </div>
        </div>
      </section>
    </div>
  );
}
