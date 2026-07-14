import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MapPin, CheckCircle, Star, Users, Calendar, Clock, Coffee, Utensils, Bed, Wifi, Car, Building, BookOpen, Lightbulb, Award, FileText } from "lucide-react";
import OnlineLiveForm from "@/components/OnlineLiveForm";

export const metadata: Metadata = {
  title: "Conversații care Contează - Program de formare profesională | AnimaMinds",
  description: "Program interactiv de dezvoltare a competențelor de comunicare și relaționare prin metode dialogice și tehnici de facilitare a conversațiilor semnificative.",
};

export default function ConversatiiCareConteazaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-50 to-blue-50 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              DESCHIS PENTRU ÎNSCRIERI
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Conversații care Contează
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Program interactiv de dezvoltare a competențelor de comunicare și relaționare prin metode dialogice
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#online-live"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
            >
              Înscrie-te Online Live
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

      {/* Online Live Section */}
      <section id="online-live" className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Format Online Live
            </h2>
            <p className="text-lg text-gray-600">
              Participă live din confortul casei tale la sesiuni interactive de formare
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="bg-sage-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Program
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  8, 15, 22 Septembrie 2026
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Sesiuni live de 2.5 ore
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  8 credite CPD
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Grup de maxim 20 participanți
                </li>
              </ul>
            </div>
            
            <div className="rounded-xl overflow-hidden border-2 border-emerald-400">
              <div className="bg-emerald-600 px-5 py-2 flex items-center justify-between">
                <h3 className="text-white font-bold">Investiție</h3>
                <span className="text-emerald-100 text-xs">taxa de participare</span>
              </div>
              <div className="bg-white p-6">
              <div className="mb-1 text-gray-400 text-sm">Preț per participant</div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-black text-gray-900 leading-none">199</span>
                <span className="text-xl font-semibold text-gray-700 mb-1">lei</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Acces complet la întregul program</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Acces la toate sesiunile live
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Materiale de curs digitale
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Certificat de participare
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Suport pe durata programului
                </li>
              </ul>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<div>Se încarcă formularul...</div>}>
            <OnlineLiveForm />
          </Suspense>
        </div>
      </section>

      {/* Details Section */}
      <section id="detalii" className="py-10 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Despre Program
            </h2>
            <p className="text-lg text-gray-600">
              Metodologie interactivă bazată pe principiile dialogului autentic
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                Metodologie Interactivă
              </h3>
              <p className="text-gray-600">
                Învățare prin dialog, exerciții practice și studii de caz relevante.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                Grup Restrâns
              </h3>
              <p className="text-gray-600">
                Maxim 20 participanți pentru interacțiune personalizată și feedback individual.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-terracotta-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-terracotta-600" />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                Certificare CPD
              </h3>
              <p className="text-gray-600">
                8 credite de dezvoltare profesională continuă recunoscute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 bg-sage-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Pregătit pentru conversații cu adevărat semnificative?
          </h2>
          <p className="text-xl text-sage-100 mb-8">
            Alătură-te comunității profesionale care învață să comunice autentic
          </p>
          <Link
            href="#online-live"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sage-600 rounded-lg font-bold text-lg hover:bg-sage-50 transition-colors"
          >
            Înscrie-te acum
            <Calendar className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
