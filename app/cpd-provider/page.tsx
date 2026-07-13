import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, ExternalLink, CheckCircle, BookOpen, Lightbulb, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "CPD Approved Provider #790577 | AnimaMinds",
  description: "AnimaMinds este un furnizor CPD aprobat internațional, oferind programe de formare profesională dezvoltate conform principiilor Continuing Professional Development.",
};

export default function CPDProviderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-sage-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Award className="w-8 h-8 text-sage-600" />
            <h1 className="text-4xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              CPD Approved Provider #790577
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8">
            AnimaMinds este un brand educațional operat de NICULAE ALINA-IONELA PFA.
          </p>
          
          <p className="text-lg text-gray-700 mb-8">
            Furnizorul este aprobat în cadrul The CPD Group și este înregistrat ca Approved Provider #790577.
          </p>
        </div>
      </section>

      {/* CPD Explanation Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce înseamnă CPD?
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              CPD – Continuing Professional Development – înseamnă dezvoltare profesională continuă.
            </p>
            <p className="text-lg text-gray-600">
              Pentru AnimaMinds, CPD nu înseamnă doar credite sau certificate. Înseamnă învățare aplicată, reflecție, dezvoltare continuă și transformarea ideilor în rezultate reale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Învățare aplicată",
                description: "Programe practice care conectează teoria cu realitatea profesională zilnică.",
                color: "text-sage-600",
                bgColor: "bg-sage-100"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Reflecție ghidată",
                description: "Spații dedicate pentru autoevaluare și planificare profesională.",
                color: "text-blue-600",
                bgColor: "bg-blue-100"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Rezultate reale",
                description: "Competențe tangibile și instrumente aplicabile imediat în practică.",
                color: "text-terracotta-600",
                bgColor: "bg-terracotta-100"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Certificare și Acreditare
            </h2>
            <p className="text-lg text-gray-600">
              Documente oficiale care atestă statutul de furnizor CPD aprobat
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* CPD Certificate */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="mb-6">
                <Image
                  src="/cpd-certificate.png"
                  alt="CPD Certificate"
                  width={300}
                  height={420}
                  className="w-auto h-64 mx-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--charcoal)" }}>
                Certificat CPD
              </h3>
              <p className="text-gray-600">
                Certificat oficial de aprobare ca furnizor CPD
              </p>
            </div>

            {/* Provider Badge */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="mb-6">
                <Image
                  src="/cpd-badge.png"
                  alt="CPD Provider Badge"
                  width={300}
                  height={420}
                  className="w-auto h-64 mx-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--charcoal)" }}>
                Badge Furnizor
              </h3>
              <p className="text-gray-600">
                Badge oficial care confirmă statutul de furnizor aprobat
              </p>
            </div>

            {/* Verify Badge */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="mb-6">
                <Image
                  src="/cpd-verify-white.webp"
                  alt="Verify Badge"
                  width={300}
                  height={300}
                  className="w-auto h-64 mx-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--charcoal)" }}>
                Verificare
              </h3>
              <p className="text-gray-600">
                Badge de verificare pentru confirmarea statutului
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CPD Standards Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Standarde CPD
            </h2>
            <p className="text-lg text-gray-600">
              Programele noastre respectă cele mai înalte standarde de dezvoltare profesională continuă
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Calitate Asigurată",
                description: "Toate programele sunt evaluate și aprobate conform standardelor CPD internaționale"
              },
              {
                title: "Dezvoltare Continuă",
                description: "Susținem învățarea pe tot parcursul carierei profesionale"
              },
              {
                title: "Recunoaștere Internațională",
                description: "Certificările noastre sunt recunoscute la nivel internațional"
              },
              {
                title: "Transparență",
                description: "Procese clare și documentate pentru toate programele de formare"
              }
            ].map((standard, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--charcoal)" }}>
                      {standard.title}
                    </h3>
                    <p className="text-gray-600">
                      {standard.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Verifică Furnizorul
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Poți verifica statutul nostru de furnizor CPD direct pe platforma oficială
          </p>
          
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-200">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">
                CPD Approved Provider #790577
              </span>
            </div>
            
            <Link
              href="https://thecpdregister.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <ExternalLink size={20} />
              Verifică pe The CPD Register
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Informații Legale
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>AnimaMinds</strong> este un brand educațional operat de:
              </p>
              <p className="font-semibold">
                NICULAE ALINA-IONELA PFA
              </p>
              <p>
                Toate programele de formare sunt furnizate în conformitate cu legislația în vigoare și cu standardele CPD internaționale.
              </p>
              <p>
                Pentru informații suplimentare despre certificare și acreditare, ne puteți contacta direct.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
