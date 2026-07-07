import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AnimaMinds Retreats — Experiențe de 2–3 zile în natură",
  description:
    "Retreat-uri de 2–3 zile la Zărnești – Piatra Craiului. Conversații cu sens, reflecție și timp pentru a privi lucrurile cu mai multă claritate.",
  openGraph: {
    title: "AnimaMinds Retreats",
    description: "Experiențe umane în natură.",
    url: "https://animaminds.ro/retreats",
  },
};

const commonInfo = [
  { icon: "📍", label: "Locație", value: "Zărnești – Deny Inn Resort & Spa" },
  { icon: "🛏️", label: "Cazare", value: "Inclusă" },
  { icon: "👥", label: "Grup", value: "20–25 participanți" },
  { icon: "📅", label: "Perioadă", value: "În curs de stabilire" },
];

const retreats = [
  {
    id: "busola-interioara-retreat",
    name: "BUSOLA INTERIOARĂ",
    subtitle: "Claritate și direcție când lucrurile par neclare",
    duration: "3 zile · 2 nopți",
    accentColor: "#9B7EBD",
    badge: "Prima experiență AnimaMinds în pregătire",
    description:
      "Un retreat pentru oamenii care se află într-un moment de schimbare, alegere sau restart. Trei zile de conversații cu sens, reflecție și timp pentru a privi lucrurile cu mai multă claritate.",
    includes: [
      "Activități experiențiale ghidate",
      "Exerciții individuale și de grup",
      "Conversații cu sens",
      "Timp în natură",
      "Comunitatea participanților",
    ],
  },
  {
    id: "mintea-2-0-retreat",
    name: "MINTEA 2.0",
    subtitle: "Claritate mentală în liniștea naturii",
    duration: "3 zile · 2 nopți",
    accentColor: "#7C9A7E",
    badge: null,
    description:
      "Departe de agitația zilnică și de zgomotul digital, explorăm cum ne folosim atenția, cum luăm decizii și cum construim mai multă claritate în viața de zi cu zi.",
    includes: [
      "Activități de reflecție ghidată",
      "Exerciții de focus și atenție",
      "Timp în natură",
      "Jurnal de claritate",
      "Comunitatea participanților",
    ],
  },
  {
    id: "reset-mental-retreat",
    name: "RESET MENTAL",
    subtitle: "Oprește-te. Respiră. Privește lucrurile altfel.",
    duration: "2 zile · 1 noapte",
    accentColor: "#9B7EBD",
    badge: null,
    description:
      "Un weekend fără agendă încărcată și fără presiune. Spațiu, natură și oameni cu care poți vorbi deschis despre ce te obosește și ce îți dă energie.",
    includes: [
      "Activități de mișcare și prezență",
      "Timp liber în natură",
      "Conversații autentice",
      "Cină împreună",
      "Comunitatea participanților",
    ],
  },
  {
    id: "human-upgrade-retreat",
    name: "HUMAN UPGRADE",
    subtitle: "Ce rămâne esențial uman în era inteligenței artificiale",
    duration: "3 zile · 2 nopți",
    accentColor: "#C4714F",
    badge: null,
    description:
      "Explorăm împreună ce înseamnă să gândești critic, să te adaptezi și să rămâi tu însuți într-o lume care se schimbă rapid. O conversație sinceră despre prezent și viitor.",
    includes: [
      "Activități de gândire critică",
      "Exerciții de creativitate aplicată",
      "Conversații despre viitorul muncii",
      "Exerciții de adaptabilitate",
      "Comunitatea participanților",
    ],
  },
  {
    id: "leadership-fara-masca-retreat",
    name: "LEADERSHIP FĂRĂ MASCĂ",
    subtitle: "Cum conduci oameni reali, nu organigrame",
    duration: "3 zile · 2 nopți",
    accentColor: "#4A6FA5",
    badge: null,
    description:
      "Un retreat pentru oameni care conduc echipe și vor să o facă mai autentic. Vorbim despre încredere, comunicare și cum arată leadershipul atunci când renunți la performanță și ești pur și simplu om.",
    includes: [
      "Dialoguri despre leadership autentic",
      "Exerciții de încredere și colaborare",
      "Activități experiențiale",
      "Reflecție individuală și de grup",
      "Conexiuni autentice între participanți",
    ],
  },
];

