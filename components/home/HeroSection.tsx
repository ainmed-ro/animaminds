"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <div
            className={`flex items-center gap-2 mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles
              size={14}
              style={{ color: "var(--terracotta)" }}
            />
            <span className="section-label">Comunitate de învățare</span>
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-6 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "Playfair Display, serif",
              color: "var(--charcoal)",
            }}
          >
            Locul unde{" "}
            <span style={{ color: "var(--sage)" }}>oamenii</span> și{" "}
            <span
              className="italic"
              style={{ color: "var(--terracotta)" }}
            >
              ideile
            </span>{" "}
            cresc împreună.
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl leading-relaxed mb-10 max-w-xl transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--charcoal-soft)", fontFamily: "Inter, sans-serif" }}
          >
            AnimaMinds nu este o academie de cursuri. Este o comunitate în care
            profesori, formatori, lideri și organizații se întâlnesc să învețe,
            să evolueze și să construiască împreună ceva mai bun.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/programe"
              className="btn-primary group"
            >
              Descoperă programele
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

          {/* Social proof */}
          <div
            className={`flex flex-wrap items-center gap-6 mt-14 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="text-center">
              <p className="text-3xl font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "var(--sage)" }}>+7.000</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--charcoal-soft)" }}>oameni care au crescut cu noi</p>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "var(--sage)" }}>+20</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--charcoal-soft)" }}>programe livrate în teren</p>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "var(--sage)" }}>100%</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--charcoal-soft)" }}>practică, zero teorie goală</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50">
        <div className="w-px h-8 bg-gray-400 animate-pulse" />
        <span className="text-xs text-gray-500 tracking-widest uppercase">
          scroll
        </span>
      </div>
    </section>
  );
}
