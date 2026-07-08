"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { Quote } from "lucide-react";

const photos = [
  { src: "/images/workshop-group-raise.jpg", alt: "Participanți activi" },
  { src: "/images/workshop-seara.jpg", alt: "Seară de workshop" },
  { src: "/images/workshop-activ.jpg", alt: "Workshop activ" },
  { src: "/images/ws-sala-prezentare.jpg", alt: "Prezentare workshop" },
  { src: "/images/eveniment-cina.jpg", alt: "Cină împreună" },
  { src: "/images/workshop-indoor.jpg", alt: "Sală de formare" },
  { src: "/images/workshop-prezentare-2.jpg", alt: "Workshop prezentare" },
  { src: "/images/deny-inn-arrival.jpg", alt: "Sosire la locație" },
];

export default function CommunitySection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-10 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-label">Comunitate</span>
          <div className="line-accent mx-auto my-4" />
          <h2
            className="text-2xl sm:text-3xl font-semibold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Construim ceva{" "}
            <span className="italic" style={{ color: "var(--sage)" }}>
              real
            </span>{" "}
            împreună
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--charcoal-soft)" }}
          >
            Nu suntem o platformă cu mii de utilizatori anonimi. Suntem o
            comunitate în care oamenii se cunosc, se sprijină și cresc unul
            alături de celălalt.
          </p>
        </div>

        {/* Photo mosaic */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 transition-all duration-700 delay-200 grid-rows-2 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative overflow-hidden rounded-xl aspect-square"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                quality={75}
              />
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(180deg, transparent 50%, rgba(90,122,92,0.5) 100%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 delay-400 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <Quote
              size={28}
              className="mx-auto mb-5"
              style={{ color: "var(--terracotta)" }}
            />
            <blockquote
              className="text-xl sm:text-2xl font-medium italic mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "var(--charcoal)",
                lineHeight: 1.5,
              }}
            >
              „Oamenii cresc atunci când se simt văzuți, ascultați și provocați să devină mai mult."
            </blockquote>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--sage)" }}
            >
              — Echipa AnimaMinds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
