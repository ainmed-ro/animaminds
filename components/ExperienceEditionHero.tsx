"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Star, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

const TARGET = new Date("2026-10-23T14:00:00");

const PARTICLES = [
  { size: 6, x: 8, y: 15, delay: 0, duration: 6 },
  { size: 4, x: 20, y: 70, delay: 1.2, duration: 8 },
  { size: 8, x: 35, y: 30, delay: 0.5, duration: 7 },
  { size: 3, x: 55, y: 80, delay: 2, duration: 9 },
  { size: 5, x: 70, y: 20, delay: 0.8, duration: 6.5 },
  { size: 7, x: 82, y: 60, delay: 1.5, duration: 8 },
  { size: 4, x: 92, y: 40, delay: 0.3, duration: 7.5 },
  { size: 3, x: 15, y: 50, delay: 2.5, duration: 9 },
  { size: 5, x: 48, y: 10, delay: 1, duration: 6 },
  { size: 6, x: 63, y: 90, delay: 1.8, duration: 8.5 },
  { size: 3, x: 90, y: 85, delay: 0.6, duration: 7 },
  { size: 4, x: 5, y: 85, delay: 2.2, duration: 9.5 },
];

export default function ExperienceEditionHero() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 py-10 px-4">
      {/* Particule animate */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400/30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
        {/* Orbe mari de fundal */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-200/20"
          style={{ animation: "floatOrb 10s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-teal-200/20"
          style={{ animation: "floatOrb 13s ease-in-out 2s infinite alternate-reverse" }}
        />
      </div>

      <style>{`
        @keyframes floatParticle {
          from { transform: translateY(0px) scale(1); opacity: 0.4; }
          to   { transform: translateY(-18px) scale(1.3); opacity: 0.9; }
        }
        @keyframes floatOrb {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(20px, 15px) scale(1.08); }
        }
        @keyframes pulse3d {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.3); }
          50%       { box-shadow: 0 0 0 16px rgba(16,185,129,0); }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
        <div className="mb-6">
          <span
            className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-bold"
            style={{ animation: "pulse3d 2.5s ease-in-out infinite" }}
          >
            <Star className="w-4 h-4 mr-2" />
            ✨ Ediție de lansare Experience Edition
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
        >
          Conversații care Contează
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Experience Edition — Program rezidențial de comunicare și colaborare
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>23–25 octombrie 2026</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <a
              href="https://www.google.com/maps/dir//Hotel+Afrodita,+Bulevardul+Nicolae+Iorga+14,+106400+V%C4%83lenii+de+Munte/@44.3711488,26.1292032,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40b3affed454b427:0xaa58f43d712816dd!2m2!1d26.0356329!2d45.1781049?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 underline underline-offset-2 transition-colors"
            >
              Hotel Afrodita**** – Vălenii de Munte
            </a>
          </div>
        </div>

        {/* Countdown */}
        {mounted && (
          <div className="inline-flex flex-wrap justify-center lg:justify-start gap-3 mb-10 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-emerald-100">
            {[
              { value: days, label: "zile" },
              { value: hours, label: "ore" },
              { value: minutes, label: "minute" },
              { value: seconds, label: "secunde" },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex flex-col items-center min-w-[56px]">
                  <span
                    className="text-3xl md:text-4xl font-bold tabular-nums"
                    style={{ color: "var(--charcoal)", fontFamily: "Playfair Display, serif" }}
                  >
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{label}</span>
                </div>
                {i < 3 && <span className="text-2xl text-emerald-400 font-bold mb-3">:</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="#rezerva-loc"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Rezervă un loc acum
            <Calendar className="w-5 h-5" />
          </Link>
          <Link
            href="/programe/experience-edition"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald-600 text-emerald-700 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-colors"
          >
            Vezi toate edițiile
            <BookOpen className="w-5 h-5" />
          </Link>
        </div>
        </div>{/* end left col */}

        {/* Right col – hotel image */}
        <div className="hidden lg:block">
          <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hotel/hotel-exterior.png"
              alt="Hotel Afrodita – locația Experience Edition"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 0vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                Hotel Afrodita**** · Vălenii de Munte
              </p>
            </div>
          </div>
        </div>
        </div>{/* end grid */}
      </div>
    </section>
  );
}
