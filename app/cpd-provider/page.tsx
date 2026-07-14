import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, CheckCircle, BookOpen, Lightbulb, Target, FileText, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Ce este CPD? | AnimaMinds – CPD Approved Provider #790577",
  description: "CPD înseamnă Continuing Professional Development – dezvoltare profesională continuă. AnimaMinds este furnizor CPD aprobat, #790577, și eliberează certificat de participare și fișa competențelor.",
};

export default function CPDProviderPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-14 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/cpd-badge.png"
              alt="CPD Approved Provider #790577"
              width={220}
              height={110}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Ce este CPD?
          </h1>
          <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
            CPD înseamnă <strong>Continuing Professional Development</strong> – dezvoltare profesională continuă. CPD descrie activitățile de învățare prin care profesioniștii își dezvoltă, actualizează și consolidează cunoștințele, competențele și abilitățile pe parcursul carierei.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AnimaMinds este furnizor CPD aprobat, cu numărul de provider <strong>#790577</strong>. Programele noastre sunt concepute ca activități de dezvoltare profesională continuă, cu obiective clare, activități aplicate și dovezi de participare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="https://www.cpduk.co.uk/explained"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-500 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Află mai multe despre CPD
            </a>
            <a
              href="https://thecpd.group/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Verifică statutul CPD
            </a>
          </div>
        </div>
      </section>

      {/* Tipuri activități CPD */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Tipuri de activități CPD
          </h2>
          <p className="text-center text-gray-600 mb-10">
            CPD include orice activitate de învățare structurată sau individuală care contribuie la dezvoltarea profesională.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen className="w-7 h-7" />,
                title: "Activități structurate",
                description: "Cursuri, workshop-uri, webinarii, seminarii, training-uri cu facilitator. Acestea implică participare activă și obiective de învățare clare.",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                icon: <Lightbulb className="w-7 h-7" />,
                title: "Activități reflective",
                description: "Jurnale de practică, supervizare, peer learning, autoevaluare. Reflecția ghidată transformă experiența în cunoaștere aplicabilă.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                icon: <Target className="w-7 h-7" />,
                title: "Activități individuale",
                description: "Lectură profesională, cercetare, e-learning, studiu individual. Self-directed learning recunoscut ca formă validă de CPD.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center mb-4 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--charcoal)" }}>{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce primești */}
      <section className="py-10 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Ce primești la finalul unui program AnimaMinds?
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Fiecare participant primește documente care atestă participarea și competențele dobândite.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Certificat de participare", desc: "Document nominal care atestă participarea la program, formatul, durata și creditele CPD." },
              { label: "Fișa competențelor dezvoltate", desc: "Document detaliat cu competențele specifice dobândite în cadrul programului." },
              { label: "Credite CPD aferente programului", desc: "Numărul de credite CPD recunoscut pentru fiecare program, conform standardelor internaționale." },
              { label: "Resurse digitale", desc: "Materiale de lucru, fișe, resurse suplimentare accesibile după finalizarea programului." },
              { label: "Dovezi ale participării și învățării", desc: "Documentație completă pentru portofoliul profesional CPD al participantului." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-amber-200 rounded-xl p-5 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificat de participare */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                  Ce certificat primești?
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                La finalizarea programului, participantul primește un <strong>certificat de participare</strong> care include:
              </p>
              <ul className="space-y-2">
                {[
                  "Numele participantului",
                  "Denumirea programului",
                  "Formatul de participare",
                  "Perioada de desfășurare",
                  "Numărul de ore",
                  "Creditele CPD",
                  "Datele furnizorului CPD",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Documentul se numește</p>
                <p className="font-bold text-gray-800">Certificat de participare</p>
                <p className="text-xs text-gray-500 mt-2">Nu este diplomă, calificare, atestat profesional sau certificat recunoscut de stat. Este un document CPD conform standardelor internaționale.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/cpd-certificate.png"
                alt="CPD Provider Certificate – AnimaMinds #790577"
                width={400}
                height={280}
                className="rounded-xl shadow-lg object-contain max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fișa competențelor */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Fișa competențelor dezvoltate
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Pe lângă certificatul de participare, participantul primește o fișă a competențelor dezvoltate în cadrul programului. Aceasta detaliază competențele specifice formate și consolidate.
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Exemplu — Conversații care Contează:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Comunicare interpersonală",
                "Ascultare activă",
                "Feedback constructiv",
                "Gestionarea conversațiilor dificile",
                "Colaborare profesională",
                "Formularea întrebărilor relevante",
              ].map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verificare furnizor */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Verifică statutul CPD al AnimaMinds
          </h2>
          <p className="text-gray-600 mb-8">
            Statutul de furnizor CPD aprobat poate fi verificat public pe platforma oficială The CPD Group.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 flex flex-col items-center gap-6">
            <Image
              src="/cpd-badge.png"
              alt="CPD Approved Provider #790577"
              width={200}
              height={100}
              className="object-contain"
            />
            <p className="text-gray-700 font-medium">AnimaMinds · NICULAE ALINA-IONELA PFA · Provider #790577</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://thecpd.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                The CPD Group
              </a>
              <a
                href="https://www.cpduk.co.uk/explained"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-amber-400 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ce este CPD – cpduk.co.uk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Participă la un program AnimaMinds
          </h2>
          <p className="text-gray-600 mb-8">
            Toate programele AnimaMinds sunt concepute ca activități CPD cu obiective clare și dovezi de participare.
          </p>
          <Link
            href="/programe"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-colors"
          >
            Vezi toate programele
          </Link>
        </div>
      </section>
    </div>
  );
}
