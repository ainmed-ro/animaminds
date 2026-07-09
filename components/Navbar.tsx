"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/povestea-noastra", label: "Povestea noastră" },
  { href: "/experiences", label: "Programe" },
  { href: "/colaboreaza", label: "Colaborează cu noi" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[72px] py-2.5">
          {/* Logo + Desktop Nav group */}
          <div className="flex items-center gap-3 lg:gap-5">
            <Link
              href="/"
              className="flex items-center group transition-transform duration-300 ease-out hover:scale-[1.02] shrink-0"
              aria-label="AnimaMinds"
            >
              <img
                src="/images/logo-horizontal.png"
                alt="AnimaMinds"
                className="h-10 md:h-11 lg:h-14 w-auto rounded-lg"
                style={{
                  maxHeight: "80px",
                  maxWidth: "230px",
                  boxShadow: "0 3px 10px rgba(28,43,30,0.08)",
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs lg:text-sm font-semibold transition-colors duration-200 relative group whitespace-nowrap ${
                  pathname === link.href
                    ? "text-sage"
                    : "text-charcoal hover:text-sage"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-terracotta transition-all duration-200 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ backgroundColor: "var(--terracotta)" }}
                />
              </Link>
            ))}
          </nav>
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="btn-primary text-xs lg:text-sm font-semibold py-2 px-3 lg:px-4 rounded-lg whitespace-nowrap"
              style={{ backgroundColor: "var(--sage)", color: "white", display: "inline-flex", alignItems: "center", transition: "all 0.25s ease", textDecoration: "none" }}
            >
              Alătură-te comunității
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "white" }}
      >
        <div className="px-4 py-4 space-y-1 border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-white"
                  : "text-charcoal hover:bg-gray-50"
              }`}
              style={
                pathname === link.href
                  ? { backgroundColor: "var(--sage)", color: "white" }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 mt-3">
            <Link
              href="/contact"
              className="block w-full text-center py-3 px-4 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: "var(--sage)" }}
            >
              Alătură-te comunității
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
