"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

const searchableItems = [
  { title: "Busola Deciziilor", href: "/programe/busola-deciziilor", description: "Claritate și direcție" },
  { title: "AI Fără Haos", href: "/programe/ai-fara-haos", description: "Folosește AI. Păstrează controlul." },
  { title: "Conversații care Contează", href: "/programe", description: "Comunicare și colaborare" },
  { title: "Calm sub Presiune", href: "/programe", description: "Conflict și reziliență" },
  { title: "Avantajul Uman", href: "/programe", description: "Competențe umane pentru viitor" },
  { title: "Calendar Ediții", href: "/calendar", description: "Vezi edițiile deschise" },
  { title: "Înscrie-te", href: "/inscriere", description: "Formular de înscriere" },
  { title: "Contact", href: "/contact", description: "Trimite un mesaj" },
  { title: "Pentru organizații", href: "/colaboreaza", description: "Colaborare personalizată" },
  { title: "Povestea noastră", href: "/povestea-noastra", description: "Cine suntem" },
];

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const results = query.trim()
    ? searchableItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Caută"
        className="p-2 rounded-lg text-charcoal hover:bg-gray-100 transition-colors"
      >
        <Search size={20} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-24 sm:pt-32 px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Search size={20} style={{ color: "var(--charcoal-soft)" }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută programe, pagini, înscriere..."
                className="flex-1 outline-none text-base bg-transparent"
                style={{ color: "var(--charcoal)" }}
              />
              <button onClick={() => setOpen(false)} aria-label="Închide" className="p-1 hover:opacity-70">
                <X size={20} style={{ color: "var(--charcoal-soft)" }} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() === "" ? (
                <p className="px-4 py-6 text-sm text-center" style={{ color: "var(--charcoal-soft)" }}>
                  Începe să tastezi pentru a căuta programe sau pagini.
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-6 text-sm text-center" style={{ color: "var(--charcoal-soft)" }}>
                  Nu am găsit rezultate pentru „{query}”.
                </p>
              ) : (
                results.map((item) => (
                  <Link
                    key={item.href + item.title}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-sm" style={{ color: "var(--charcoal)" }}>
                      {item.title}
                    </span>
                    <span className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                      {item.description}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
