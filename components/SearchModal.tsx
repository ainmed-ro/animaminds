"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

type SearchResult = {
  title: string;
  href: string;
  description: string;
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      search(query);
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

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
                placeholder="Caută pe site..."
                className="flex-1 outline-none text-base bg-transparent"
                style={{ color: "var(--charcoal)" }}
              />
              {loading && (
                <span className="text-xs" style={{ color: "var(--charcoal-soft)" }}>
                  Se caută...
                </span>
              )}
              <button onClick={() => setOpen(false)} aria-label="Închide" className="p-1 hover:opacity-70">
                <X size={20} style={{ color: "var(--charcoal-soft)" }} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() === "" ? (
                <p className="px-4 py-6 text-sm text-center" style={{ color: "var(--charcoal-soft)" }}>
                  Începe să tastezi pentru a căuta programe, ediții sau pagini.
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
