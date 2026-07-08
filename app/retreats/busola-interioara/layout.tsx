import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUSOLA INTERIOARĂ – Program Experiențial de Dezvoltare | AnimaMinds",
  description:
    "Program experiențial de dezvoltare umană și profesională. 3 zile de activități, dialog și reflecție la Zărnești – Piatra Craiului. Ediția I: 28–30 august 2026. Maxim 25 participanți.",
  openGraph: {
    title: "BUSOLA INTERIOARĂ – Program Experiențial de Dezvoltare Umană și Profesională",
    description: "Claritate și direcție atunci când lucrurile par neclare. 3 zile de activități experiențiale, dialog și reflecție — AnimaMinds.",
    url: "https://animaminds.ro/retreats/busola-interioara",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
