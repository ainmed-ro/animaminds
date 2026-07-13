"use client";
import Link from "next/link";
import { Monitor, MapPin, Building, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ServiceCards() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const services = [
    {
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Laptop screen */}
          <rect x="20" y="35" width="80" height="50" rx="4" fill="#f5f5f0" stroke="#2c5f2d" strokeWidth="2"/>
          <rect x="25" y="40" width="70" height="35" fill="#e8f5e8"/>
          
          {/* Live participants bubbles */}
          <circle cx="35" cy="50" r="4" fill="#7c9a7e"/>
          <circle cx="85" cy="50" r="4" fill="#7c9a7e"/>
          <circle cx="60" cy="48" r="5" fill="#d4a574"/>
          
          {/* Digital learning elements */}
          <rect x="30" y="58" width="15" height="2" fill="#2c5f2d"/>
          <rect x="48" y="58" width="20" height="2" fill="#2c5f2d"/>
          <rect x="72" y="58" width="18" height="2" fill="#2c5f2d"/>
          
          {/* Laptop base */}
          <rect x="45" y="85" width="30" height="4" fill="#2c5f2d"/>
          <rect x="35" y="89" width="50" height="3" rx="1" fill="#2c5f2d"/>
          
          {/* Live indicator */}
          <circle cx="105" cy="40" r="3" fill="#dc2626"/>
          <text x="95" y="45" fontSize="8" fill="#dc2626" fontWeight="bold">LIVE</text>
        </svg>
      ),
      title: "Online Live",
      description: "Programe de formare profesională online, interactive și aplicate.",
      cta: "Înscrie-te acum",
      href: "/inscriere",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Workshop table */}
          <ellipse cx="60" cy="75" rx="35" ry="12" fill="#d4a574" stroke="#2c5f2d" strokeWidth="1"/>
          
          {/* People around table */}
          <circle cx="45" cy="65" r="8" fill="#7c9a7e"/>
          <circle cx="75" cy="65" r="8" fill="#7c9a7e"/>
          <circle cx="60" cy="55" r="8" fill="#d4a574"/>
          
          {/* Soft balloons */}
          <circle cx="25" cy="25" r="6" fill="#f5f5f0" stroke="#d4a574" strokeWidth="1" opacity="0.8"/>
          <circle cx="95" cy="20" r="5" fill="#f5f5f0" stroke="#d4a574" strokeWidth="1" opacity="0.8"/>
          <circle cx="30" cy="40" r="4" fill="#f5f5f0" stroke="#d4a574" strokeWidth="1" opacity="0.8"/>
          
          {/* Gold sparkles */}
          <path d="M85 35 L87 37 L89 35 L87 33 Z" fill="#d4a574" opacity="0.7"/>
          <path d="M40 30 L41 31 L42 30 L41 29 Z" fill="#d4a574" opacity="0.7"/>
          <path d="M70 25 L71 26 L72 25 L71 24 Z" fill="#d4a574" opacity="0.7"/>
          
          {/* Location pin */}
          <path d="M60 90 C55 90 50 85 50 80 C50 75 60 65 60 65 S70 75 70 80 C70 85 65 90 60 90 Z" fill="#dc2626" stroke="#fff" strokeWidth="1"/>
          <circle cx="60" cy="80" r="2" fill="#fff"/>
        </svg>
      ),
      title: "Experience Edition",
      description: "Program rezidențial de formare profesională și dezvoltare de competențe.",
      cta: "Rezervă loc",
      href: "/inscriere",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Building */}
          <rect x="30" y="40" width="60" height="45" fill="#f5f5f0" stroke="#2c5f2d" strokeWidth="2"/>
          <rect x="35" y="45" width="12" height="8" fill="#7c9a7e"/>
          <rect x="52" y="45" width="12" height="8" fill="#7c9a7e"/>
          <rect x="69" y="45" width="12" height="8" fill="#7c9a7e"/>
          <rect x="35" y="58" width="12" height="8" fill="#7c9a7e"/>
          <rect x="52" y="58" width="12" height="8" fill="#7c9a7e"/>
          <rect x="69" y="58" width="12" height="8" fill="#7c9a7e"/>
          <rect x="50" y="70" width="20" height="15" fill="#2c5f2d"/>
          
          {/* People around table */}
          <circle cx="25" cy="95" r="5" fill="#d4a574"/>
          <circle cx="95" cy="95" r="5" fill="#d4a574"/>
          <circle cx="60" cy="100" r="5" fill="#7c9a7e"/>
          
          {/* Table */}
          <ellipse cx="60" cy="105" rx="40" ry="8" fill="#d4a574" stroke="#2c5f2d" strokeWidth="1"/>
          
          {/* Documents */}
          <rect x="20" y="35" width="8" height="10" fill="#fff" stroke="#2c5f2d" strokeWidth="1" transform="rotate(-10 24 40)"/>
          <rect x="92" y="35" width="8" height="10" fill="#fff" stroke="#2c5f2d" strokeWidth="1" transform="rotate(10 96 40)"/>
          
          {/* Offer symbol */}
          <circle cx="60" cy="25" r="8" fill="#d4a574" stroke="#2c5f2d" strokeWidth="1"/>
          <text x="60" y="29" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">OFERTĂ</text>
        </svg>
      ),
      title: "Pentru organizații",
      description: "Programe dedicate școlilor, instituțiilor, ONG-urilor și companiilor.",
      cta: "Solicită ofertă",
      href: "/colaboreaza#solicita-oferta",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Lightbulb */}
          <circle cx="60" cy="35" r="12" fill="#f5f5f0" stroke="#d4a574" strokeWidth="2"/>
          <rect x="55" y="47" width="10" height="8" fill="#d4a574" stroke="#2c5f2d" strokeWidth="1"/>
          <line x1="57" y1="50" x2="63" y2="50" stroke="#2c5f2d" strokeWidth="1"/>
          <line x1="57" y1="52" x2="63" y2="52" stroke="#2c5f2d" strokeWidth="1"/>
          
          {/* Light rays */}
          <path d="M60 15 L60 20" stroke="#d4a574" strokeWidth="2"/>
          <path d="M45 35 L40 35" stroke="#d4a574" strokeWidth="2"/>
          <path d="M75 35 L80 35" stroke="#d4a574" strokeWidth="2"/>
          <path d="M48 22 L44 18" stroke="#d4a574" strokeWidth="2"/>
          <path d="M72 22 L76 18" stroke="#d4a574" strokeWidth="2"/>
          
          {/* Calendar */}
          <rect x="25" y="60" width="25" height="25" rx="2" fill="#f5f5f0" stroke="#2c5f2d" strokeWidth="2"/>
          <rect x="25" y="60" width="25" height="8" fill="#7c9a7e"/>
          <text x="37" y="65" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">2026</text>
          <text x="37" y="80" fontSize="10" fill="#2c5f2d" textAnchor="middle">OCT</text>
          
          {/* Growing plant */}
          <rect x="68" y="75" width="4" height="15" fill="#7c9a7e"/>
          <ellipse cx="70" cy="70" rx="8" ry="12" fill="#7c9a7e"/>
          <ellipse cx="65" cy="68" rx="5" ry="8" fill="#7c9a7e"/>
          <ellipse cx="75" cy="68" rx="5" ry="8" fill="#7c9a7e"/>
          
          {/* Open notebook */}
          <rect x="45" y="85" width="30" height="20" rx="2" fill="#fff" stroke="#2c5f2d" strokeWidth="2"/>
          <line x1="60" y1="85" x2="60" y2="105" stroke="#2c5f2d" strokeWidth="1"/>
          <line x1="48" y1="92" x2="57" y2="92" stroke="#2c5f2d" strokeWidth="1"/>
          <line x1="63" y1="92" x2="72" y2="92" stroke="#2c5f2d" strokeWidth="1"/>
          <line x1="48" y1="98" x2="57" y2="98" stroke="#2c5f2d" strokeWidth="1"/>
          <line x1="63" y1="98" x2="72" y2="98" stroke="#2c5f2d" strokeWidth="1"/>
          
          {/* Stars */}
          <path d="M30 45 L31 46 L32 45 L31 44 Z" fill="#d4a574" opacity="0.8"/>
          <path d="M90 50 L91 51 L92 50 L91 49 Z" fill="#d4a574" opacity="0.8"/>
          <path d="M85 75 L86 76 L87 75 L86 74 Z" fill="#d4a574" opacity="0.8"/>
        </svg>
      ),
      title: "Programe în pregătire",
      description: "Noi programe AnimaMinds vor fi lansate în curând.",
      cta: "Vezi programele",
      href: "/programe",
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Descoperă programele AnimaMinds
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            Formare profesională de excelență adaptată nevoilor tale - online, rezidențial sau pentru organizația ta
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-700 delay-${index * 100} overflow-hidden ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-sage-50 rounded-2xl flex items-center justify-center mb-6 p-3 shadow-sm border border-emerald-100 transform group-hover:scale-105 transition-all duration-300">
                  {service.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={service.href}
                  className={`inline-flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:shadow-lg transform hover:-translate-y-0.5`}
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
