"use client";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { Building2, GraduationCap, Users2, Briefcase, ArrowRight } from "lucide-react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Companii",
    description: "Programe de formare interne, team building și dezvoltare organizațională.",
    color: "var(--sage)",
  },
  {
    icon: GraduationCap,
    title: "Instituții educaționale",
    description: "Parteneriate pentru formarea continuă a cadrelor didactice.",
    color: "var(--terracotta)",
  },
  {
    icon: Users2,
    title: "ONG-uri",
    description: "Sprijin pentru organizații cu misiune socială și impact comunitar.",
    color: "var(--sage)",
  },
  {
    icon: Briefcase,
    title: "Formatori independenți",
    description: "Alătură-te rețelei noastre și colaborează cu o echipă de profesioniști.",
    color: "var(--terracotta)",
  },
];

export default function PartnershipsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      className="py-10"
      style={{ backgroundColor: "var(--cream)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="section-label">Parteneriate</span>
            <div className="line-accent my-4" />
            <h2
              className="text-2xl sm:text-3xl font-semibold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Creștem împreună cu organizațiile{" "}
              <span className="italic" style={{ color: "var(--sage)" }}>
                care contează
              </span>
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--charcoal-soft)" }}
            >
              Colaborăm cu companii, instituții și organizații pentru a crea
              programe de formare personalizate, adaptate nevoilor reale și
              culturii fiecărui partener.
            </p>
            <Link
              href="/colaboreaza"
              className="btn-primary group inline-flex"
            >
              Deschidem o discuție despre parteneriat
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right: partner types */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {partnerTypes.map((type, i) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="p-5 rounded-2xl bg-white card-hover"
                  style={{
                    boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      backgroundColor:
                        type.color === "var(--sage)"
                          ? "rgba(124,154,126,0.1)"
                          : "rgba(196,120,90,0.1)",
                    }}
                  >
                    <Icon size={20} style={{ color: type.color }} />
                  </div>
                  <h4
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                  >
                    {type.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--charcoal-soft)" }}
                  >
                    {type.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo strip */}
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { src: "/images/alina-prezentare.jpg", alt: "Prezentare Alina" },
            { src: "/images/diplome-zambet.jpg", alt: "Diplome" },
            { src: "/images/group-photo.jpg", alt: "Grup" },
            { src: "/images/workshop-collab.jpg", alt: "Lucru în echipă" },
            { src: "/images/eveniment-cina.jpg", alt: "Cină împreună" },
            { src: "/images/deny-inn-arrival.jpg", alt: "Sosire la locație" },
            { src: "/images/workshop-laptops.jpg", alt: "Training cu laptopuri" },
            { src: "/images/workshop-prezentare-2.jpg", alt: "Prezentare workshop" },
            { src: "/images/engaged-audience.jpg", alt: "Participanți activi" },
            { src: "/images/summer-workshop.jpg", alt: "Workshop de vară" },
            { src: "/images/hero-workshop.jpg", alt: "Sală workshop" },
            { src: "/images/ws-sala-prezentare.jpg", alt: "Prezentare în sală" },
          ].map((photo, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" quality={70} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
