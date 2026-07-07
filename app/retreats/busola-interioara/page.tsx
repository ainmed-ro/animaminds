"use client";
import { useState } from "react";
import Link from "next/link";

const MAX_SPOTS = 25;
const MIN_CONFIRM = 15;

const editions = [
  { id: "ed1", label: "Ediția I", dates: "28–31 august 2026", spotsUsed: 7 },
  { id: "ed2", label: "Ediția II", dates: "4–6 septembrie 2026", spotsUsed: 3 },
];

function getStatus(used: number) {
  const remaining = MAX_SPOTS - used;
  if (remaining === 0) return { label: "Grupă completă", color: "#C4714F", bg: "#C4714F15" };
  if (used >= MIN_CONFIRM) return { label: "Confirmată", color: "#7C9A7E", bg: "#7C9A7E15" };
  if (remaining <= 5) return { label: "Ultimele locuri", color: "#C4714F", bg: "#C4714F15" };
  return { label: "Înscrieri deschise", color: "#9B7EBD", bg: "#9B7EBD15" };
}

const includes = [
  "Participarea la toate activitățile experiențiale",
  "Activitățile AnimaMinds",
  "Materialele de lucru",
  "2 nopți de cazare",
  "Mesele incluse conform pachetului",
  "Accesul la facilitățile locației",
  "Comunitatea participanților",
];

type FormData = {
  nume: string; email: string; telefon: string;
  editie: string; participanti: string; observatii: string;
};