export default function RetreatsPage() {
  return (
    <div className="pt-20 bg-white">

      {/* HERO */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#1C2B1E" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #C4714F 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-32 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7C9A7E" }}>
              AnimaMinds
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>×</span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#C4714F" }}>
              Retreats
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 leading-tight text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Unele schimbări au nevoie{" "}
            <span className="italic" style={{ color: "#7C9A7E" }}>
              de spațiu.
            </span>
          </h1>

          <p className="text-xl leading-relaxed max-w-2xl mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
            AnimaMinds Retreats sunt experiențe imersive de 2–3 zile organizate în locații speciale — munte, mare, natură.
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mb-14" style={{ color: "rgba(255,255,255,0.5)" }}>
            Versiuni extinse ale experiențelor AnimaMinds, pentru cei care aleg un nivel mai profund de reflecție, transformare și reconectare.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#retreats"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "#7C9A7E" }}
            >
              Descoperă retreat-urile
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all border"
              style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              Rezervă un loc
            </Link>
          </div>
        </div>
      </section>

      {/* DIFERENȚĂ RETREATS VS EXPERIENCES */}
      <section className="py-28" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#7C9A7E" }}>
                De ce Retreats?
              </p>
              <h2
                className="text-4xl font-semibold mb-8 leading-tight"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Unele schimbări au nevoie de timp.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>Sunt conversații pe care nu le putem purta într-o oră. Sunt întrebări la care nu găsim răspuns într-o zi obișnuită.</p>
                <p>Și sunt momente în viață în care avem nevoie să ne oprim puțin, să respirăm și să privim lucrurile cu mai multă claritate.</p>
                <p>AnimaMinds Retreats s-au născut din această nevoie.</p>
                <p>Ne întâlnim în locuri liniștite, aproape de natură, departe de ritmul obișnuit al zilelor noastre. Explorăm idei, împărtășim experiențe, învățăm unii de la alții și ne oferim timp pentru lucrurile pe care, de cele mai multe ori, le amânăm.</p>
                <p className="font-medium" style={{ color: "var(--charcoal)" }}>Nu promitem rețete magice și nici schimbări peste noapte.</p>
                <p>Promitem însă un spațiu sigur, oameni autentici, conversații cu sens și experiențe care pot rămâne cu tine mult timp după ce te întorci acasă.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: "◎", title: "Grup restrâns", desc: "20–25 participanți per retreat" },
                { icon: "◇", title: "Locații speciale", desc: "Munte, mare, natură — departe de zgomot" },
                { icon: "△", title: "Imersiv complet", desc: "2–3 zile de experiență neîntreruptă" },
                { icon: "○", title: "Oameni și conversații care contează", desc: "Alina Niculae & Mihaela Spina" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-5 p-5 rounded-xl bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <span className="text-2xl mt-0.5" style={{ color: "#7C9A7E" }}>{item.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RETREATS GRID */}
      <section id="retreats" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#7C9A7E" }}>
              Experiențe imersive
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Retreat-urile AnimaMinds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {retreats.map((retreat) => (
              <div
                key={retreat.id}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="h-2 w-full" style={{ backgroundColor: retreat.accentColor }} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    {retreat.badge ? (
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${retreat.accentColor}20`, color: retreat.accentColor }}
                      >
                        {retreat.badge}
                      </span>
                    ) : <span />}
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-50 text-gray-500 flex-shrink-0 ml-2">
                      {retreat.duration}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                  >
                    {retreat.name}
                  </h3>

                  <p className="text-sm font-medium italic mb-4" style={{ color: retreat.accentColor }}>
                    {retreat.subtitle}
                  </p>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                    {retreat.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--charcoal-soft)" }}>
                      Ce include
                    </p>
                    <ul className="space-y-2">
                      {retreat.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--charcoal-soft)" }}>
                          <span style={{ color: retreat.accentColor }} className="mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {commonInfo.map((info) => (
                      <div key={info.label} className="flex items-center gap-2 text-xs" style={{ color: "var(--charcoal-soft)" }}>
                        <span>{info.icon}</span>
                        <span><strong>{info.label}:</strong> {info.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-5 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                      style={{ color: retreat.accentColor }}
                    >
                      Rezervă un loc →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-32"
        style={{ backgroundColor: "#1C2B1E" }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#7C9A7E" }}>
            Locuri limitate
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-8 leading-tight text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Fiecare retreat este{" "}
            <span className="italic" style={{ color: "#7C9A7E" }}>
              o experiență unică.
            </span>
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.6)" }}>
            Fie că reprezentați o instituție, o companie sau căutați o transformare personală profundă, vă invităm să descoperim împreună retreat-ul potrivit pentru dumneavoastră.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 text-base"
              style={{ backgroundColor: "#7C9A7E" }}
            >
              Hai să discutăm
            </Link>
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all border text-base"
              style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              Vezi toate experiențele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
