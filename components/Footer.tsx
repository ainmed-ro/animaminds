import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  navigatie: [
    { href: "/", label: "Acasă" },
    { href: "/povestea-noastra", label: "Povestea noastră" },
    { href: "/programe", label: "Programe" },
    { href: "/colaboreaza", label: "Colaborează cu noi" },
    { href: "/cpd-provider", label: "CPD Approved Provider" },
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
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/seal-monogram.png"
                alt="AnimaMinds AM monogram"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span
                className="text-xl font-semibold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                AnimaMinds
              </span>
            </div>
            <p
              className="text-lg leading-relaxed mb-4 max-w-sm font-medium"
              style={{ 
                color: "var(--sage-light)",
                fontFamily: "Playfair Display, serif"
              }}
            >
              Locul unde oamenii și ideile cresc împreună.
            </p>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              O comunitate de învățare și dezvoltare profesională construită pe respect,
              autenticitate și colaborare.
            </p>
            <p
              className="text-xs italic"
              style={{ color: "var(--sage-light)", fontFamily: "Playfair Display, serif" }}
            >
              „Creșterea se construiește împreună."
            </p>

            {/* Trust & Legal Block */}
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold">AnimaMinds</span>
              </div>
              <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                Brand educațional operat de:
              </p>
              <p className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                NICULAE ALINA-IONELA PFA
              </p>
              <a
                href="https://thecpd.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/cpd-badge.png"
                  alt="CPD Approved Provider #790577"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </a>
            </div>

            {/* Social media */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--sage-light)" }}>
                Urmărește-ne și contactează-ne
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61591916964198"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AnimaMinds pe Facebook"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:opacity-90 active:opacity-70"
                  style={{ backgroundColor: "#1877F215", border: "1px solid #1877F240" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium" style={{ color: "#1877F2" }}>Facebook</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/40761940041"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactează AnimaMinds pe WhatsApp"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:opacity-90 active:opacity-70"
                  style={{ backgroundColor: "#25D36615", border: "1px solid #25D36640" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm font-medium" style={{ color: "#25D366" }}>WhatsApp</span>
                </a>
              </div>
            </div>
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
