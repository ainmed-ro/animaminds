"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const MAX_SPOTS = 25;
const MIN_CONFIRM = 15;

const EDITIONS = [
  { id: "ed1", label: "Ediția I", dates: "28–30 august 2026" },
  { id: "ed2", label: "Ediția II", dates: "4–6 septembrie 2026" },
];

function getStatus(used: number) {
  const remaining = MAX_SPOTS - used;
  if (remaining === 0) return { label: "Grupă completă", color: "#C4714F", bg: "#C4714F15" };
  if (used >= MIN_CONFIRM) return { label: "Confirmată", color: "#7C9A7E", bg: "#7C9A7E15" };
  if (remaining <= 5) return { label: "Ultimele locuri", color: "#C4714F", bg: "#C4714F15" };
  return { label: "Înscrieri deschise", color: "#A0715A", bg: "#A0715A15" };
}

const includes = [
  "Participarea la toate activitățile programului",
  "Materialele de lucru",
  "2 nopți de cazare",
  "Mesele incluse conform pachetului",
  "Accesul la facilitățile locației",
  "Comunitatea participanților",
  "📜 Certificat de Participare",
  "📄 Fișa competențelor dezvoltate",
];

const gains = [
  "Mai multă claritate în luarea deciziilor",
  "Perspective noi asupra provocărilor actuale",
  "Conexiuni autentice cu alți participanți",
  "Timp dedicat reflecției și dezvoltării",
  "Energie pentru următoarea etapă profesională și personală",
  "Instrumente utile pentru adaptare și schimbare",
];

const competencies = [
  "Comunicare interpersonală",
  "Colaborare și lucru în echipă",
  "Adaptabilitate și gestionarea schimbării",
  "Inteligență emoțională",
  "Leadership personal",
  "Reziliență profesională",
  "Gestionarea stresului",
  "Wellbeing și prevenirea epuizării profesionale",
  "Luarea deciziilor",
  "Autoreflecție profesională",
  "Competențe transversale",
];

const orgTypes = [
  { icon: "🏥", label: "Spitale" },
  { icon: "🏫", label: "Școli" },
  { icon: "🏛️", label: "Instituții publice" },
  { icon: "🤝", label: "ONG-uri" },
  { icon: "🏢", label: "Companii" },
  { icon: "🌐", label: "Organizații profesionale" },
];

type FormData = {
  nume: string; email: string; telefon: string;
  editie: string; participanti: string; observatii: string;
};

