"use client";
import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, Phone } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    nume: "",
    email: "",
    organizatie: "",
    programInteres: "",
    subiect: "",
    mesaj: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Trimiterea datelor către API-ul Supabase
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.nume,
          email: form.email,
          phone: "", // Contact form doesn't have phone field
          organization: form.organizatie,
          programInteres: form.programInteres,
          subject: form.subiect,
          message: form.mesaj,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la server.");
      }

      // Succes
      setLoading(false);
      setSubmitted(true);
      
      // Reset form
      setForm({
        nume: "",
        email: "",
        organizatie: "",
        programInteres: "",
        subiect: "",
        mesaj: "",
      });
      
    } catch (err) {
      setLoading(false);
      setError("A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou sau să ne contactezi direct la contact@animaminds.ro");
      console.error("Eroare trimitere formular:", err);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="section-label">Contact</span>
            <div className="line-accent my-4" />
            <h1
              className="text-5xl sm:text-6xl font-semibold mb-5"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Hai să vorbim
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "var(--charcoal-soft)" }}
            >
              Fie că ai o întrebare, vrei să colaborăm sau pur și simplu vrei
              să ne cunoști — suntem bucuroși să auzim de la tine.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Informații de contact
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(124,154,126,0.1)" }}
                  >
                    <Mail size={18} style={{ color: "var(--sage)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-0.5" style={{ color: "var(--charcoal)" }}>
                      Email
                    </p>
                    <a
                      href="mailto:contact@animaminds.ro"
                      className="text-sm transition-colors"
                      style={{ color: "var(--sage)" }}
                    >
                      contact@animaminds.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(124,154,126,0.1)" }}
                  >
                    <Phone size={18} style={{ color: "var(--sage)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--charcoal)" }}>
                      Telefon
                    </p>
                    <div className="space-y-1">
                      <div>
                        <p className="text-xs" style={{ color: "var(--charcoal-soft)" }}>Alina</p>
                        <a href="tel:+40761940041" className="text-sm" style={{ color: "var(--sage)" }}>
                          +40 761 940 041
                        </a>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: "var(--charcoal-soft)" }}>Mihaela</p>
                        <a href="tel:+40752289303" className="text-sm" style={{ color: "var(--sage)" }}>
                          +40 752 289 303
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(124,154,126,0.1)" }}
                  >
                    <MapPin size={18} style={{ color: "var(--sage)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-0.5" style={{ color: "var(--charcoal)" }}>
                      Locație
                    </p>
                    <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
                      România
                    </p>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div
                className="p-5 rounded-2xl"
                style={{ backgroundColor: "var(--gray-warm)" }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--charcoal)" }}
                >
                  Timp de răspuns
                </p>
                <p className="text-sm" style={{ color: "var(--charcoal-soft)" }}>
                  Răspundem în maximum 24 de ore în zilele lucrătoare. De obicei
                  mult mai repede. 😊
                </p>
              </div>

              {/* Legal info */}
              <div
                className="p-5 rounded-2xl border"
                style={{ backgroundColor: "white", borderColor: "var(--cream-dark)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "var(--charcoal-soft)" }}
                >
                  Date legale
                </p>
                <ul className="space-y-1">
                  <li className="text-xs" style={{ color: "var(--charcoal)" }}>
                    <span className="font-medium">NICULAE ALINA-IONELA PFA</span>
                  </li>
                  <li className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                    CUI: 54816580
                  </li>
                  <li className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                    Nr. înreg.: F2026028862006
                  </li>
                  <li className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                    Str. Rozelor nr. 15, Lehliu Gară, jud. Călărași
                  </li>
                </ul>
              </div>

              {/* Values reminder */}
              <div
                className="mt-8 p-6 rounded-2xl border-l-4"
                style={{
                  backgroundColor: "var(--cream)",
                  borderColor: "var(--terracotta)",
                }}
              >
                <p
                  className="text-base italic leading-relaxed"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "var(--charcoal)",
                  }}
                >
                  „Fiecare conversație este începutul a ceva nou."
                </p>
                <p className="text-xs mt-2" style={{ color: "var(--sage)" }}>
                  — AnimaMinds
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center text-center p-12 rounded-2xl h-full"
                  style={{ backgroundColor: "var(--gray-warm)" }}
                >
                  <CheckCircle
                    size={48}
                    className="mb-5"
                    style={{ color: "var(--sage)" }}
                  />
                  <h3
                    className="text-2xl font-semibold mb-3"
                    style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                  >
                    Mesaj trimis!
                  </h3>
                  <p style={{ color: "var(--charcoal-soft)" }}>
                    Mulțumim că ne-ai contactat. Îți vom răspunde în curând.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "var(--charcoal)" }}
                      >
                        Nume complet *
                      </label>
                      <input
                        type="text"
                        name="nume"
                        required
                        value={form.nume}
                        onChange={handleChange}
                        placeholder="Numele tău"
                        className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
                        style={{ borderColor: "#E0D9CE", backgroundColor: "var(--gray-warm)", color: "var(--charcoal)" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "var(--charcoal)" }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@exemplu.ro"
                        className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
                        style={{ borderColor: "#E0D9CE", backgroundColor: "var(--gray-warm)", color: "var(--charcoal)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "var(--charcoal)" }}
                    >
                      Organizație (opțional)
                    </label>
                    <input
                      type="text"
                      name="organizatie"
                      value={form.organizatie}
                      onChange={handleChange}
                      placeholder="Compania sau organizația ta"
                      className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
                      style={{ borderColor: "#E0D9CE", backgroundColor: "var(--gray-warm)", color: "var(--charcoal)" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "var(--charcoal)" }}
                    >
                      Program de interes (opțional)
                    </label>
                    <select
                      name="programInteres"
                      value={form.programInteres}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
                      style={{ borderColor: "#E0D9CE", backgroundColor: "var(--gray-warm)", color: "var(--charcoal)" }}
                    >
                      <option value="">Alege un program</option>
                      <option value="Busola Interioară">Busola Interioară</option>
                      <option value="Program pentru organizații / instituții">Program pentru organizații / instituții</option>
                      <option value="Alt program viitor">Alt program viitor</option>
                      <option value="Nu știu încă">Nu știu încă</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "var(--charcoal)" }}
                    >
                      Subiect *
                    </label>
                    <select
                      name="subiect"
                      required
                      value={form.subiect}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
                      style={{ borderColor: "#E0D9CE", backgroundColor: "var(--gray-warm)", color: "var(--charcoal)" }}
                    >
                      <option value="">Alege un subiect</option>
                      <option value="Informații despre programe">Informații despre programe</option>
                      <option value="Parteneriat organizație">Parteneriat organizație</option>
                      <option value="Colaborare formator">Colaborare ca formator</option>
                      <option value="Program personalizat">Program personalizat</option>
                      <option value="Altele">Altele</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "var(--charcoal)" }}
                    >
                      Mesaj *
                    </label>
                    <textarea
                      name="mesaj"
                      required
                      rows={5}
                      value={form.mesaj}
                      onChange={handleChange}
                      placeholder="Spune-ne cu ce te putem ajuta..."
                      className="w-full px-4 py-3 rounded-lg border text-sm transition-all resize-none"
                      style={{ borderColor: "#E0D9CE", backgroundColor: "var(--gray-warm)", color: "var(--charcoal)" }}
                    />
                  </div>

                  <div
                    className="p-4 rounded-lg text-xs"
                    style={{ backgroundColor: "var(--gray-warm)", color: "var(--charcoal-soft)" }}
                  >
                    Prin trimiterea acestui formular, ești de acord cu{" "}
                    <a href="/politica-de-confidentialitate" className="underline" style={{ color: "var(--sage)" }}>
                      politica noastră de confidențialitate
                    </a>
                    .
                  </div>

                  {error && (
                    <div
                      className="p-4 rounded-lg text-xs"
                      style={{ backgroundColor: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA" }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center"
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      "Se trimite..."
                    ) : (
                      <>
                        Trimite mesajul
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
