"use client";
import Link from "next/link";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function TrustSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title */}
          <h2
            className={`text-3xl font-bold mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "Playfair Display, serif",
              color: "var(--charcoal)",
            }}
          >
            Furnizor CPD aprobat internațional
          </h2>

          {/* Content */}
          <p
            className={`text-lg leading-relaxed mb-8 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--charcoal-soft)" }}
          >
            AnimaMinds furnizează programe de formare profesională dezvoltate conform principiilor 
            Continuing Professional Development (CPD).
          </p>

          {/* CPD Number */}
          <div
            className={`flex items-center justify-center gap-2 mb-12 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Award size={20} style={{ color: "var(--sage)" }} />
            <span className="text-xl font-semibold" style={{ color: "var(--sage)" }}>
              CPD Approved Provider #790577
            </span>
          </div>

          {/* Certificates */}
          <div
            className={`grid md:grid-cols-3 gap-8 mb-12 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* CPD Certificate */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
                <Image
                  src="/cpd-certificate.png"
                  alt="CPD Certificate"
                  width={200}
                  height={280}
                  className="w-auto h-48 object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">Certificat CPD</p>
            </div>

            {/* Provider Badge */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
                <Image
                  src="/cpd-badge.png"
                  alt="CPD Provider Badge"
                  width={200}
                  height={280}
                  className="w-auto h-48 object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">Badge Furnizor</p>
            </div>

            {/* Verify Badge */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
                <Image
                  src="/cpd-verify-white.webp"
                  alt="Verify Badge"
                  width={200}
                  height={200}
                  className="w-auto h-48 object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">Verificare</p>
            </div>
          </div>

          {/* Verify Button */}
          <div
            className={`transition-all duration-700 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="https://thecpdregister.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
            >
              <ExternalLink size={16} />
              Verifică furnizorul
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
