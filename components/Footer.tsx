import Link from "next/link";

const footerLinks = {
  navigatie: [
    { href: "/", label: "Acasă" },
    { href: "/povestea-noastra", label: "Povestea noastră" },
    { href: "/programe", label: "Programe" },
    { href: "/colaboreaza", label: "Colaborează cu noi" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/politica-de-confidentialitate", label: "Politică de confidențialitate" },
    { href: "/termeni-si-conditii", label: "Termeni și condiții" },
    { href: "/cookies", label: "Politica cookies" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--charcoal)", color: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--sage)" }}
              >
                <span
                  className="text-white font-bold text-base"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  A
                </span>
              </div>
              <span
                className="text-xl font-semibold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                AnimaMinds
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Locul unde oamenii și ideile cresc împreună. O comunitate de
              învățare și dezvoltare profesională construită pe respect,
              autenticitate și colaborare.
            </p>
            <p
              className="text-xs italic"
              style={{ color: "var(--sage-light)", fontFamily: "Playfair Display, serif" }}
            >
              „Creșterea se construiește împreună."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--sage-light)" }}
            >
              Navigație
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigatie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 footer-nav-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Legal */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--sage-light)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href="mailto:contact@animaminds.ro"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  contact@animaminds.ro
                </a>
              </li>
            </ul>

            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--sage-light)" }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 border-t flex flex-col gap-2"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              © {new Date().getFullYear()} AnimaMinds. Toate drepturile rezervate.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Construit cu grijă în România 🇷🇴
            </p>
          </div>
          <p className="text-xs text-center sm:text-left" style={{ color: "rgba(255,255,255,0.25)" }}>
            NICULAE ALINA-IONELA PFA · CUI 54816580 · Nr. înreg. F2026028862006 · Str. Rozelor nr. 15, Lehliu Gară, jud. Călărași
          </p>
        </div>
      </div>
    </footer>
  );
}
