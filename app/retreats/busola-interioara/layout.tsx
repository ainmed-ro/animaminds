import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUSOLA INTERIOARĂ – Program Experiențial de Dezvoltare | AnimaMinds",
  description:
    "Program experiențial de dezvoltare umană și profesională. 3 zile de activități, dialog și reflecție la Zărnești – Piatra Craiului. Ediția I: 28–30 august 2026. Maxim 25 participanți.",
  openGraph: {
    title: "BUSOLA INTERIOARĂ – Program Experiențial de Dezvoltare Umană și Profesională",
    description: "Claritate și direcție atunci când lucrurile par neclare. 3 zile de activități experiențiale, dialog și reflecție — AnimaMinds.",
    url: "https://animaminds.ro/retreats/busola-interioara",
    type: "website",
    locale: "ro_RO",
    siteName: "AnimaMinds",
    images: [
      {
        url: "https://animaminds.ro/retreats/busola-interioara/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BUSOLA INTERIOARĂ – Program Experiențial de Dezvoltare Umană și Profesională",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUSOLA INTERIOARĂ – Program Experiențial de Dezvoltare | AnimaMinds",
    description: "Claritate și direcție atunci când lucrurile par neclare. 3 zile de activități experiențiale, dialog și reflecție — AnimaMinds.",
    images: ["https://animaminds.ro/retreats/busola-interioara/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
