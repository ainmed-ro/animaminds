import HeroSection from "@/components/home/HeroSection";
import FeaturedBusolaSection from "@/components/home/FeaturedBusolaSection";
import AudienceSection from "@/components/home/AudienceSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Short intro */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
            AnimaMinds este o comunitate de învățare și dezvoltare profesională. 
            Construim programe practice pentru oameni care cred că evoluția continuă 
            este o responsabilitate, nu o opțiune.
          </p>
        </div>
      </section>

      <FeaturedBusolaSection />
      <AudienceSection />

      {/* Social proof */}
      <section className="py-14" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote
            className="text-2xl sm:text-3xl font-medium italic mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)", lineHeight: 1.5 }}
          >
            „Creșterea nu este un eveniment. Este un proces care se hrănește din relații, curaj și continuitate."
          </blockquote>
          <p className="text-sm font-medium" style={{ color: "var(--sage)" }}>
            — Echipa AnimaMinds
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

