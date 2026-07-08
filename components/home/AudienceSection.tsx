"use client";
import { useInView } from "@/hooks/useInView";

const audiences = [
  {
    title: "Cadre didactice",
    description:
      "Profesori și formatori care vor metode noi, practice și relevante pentru sala de clasă.",
  },
  {
    title: "Părinți",
    description:
      "Oameni care caută instrumente de comunicare, emoție și relație cu propriii copii.",
  },
  {
    title: "Lideri & Manageri",
    description:
      "Persoane care conduc echipe și vor să crească alături de ele, nu prin presiune.",
  },
  {
    title: "Organizații & Instituții",
    description:
      "Companii, școli și ONG-uri care investesc în dezvoltarea oamenilor lor.",
  },
];

export default function AudienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-14" style={{ backgroundColor: "var(--cream)" }} ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-label">Pentru cine sunt programele</span>
          <div className="line-accent mx-auto my-4" />
          <h2
            className="text-3xl sm:text-4xl font-semibold"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Programe pentru cei care vor mai mult decât informație
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {audiences.map((audience, i) => (
            <div
              key={audience.title}
              className={`p-6 rounded-2xl bg-white transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                {audience.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--charcoal-soft)" }}
              >
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
