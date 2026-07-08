"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/group-photo.jpg"
          alt="AnimaMinds workshop"
          fill
          className="object-cover object-center"
          priority
          quality={80}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,240,232,0.95) 0%, rgba(245,240,232,0.85) 50%, rgba(124,154,126,0.10) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 w-full">
        <div className="max-w-2xl">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-5"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "var(--charcoal)",
            }}
          >
            AnimaMinds — programe experiențiale pentru oameni și organizații care vor să crească.
          </h1>

          <p
            className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
            style={{ color: "var(--charcoal-soft)" }}
          >
            Comunitate de învățare practică, unde profesioniști, lideri și instituții descoperă instrumente pentru evoluție continuă.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/retreats/busola-interioara"
              className="btn-primary group"
              style={{ backgroundColor: "#9B7EBD" }}
            >
              Sunt interesat(ă) de Busola Interioară
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/colaboreaza"
              className="btn-secondary"
            >
              Colaborează cu noi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
