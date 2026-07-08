"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function CtaBanner() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-16" style={{ backgroundColor: "var(--charcoal)" }} ref={ref}>
      <div
        className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2
          className="text-3xl sm:text-4xl font-semibold text-white mb-4"
          style={{ fontFamily: "Playfair Display, serif", lineHeight: 1.2 }}
        >
          Hai cu noi. <span className="italic" style={{ color: "#A8C4AA" }}>Împreună</span> suntem mai mult.
        </h2>
        <p
          className="text-base mb-8 max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Intră în comunitatea AnimaMinds și descoperă un mod mai uman de a învăța și a crește.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/retreats/busola-interioara"
            className="btn-primary group"
            style={{ backgroundColor: "#9B7EBD" }}
          >
            Sunt interesat(ă) de Busola
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="btn-secondary"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", borderColor: "rgba(255,255,255,0.25)" }}
          >
            Contactează-ne
          </Link>
        </div>
      </div>
    </section>
  );
}
