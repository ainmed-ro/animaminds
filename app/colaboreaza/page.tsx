import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Building2, GraduationCap, Users2, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Colaborează cu noi",
  description:
    "Parteneriate AnimaMinds: programe personalizate pentru companii, instituții, ONG-uri și formatori independenți. Construim împreună.",
};

const reasons = [
  "Programe proiectate specific pentru nevoile reale ale fiecărui partener",
  "Formatori cu experiență practică, nu doar academică",
  "Abordare orientată spre impact real, măsurabil",
  "Ne deplasăm la sediul companiilor și instituțiilor care ne invită — on-site, online sau hibrid",
  "Suport continuu după finalizarea programului",
  "Integrare în comunitatea AnimaMinds",
];

const partnerTypes = [
  {
    icon: Building2,
    title: "Companii și organizații private",
    desc: "De la programe de onboarding la dezvoltare de leadership, construim împreună cultură organizațională și performanță.",
    cta: "Team building, leadership, comunicare, formare internă",
  },
  {
    icon: GraduationCap,
    title: "Instituții educaționale",
    desc: "Formare continuă pentru cadre didactice, metodici moderne și instrumente digitale pentru predare.",
    cta: "Școli, licee, universități, centre de formare",
  },
  {
    icon: Users2,
    title: "ONG-uri și organizații non-profit",
    desc: "Sprijin pentru organizații cu misiune socială — formare pentru voluntari, beneficiari și echipe.",
    cta: "Prețuri adaptate pentru ONG-uri",
  },
  {
    icon: Briefcase,
    title: "Formatori și traineri independenți",
    desc: "Intră în rețeaua noastră de formatori. Colaborăm, co-livrăm și creștem împreună.",
    cta: "Rețea de formatori, proiecte comune",
  },
];

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

      {/* CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--sage)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold text-white mb-5"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Gata să începem?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Trimite-ne un mesaj și cineva din echipa AnimaMinds va răspunde
            în maximum 24 de ore.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-white transition-all hover:shadow-lg"
            style={{ color: "var(--sage)" }}
          >
            Contactează-ne acum
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
