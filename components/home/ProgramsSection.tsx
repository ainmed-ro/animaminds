"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const programs = [
  {
    image: "/images/workshop-indoor.jpg",
    category: "Workshop",
    title: "Competențe digitale în educație",
    description:
      "Instrumente digitale practice pentru profesori și formatori. De la platforme collaborative la crearea de conținut interactiv.",
    duration: "2 zile",
    participants: "15-25 pers.",
    color: "var(--sage)",
  },
  {
    image: "/images/workshop-seara.jpg",
    category: "Program de formare",
    title: "Leadership autentic",
    description:
      "Dezvoltă un stil de conducere bazat pe valori, empatie și comunicare clară. Pentru manageri și lideri de echipă.",
    duration: "3 luni",
    participants: "8-16 pers.",
    color: "var(--terracotta)",
  },
  {
    image: "/images/workshop-notes.jpg",
    category: "Mentorat",
    title: "Mentoring 1:1 pentru formatori",
    description:
      "Sesiuni individuale cu formatori experimentați pentru a-ți clarifica direcția, a depăși blocaje și a-ți accelera creșterea.",
    duration: "Flexibil",
    participants: "Individual",
    color: "var(--sage)",
  },
];

export default function ProgramsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--gray-warm)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="section-label">Programe</span>
            <div className="line-accent my-4" />
            <h2
              className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Ce facem împreună
            </h2>
          </div>
          <Link
            href="/programe"
            className="flex items-center gap-2 text-sm font-medium group flex-shrink-0"
            style={{ color: "var(--sage)" }}
          >
            Toate programele
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`card-hover rounded-2xl overflow-hidden bg-white transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 120}ms`,
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  quality={75}
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: program.color }}
                >
                  {program.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                >
                  {program.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--charcoal-soft)" }}
                >
                  {program.description}
                </p>

                {/* Meta */}
                <div
                  className="flex items-center gap-5 pt-4 border-t"
                  style={{ borderColor: "var(--cream-dark)" }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={13} style={{ color: "var(--sage)" }} />
                    <span className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                      {program.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={13} style={{ color: "var(--sage)" }} />
                    <span className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                      {program.participants}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
