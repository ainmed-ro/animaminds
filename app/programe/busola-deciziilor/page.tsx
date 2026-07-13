import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, MapPin, Building2, TreePine } from "lucide-react";
import CPDTrustBlock from "@/components/program/CPDTrustBlock";

export const metadata: Metadata = {
  title: "Busola Deciziilor – Program de Dezvoltare | AnimaMinds",
  description:
    "Claritate și direcție atunci când lucrurile par neclare. Program pentru persoane, echipe și organizații, disponibil în 3 formate de livrare.",
};

export const dynamic = 'force-dynamic'

const gains = [
  "Mai multă claritate în luarea deciziilor",
  "Perspective noi asupra provocărilor actuale",
  "Conexiuni autentice cu alți participanți",
  "Timp dedicat reflecției și dezvoltării",
  "Direcție clară pentru următorii pași",
  "Instrumente practice de autocunoaștere",
];

const competencies = [
  "Luarea deciziilor",
  "Autoreflecție profesională",
  "Comunicare interpersonală",
  "Inteligență emoțională",
  "Reziliență profesională",
  "Gestionarea stresului",
  "Adaptabilitate și gestionarea schimbării",
  "Wellbeing și prevenirea epuizării profesionale",
  "Leadership personal",
  "Competențe transversale",
];

const orgTypes = [
  { icon: "🏢", label: "Companii" },
  { icon: "🏥", label: "Spitale și clinici" },
  { icon: "🏫", label: "Școli și universități" },
  { icon: "🏛️", label: "Instituții publice" },
  { icon: "🤝", label: "ONG-uri" },
  { icon: "⚕️", label: "Organizații de sănătate" },
];

const formats = [
  {
    icon: Monitor,
    title: "🌐 Online Live",
    description: "Sesiuni interactive, exerciții în breakout rooms și dialog ghidat — fără deplasare. Grup: 15–30 participanți.",
    cta: "Înscrie-te",
    href: "/inscriere?programmeSlug=busola-deciziilor",
  },
  {
    icon: Building2,
    title: "🏢 La sediul instituției / organizației",
    description: "Program adaptat pentru echipa ta, instituție sau organizație, cu exemple și scenarii din contextul tău. Recomandat: 15–30 participanți; maxim 30.",
    cta: "Solicită ofertă",
    href: "/colaboreaza",
  },
  {
    icon: TreePine,
    title: "🏔️ Experience Edition",
    description: "2 zile în natură, cu cazare, reflecție și dialog intens — pentru schimbări profunde. Grup: 20–30 participanți.",
    cta: "Vezi Experience Edition",
    href: "/programe/busola-deciziilor/experience-edition",
  },
];

