"use client";

import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";

const programeViitoare = [
  { slug: "ai-fara-haos", name: "AI Fără Haos", icon: "🤖" },
  { slug: "busola-deciziilor", name: "Busola Deciziilor", icon: "🧭" },
  { slug: "calm-sub-presiune", name: "Calm sub Presiune", icon: "🧘" },
  { slug: "avantajul-uman", name: "Avantajul Uman", icon: "🌟" },
];

export default function ProgrameInPregatire() {
  const [activeProgramme, setActiveProgramme] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {programeViitoare.map((p) => (
          <div key={p.slug} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl mb-3">{p.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-4">În pregătire</p>
            <button
              onClick={() => setActiveProgramme(p.name)}
              className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              Notifică-mă la lansare
            </button>
          </div>
        ))}
      </div>

      {activeProgramme && (
        <WaitlistModal
          programme={activeProgramme}
          onClose={() => setActiveProgramme(null)}
        />
      )}
    </>
  );
}
