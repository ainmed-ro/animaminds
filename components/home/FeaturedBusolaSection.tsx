"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function FeaturedBusolaSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="/images/group-photo.jpg"
              alt="Busola Interioară — program AnimaMinds"
              fill
              className="object-cover"
              quality={80}
            />
          </div>

          {/* Content */}
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(155,126,189,0.12)", color: "#9B7EBD" }}
            >
              Program activ · Manifestare de interes
            </span>
            <h2
              className="text-2xl sm:text-3xl font-semibold mb-3"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Busola Interioară
            </h2>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--charcoal-soft)" }}
            >
              Un program experiențial de 3 zile pentru claritate, direcție și reconectare — 
              într-un cadru natural liniștit.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--charcoal-soft)" }}>
                <Calendar size={16} style={{ color: "#9B7EBD" }} />
                <span>28–30 august 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--charcoal-soft)" }}>
                <MapPin size={16} style={{ color: "#9B7EBD" }} />
                <span>La munte sau la mare</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--charcoal-soft)" }}>
                <Users size={16} style={{ color: "#9B7EBD" }} />
                <span>Maximum 25 participanți</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/retreats/busola-interioara"
                className="btn-primary group"
                style={{ backgroundColor: "#9B7EBD" }}
              >
                Sunt interesat(ă)
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/retreats/busola-interioara"
                className="btn-secondary"
              >
                Află mai multe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
