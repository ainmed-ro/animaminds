"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/povestea-noastra", label: "Povestea noastră" },
  { href: "/programe", label: "Programe" },
  { href: "/colaboreaza", label: "Colaborează cu noi" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex flex-col items-center leading-none">
              <span
                className="text-xl font-semibold tracking-tight"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                AnimaMinds
              </span>
              <span
                className="text-[9px] tracking-widest uppercase"
                style={{ color: "var(--sage)", letterSpacing: "0.15em" }}
              >
                where people &amp; ideas grow
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
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

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary text-sm py-2.5 px-5"
              style={{ backgroundColor: "var(--sage)", color: "white", borderRadius: "0.5rem", padding: "0.625rem 1.25rem", fontWeight: 500, fontSize: "0.875rem", display: "inline-flex", alignItems: "center", transition: "all 0.25s ease", textDecoration: "none" }}
            >
              Hai în comunitate
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
              Hai în comunitate
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
