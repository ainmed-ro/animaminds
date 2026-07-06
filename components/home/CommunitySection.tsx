"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { Quote } from "lucide-react";

const photos = [
  { src: "/images/ws-participanti-ridica.jpg", alt: "Participanți activi" },
  { src: "/images/ws-cartonas-afirmatie.jpg", alt: "Activitate practică" },
  { src: "/images/ws-plicuri-nume.jpg", alt: "Activitate cu plicuri" },
  { src: "/images/ws-sala-prezentare.jpg", alt: "Prezentare workshop" },
  { src: "/images/celebration.jpg", alt: "Celebrare" },
  { src: "/images/sala-mare.jpg", alt: "Sală mare de formare" },
  { src: "/images/summer-workshop.jpg", alt: "Workshop de vară" },
  { src: "/images/group-outdoor.jpg", alt: "Grup în aer liber" },
];

export default function CommunitySection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-label">Comunitate</span>
          <div className="line-accent mx-auto my-4" />
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-5"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Construim ceva{" "}
            <span className="italic" style={{ color: "var(--sage)" }}>
              real
            </span>{" "}
            împreună
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--charcoal-soft)" }}
          >
            Nu suntem o platformă cu mii de utilizatori anonimi. Suntem o
            comunitate în care oamenii se cunosc, se sprijină și cresc unul
            alături de celălalt.
          </p>
        </div>

        {/* Photo mosaic */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-200 grid-rows-2 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-xl ${
                i === 0 ? "aspect-[3/4]" : i === 3 ? "aspect-[3/4]" : "aspect-square"
              }`}
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
            className="p-10 rounded-2xl"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <Quote
              size={28}
              className="mx-auto mb-5"
              style={{ color: "var(--terracotta)" }}
            />
            <blockquote
              className="text-2xl sm:text-3xl font-medium italic mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "var(--charcoal)",
                lineHeight: 1.5,
              }}
            >
              „Creșterea nu este un eveniment. Este un proces care se hrănește
              din relații, curaj și continuitate."
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
