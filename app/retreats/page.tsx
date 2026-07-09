import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AnimaMinds — Programe Experiențiale de Dezvoltare",
  description:
    "Programe experiențiale de dezvoltare umană și profesională, desfășurate pe parcursul a 2–3 zile. Conversații cu sens, reflecție și perspective noi.",
  openGraph: {
    title: "AnimaMinds — Programe Experiențiale de Dezvoltare Umană și Profesională",
    description: "Programe experiențiale de dezvoltare umană și profesională — AnimaMinds.",
    url: "https://animaminds.ro/retreats",
  },
};

const commonInfo = [
  { icon: "📍", label: "Locație", value: "La munte sau la mare" },
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
    badge: "🔥 LANSARE - Înscrieri deschise",
    link: "/retreats/busola-interioara",
    active: true,
    featured: true,
    description:
      "Program experiențial pentru oamenii care se află într-un moment de schimbare, alegere sau restart. Trei zile de conversații cu sens, reflecție și timp pentru a privi lucrurile cu mai multă claritate.",
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
    badge: "În curând",
    link: null,
    active: false,
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
    badge: "În curând",
    link: null,
    active: false,
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
    badge: "În curând",
    link: null,
    active: false,
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
    badge: "În curând",
    link: null,
    active: false,
    description:
      "Program experiențial pentru oameni care conduc echipe și vor să o facă mai autentic. Vorbim despre încredere, comunicare și cum arată leadershipul atunci când renunți la măști și alegi autenticitatea.",
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
    <div className="bg-white">

      {/* HERO */}
      <section
        className="relative min-h-[60vh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#1C2B1E" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #C4714F 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7C9A7E" }}>
              AnimaMinds
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>×</span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#C4714F" }}>
              Programe Experiențiale
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 leading-tight text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Loc pentru gânduri mai clare.{" "}
            <span className="italic" style={{ color: "#7C9A7E" }}>
              Oameni mai apropiați. Timp pentru tine.
            </span>
          </h1>

          <p className="text-xl leading-relaxed max-w-2xl mb-14" style={{ color: "rgba(255,255,255,0.7)" }}>
            Programele experiențiale AnimaMinds sunt desfășurate pe parcursul mai multor zile, în locuri liniștite, unde oamenii și ideile au timp să crească împreună.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#retreats"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "#7C9A7E" }}
            >
              Descoperă programele
            </a>
            <Link
              href="/retreats/busola-interioara"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all border"
              style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              Înscrie-mă
            </Link>
          </div>
        </div>
      </section>

      {/* CE ESTE PROGRAMUL */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#7C9A7E" }}>
                Despre program
              </p>
              <h2
                className="text-4xl font-semibold mb-8 leading-tight"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Programe construite în jurul oamenilor și competențelor lor.
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>Programele experiențiale AnimaMinds sunt concepute ca procese de dezvoltare umană și profesională, desfășurate pe parcursul mai multor zile, într-un cadru care favorizează reflecția, colaborarea și învățarea aplicată.</p>
                <p>Fiecare program este structurat în jurul unor competențe clare, relevante pentru viața profesională și pentru mediile organizaționale moderne.</p>
                <p style={{ color: "var(--charcoal)", fontWeight: 500 }}>Participanții pleacă cu mai multă claritate, cu instrumente concrete și cu documente care reflectă ariile de dezvoltare abordate în cadrul programului.</p>
              </div>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { icon: "🎯", label: "Relevanță profesională", sub: "Competențe aplicabile imediat în activitatea profesională și în relațiile de echipă." },
                { icon: "🤝", label: "Format experiențial", sub: "Activități de grup, reflecție ghidată, dialog facilitat și contexte de învățare aplicată." },
                { icon: "🏢", label: "Potrivit pentru organizații", sub: "Adaptat pentru companii, instituții publice, unități sanitare, unități de învățământ și ONG-uri." },
                { icon: "📜", label: "Documente incluse", sub: "Certificat de Participare și Fișa competențelor dezvoltate, înmânate fiecărui participant la finalul programului." },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-xl" style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(124,154,126,0.15)" }}>
                  <p className="font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--charcoal)" }}>
                    <span>{item.icon}</span> {item.label}
                  </p>
                  <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="py-16" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-8" style={{ color: "#7C9A7E" }}>
            De ce acum?
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-12 leading-tight"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Locul unde oamenii și ideile{" "}
            <span className="italic" style={{ color: "#7C9A7E" }}>cresc împreună.</span>
          </h2>
          <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            <p>Sfârșitul verii este, pentru mulți dintre noi, un moment de bilanț, de reașezare și de noi începuturi.</p>
            <p>Înainte ca ritmul obișnuit să revină, înainte ca agenda să se umple din nou și responsabilitățile să preia controlul, îți oferim ocazia să faci o pauză.</p>
            <p>Nu pentru a fugi de viața de zi cu zi.</p>
            <p className="font-medium" style={{ color: "var(--charcoal)" }}>Ci pentru a te întoarce la ea cu mai multă claritate.</p>
            <p>Trei zile dedicate reflecției, dialogului și perspectivelor noi — într-un cadru liniștit, departe de ritmul obișnuit.</p>
            <p>Pentru că uneori cele mai importante răspunsuri apar în liniște.</p>
            <p>Iar cele mai valoroase idei cresc atunci când sunt împărtășite cu oamenii potriviți.</p>
          </div>
        </div>
      </section>

      {/* RETREATS GRID */}
      <section id="retreats" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#7C9A7E" }}>
              Experiențe imersive
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Programele experiențiale AnimaMinds
            </h2>
          </div>

          <div className="space-y-8">
            {retreats.map((retreat, index) => (
              <div
                key={retreat.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  retreat.featured ? 'ring-4 ring-purple-400 ring-offset-4 shadow-2xl z-10 my-8' : ''
                }`}
                style={{ 
                  borderColor: retreat.featured ? "rgba(155, 126, 189, 0.4)" : "rgba(0,0,0,0.07)", 
                  boxShadow: retreat.featured ? "0 12px 48px rgba(155, 126, 189, 0.35)" : "0 2px 24px rgba(0,0,0,0.06)",
                  transform: retreat.featured ? "scale(1.06)" : "scale(1)",
                  opacity: retreat.active ? 1 : 0.65,
                  filter: retreat.active ? "none" : "grayscale(35%)"
                }}
              >
                <div className={`h-2 w-full ${retreat.featured ? 'bg-gradient-to-r from-purple-400 to-purple-600' : ''}`} style={{ backgroundColor: retreat.featured ? '' : retreat.accentColor }} />

                <div className="p-6">
                  {retreat.featured && (
                    <div className="flex justify-end mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-purple-500 text-white shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Recomandat
                      </span>
                    </div>
                  )}
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
                    {retreat.active ? (
                      <Link
                        href={retreat.link!}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                        style={{ color: retreat.accentColor }}
                      >
                        Descoperă experiența →
                      </Link>
                    ) : (
                      <span
                        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full cursor-not-allowed opacity-80"
                        style={{ backgroundColor: "rgba(0,0,0,0.04)", color: "var(--charcoal-soft)" }}
                      >
                        Înscrierile nu sunt deschise momentan
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-20"
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
            Fiecare program este{" "}
            <span className="italic" style={{ color: "#7C9A7E" }}>
              o experiență unică.
            </span>
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.6)" }}>
            Fie că reprezentați o instituție, o companie sau căutați o experiență personală profundă, vă invităm să descoperim împreună programul potrivit pentru dumneavoastră.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90 text-base"
              style={{ backgroundColor: "#7C9A7E" }}
            >
              Să vedem cum te putem sprijini
            </Link>
            <Link
              href="/retreats/busola-interioara"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all border text-base"
              style={{ color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.25)" }}
            >
              Descoperă Busola Interioară
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
