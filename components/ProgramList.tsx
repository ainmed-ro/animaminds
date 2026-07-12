"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";

type Program = {
  image: string;
  badge: string;
  badgeColor: string;
  gradient?: string;
  symbol?: string;
  slogan?: string;
  title: string;
  description: string;
  for: string;
  formats?: string;
  active: boolean;
  status: string;
  href?: string;
  cta?: string;
  tags: string[];
};

export default function ProgramList({ programs }: { programs: Program[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [waitlist, setWaitlist] = useState<{ open: boolean; program: Program | null }>({ open: false, program: null });
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filters = [
    { id: "all", label: "Toate" },
    { id: "open", label: "Ediții deschise" },
    { id: "organization", label: "Pentru organizații" },
    { id: "experience", label: "Experience Editions" },
    { id: "upcoming", label: "În curând" },
  ];

  const filtered =
    filter === "all" ? programs : programs.filter((p) => p.tags.includes(filter));

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!waitlist.program || !form.name || !form.email) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Waitlist - ${waitlist.program.title}`,
          programInteres: waitlist.program.title,
          message: "Vreau să fiu notificat când programul devine disponibil.",
        }),
      });
      setSubmitted(true);
    } catch {
      // silently ignore — UX handled by disabling submit
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
              style={{
                borderColor: filter === f.id ? "#A0715A" : "rgba(0,0,0,0.08)",
                backgroundColor: filter === f.id ? "#A0715A" : "white",
                color: filter === f.id ? "white" : "var(--charcoal)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Program cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filtered.map((program, i) => (
          <div
            key={program.title}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border"
            style={{ borderColor: "var(--cream-dark)" }}
          >
            <div
              className={`relative min-h-64 lg:min-h-80 ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <Image
                src={program.image}
                alt={program.badge}
                fill
                className="object-cover"
                quality={85}
              />
            </div>
            <div
              className={`p-8 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}
              style={{ backgroundColor: i % 2 === 0 ? "white" : "var(--cream)" }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: program.badgeColor }}
                >
                  {program.badge}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
                  style={{ color: "var(--charcoal-soft)", borderColor: "var(--cream-dark)" }}
                >
                  {program.status}
                </span>
                {program.tags.includes("experience") && (
                  <span
                    className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{ color: "#A0715A", borderColor: "rgba(160,113,90,0.3)" }}
                  >
                    Experience Edition
                  </span>
                )}
              </div>
              <h2
                className="text-2xl sm:text-3xl font-semibold mb-3"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                {program.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                {program.description}
              </p>
              <p className="text-xs mb-2" style={{ color: "var(--charcoal-soft)" }}>
                <span className="font-semibold">Pentru: </span>
                {program.for}
              </p>
              {program.formats && (
                <p className="text-xs mb-5" style={{ color: "var(--charcoal-soft)" }}>
                  <span className="font-semibold">Formate disponibile: </span>
                  {program.formats}
                </p>
              )}
              {program.active && program.href ? (
                <Link
                  href={program.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "#A0715A" }}
                >
                  {program.cta || "Descoperă programul"}
                  <ArrowRight size={15} />
                </Link>
              ) : (
                <div className="flex flex-col items-start gap-2">
                  <button
                    onClick={() => {
                      setWaitlist({ open: true, program });
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all border hover:bg-gray-50"
                    style={{ color: "var(--charcoal)", borderColor: "rgba(0,0,0,0.12)" }}
                  >
                    <Bell size={15} />
                    Notifică-mă când este disponibil
                  </button>
                  {program.href && (
                    <Link
                      href={program.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ color: "#A0715A" }}
                    >
                      {program.cta || "Află mai multe"}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Waitlist modal */}
      {waitlist.open && waitlist.program && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Notifică-mă
              </h3>
              <button
                onClick={() => setWaitlist({ open: false, program: null })}
                className="text-2xl leading-none hover:opacity-60 transition-opacity"
                style={{ color: "var(--charcoal-soft)" }}
              >
                ×
              </button>
            </div>
            {submitted ? (
              <div className="text-center">
                <div className="text-5xl mb-4">✦</div>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--charcoal-soft)" }}>
                  Te vom anunța când {waitlist.program.title} devine disponibil.
                </p>
                <button
                  onClick={() => setWaitlist({ open: false, program: null })}
                  className="px-6 py-3 rounded-xl font-semibold text-white"
                  style={{ backgroundColor: "#A0715A" }}
                >
                  Închide
                </button>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                  Lăsă datele tale și te contactăm când programul{" "}
                  <strong style={{ color: "var(--charcoal)" }}>{waitlist.program.title}</strong>{" "}
                  devine disponibil.
                </p>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--charcoal)" }}>
                    Nume și prenume *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A]"
                    style={{ borderColor: "rgba(0,0,0,0.15)" }}
                    placeholder="Ex: Ana Ionescu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--charcoal)" }}>
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A]"
                    style={{ borderColor: "rgba(0,0,0,0.15)" }}
                    placeholder="adresa@email.ro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--charcoal)" }}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#A0715A]"
                    style={{ borderColor: "rgba(0,0,0,0.15)" }}
                    placeholder="07XX XXX XXX"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-60"
                  style={{ backgroundColor: "#A0715A" }}
                >
                  {submitting ? "Se trimite..." : "Notifică-mă"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
