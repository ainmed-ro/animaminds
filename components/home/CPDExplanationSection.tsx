"use client";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, BookOpen, Users, Target, Lightbulb, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function CPDExplanationSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/cpd-badge.png"
              alt="CPD Approved Provider #790577"
              width={180}
              height={90}
              className="object-contain"
            />
          </div>
          <h2
            className={`text-4xl font-bold mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "Playfair Display, serif",
              color: "var(--charcoal)",
            }}
          >
            AnimaMinds este CPD Approved Provider
          </h2>

          <p
            className={`text-lg leading-relaxed transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--charcoal-soft)" }}
          >
            AnimaMinds este furnizor CPD aprobat, cu numărul de provider <strong>#790577</strong>. Programele noastre sunt concepute ca activități de dezvoltare profesională continuă, cu obiective clare, activități aplicate și dovezi de participare.
          </p>

          <p
            className={`text-lg leading-relaxed mt-4 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--charcoal-soft)" }}
          >
            CPD – <em>Continuing Professional Development</em> – descrie activitățile de învățare prin care profesioniștii își dezvoltă, actualizează și consolidează cunoștințele, competențele și abilitățile pe parcursul carierei.
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
            <div
              key={index}
              className={`bg-white p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-700 delay-${index * 100} ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mb-6 ${item.color}`}>
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

        {/* What Participants Receive */}
        <div className="bg-gradient-to-r from-sage-50 to-blue-50 p-8 rounded-xl mb-16">
          <h3
            className={`text-2xl font-bold mb-6 text-center transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--charcoal)" }}
          >
            Ce primesc participanții
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Certificat de participare",
              "Fișa competențelor dezvoltate",
              "Credite CPD aferente programului",
              "Resurse digitale",
              "Instrumente practice aplicabile imediat",
              "Acces la comunitatea AnimaMinds"
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center transition-all duration-700 delay-${400 + index * 50} ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              >
                <CheckCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Institutions Receive */}
        <div className="bg-gradient-to-r from-blue-50 to-terracotta-50 p-8 rounded-xl mb-16">
          <h3
            className={`text-2xl font-bold mb-6 text-center transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--charcoal)" }}
          >
            Ce primesc instituțiile
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Programe personalizate conform nevoilor",
              "Documente pentru achiziții publice (SICAP/SEAP)",
              "Proces-verbal de recepție servicii",
              "Raport de evaluare a competențelor",
              "Suport logistic și organizare completă",
              "Parteneriat pe termen lung pentru dezvoltare"
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center transition-all duration-700 delay-${600 + index * 50} ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              >
                <CheckCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div
            className={`transition-all duration-700 delay-800 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg text-gray-600 mb-8">
              Descoperă cum AnimaMinds poate transforma dezvoltarea profesională în organizația ta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cpd-provider"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
              >
                Află mai multe despre CPD
              </Link>
              
              <a
                href="https://thecpd.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-500 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Verifică statutul CPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
