export default function TrustBanner() {
  return (
    <div
      className="w-full py-2.5 px-4"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-end gap-3">
        <span className="text-xs hidden sm:inline" style={{ color: "var(--charcoal)", opacity: 0.7 }}>
          Ne puteți verifica pe
        </span>
        <a
          href="https://thecpdregister.com/providers/cpd-group-providers--790577"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 group"
          aria-label="Ne puteți verifica pe The CPD Register"
        >
          <img
            src="/images/TheCPDRegister_Listed_On_black.webp"
            alt="Listed on The CPD Register"
            width="100"
            height="33"
            className="rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </div>
    </div>
  );
}
