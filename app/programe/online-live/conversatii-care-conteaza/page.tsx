import type { Metadata } from "next";
import OnlineLiveForm from "@/components/OnlineLiveForm";
import { Calendar, Clock, Award, Users, Globe, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Conversații care Contează - Online Live | AnimaMinds",
  description: "Program de comunicare și colaborare în format online live. 8, 15, 22 Septembrie 2026. 7.5 ore, 8 CPD, 199 lei.",
};

export default function ConversatiiCareConteazaOnlineLivePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold">
              <Globe className="w-4 h-4 mr-2" />
              Online Live
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Conversații care Contează
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Program de comunicare și colaborare în format online live
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-6">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">8, 15, 22 Sept</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">7.5 ore</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">8 CPD</p>
            </div>
          </div>

          {/* Preț evidențiat */}
          <div className="max-w-xs mx-auto mb-8 rounded-2xl border-2 border-blue-500 overflow-hidden shadow-lg">
            <div className="bg-blue-600 px-4 py-2 text-center">
              <span className="text-white text-xs font-black uppercase tracking-wider">Taxă de participare</span>
            </div>
            <div className="bg-white px-6 py-4 text-center">
              <div className="flex items-end justify-center gap-2">
                <span className="text-5xl font-black text-gray-900 leading-none">199</span>
                <span className="text-xl font-semibold text-gray-700 mb-1">lei</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">/ participant · toate sesiunile incluse</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Detalii Program
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Calendar</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">8 Septembrie 2026</p>
                    <p className="text-sm text-gray-600">17:30–19:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">15 Septembrie 2026</p>
                    <p className="text-sm text-gray-600">17:30–20:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">22 Septembrie 2026</p>
                    <p className="text-sm text-gray-600">17:30–19:30</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Ce primești</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-gray-900">Acces la 3 sesiuni live</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-gray-900">Materiale curs în Google Classroom</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-gray-900">Certificat de participare</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-gray-900">Fișă competențe CPD (8 credite)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Format Online Live</h3>
            <p className="text-gray-700 mb-4">
              Programul se desfășoară exclusiv online prin platforma Google Meet. Participanții vor primi:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Link de acces securizat</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Interacțiune în timp real</span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Înregistrări ale sesiunilor</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Suport tehnic dedicat</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Înscriere
          </h2>
          <OnlineLiveForm />
        </div>
      </section>
    </div>
  );
}
