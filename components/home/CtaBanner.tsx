"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function CtaBanner() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-12 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ai-training-bw.jpg"
          alt="Comunitate AnimaMinds"
          fill
          className="object-cover object-center"
          quality={70}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(45,45,45,0.88) 0%, rgba(90,122,92,0.75) 100%)",
          }}
        />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest mb-4 block"
          style={{ color: "rgba(168,196,170,0.9)" }}
        >
          O nouă etapă?
        </span>
        <h2
          className="text-2xl sm:text-3xl font-semibold text-white mb-4"
          style={{ fontFamily: "Playfair Display, serif", lineHeight: 1.2 }}
        >
          Alături de noi.{" "}
          <span
            className="italic"
            style={{ color: "var(--sage-light)" }}
          >
            Împreună
          </span>{" "}
          suntem mai mult.
        </h2>
        <p
          className="text-base mb-8 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Fie că este vorba despre un profesionist în căutare de creștere, o organizație
          care investește în oameni sau un formator cu o idee
          — AnimaMinds este locul potrivit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/inscriere"
            className="btn-primary group"
            style={{ backgroundColor: "var(--sage)" }}
          >
            Înscrie-te acum
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="btn-outline-sage"
            style={{
              borderColor: "rgba(255,255,255,0.4)",
              color: "white",
            }}
          >
            Contactează-ne
          </Link>
        </div>
      </div>
    </section>
  );
}
