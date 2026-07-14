"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Sparkles, Award } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/group-photo.jpg"
          alt="AnimaMinds workshop"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,240,232,0.93) 0%, rgba(245,240,232,0.80) 40%, rgba(124,154,126,0.15) 100%)",
          }}
        />
      </div>

      {/* Decorative shapes */}
      <div
        className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--sage)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--terracotta)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full">
        <div className="max-w-3xl">
          
          {/* CPD Badge */}
          <div
            className={`flex items-center gap-2 mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Award
              size={16}
              style={{ color: "var(--sage)" }}
            />
            <span className="text-sm font-medium" style={{ color: "var(--sage)" }}>
              CPD Approved Provider #790577
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "Playfair Display, serif",
              color: "var(--charcoal)",
            }}
          >
            Dezvoltare profesională care produce rezultate în practică.
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl leading-relaxed mb-4 max-w-3xl transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--charcoal-soft)", fontFamily: "Inter, sans-serif" }}
          >
            Programe CPD pentru profesioniști, organizații și comunități, disponibile în format Online Live, Experience Edition™ și pentru organizații.
          </p>

          {/* Brand Tagline */}
          <p
            className={`text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ 
              color: "var(--sage)", 
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic"
            }}
          >
            Locul unde oamenii și ideile cresc împreună.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/programe"
              className="btn-primary group"
            >
              Vezi programele
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/colaboreaza"
              className="btn-secondary"
            >
              Pentru organizații
            </Link>
          </div>

          {/* Social proof */}
          <div
            className={`flex flex-wrap items-center gap-4 mt-6 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
              <span className="font-semibold" style={{ color: "var(--sage)", fontFamily: "Playfair Display, serif" }}>5</span> programe fundamentale
            </p>
            <span style={{ color: "rgba(0,0,0,0.2)" }}>·</span>
            <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
              <span className="font-semibold" style={{ color: "var(--sage)", fontFamily: "Playfair Display, serif" }}>+7.000</span> participanți
            </p>
            <span style={{ color: "rgba(0,0,0,0.2)" }}>·</span>
            <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
              <span className="font-semibold" style={{ color: "var(--sage)", fontFamily: "Playfair Display, serif" }}>Standarde internaționale</span> CPD
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
