import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="text-center max-w-lg">
        <p
          className="text-8xl font-bold mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "var(--sage)", opacity: 0.4 }}
        >
          404
        </p>
        <h1
          className="text-3xl sm:text-4xl font-semibold mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
        >
          Pagina nu a fost găsită
        </h1>
        <p
          className="text-lg mb-10 leading-relaxed"
          style={{ color: "var(--charcoal-soft)" }}
        >
          Se pare că te-ai rătăcit. Nu te îngrijora — se întâmplă chiar și
          celor mai experimentați exploratori. Hai înapoi acasă.
        </p>
        <Link
          href="/"
          className="btn-primary group inline-flex"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Înapoi acasă
        </Link>
      </div>
    </div>
  );
}
