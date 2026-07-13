import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrganizationRequestForm from "@/components/OrganizationRequestForm";

export const metadata: Metadata = {
  title: "Colaborează cu noi - AnimaMinds",
  description: "Solicită ofertă personalizată pentru organizația ta. Programe dedicate școlilor, instituțiilor, ONG-urilor și companiilor.",
};

export const dynamic = 'force-dynamic'

export default function ColaboreazaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/group-outdoor.jpg"
            alt="Colaborare AnimaMinds"
            fill
            className="object-cover object-center"
            quality={75}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(245,240,232,0.95) 0%, rgba(245,240,232,0.7) 60%, transparent 100%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="section-label">Colaborează cu noi</span>
            <div className="line-accent my-4" />
            <h1
              className="text-5xl sm:text-6xl font-semibold mb-5"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Construim parteneriate{" "}
              <span className="italic" style={{ color: "var(--sage)" }}>
                autentice
              </span>
            </h1>
            <p
              className="text-xl leading-relaxed mb-8"
              style={{ color: "var(--charcoal-soft)" }}
            >
              Indiferent de profil — companie, instituție cu nevoie de formare
              sau formator independent — avem un model de colaborare adaptat
              contextului.
            </p>
            <Link href="/contact" className="btn-primary group">
              Începe conversația
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why AnimaMinds */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">De ce AnimaMinds</span>
              <div className="line-accent my-4" />
              <h2
                className="text-4xl font-semibold mb-6"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Nu suntem un furnizor de cursuri. Suntem parteneri de creștere.
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "var(--charcoal-soft)" }}
              >
                Fiecare colaborare AnimaMinds pornește de la o analiză de nevoi
                reale, nu de la un catalog fix. Construim programe împreună cu
                partenerii, nu în locul lor.
              </p>
              <ul className="space-y-3">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "var(--sage)" }}
                    />
                    <span className="text-sm" style={{ color: "var(--charcoal)" }}>
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/deny-inn-arrival.jpg"
                alt="Parteneriat AnimaMinds"
                fill
                className="object-cover"
                quality={75}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner types */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--gray-warm)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Tipuri de colaborare</span>
            <div className="line-accent mx-auto my-4" />
            <h2
              className="text-4xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Cui ne adresăm
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="p-8 rounded-2xl bg-white card-hover"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "rgba(124,154,126,0.1)" }}
                  >
                    <Icon size={22} style={{ color: "var(--sage)" }} />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                  >
                    {type.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--charcoal-soft)" }}
                  >
                    {type.desc}
                  </p>
                  <p
                    className="text-xs italic"
                    style={{ color: "var(--sage)" }}
                  >
                    {type.cta}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 rounded-2xl text-center" style={{ backgroundColor: "rgba(124,154,126,0.08)", border: "1px solid rgba(124,154,126,0.2)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
              <strong style={{ color: "var(--charcoal)" }}>Locația nu este o barieră.</strong> Livrăm programe în contextul echipei — la sediu, online sau în locații de inspirație dedicate, inclusiv la munte sau la mare, pentru o experiență de învățare și transformare mai profundă.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Procesul nostru</span>
            <div className="line-accent mx-auto my-4" />
            <h2
              className="text-4xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Cum funcționează o colaborare
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Conversație inițială", desc: "Discutăm nevoile, contextul și obiectivele organizației." },
              { step: "02", title: "Analiză de nevoi", desc: "Înțelegem cultura organizației și specificul grupului țintă." },
              { step: "03", title: "Design personalizat", desc: "Proiectăm programul împreună, adaptat realității organizaționale." },
              { step: "04", title: "Livrare și impact", desc: "Implementăm, monitorizăm și măsurăm rezultatele." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-sm font-bold"
                  style={{ backgroundColor: "var(--sage)" }}
                >
                  {item.step}
                </div>
                <h4
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                >
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Request Form */}
      <section id="solicita-oferta" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-semibold mb-5"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Cerere personalizată pentru organizații
            </h2>
            <p className="text-lg" style={{ color: "var(--charcoal-soft)" }}>
              Completează formularul de mai jos și vom reveni cu o ofertă personalizată pentru nevoile organizației tale.
            </p>
          </div>
          <OrganizationRequestForm />
        </div>
      </section>
    </div>
  );
}