export default function BusolaInterioarePage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    nume: "", email: "", telefon: "", editie: "", participanti: "1", observatii: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-20 bg-white">

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #9B7EBD 0%, transparent 70%)", transform: "translate(25%, -25%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C9A7E 0%, transparent 70%)", transform: "translate(-25%, 25%)" }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-28 w-full">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/retreats" className="text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" style={{ color: "#9B7EBD" }}>
              AnimaMinds Retreats
            </Link>
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.25)" }}>→</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(0,0,0,0.4)" }}>Busola Interioară</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8" style={{ backgroundColor: "#9B7EBD20", color: "#9B7EBD" }}>
            ✦ Înscrieri deschise
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-none" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            BUSOLA<br /><span className="italic" style={{ color: "#9B7EBD" }}>INTERIOARĂ</span>
          </h1>
          <p className="text-2xl font-medium mb-8 max-w-2xl" style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}>
            Claritate și direcție atunci când lucrurile par neclare.
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mb-4" style={{ color: "var(--charcoal-soft)" }}>
            Un weekend pentru oamenii care simt nevoia să se oprească, să respire și să privească lucrurile cu mai multă claritate.
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mb-14" style={{ color: "var(--charcoal-soft)" }}>
            Trei zile de conversații cu sens, reflecție, natură și experiențe care te ajută să te reconectezi cu ceea ce contează cu adevărat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90 hover:shadow-xl" style={{ backgroundColor: "#9B7EBD" }}>
              Înscrie-mă
            </button>
            <a href="#despre" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium text-lg transition-all border hover:bg-white" style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}>
              Află mai multe
            </a>
          </div>
        </div>
      </section>

      {/* EDIȚII + LOCURI */}
      <section className="py-16 bg-white border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-8 text-center" style={{ color: "#9B7EBD" }}>Ediții disponibile</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {editions.map((ed) => {
              const status = getStatus(ed.spotsUsed);
              const remaining = MAX_SPOTS - ed.spotsUsed;
              const pct = Math.round((ed.spotsUsed / MAX_SPOTS) * 100);
              return (
                <div key={ed.id} className="rounded-2xl p-7 border" style={{ borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
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
                    style={{ backgroundColor: remaining === 0 ? "#aaa" : "#9B7EBD" }}
                  >
                    {remaining === 0 ? "Grupă completă" : "Înscrie-mă"}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: "📍", label: "Locație", value: "Deny Inn Resort & Spa, Zărnești" },
              { icon: "👥", label: "Grup", value: "Maxim 25 participanți / ediție" },
              { icon: "🛏️", label: "Cazare", value: "Inclusă" },
              { icon: "🌲", label: "Cadru", value: "Piatra Craiului" },
            ].map((d) => (
              <div key={d.label} className="p-4 rounded-xl" style={{ backgroundColor: "#F5F0E8" }}>
                <div className="text-xl mb-1">{d.icon}</div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#9B7EBD" }}>{d.label}</p>
                <p className="text-xs font-medium" style={{ color: "var(--charcoal)" }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESPRE */}
      <section id="despre" className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>Despre experiență</p>
              <h2 className="text-4xl sm:text-5xl font-semibold mb-10 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                De ce <span className="italic" style={{ color: "#9B7EBD" }}>BUSOLA INTERIOARĂ?</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                <p>Uneori avem nevoie să ieșim din ritmul obișnuit al vieții pentru a vedea mai clar direcția în care mergem.</p>
                <p>BUSOLA INTERIOARĂ este o experiență creată pentru oamenii care se află într-un moment de schimbare, alegere sau restart și care simt nevoia unui spațiu în care să gândească, să reflecteze și să exploreze noi perspective.</p>
                <p className="font-medium" style={{ color: "var(--charcoal)" }}>Nu oferim rețete și nici soluții universale.</p>
                <p>Construim contexte, conversații și experiențe care pot genera claritate, energie și direcție.</p>
              </div>
            </div>
            <div className="rounded-2xl p-10" style={{ backgroundColor: "#F5F0E8" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-8" style={{ color: "#9B7EBD" }}>Ce include</p>
              <ul className="space-y-4 mb-10">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ backgroundColor: "#9B7EBD" }}>✓</span>
                    <span className="text-base" style={{ color: "var(--charcoal)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowForm(true)} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg" style={{ backgroundColor: "#9B7EBD" }}>
                Înscrie-mă
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTIȚIA TA */}
      <section className="py-24" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>Investiția ta</p>
              <h2 className="text-4xl font-semibold mb-8 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Prețul include tot ce ai nevoie.
              </h2>
              <ul className="space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base" style={{ color: "var(--charcoal-soft)" }}>
                    <span style={{ color: "#9B7EBD" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-10 text-center" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#9B7EBD" }}>Preț</p>
              <p className="text-5xl font-bold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>TBA</p>
              <p className="text-sm mb-8" style={{ color: "var(--charcoal-soft)" }}>Valoarea va fi comunicată în curând.</p>
              <button onClick={() => setShowForm(true)} className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90" style={{ backgroundColor: "#9B7EBD" }}>
                Înscrie-mă
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORT */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>Transport</p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Drumul spre Zărnești
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-left" style={{ color: "var(--charcoal-soft)" }}>
            <p>Transportul poate fi organizat în funcție de localitatea de plecare și numărul participanților.</p>
            <p>Detaliile logistice vor fi comunicate după înscriere.</p>
            <p>Pentru grupuri organizate și participanți din aceeași zonă pot fi identificate soluții comune de transport.</p>
          </div>
        </div>
      </section>

      {/* LOCATIE */}
      <section className="py-24" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>Locație</p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Deny Inn Resort & Spa<br />Zărnești – Piatra Craiului
          </h2>
          <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: "var(--charcoal-soft)" }}>
            Un loc ales cu grijă — liniștit, frumos și propice pentru reflecție, înconjurat de munți și natură, departe de ritmul obișnuit al zilelor noastre.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "#9B7EBD" }}>Locuri limitate</p>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-8 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Dacă simți că ai nevoie{" "}
            <span className="italic" style={{ color: "#9B7EBD" }}>de acest spațiu,</span>{" "}
            poate că ai dreptate.
          </h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--charcoal-soft)" }}>
            Scrie-ne și îți vom oferi toate detaliile despre program, costuri și disponibilitate.
          </p>
          <button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90 hover:shadow-xl" style={{ backgroundColor: "#9B7EBD" }}>
            Înscrie-mă
          </button>
        </div>
      </section>

      {/* MODAL FORMULAR */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            {submitted ? (
              <div className="p-10 text-center">
                <div className="text-5xl mb-6">✦</div>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Mulțumim!</h3>
                <p className="text-base leading-relaxed mb-2" style={{ color: "var(--charcoal-soft)" }}>Cererea ta de înscriere a fost înregistrată.</p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--charcoal-soft)" }}>Vom reveni cu toate informațiile privind plata, organizarea și detaliile experienței.</p>
                <button onClick={() => { setShowForm(false); setSubmitted(false); }} className="px-8 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "#9B7EBD" }}>Închide</button>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>Înscrie-mă la BUSOLA INTERIOARĂ</h3>
                  <button onClick={() => setShowForm(false)} className="text-2xl leading-none hover:opacity-60 transition-opacity" style={{ color: "var(--charcoal-soft)" }}>×</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Nume și prenume *</label>
                    <input required name="nume" value={form.nume} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-purple-400 transition-colors" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="Ex: Ana Ionescu" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Email *</label>
                    <input required name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-purple-400 transition-colors" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="adresa@email.ro" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Telefon *</label>
                    <input required name="telefon" value={form.telefon} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-purple-400 transition-colors" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="07XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Selectează ediția *</label>
                    <select required name="editie" value={form.editie} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-purple-400 transition-colors bg-white" style={{ borderColor: "rgba(0,0,0,0.15)" }}>
                      <option value="">Alege ediția</option>
                      {editions.map((ed) => (
                        <option key={ed.id} value={ed.dates}>{ed.label} — {ed.dates}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Număr participanți</label>
                    <select name="participanti" value={form.participanti} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-purple-400 transition-colors bg-white" style={{ borderColor: "rgba(0,0,0,0.15)" }}>
                      {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} {n === 1 ? "participant" : "participanți"}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>Observații</label>
                    <textarea name="observatii" value={form.observatii} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-purple-400 transition-colors resize-none" style={{ borderColor: "rgba(0,0,0,0.15)" }} placeholder="Orice informație relevantă pentru noi..." />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90" style={{ backgroundColor: "#9B7EBD" }}>
                    Trimite înscrierea
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