export default function BusolaInterioarePage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<FormData>({
    nume: "", email: "", telefon: "", editie: "", participanti: "1", observatii: "",
  });
  const [spotsOccupied, setSpotsOccupied] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/spots")
      .then((r) => r.json())
      .then((d) => setSpotsOccupied(d.spotsOccupied ?? {}))
      .catch(() => {});
  }, []);

  const editions = EDITIONS.map((ed) => ({
    ...ed,
    spotsUsed: spotsOccupied[ed.dates] ?? 0,
  }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          participanti: Number(form.participanti),
          experience: "BUSOLA INTERIOARĂ",
          status: "INTERESAT",
          paymentStatus: "NEACHITAT",
        }),
      });
      if (!res.ok) throw new Error("Eroare la server.");
      setSubmitted(true);
      // Refresh spots
      fetch("/api/spots").then((r) => r.json()).then((d) => setSpotsOccupied(d.spotsOccupied ?? {})).catch(() => {});
    } catch {
      setSubmitError("A apărut o eroare. Te rugăm încearcă din nou sau contactă-ne direct.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #A0715A 0%, transparent 70%)", transform: "translate(25%, -25%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(-25%, 25%)" }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-10 w-full">
          <div className="flex items-center gap-3 mb-5">
            <Link href="/retreats" className="text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" style={{ color: "#A0715A" }}>
              AnimaMinds Programe
            </Link>
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.25)" }}>→</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(0,0,0,0.4)" }}>Busola Interioară</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: "#A0715A20", color: "#A0715A" }}>
            ✦ Disponibil acum
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            BUSOLA<br /><span className="italic" style={{ color: "#A0715A" }}>INTERIOARĂ</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium mb-5 max-w-2xl" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>
            Claritate și direcție atunci când lucrurile par neclare.
          </p>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl mb-3" style={{ color: "var(--charcoal-soft)" }}>
            Program experiențial de dezvoltare umană și profesională — adresat persoanelor, echipelor, companiilor, instituțiilor publice, unităților sanitare, unităților de învățământ și organizațiilor.
          </p>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl mb-6" style={{ color: "var(--charcoal-soft)" }}>
            Trei zile de activități experiențiale, dialog, reflecție și natură — într-un cadru care creează spațiu pentru claritate, dezvoltare și perspective noi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm sm:text-base transition-all hover:opacity-90 hover:shadow-xl active:scale-95" style={{ backgroundColor: "#A0715A" }}>
              Sunt interesat(ă)
            </button>
            <a href="#despre" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all border hover:bg-white active:scale-95" style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}>
              Află mai multe
            </a>
          </div>
        </div>
      </section>

      {/* EDIȚII + LOCURI */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6 text-center" style={{ color: "#A0715A" }}>Ediții disponibile</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {editions.map((ed) => {
              const status = getStatus(ed.spotsUsed);
              const remaining = MAX_SPOTS - ed.spotsUsed;
              const pct = Math.round((ed.spotsUsed / MAX_SPOTS) * 100);
              return (
                <div key={ed.id} className="rounded-2xl p-5 border" style={{ borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--charcoal-soft)" }}>{ed.label}</p>
                      <p className="text-lg font-bold" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>📅 {ed.dates}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: status.bg, color: status.color }}>{status.label}</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1" style={{ color: "var(--charcoal-soft)" }}>
                      <span>Locuri ocupate: {ed.spotsUsed} / {MAX_SPOTS}</span>
                      <span>{remaining} disponibile</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: status.color }} />
                    </div>
                  </div>
                  <p className="text-xs mb-5" style={{ color: "var(--charcoal-soft)" }}>✅ Confirmare la minimum {MIN_CONFIRM} participanți</p>
                  <button
                    onClick={() => { setForm((f) => ({ ...f, editie: ed.dates })); setShowForm(true); }}
                    disabled={remaining === 0}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: remaining === 0 ? "#aaa" : "#A0715A" }}
                  >
                    {remaining === 0 ? "Grupă completă" : "Sunt interesat(ă)"}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: "📍", label: "Locație", value: "La munte sau la mare" },
              { icon: "👥", label: "Grup", value: "Maxim 25 participanți / ediție" },
              { icon: "🛏️", label: "Cazare", value: "Inclusă" },
              { icon: "🌲", label: "Cadru", value: "Natură liniștită" },
            ].map((d) => (
              <div key={d.label} className="p-4 rounded-xl" style={{ backgroundColor: "#F5F0E8" }}>
                <div className="text-xl mb-1">{d.icon}</div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#A0715A" }}>{d.label}</p>
                <p className="text-xs font-medium" style={{ color: "var(--charcoal)" }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DE CE LA FINALUL VERII */}
      <section className="py-10 bg-white border-b" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Context</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            De ce la finalul verii?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            <p>Sfârşitul verii este, pentru mulți dintre noi, un moment de bilanț, reaşezare şi noi începuturi.</p>
            <p>Înainte ca ritmul obişnuit să revină, înainte ca agenda să se umple din nou şi responsabilitățile să preia controlul, BUSOLA INTERIOARĂ oferă ocazia de a face o pauză.</p>
            <p>Trei zile în mijlocul naturii, cu aer curat, oameni deschişi, conversații care contează şi activități care creează perspective noi.</p>
            <p className="font-medium" style={{ color: "var(--charcoal)" }}>În spiritul AnimaMinds – locul unde oamenii şi ideile cresc împreună.</p>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section id="despre" className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Despre program</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Uneori, cel mai important pas este să vă opriți.
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            <p>La finalul verii, înainte ca ritmul să accelereze din nou, înainte ca agenda să se umple și responsabilitățile să preia controlul, vă invităm să vă oferiți câteva zile pentru claritate, reflecție și perspective noi.</p>
            <p>BUSOLA INTERIOARĂ este un program experiențial de dezvoltare umană și profesională desfășurat într-un cadru care oferă spațiu pentru dialog, învățare, conectare și dezvoltare.</p>
            <p>Trei zile în mijlocul naturii, cu aer curat, oameni deschiși, conversații care contează și activități care creează perspective noi.</p>
            <p className="font-medium" style={{ color: "var(--charcoal)" }}>Pentru că uneori cele mai valoroase idei apar atunci când ne oferim timp să ne oprim.</p>
          </div>
          <div className="mt-8">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:shadow-lg" style={{ backgroundColor: "#A0715A" }}>
              Sunt interesat(ă)
            </button>
          </div>
        </div>
      </section>

      {/* CUI SE ADRESEAZA */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Participanți</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Cui se adresează?
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                BUSOLA INTERIOARĂ este pentru oamenii care îşi doresc să îşi ofere timp pentru reflecție, dezvoltare şi clarificarea următorilor paşi.
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
            <div className="space-y-4">
              <div className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Ce veți găsi aici?</p>
                <ul className="space-y-4">
                  {[
                    { icon: "🌲", text: "Natură şi timp pentru reflecție" },
                    { icon: "💬", text: "Conversații autentice" },
                    { icon: "🤝", text: "Oameni cu experiențe şi perspective diferite" },
                    { icon: "📖", text: "Activități experiențiale" },
                    { icon: "🔥", text: "Seri petrecute împreună" },
                    { icon: "🧭", text: "Perspective noi asupra provocărilor actuale" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-4">
                      <span className="text-xl w-8 text-center flex-shrink-0">{item.icon}</span>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-5" style={{ backgroundColor: "#A0715A15", border: "1px solid rgba(160,113,90,0.2)" }}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">👥</span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--charcoal)" }}>Număr limitat de participanți</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Pentru a păstra caracterul experiențial al programului, fiecare ediție este limitată la maximum 25 participanți.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CE VEȚI CÂȘTIGA */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Beneficii</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce veți câștiga din această experiență?
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

      {/* FACILITAT DE */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Echipa</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Facilitat de
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#F5F0E8" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base mb-3" style={{ backgroundColor: "#A0715A" }}>AN</div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Alina Niculae</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Formator cu experiență în dezvoltarea adulților, facilitarea învățării şi proiectarea programelor educaționale şi experiențiale.</p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#F5F0E8" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base mb-3" style={{ backgroundColor: "#7C9A7E" }}>MS</div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Mihaela Spina</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Co-fondator AnimaMinds şi partener în dezvoltarea programelor experiențiale dedicate adulților.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CE INCLUDE */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Ce este inclus</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Ce include participarea?
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
                Prețul acoperă participarea la toate activitățile programului, materialele de lucru, cazarea, mesele incluse și accesul la facilitățile locației.
              </p>
              <ul className="space-y-3 mb-6">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base" style={{ color: "var(--charcoal-soft)" }}>
                    <span style={{ color: "#A0715A" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Investiție</p>
              <p className="text-5xl font-bold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>TBA</p>
              <p className="text-sm mb-4" style={{ color: "var(--charcoal-soft)" }}>Prețul va fi comunicat în curând.</p>
              <div className="rounded-xl p-4 mb-6 text-left" style={{ backgroundColor: "#F5F0E8" }}>
                <p className="text-xs leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>📜 Certificat de Participare și 📄 Fișa competențelor dezvoltate sunt incluse la finalul programului.</p>
              </div>
              <button onClick={() => setShowForm(true)} className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90" style={{ backgroundColor: "#A0715A" }}>
                Sunt interesat(ă)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DURATA */}
      <section className="py-8 bg-white border-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Format</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Durata programului</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ backgroundColor: "#F5F0E8" }}>
              <span className="text-2xl flex-shrink-0">📅</span>
              <span className="text-sm sm:text-base font-medium" style={{ color: "var(--charcoal)" }}>3 zile / 2 nopți</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ backgroundColor: "#F5F0E8" }}>
              <span className="text-2xl flex-shrink-0">🕒</span>
              <span className="text-sm sm:text-base font-medium leading-snug" style={{ color: "var(--charcoal)" }}>Aproximativ 24 de ore de activități, conversații şi experiențe de grup</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETENȚE DEZVOLTATE */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
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
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Document care atestă participarea la programul BUSOLA INTERIOARĂ şi prezența la activitățile desfăşurate pe parcursul experienței.</p>
            </div>
            <div className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Fișa competențelor dezvoltate</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Document care evidențiază principalele arii de dezvoltare și tematicile abordate în cadrul programului.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CE PRIMIȚI LA FINAL */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Documente</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Ce primiți la finalul programului?
            </h2>
            <p className="text-base mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
              La finalul programului BUSOLA INTERIOARĂ, fiecare participant primeşte:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(160,113,90,0.25)", backgroundColor: "#A0715A08" }}>
              <div className="text-4xl mb-5">📜</div>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Certificat de Participare</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                Document care atestă participarea la programul BUSOLA INTERIOARĂ şi prezența la activitățile desfăşurate pe parcursul experienței.
              </p>
            </div>
            <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(124,154,126,0.25)", backgroundColor: "#7C9A7E08" }}>
              <div className="text-4xl mb-5">📄</div>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Fişa competențelor dezvoltate</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--charcoal-soft)" }}>
                Document care evidențiază principalele arii de dezvoltare şi tematicile abordate în cadrul programului.
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--charcoal-soft)" }}>Fişa poate include, fără a se limita la:</p>
              <ul className="space-y-2">
                {[
                  "Comunicare interpersonală",
                  "Colaborare şi lucru în echipă",
                  "Adaptabilitate şi gestionarea schimbării",
                  "Inteligență emoțională",
                  "Leadership personal",
                  "Reziliență profesională",
                  "Gestionarea stresului",
                  "Wellbeing şi prevenirea epuizării profesionale",
                  "Luarea deciziilor",
                  "Competențe transversale",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-xs mt-0.5" style={{ color: "#7C9A7E" }}>✓</span>
                    <span className="text-xs leading-relaxed" style={{ color: "var(--charcoal)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: "#F5F0E8" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
              Ambele documente sunt incluse în prețul participării și sunt înmânate fiecărui participant la finalul programului.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-white">
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
                a: "Nu. Programul este deschis tuturor persoanelor interesate de dezvoltare personală şi profesională.",
              },
              {
                q: "Pot participa singur(ă)?",
                a: "Da. Mulți participanți aleg să participe individual.",
              },
              {
                q: "Cum sunt repartizați participanții în camere?",
                a: "Participanții înscrişi individual sunt repartizați în camere duble, alături de participanți de acelaşi sex, în funcție de disponibilitate. Pentru un plus de confort şi intimitate, există posibilitatea rezervării unei camere single, contra unui cost suplimentar şi în limita disponibilității locației.",
              },
              {
                q: "Pot participa prin intermediul organizației în care lucrez?",
                a: "Da. Programul poate fi accesat atât individual, cât şi prin participarea unor grupuri provenite din companii, instituții publice, unități sanitare, unități de învățământ şi ONG-uri.",
              },
              {
                q: "Ce documente primesc la final?",
                a: "Participanții primesc: 📜 Certificat de Participare şi 📄 Fişa competențelor dezvoltate pe parcursul programului. Aceste documente sintetizează participarea şi principalele teme abordate în cadrul experienței.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(0,0,0,0.05)" }}>
                <p className="font-semibold text-base mb-3" style={{ color: "var(--charcoal)" }}>{item.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PENTRU ORGANIZAȚII */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Pentru organizații</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Relevant și pentru organizații și instituții
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>BUSOLA INTERIOARĂ poate fi accesată atât individual, cât și prin participarea unor grupuri provenite din companii, spitale, școli, instituții publice, ONG-uri și alte organizații.</p>
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
                  Pentru informații privind colaborările cu instituții publice, unități de învățământ, unități sanitare, ONG-uri sau companii, vă rugăm să ne contactați.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 w-full"
                  style={{ backgroundColor: "#A0715A" }}
                >
                  Solicită ofertă pentru organizația mea
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAZARE */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Transport</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Informații logistice</h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>Transportul poate fi organizat în funcție de localitatea de plecare și de numărul participanților.</p>
                <p>După înscriere, participanții vor primi toate informațiile logistice necesare.</p>
                <p>Pentru grupuri organizate sau participanți din aceeași zonă pot fi identificate soluții comune de transport.</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Cazare</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Repartizare camere</h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>Participanții care se înscriu individual vor fi repartizați în camere duble împreună cu alți participanți de același sex, în funcție de disponibilitate.</p>
                <p>Pentru un plus de confort, se poate opta pentru cameră single, contra unui cost suplimentar și în limita disponibilității locației.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIE */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#A0715A" }}>Locație</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            La munte sau la mare
          </h2>
          <p className="text-base leading-relaxed max-w-xl mx-auto mb-6" style={{ color: "var(--charcoal-soft)" }}>
            Locația exactă a programului este în curs de confirmare. Experiența va avea loc într-un cadru liniștit, propice pentru reflecție și dialog, înconjurat de natură, departe de ritmul obișnuit al vieții profesionale.
          </p>
          <p className="text-sm font-semibold" style={{ color: "#A0715A" }}>
            Detaliile vor fi anunțate în curând.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#A0715A" }}>Manifestă-ți interesul</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Interesat de{" "}
            <span className="italic" style={{ color: "#A0715A" }}>BUSOLA INTERIOARĂ?</span>
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>
            Înscrierile oficiale se vor deschide după confirmarea detaliilor finale. Până atunci, vă puteți înregistra interesul — veți fi printre primii care află toate detaliile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 hover:shadow-xl" style={{ backgroundColor: "#A0715A" }}>
              Sunt interesat(ă)
            </button>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-base transition-all border hover:bg-gray-50" style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}>
              Contactați-ne
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL FORMULAR */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overscrollBehavior: "contain" }}>
            {submitted ? (
              <div className="p-6 text-center">
                <div className="text-5xl mb-6">✦</div>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Vă mulțumim pentru interes!</h3>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>Solicitarea dumneavoastră a fost înregistrată cu succes.</p>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>În această perioadă centralizăm persoanele interesate de programul Busola Interioară.</p>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>Detaliile finale ale programului vor fi publicate după 15 iulie 2026.</p>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>Vă rugăm să reveniți pe această pagină pentru actualizări.</p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--charcoal-soft)" }}>Echipa AnimaMinds</p>
                <button onClick={() => { setShowForm(false); setSubmitted(false); setForm({ nume: "", email: "", telefon: "", editie: "", participanti: "1", observatii: "" }); }} className="px-8 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "#A0715A" }}>Închide</button>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Manifestare de interes — BUSOLA INTERIOARĂ</h3>
                  <button onClick={() => setShowForm(false)} className="text-2xl leading-none hover:opacity-60 transition-opacity" style={{ color: "var(--charcoal-soft)" }}>×</button>
                </div>
                <div className="rounded-xl p-4 mb-2" style={{ backgroundColor: "#A0715A12", border: "1px solid rgba(160,113,90,0.25)" }}>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>Înscrierile oficiale pentru <strong style={{ color: "var(--charcoal)" }}>BUSOLA INTERIOARĂ</strong> se vor deschide după confirmarea detaliilor logistice și a calendarului final.</p>
                    <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--charcoal-soft)" }}>Dacă doriți să fiți printre primii care află toate detaliile programului, vă puteți înregistra interesul folosind formularul de mai jos.</p>
                    <p className="text-xs mt-2 font-medium" style={{ color: "#A0715A" }}>Detaliile finale privind programul, calendarul și investiția vor fi publicate până la 15 iulie 2026. Înscrierile oficiale vor fi deschise după publicarea detaliilor finale ale programului.</p>
                  </div>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Nume și prenume *</label>
                    <input required name="nume" value={form.nume} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A] transition-colors" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="Ex: Ana Ionescu" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Email *</label>
                    <input required name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A] transition-colors" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="adresa@email.ro" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Telefon *</label>
                    <input required name="telefon" value={form.telefon} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A] transition-colors" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="07XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Selectează ediția *</label>
                    <select required name="editie" value={form.editie} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A] transition-colors bg-white" style={{ borderColor: "rgba(0,0,0,0.15)" }}>
                      <option value="">Alege ediția</option>
                      {editions.map((ed) => (
                        <option key={ed.id} value={ed.dates}>{ed.label} — {ed.dates}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Număr participanți</label>
                    <select name="participanti" value={form.participanti} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A] transition-colors bg-white" style={{ borderColor: "rgba(0,0,0,0.15)" }}>
                      {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} {n === 1 ? "participant" : "participanți"}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Observații</label>
                    <textarea name="observatii" value={form.observatii} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A] transition-colors resize-none" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="Orice informație relevantă pentru noi..." />
                  </div>
                  {submitError && (
                    <p className="text-sm text-red-600 text-center">{submitError}</p>
                  )}
                  <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: "#A0715A" }}>
                    {submitting ? "Se trimite..." : "Înregistrează interesul meu"}
                  </button>
                  <p className="text-xs text-center leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                    👥 Număr limitat de participanți. Fiecare ediție este limitată la maximum 25 participanți.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
