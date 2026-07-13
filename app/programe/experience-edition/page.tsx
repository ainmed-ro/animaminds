import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CheckCircle, Star, Users, Calendar, Clock, Coffee, Utensils, Bed, Wifi, Car, Building, BookOpen, Lightbulb, Award, FileText } from "lucide-react";
import ExperienceEditionForm from "@/components/ExperienceEditionForm";

export const metadata: Metadata = {
  title: "Experience Edition - Program rezidențial de formare profesională | AnimaMinds",
  description: "Experience Edition combină workshop-uri aplicate, activități experiențiale, reflecție ghidată și networking profesional într-un cadru dedicat învățării și dezvoltării.",
};

export default function ExperienceEditionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-50 to-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              DESCHIS PENTRU REZERVĂRI
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Experience Edition
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Program rezidențial de formare profesională și dezvoltare de competențe
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#rezerva-loc"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
            >
              Rezervă un loc
              <Calendar className="w-5 h-5" />
            </Link>
            
            <Link
              href="#detalii"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-sage-600 text-sage-600 rounded-lg font-medium hover:bg-sage-50 transition-colors"
            >
              Află mai multe
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Editions List */}
      <section id="detalii" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Experience Editions
            </h2>
            <p className="text-lg text-gray-600">
              Programe rezidențiale de formare profesională și dezvoltare de competențe
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Edition 1 - Conversații care Contează - LAUNCH EDITION */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl shadow-lg border-2 border-orange-200 relative overflow-hidden">
              {/* Launch Badge */}
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                EDIȚIE DE LANSARE
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-6 h-6 text-orange-500" />
                    <h3 className="text-2xl font-bold" style={{ color: "var(--charcoal)" }}>
                      Conversații care Contează
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600">23–25 octombrie 2026</p>
                  <p className="text-sm text-orange-600 font-medium mt-1">Prima ediție Experience Edition</p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium animate-pulse">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    LOCURI LIMITATE
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold" style={{ color: "var(--charcoal)" }}>Tarif special de lansare:</h4>
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">-20%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">Cameră dublă</span>
                      <div className="text-right">
                        <div className="font-bold text-green-700">1.200 lei</div>
                        <div className="text-xs text-gray-500 line-through">1.490 lei</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">Cameră single</span>
                      <div className="text-right">
                        <div className="font-bold text-green-700">1.400 lei</div>
                        <div className="text-xs text-gray-500 line-through">1.690 lei</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-orange-600 mt-2 font-medium">
                    ⚠️ Valabil exclusiv pentru prima ediție
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="/inscriere"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg w-full"
                  >
                    Rezervă un loc acum
                    <Calendar className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Edition 2 - Busola Deciziilor */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>
                    Busola Deciziilor
                  </h3>
                  <p className="text-lg text-gray-600">Datele vor fi anunțate în curând</p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                    <Clock className="w-4 h-4 mr-2" />
                    ÎN CURÂND
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                Program rezidențial pentru dezvoltarea capacităților de decizie și leadership în contexte complexe.
              </p>
              
              <Link
                href="/programe/busola-deciziilor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
              >
                Află mai multe
                <BookOpen className="w-4 h-4" />
              </Link>
            </div>

            {/* Edition 3 - Calm sub Presiune */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>
                    Calm sub Presiune
                  </h3>
                  <p className="text-lg text-gray-600">Datele vor fi anunțate în curând</p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                    <Clock className="w-4 h-4 mr-2" />
                    ÎN CURÂND
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                Program rezidențial pentru dezvoltarea rezilienței emoționale și gestionarea stresului în medii profesionale demanding.
              </p>
              
              <div className="text-gray-500 text-sm">
                Program disponibil în curând. Lasă-ne datele tale pentru a fi notificat la lansare.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce este inclus în Experience Edition
            </h2>
            <p className="text-lg text-gray-600">
              O experiență completă de învățare și dezvoltare profesională
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                Program complet
              </h3>
              <p className="text-gray-600">
                Workshop-uri aplicate, activități experiențiale și sesiuni de reflecție ghidată.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                Networking profesional
              </h3>
              <p className="text-gray-600">
                Conexiuni autentice cu profesioniști din diverse domenii și schimb de experiență.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-terracotta-100 rounded-full flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6 text-terracotta-600" />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                Experiență completă
              </h3>
              <p className="text-gray-600">
                Cazare premium, mese incluse și activități complementare de învățare contextualizată.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Grupă limitată pentru experiență premium
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pentru a asigura calitatea și interacțiunea personalizată, fiecare ediție Experience Edition este limitată la 20-30 participanți.
          </p>
          
          <div className="bg-sage-50 p-8 rounded-xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-sage-700 mb-2">20-30</div>
                <div className="text-gray-600">Participanți</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sage-700 mb-2">3:1</div>
                <div className="text-gray-600">Rata facilitator-participant</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sage-700 mb-2">100%</div>
                <div className="text-gray-600">Feedback personalizat</div>
              </div>
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

      {/* Registration Form */}
      <section id="rezerva-loc" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Rezervă un loc la Experience Edition
            </h2>
            <p className="text-lg text-gray-600">
              Completează formularul și vei fi contactat pentru confirmarea rezervării
            </p>
          </div>
          
          <ExperienceEditionForm />
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
    </div>
  );
}
