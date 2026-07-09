export default function TrustBanner() {
  const cpdUrl = "https://thecpdregister.com/providers/cpd-group-providers--790577";

  return (
    <div
      className="w-full bg-white border-b"
      style={{ borderColor: "rgba(28,43,30,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          <div className="hidden lg:block lg:flex-1" />

          <p
            className="text-center text-sm sm:text-base leading-relaxed max-w-4xl lg:flex-[2]"
            style={{ color: "var(--charcoal)" }}
          >
            <strong style={{ color: "var(--sage)", fontFamily: "Playfair Display, serif" }}>
              Standarde Internaționale în Educație
            </strong>{" "}
            | Prin{" "}
            <strong style={{ color: "var(--charcoal)" }}>
              NICULAE ALINA-IONELA PFA
            </strong>
            , comunitatea AnimaMinds este reprezentată de un Furnizor Acreditat Internațional în{" "}
            <a
              href={cpdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
              style={{ color: "var(--terracotta)" }}
            >
              <strong>The CPD Register (#790577)</strong>
            </a>
            , confirmând angajamentul nostru pentru excelență, calitate și dezvoltare profesională continuă la standarde internaționale.{" "}
            <a
              href={cpdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: "var(--sage)" }}
            >
              Verifică acreditarea
              <svg
                className="ml-1 w-3 h-3 sm:w-3.5 sm:h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </p>

          <div className="lg:flex-1 flex lg:justify-end">
            <a
              href={cpdUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listed on The CPD Register"
              className="flex-shrink-0"
            >
              <img
                src="/images/TheCPDRegister_Listed_On_black.webp"
                alt="Listed on The CPD Register"
                width="120"
                height="40"
                className="rounded-sm opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
