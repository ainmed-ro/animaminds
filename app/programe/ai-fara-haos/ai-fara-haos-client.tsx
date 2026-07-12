"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Monitor, MapPin, Building2, TreePine, CheckCircle } from "lucide-react";

const learningOutcomes = [
  "Să explice, în termeni accesibili, ce poate și ce nu poate face un instrument AI generativ.",
  "Să construiască prompt-uri clare, contextuale și verificabile pentru situații profesionale concrete.",
  "Să identifice 3–5 zone din propria activitate în care AI-ul poate reduce timpul sau îmbunătăți calitatea.",
  "Să evalueze critic un răspuns generat de AI și să decidă când poate fi folosit direct și când necesită verificare umană.",
  "Să aplice principii de etică și confidențialitate în utilizarea AI în mediul profesional.",
];

const curriculum = [
  {
    module: "Modul 1",
    title: "AI pe înțelesul tuturor",
    objective: "Demistificarea conceptului de bază",
    duration: "90 min",
  },
  {
    module: "Modul 2",
    title: "Arta de a întreba",
    objective: "Construirea de prompt-uri eficiente",
    duration: "120 min",
  },
  {
    module: "Modul 3",
    title: "AI în activitatea mea",
    objective: "Identificare și prototipare de utilizări",
    duration: "120 min",
  },
  {
    module: "Modul 4",
    title: "Verificare și etică",
    objective: "Limite, erori și responsabilitate",
    duration: "90 min",
  },
  {
    module: "Modul 5",
    title: "Plan de acțiune",
    objective: "Integrare sustenabilă",
    duration: "60 min",
  },
];

const formats = [
  {
    icon: Monitor,
    title: "Online",
    description: "Sesiuni interactive, exerciții în breakout rooms și dialog ghidat — fără deplasare.",
  },
  {
    icon: MapPin,
    title: "În locații dedicate",
    description: "Training de 1–2 zile într-un spațiu de învățare selectat pentru focus și conectare.",
  },
  {
    icon: Building2,
    title: "La sediul organizației",
    description: "Program adaptat pentru echipa ta, cu exemple și scenarii din contextul organizațional.",
  },
  {
    icon: TreePine,
    title: "Experience Edition",
    description: "Format intensiv în natură, pentru schimbări profunde. Disponibil în curând.",
  },
];

const deliverables = [
  { icon: "📜", title: "Certificat de participare", description: "Document care atestă finalizarea programului." },
  { icon: "📄", title: "Fișa competențelor dezvoltate", description: "Sinteză a abilităților și tematicilor abordate." },
  { icon: "📝", title: "Catalog personal de prompt-uri", description: "Minimum 5 prompt-uri testate personal în timpul programului." },
  { icon: "✅", title: "Checklist de validare a răspunsurilor AI", description: "Instrument de verificare pentru utilizare responsabilă." },
  { icon: "🎯", title: "Șablon plan de acțiune", description: "2 obiceiuri concrete de integrat în prima lună." },
];

const orgTypes = [
  { icon: "🏢", label: "Companii" },
  { icon: "🏥", label: "Spitale și clinici" },
  { icon: "🏫", label: "Școli și universități" },
  { icon: "🏛️", label: "Instituții publice" },
  { icon: "🤝", label: "ONG-uri" },
  { icon: "⚕️", label: "Organizații de sănătate" },
];

const faq = [
  {
    q: "Este necesară experiență tehnică pentru a participa?",
    a: "Nu. Programul este conceput pentru profesioniști non-tehnici. Nu presupune cunoștințe prealabile de programare sau AI.",
  },
  {
    q: "Ce instrumente AI vom folosi?",
    a: "Vom lucra cu instrumente accesibile gratuit, precum ChatGPT, Claude sau Gemini. Toate demo-urile și exercițiile sunt adaptate pentru utilizatori obișnuiți.",
  },
  {
    q: "Pot participa individual sau doar prin organizație?",
    a: "Ambele variante sunt posibile. Programul este disponibil ca ediție deschisă și în variantă adaptată pentru organizații.",
  },
  {
    q: "Cât durează programul?",
    a: "Programul are o durată totală de 8 ore, care poate fi livrat într-o zi intensivă sau în două sesiuni de 4 ore.",
  },
  {
    q: "Ce documente se primesc la final?",
    a: "Fiecare participant primește certificat de participare, fișa competențelor dezvoltate, catalog personal de prompt-uri, checklist de validare și șablon plan de acțiune.",
  },
  {
    q: "Cum sunt protejate datele și confidențialitatea?",
    a: "Programul include o secțiune dedicată de etică și confidențialitate. Nu folosim date personale, medicale sau sensibile în exercițiile comune.",
  },
];