export default function BusolaDeciziilorPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-12" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <Link href="/programe" className="text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" style={{ color: "#A0715A" }}>
              AnimaMinds Programe
            </Link>
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.25)" }}>→</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(0,0,0,0.4)" }}>Busola Deciziilor</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: "#A0715A20", color: "#A0715A" }}>
            ✦ Disponibil acum
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            BUSOLA<br /><span className="italic" style={{ color: "#A0715A" }}>DECIZIILOR</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium mb-5 max-w-2xl" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>
            Claritate și direcție atunci când lucrurile par neclare.
          </p>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl mb-6" style={{ color: "var(--charcoal-soft)" }}>
            Program de dezvoltare umană și profesională pentru persoane, echipe și organizații care vor să aducă ordine în gânduri, să-și regăsească direcția și să ia decizii mai bune — într-un cadru sigur de reflecție și dialog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/inscriere?programmeSlug=busola-deciziilor" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm sm:text-base transition-all hover:opacity-90 hover:shadow-xl active:scale-95" style={{ backgroundColor: "#A0715A" }}>
              Înscrie-te
              <ArrowRight size={16} />
            </Link>
            <Link href="/colaboreaza" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all border hover:bg-white active:scale-95" style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}>
              Pentru organizații
            </Link>
          </div>
        </div>
      </section>

      {/* Problema rezolvată */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>De ce</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Ce problemă rezolvă Busola Deciziilor?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            <p>Indiferent că traversăm o perioadă de schimbare, o decizie profesională importantă sau un blocaj în echipă, incertitudinea ne consumă energie și amânare.</p>
            <p><strong style={{ color: "var(--charcoal)" }}>Busola Deciziilor</strong> oferă un cadru clar pentru a privi situația în ansamblu, a identifica ce contează cu adevărat și a lua următorul pas cu mai multă încredere.</p>
            <p>Programul nu promite răspunsuri gata făcute. Promite un spațiu de claritate în care fiecare participant descoperă propria direcție.</p>
          </div>
        </div>
      </section>

      {/* Cui se adresează */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Participanți</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Cui se adresează?
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                Busola Deciziilor este pentru oamenii și echipele care își doresc timp pentru reflecție, claritate și alinierea următorilor pași.
              </p>
              <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--charcoal-soft)" }}>Programul este relevant pentru:</p>
              <ul className="space-y-3">
                {[
                  "Profesionişti aflați într-o perioadă de schimbare",
                  "Coordonatori şi lideri de echipe",
                  "Cadre didactice",
                  "Personal medical",
                  "Antreprenori",
                  "Specialişti din sectorul public şi privat",
                  "Persoane care investesc în dezvoltarea lor personală şi profesională",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5" style={{ backgroundColor: "#A0715A" }}>✓</span>
                    <span className="text-base" style={{ color: "var(--charcoal)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Ce include experiența?</p>
              <ul className="space-y-4">
                {[
                  { icon: "🌲", text: "Timp pentru reflecție și claritate" },
                  { icon: "💬", text: "Conversații autentice și dialog ghidat" },
                  { icon: "🤝", text: "Oameni cu experiențe și perspective diferite" },
                  { icon: "📖", text: "Activități experiențiale și exerciții practice" },
                  { icon: "🔥", text: "Spațiu sigur pentru întrebări dificile" },
                  { icon: "🧭", text: "Perspective noi asupra provocărilor actuale" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-4">
                    <span className="text-xl w-8 text-center flex-shrink-0">{item.icon}</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ce veți câștiga */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Beneficii</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce vei câștiga?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gains.map((g) => (
              <div key={g} className="flex items-start gap-3 p-5 rounded-2xl bg-white" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ backgroundColor: "#A0715A" }}>✓</span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competențe dezvoltate */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Arii de dezvoltare</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Competențe dezvoltate
            </h2>
            <p className="text-base mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
              Programul este construit în jurul unor competențe clare, relevante pentru activitatea profesională și pentru mediile organizaționale moderne.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {competencies.map((c) => (
              <div key={c} className="flex items-center gap-3 p-4 rounded-xl bg-white" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: "#A0715A" }}>✓</span>
                <span className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>{c}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              <div className="text-3xl mb-4">📜</div>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Certificat de Participare</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Document care atestă participarea la programul Busola Deciziilor și prezența la activitățile desfășurate.</p>
            </div>
            <div className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Fișa competențelor dezvoltate</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Document care evidențiază principalele arii de dezvoltare și tematicile abordate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cele 4 formate */}
      <section id="formate" className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Formate de livrare</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Cum poți accesa programul
            </h2>
            <p className="text-base mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
              Busola Deciziilor este disponibil în trei formate, adaptate nevoilor tale sau ale organizației.
            </p>
            <p className="text-sm font-semibold mt-3" style={{ color: "#A0715A" }}>
              Preț de lansare Online Live: 149 lei / participant
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {formats.map((format) => (
              <div key={format.title} className="rounded-2xl p-5 border" style={{ borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#A0715A15" }}>
                  <format.icon size={20} style={{ color: "#A0715A" }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>{format.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>{format.description}</p>
                <Link href={format.href} className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: "#A0715A" }}>
                  {format.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pentru organizații */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Pentru organizații</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Relevant și pentru organizații și instituții
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>Busola Deciziilor poate fi accesată atât individual, cât și prin participarea unor grupuri provenite din companii, spitale, școli, instituții publice, ONG-uri și alte organizații.</p>
                <p>Programul poate susține inițiative de <strong style={{ color: "var(--charcoal)" }}>dezvoltare profesională, wellbeing organizațional, leadership, colaborare, adaptabilitate, prevenirea epuizării profesionale</strong> și dezvoltarea competențelor transversale.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {orgTypes.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(160,113,90,0.15)" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Colaborare instituțională</p>
                <h3 className="text-xl font-semibold mb-5" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Pentru organizații și instituții</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                  Pentru grupuri organizate și participări instituționale, AnimaMinds poate furniza oferte personalizate și documentația necesară pentru analizarea oportunităților de colaborare.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                  Programul poate fi adaptat în funcție de obiectivele organizației și de profilul participanților.
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                  Pentru informații privind colaborările cu instituții publice, unități de învățământ, unități sanitare, ONG-uri sau companii, contactați echipa AnimaMinds.
                </p>
                <Link
                  href="/colaboreaza"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 w-full"
                  style={{ backgroundColor: "#A0715A" }}
                >
                  Solicită ofertă
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Clarificări</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Întrebări frecvente
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Este necesară experiență anterioară pentru participare?",
                a: "Nu. Programul este deschis tuturor persoanelor interesate de dezvoltare personală și profesională.",
              },
              {
                q: "Este posibilă participarea individuală?",
                a: "Da. Mulți participanți aleg să participe individual.",
              },
              {
                q: "Este posibilă participarea prin intermediul organizației?",
                a: "Da. Programul poate fi accesat atât individual, cât și prin participarea unor grupuri provenite din companii, instituții publice, unități sanitare, unități de învățământ și ONG-uri.",
              },
              {
                q: "Ce documente se primesc la final?",
                a: "Participanții primesc: 📜 Certificat de Participare și 📄 Fișa competențelor dezvoltate pe parcursul programului.",
              },
              {
                q: "În câte formate este disponibil programul?",
                a: "Busola Deciziilor este disponibil în 3 formate: 🌐 Online Live, 🏢 La sediul instituției / organizației și 🏔️ Experience Edition.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
                <p className="font-semibold text-base mb-3" style={{ color: "var(--charcoal)" }}>{item.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Manifestă-ți interesul</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Interesat de{" "}
            <span className="italic" style={{ color: "#A0715A" }}>Busola Deciziilor?</span>
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
            Alege formatul care ți se potrivește sau contactează echipa AnimaMinds pentru o ofertă personalizată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscriere?programmeSlug=busola-deciziilor" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 hover:shadow-xl" style={{ backgroundColor: "#A0715A" }}>
              Înscrie-te
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-base transition-all border hover:bg-gray-50" style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}>
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Transport Support Notice */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-yellow-900 font-bold text-sm">!</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--charcoal)" }}>
                  Transport Support Notice
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Transportul nu este inclus în tariful programului.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  La solicitarea beneficiarului sau a grupurilor organizate, AnimaMinds poate facilita contactul cu operatori autorizați de transport în vederea identificării unei soluții adecvate de deplasare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CPD Trust Block */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <CPDTrustBlock duration="3 zile" credits={15} />
        </div>
      </section>
    </div>
  );
}
