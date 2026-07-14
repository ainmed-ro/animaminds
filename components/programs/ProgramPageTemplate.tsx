"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, MapPin, Users, Globe, CheckCircle, Clock, Award, ArrowRight } from "lucide-react";

interface Program {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  cpdCredits: string;
  certificate: boolean;
  status: "available" | "preparation";
  targetAudience: string[];
  skills: string[];
  whatYouLearn: string[];
}

interface Format {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price?: string;
  details?: string[];
  cta: string;
  ctaLink: string;
}

interface Edition {
  id: string;
  dates: string;
  location?: string;
  price?: string;
  available: boolean;
}

const ProgramPageTemplate: React.FC<{
  program: Program;
  formats: Format[];
  editions?: Edition[];
}> = ({ program, formats, editions }) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const getStatusBadge = () => {
    if (program.status === "preparation") {
      return (
        <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
          În pregătire
        </span>
      );
    }
    return (
      <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
        Disponibil
      </span>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            {getStatusBadge()}
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            {program.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl leading-relaxed">
            {program.description}
          </p>

          {/* Available Formats */}
          <div className="mb-8">
            <p className="text-lg font-medium mb-4" style={{ color: "var(--charcoal)" }}>
              Formate disponibile:
            </p>
            <div className="flex flex-wrap gap-3">
              {formats.map((format) => (
                <span
                  key={format.id}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "var(--sage)", color: "white" }}
                >
                  {format.name}
                </span>
              ))}
            </div>
          </div>

          {/* Program Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} style={{ color: "var(--sage)" }} />
              <span className="font-medium">{program.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} style={{ color: "var(--sage)" }} />
              <span className="font-medium">{program.cpdCredits} CPD</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} style={{ color: "var(--sage)" }} />
              <span className="font-medium">Certificat de participare</span>
            </div>
          </div>

          {program.status === "available" && (
            <Link
              href="#formate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: "var(--sage)" }}
            >
              Alege formatul de participare
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </section>

      {/* What You Learn Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Ce vei învăța
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {program.whatYouLearn.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle 
                  size={20} 
                  style={{ color: "var(--sage)", marginTop: "2px" }}
                />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Cui se adresează
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {program.targetAudience.map((audience, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-xl border border-gray-200 text-center"
              >
                <span className="text-gray-700 font-medium">{audience}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Competențe dezvoltate
          </h2>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {program.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: "var(--sage)", 
                  color: "white" 
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Formats Section */}
      {program.status === "available" && (
        <section id="formate" className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Alege formatul
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {formats.map((format) => (
                <div
                  key={format.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--sage)" }}
                    >
                      {format.icon}
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "var(--charcoal)" }}>
                      {format.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{format.description}</p>
                  
                  {format.price && (
                    <div className="text-2xl font-bold mb-4" style={{ color: "var(--sage)" }}>
                      {format.price}
                    </div>
                  )}
                  
                  {/* Format-specific details */}
                  <div className="space-y-2 mb-6">
                    {format.id === "online-live" && (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: "var(--sage)" }} />
                          <span className="text-sm text-gray-700">{program.cpdCredits} CPD</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: "var(--sage)" }} />
                          <span className="text-sm text-gray-700">3 întâlniri online</span>
                        </div>
                      </>
                    )}
                    {format.id === "experience-edition" && (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: "var(--sage)" }} />
                          <a href="https://hotelafrodita.ro/valeni/contact/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 underline underline-offset-2 hover:text-gray-900 transition-colors">Hotel Afrodita</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: "var(--sage)" }} />
                          <span className="text-sm text-gray-700">3 ediții disponibile</span>
                        </div>
                      </>
                    )}
                    {format.id === "organizations" && (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: "var(--sage)" }} />
                          <span className="text-sm text-gray-700">online dedicat</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: "var(--sage)" }} />
                          <span className="text-sm text-gray-700">la sediul beneficiarului</span>
                        </div>
                      </>
                    )}
                    {format.id === "private-groups" && (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} style={{ color: "var(--sage)" }} />
                          <span className="text-sm text-gray-700">format personalizat</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <Link
                    href={format.ctaLink}
                    className="w-full py-3 px-4 rounded-xl font-bold text-white transition-all hover:shadow-lg text-center block"
                    style={{ backgroundColor: "var(--sage)" }}
                  >
                    {format.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editions Section (only for Experience Edition™) */}
      {editions && editions.length > 0 && selectedFormat === "experience-edition" && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Ediții disponibile
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {editions.map((edition) => (
                <div
                  key={edition.id}
                  className={`border rounded-2xl p-6 ${
                    edition.available 
                      ? "border-gray-200 bg-white hover:shadow-lg" 
                      : "border-gray-200 bg-gray-50 opacity-75"
                  } transition-all duration-300`}
                >
                  <div className="text-center mb-4">
                    <MapPin size={24} style={{ color: "var(--sage)" }} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-center mb-2" style={{ color: "var(--charcoal)" }}>
                    {edition.dates}
                  </h3>
                  
                  {edition.location && (
                    <p className="text-gray-600 text-center mb-4">{edition.location}</p>
                  )}
                  
                  {edition.price && (
                    <div className="text-xl font-bold text-center mb-4" style={{ color: "var(--sage)" }}>
                      {edition.price}
                    </div>
                  )}
                  
                  <Link
                    href={`/inscriere?program=${program.id}&edition=${edition.id}`}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-center block transition-all ${
                      edition.available
                        ? "bg-white text-sage border-2 border-sage hover:bg-sage hover:text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {edition.available ? "Alege ediția" : "Indisponibil"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {program.status === "preparation" && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Program în dezvoltare
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Detaliile despre {program.title} vor fi comunicate la lansare.
            </p>
            <button className="px-8 py-4 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all">
              Notifică-mă la lansare
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProgramPageTemplate;