export default function AIFaraHaosPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          organization: form.organization,
          subject: "Notificare înscriere AI Fără Haos",
          programInteres: "AI Fără Haos",
          message: "Vreau să fiu notificat când se deschid înscrierile pentru AI Fără Haos.",
        }),
      });
      if (!res.ok) throw new Error("Eroare la trimitere");
      setSubmitted(true);
    } catch {
      setError("A apărut o problemă. Te rugăm să încerci din nou.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-12" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <Link href="/programe" className="text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" style={{ color: "#2D4A5C" }}>
              Programe
            </Link>
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.25)" }}>→</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(0,0,0,0.4)" }}>AI Fără Haos</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: "rgba(45,74,92,0.12)", color: "#2D4A5C" }}>
            În curând
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            AI Fără Haos
          </h1>
          <p className="text-lg sm:text-xl font-medium mb-5 max-w-2xl" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>
            Folosește AI. Păstrează controlul.
          </p>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl mb-6" style={{ color: "var(--charcoal-soft)" }}>
            Un program practic pentru profesioniști care vor să lucreze mai eficient cu inteligența artificială, fără să se înece în jargon tehnic și fără să-și piardă propria judecată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#notificare" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm sm:text-base transition-all hover:opacity-90 hover:shadow-xl active:scale-95" style={{ backgroundColor: "#2D4A5C" }}>
              Notifică-mă când se deschid înscrierile
              <ArrowRight size={16} />
            </a>
            <Link href="/colaboreaza" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all border hover:bg-white active:scale-95" style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}>
              Solicită ofertă pentru organizația ta
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: "🕒", text: "8 ore (1 zi sau 2 sesiuni)" },
              { icon: "💻", text: "Online, locație dedicată sau la sediu" },
              { icon: "🎯", text: "Fără cunoștințe tehnice necesare" },
              { icon: "👥", text: "12–25 participanți" },
            ].map((info) => (
              <div key={info.text} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm" style={{ backgroundColor: "rgba(255,255,255,0.7)" }}>
                <span>{info.icon}</span>
                <span style={{ color: "var(--charcoal)" }}>{info.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#2D4A5C" }}>De ce</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Ce problemă rezolvă AI Fără Haos?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            <p>Mulți profesioniști sunt fie speriați de AI, fie îl folosesc mecanic, fără să înțeleagă limitele. Rezultatul este fie rezistență, fie dependență și erori care costă timp și încredere.</p>
            <p>AI-ul devine rapid un instrument de bază în educație, sănătate, administrație și business. Cei care știu să întrebe bine vor economisi timp și vor lua decizii mai bune.</p>
            <p><strong style={{ color: "var(--charcoal)" }}>AI Fără Haos</strong> pleacă de la întrebări, nu de la teorie. La final, participantul știe să folosească AI-ul ca un asistent de încredere: pune întrebări mai bine, verifică răspunsurile și integrează AI-ul în fluxurile de lucru fără să-și piardă autonomia.</p>
          </div>
        </div>
      </section>

      {/* Cui se adresează */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#2D4A5C" }}>Participanți</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Cui se adresează?
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                Programul este pentru profesioniști non-tehnici care vor să folosească AI în activitatea de zi cu zi, fără să devină experți în tehnologie.
              </p>
              <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--charcoal-soft)" }}>Relevant pentru:</p>
              <ul className="space-y-3">
                {[
                  "Profesori și cadre didactice",
                  "Manageri și coordonatori de echipe",
                  "Antreprenori",
                  "Specialiști în instituții publice",
                  "Tineri la început de carieră",
                  "Echipe din companii, ONG-uri și formatori",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5" style={{ backgroundColor: "#2D4A5C" }}>✓</span>
                    <span className="text-base" style={{ color: "var(--charcoal)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm mt-5 leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <strong style={{ color: "var(--charcoal)" }}>Nu este potrivit pentru:</strong> profesioniști IT care caută training tehnic avansat (prompt engineering pentru dezvoltatori, fine-tuning, arhitecturi LLM).
              </p>
            </div>
            <div className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Mesaje cheie</p>
              <ul className="space-y-4">
                {[
                  { icon: "🤖", text: "AI-ul nu înlocuiește omul, dar omul care folosește AI bine va înlocui omul care nu o face." },
                  { icon: "🧠", text: "Nu trebuie să fii tehnic pentru a folosi AI în mod profesional." },
                  { icon: "❓", text: "Cel mai important skill nu este să știi mai multe, ci să știi să întrebi mai bine." },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-4">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Obiective de învățare */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Rezultate</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce vei ști să faci la final
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {learningOutcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-5 rounded-2xl" style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(0,0,0,0.05)" }}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ backgroundColor: "#2D4A5C" }}>{i + 1}</span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Curriculum</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Structura celor 8 ore
            </h2>
            <p className="text-base mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
              20% teorie, 80% practică și dialog. Demo-uri live, exerciții individuale, lucru în perechi și studii de caz.
            </p>
          </div>
          <div className="space-y-4">
            {curriculum.map((item) => (
              <div key={item.module} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 rounded-2xl bg-white" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="flex-shrink-0">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2D4A5C" }}>{item.module}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>{item.objective}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold" style={{ color: "var(--charcoal)" }}>{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold" style={{ color: "var(--charcoal-soft)" }}>Durată totală: 8 ore</p>
          </div>
        </div>
      </section>

      {/* Formate de livrare */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Formate de livrare</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Cum poți accesa programul
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {formats.map((format) => (
              <div key={format.title} className="rounded-2xl p-5 border" style={{ borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(45,74,92,0.08)" }}>
                  <format.icon size={20} style={{ color: "#2D4A5C" }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>{format.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverabile */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Ce primești</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Deliverabile pentru participanți
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverables.map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-white" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>{item.description}</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#2D4A5C" }}>Pentru organizații</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Relevant și pentru organizații și instituții
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>AI Fără Haos poate fi accesat atât individual, cât și de grupuri provenite din companii, instituții publice, unități sanitare, unități de învățământ și ONG-uri.</p>
                <p>Varianta pentru organizații poate include adaptarea exemplelor și scenariilor la contextul specific, materiale de susținere și raport de impact.</p>
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
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(45,74,92,0.15)" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Colaborare instituțională</p>
                <h3 className="text-xl font-semibold mb-5" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Pentru organizații și instituții</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                  Pentru grupuri organizate și participări instituționale, AnimaMinds poate furniza oferte personalizate și documentația necesară pentru analizarea oportunităților de colaborare.
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                  Programul poate fi adaptat în funcție de obiectivele organizației și de profilul participanților.
                </p>
                <Link
                  href="/colaboreaza"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 w-full"
                  style={{ backgroundColor: "#2D4A5C" }}
                >
                  Solicită ofertă pentru organizația ta
                  <ArrowRight size={15} />
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
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Clarificări</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Întrebări frecvente
            </h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
                <p className="font-semibold text-base mb-3" style={{ color: "var(--charcoal)" }}>{item.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notificare */}
      <section id="notificare" className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#2D4A5C" }}>Înscrieri</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Notifică-mă când se deschid înscrierile
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
            Datele oficiale, prețul și detaliile logistice vor fi anunțate odată cu deschiderea înscrierilor. Lăsă-ne datele tale și vei fi printre primii care află.
          </p>

          {submitted ? (
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#F5F0E8" }}>
              <div className="text-5xl mb-4">✦</div>
              <p className="text-lg font-semibold mb-2" style={{ color: "var(--charcoal)" }}>Mulțumim!</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Te vom anunța când se deschid înscrierile pentru AI Fără Haos.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Nume și prenume *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#2D4A5C] transition-colors"
                  style={{ borderColor: "rgba(0,0,0,0.15)" }}
                  placeholder="Ex: Ana Ionescu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#2D4A5C] transition-colors"
                  style={{ borderColor: "rgba(0,0,0,0.15)" }}
                  placeholder="adresa@email.ro"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Telefon</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#2D4A5C] transition-colors"
                  style={{ borderColor: "rgba(0,0,0,0.15)" }}
                  placeholder="07XX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Organizație (opțional)</label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#2D4A5C] transition-colors"
                  style={{ borderColor: "rgba(0,0,0,0.15)" }}
                  placeholder="Numele organizației, dacă este cazul"
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "#2D4A5C" }}
              >
                {submitting ? "Se trimite..." : "Notifică-mă când se deschid înscrierile"}
              </button>
              <p className="text-xs text-center leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                Nu trimitem spam. Te contactăm doar când programul devine disponibil.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12" style={{ backgroundColor: "#2D4A5C" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
            Pregătit să folosești AI fără haos?
          </h2>
          <p className="text-base sm:text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            Rămâi la curent cu deschiderea înscrierilor sau solicită o ofertă personalizată pentru organizația ta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#notificare" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-white transition-all hover:shadow-lg" style={{ color: "#2D4A5C" }}>
              Notifică-mă
              <ArrowRight size={15} />
            </a>
            <Link href="/colaboreaza" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium transition-all border hover:bg-white/10" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}>
              Solicită ofertă pentru organizație
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
