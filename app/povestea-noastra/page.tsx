import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Povestea noastră",
  description:
    "Descoperă cine suntem, de unde venim și ce ne animă la AnimaMinds — o comunitate construită cu suflet pentru oamenii care cresc.",
};

export default function PovEsteaNoastra() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/workshop-indoor.jpg" alt="AnimaMinds workshop" fill className="object-cover object-center" priority quality={85} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(245,240,232,0.92) 0%, rgba(245,240,232,0.75) 50%, rgba(124,154,126,0.10) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="max-w-3xl">
            <span className="section-label">Povestea noastră</span>
            <div className="line-accent my-4" />
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              O comunitate construită cu{" "}
              <span className="italic" style={{ color: "var(--terracotta)" }}>
                suflet
              </span>
            </h1>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--charcoal-soft)" }}
            >
              AnimaMinds s-a născut din convingerea că cei mai buni profesori,
              formatori și lideri sunt, înainte de toate, oameni curioși — oameni
              care nu încetează să învețe.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-semibold mb-4"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                De unde am pornit
              </h2>
              <div className="space-y-4" style={{ color: "var(--charcoal-soft)" }}>
                <p className="text-base leading-relaxed">
                  AnimaMinds a luat naștere dintr-o nevoie reală: aceea de a
                  crea un spațiu în care profesioniștii din educație și formare
                  să se poată întâlni, să schimbe perspective și să crească unii
                  din experiența celorlalți.
                </p>
                <p className="text-base leading-relaxed">
                  Am observat că există o mulțime de cursuri, platforme și
                  „academii" — dar puține comunități autentice. Locuri unde
                  oamenii nu sunt simple cifre în statistici, ci participanți
                  activi la un proces de creștere colectivă.
                </p>
                <p className="text-base leading-relaxed">
                  Așa s-a născut AnimaMinds: cu credința că{" "}
                  <strong style={{ color: "var(--sage)" }}>
                    oamenii se ridică unii pe ceilalți
                  </strong>
                  , că împreună mergem mai departe și mai sus, și că{" "}
                  <strong style={{ color: "var(--sage)" }}>
                    cea mai bună versiune a fiecăruia apare în prezența celor potriviți.
                  </strong>
                </p>
              </div>
            </div>

            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/ws-sala-prezentare.jpg"
                  alt="Comunitate AnimaMinds"
                  fill
                  className="object-cover"
                  quality={80}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-12"
        style={{ backgroundColor: "var(--gray-warm)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Valorile noastre</span>
            <div className="line-accent mx-auto my-4" />
            <h2
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Ce ne ghidează în tot ceea ce facem
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🌱",
                title: "Creștere continuă",
                desc: "Credem că evoluția este un proces permanent, nu un punct de destinație.",
              },
              {
                emoji: "🤝",
                title: "Autenticitate",
                desc: "Promovăm conexiunile reale în fața relațiilor de suprafață.",
              },
              {
                emoji: "💡",
                title: "Practică înainte de teorie",
                desc: "Tot ce livrăm are aplicabilitate directă în activitatea de zi cu zi.",
              },
              {
                emoji: "❤️",
                title: "Empatie",
                desc: "Înțelegem că fiecare persoană vine cu propriul context și propriile nevoi.",
              },
              {
                emoji: "🎯",
                title: "Impact măsurabil",
                desc: "Nu ne mulțumim cu participanți mulțumiți — vrem transformare reală.",
              },
              {
                emoji: "🌍",
                title: "Comunitate deschisă",
                desc: "Suntem accesibili, incluzivi și respectăm diversitatea de perspective.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="p-5 rounded-2xl bg-white card-hover"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <span className="text-2xl mb-3 block">{v.emoji}</span>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="section-label">Din teren</span>
            <div className="line-accent mx-auto my-4" />
            <h2 className="text-2xl sm:text-3xl font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Oameni reali. Momente reale.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: "/images/workshop-audience.jpg", alt: "Sală de formare" },
              { src: "/images/workshop-group-raise.jpg", alt: "Participanți activi" },
              { src: "/images/ws-sala-prezentare.jpg", alt: "Prezentare workshop" },
              { src: "/images/carti-afirmatii-color.jpg", alt: "Cărți afirmații" },
              { src: "/images/postit-echipa.jpg", alt: "Activitate cu plicuri" },
            ].map((photo, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  quality={80}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In action band */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image src="/images/group-photo.jpg" alt="Echipa AnimaMinds cu participanții" fill className="object-cover" quality={85} />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
                <p className="text-white text-sm font-medium">La final, totul se vede pe fețe.</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image src="/images/ws-formator-ecran.jpg" alt="Formare în acțiune" fill className="object-cover" quality={85} />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
                <p className="text-white text-sm font-medium">Practică. Nu teorie.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Founder */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Echipa</span>
            <div className="line-accent mx-auto my-4" />
            <h2
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Oamenii din spatele AnimaMinds
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8">
            {/* Alina */}
            <div
              className="max-w-sm text-center p-6 rounded-2xl"
              style={{ backgroundColor: "var(--cream)" }}
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                <Image
                  src="/images/alina-niculae.jpg"
                  alt="Alina Niculae-Ionela"
                  fill
                  className="object-cover object-top"
                  quality={85}
                />
              </div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Alina-Ionela Niculae
              </h3>
              <p className="text-sm mb-1" style={{ color: "var(--sage)" }}>
                Fondator AnimaMinds
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--charcoal-soft)" }}>
                Profesor de Limba Română · Formator · Mentor
              </p>
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: "var(--charcoal-soft)", fontFamily: "Playfair Display, serif" }}
              >
                „Predau de mulți ani și am învățat mai mult de la oamenii din
                față decât din orice manual. Am creat AnimaMinds pentru că
                știu că cea mai bună versiune a omului nu apare în izolare — apare
                în prezența celor care îl văd și îl provoacă să crească."
              </p>
            </div>

            {/* Mariana */}
            <div
              className="max-w-sm text-center p-6 rounded-2xl"
              style={{ backgroundColor: "var(--cream)" }}
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                <Image
                  src="/images/mariana-spia.jpg"
                  alt="Mariana Mihaela Spina"
                  fill
                  className="object-cover object-center"
                  quality={85}
                />
              </div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
              >
                Mihaela Spina
              </h3>
              <p className="text-sm mb-1" style={{ color: "var(--sage)" }}>
                Formator colaborator
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--charcoal-soft)" }}>
                Profesor de Fizică · Formator · Mentor
              </p>
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: "var(--charcoal-soft)", fontFamily: "Playfair Display, serif" }}
              >
                „După 20 de ani în educație, am învățat că adevărata transformare nu vine din programă sau din sală,
                ci din momentul în care cineva se simte în siguranță să fie vulnerabil. Asta îmi doresc să ofer în fiecare formare."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12"
        style={{ backgroundColor: "var(--sage)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-white mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Alături de noi în poveste?
          </h2>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
            AnimaMinds crește cu fiecare om care alege să fie parte din ea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programe"
              className="px-8 py-3.5 rounded-lg font-medium text-sage bg-white transition-all hover:shadow-lg"
              style={{ color: "var(--sage)" }}
            >
              Descoperă programele
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg font-medium text-white border-2 border-white/40 transition-all hover:bg-white/10"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
