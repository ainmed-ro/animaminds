"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { Heart, Lightbulb, Network, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Creăm spații sigure",
    description:
      "Medii în care oamenii se simt confortabil să fie vulnerabili, să pună întrebări și să crească fără teama de judecată.",
    color: "var(--terracotta)",
    bg: "rgba(196,120,90,0.08)",
  },
  {
    icon: Network,
    title: "Construim comunitate",
    description:
      "Conexiuni autentice între profesioniști care împart aceleași valori: curiozitate, respect și dorința de evoluție continuă.",
    color: "var(--sage)",
    bg: "rgba(124,154,126,0.08)",
  },
  {
    icon: Lightbulb,
    title: "Livrăm practică",
    description:
      "Nu teorie de dragul teoriei. Fiecare program, workshop sau sesiune de mentorat are aplicabilitate directă în activitatea ta.",
    color: "var(--terracotta)",
    bg: "rgba(196,120,90,0.08)",
  },
  {
    icon: TrendingUp,
    title: "Măsurăm creșterea",
    description:
      "Urmărim impactul real pe care îl avem — în competențele oamenilor, în organizații și în comunitățile pe care le servim.",
    color: "var(--sage)",
    bg: "rgba(124,154,126,0.08)",
  },
];

export default function ContributionSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      className="py-10"
      style={{ backgroundColor: "var(--cream)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`max-w-2xl mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-label">Cum contribuim</span>
          <div className="line-accent my-4" />
          <h2
            className="text-2xl sm:text-3xl font-semibold mt-3 mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Învățăm. Evoluăm.{" "}
            <span className="italic" style={{ color: "var(--sage)" }}>
              Împreună.
            </span>
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--charcoal-soft)" }}
          >
            AnimaMinds nu este un furnizor de cursuri. Suntem partenerii tăi de
            creștere — o comunitate construită pe patru piloni care fac
            diferența dintre a participa și a evolua cu adevărat.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`card-hover p-6 rounded-2xl transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  backgroundColor: "white",
                  transitionDelay: `${i * 100}ms`,
                  boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: pillar.bg }}
                >
                  <Icon size={22} style={{ color: pillar.color }} />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "var(--charcoal)",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--charcoal-soft)" }}
                >
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Photo strip */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: "/images/postit-echipa.jpg", alt: "Echipă" },
            { src: "/images/workshop-laptops.jpg", alt: "Training cu laptopuri" },
            { src: "/images/hero-workshop.jpg", alt: "Sală workshop" },
            { src: "/images/workshop-activity.jpg", alt: "Activitate workshop" },
          ].map((photo, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" quality={75} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
