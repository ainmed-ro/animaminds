"use client";
import Link from "next/link";
import { User, Building, MessageSquare, Mail, Phone, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    nume: "",
    email: "",
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
          phone: "",
          organization: "",
          programInteres: "",
          subject: form.subiect,
          message: form.mesaj,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la server.");
      }

      setLoading(false);
      setSubmitted(true);
      setForm({ nume: "", email: "", subiect: "", mesaj: "" });
      
    } catch (err) {
      setLoading(false);
      setError("A apărut o eroare la trimiterea mesajului. Reîncercați sau contactați echipa AnimaMinds direct la contact@animaminds.ro");
      console.error("Eroare trimitere formular:", err);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
          >
            Cum te putem ajuta?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Alege tipul solicitării și îți răspundem cât mai repede.
          </p>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Participant Individual */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "var(--sage)" }}>
                <User size={32} color="white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Sunt participant individual
              </h3>
              <p className="text-gray-600 mb-6">
                Vreau să particip la un program.
              </p>
              <Link
                href="/inscriere"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: "var(--sage)" }}
              >
                Înscriere
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Card 2 - Organizație */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "var(--terracotta)" }}>
                <Building size={32} color="white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Reprezint o organizație
              </h3>
              <p className="text-gray-600 mb-6">
                Doresc o ofertă pentru instituția mea.
              </p>
              <Link
                href="/colaboreaza"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: "var(--terracotta)" }}
              >
                Solicită ofertă
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Card 3 - Întrebare */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "var(--charcoal)" }}>
                <MessageSquare size={32} color="white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
                Am o întrebare
              </h3>
              <p className="text-gray-600 mb-6">
                Doresc informații suplimentare.
              </p>
              <button
                onClick={() => {
                  const form = document.getElementById('contact-form');
                  form?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                Trimite mesaj
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Trimite-ne un mesaj
            </h2>
            <p className="text-lg text-gray-600">
              Ne poți contacta direct folosind formularul de mai jos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl">
                <CheckCircle size={48} className="mb-5" style={{ color: "var(--sage)" }} />
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                  Mesaj trimis!
                </h3>
                <p style={{ color: "var(--charcoal-soft)" }}>
                  Mulțumim pentru mesaj. Răspunsul va veni în curând.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume și prenume *
                    </label>
                    <input
                      type="text"
                      name="nume"
                      required
                      value={form.nume}
                      onChange={handleChange}
                      placeholder="Numele tău"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@exemplu.ro"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subiect *
                  </label>
                  <select
                    name="subiect"
                    required
                    value={form.subiect}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  >
                    <option value="">Alege subiectul</option>
                    <option value="individual">Înscriere program individual</option>
                    <option value="organization">Solicitare ofertă organizație</option>
                    <option value="info">Informații programe</option>
                    <option value="technical">Problemă tehnică site</option>
                    <option value="other">Alt subiect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    required
                    name="mesaj"
                    rows={5}
                    value={form.mesaj}
                    onChange={handleChange}
                    placeholder="Descrie-ne pe scurt cum te putem ajuta..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                  />
                  <span className="text-gray-700">
                    Sunt de acord cu prelucrarea datelor personale *
                  </span>
                </div>

                {error && (
                  <div className="p-4 rounded-lg text-sm" style={{ backgroundColor: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: "var(--sage)", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Se trimite..." : "Trimite mesajul"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Date de contact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--sage)" }}>
                <Mail size={24} color="white" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--charcoal)" }}>Email</h3>
              <a href="mailto:contact@animaminds.ro" className="text-gray-600 hover:text-sage-600 transition-colors">
                contact@animaminds.ro
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--sage)" }}>
                <Phone size={24} color="white" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--charcoal)" }}>Telefon</h3>
              <a href="tel:+40722334455" className="text-gray-600 hover:text-sage-600 transition-colors">
                +40 722 334 455
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--sage)" }}>
                <MapPin size={24} color="white" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--charcoal)" }}>Locație</h3>
              <p className="text-gray-600">
                București, România
              </p>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--sage)" }}>
              <Clock size={32} color="white" />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>
              Timp de răspuns
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ne propunem să răspundem în maximum 2 zile lucrătoare. 
              Pentru urgențe, ne poți contacta telefonic.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
