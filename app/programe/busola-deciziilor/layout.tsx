import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Busola Deciziilor – Program de Dezvoltare | AnimaMinds",
  description:
    "Claritate și direcție atunci când lucrurile par neclare. Program pentru persoane, echipe și organizații, disponibil în 4 formate de livrare.",
  openGraph: {
    title: "Busola Deciziilor – Program de Dezvoltare Umană și Profesională",
    description: "Claritate și direcție atunci când lucrurile par neclare. Online, în locații dedicate, la sediul organizației sau Experience Edition — AnimaMinds.",
    url: "https://animaminds.ro/programe/busola-deciziilor",
    type: "website",
    locale: "ro_RO",
    siteName: "AnimaMinds",
    images: [
      {
        url: "https://animaminds.ro/programe/busola-deciziilor/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Busola Deciziilor – Program de Dezvoltare Umană și Profesională",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Busola Deciziilor – Program de Dezvoltare | AnimaMinds",
    description: "Claritate și direcție atunci când lucrurile par neclare. Online, în locații dedicate, la sediul organizației sau Experience Edition — AnimaMinds.",
    images: ["https://animaminds.ro/programe/busola-deciziilor/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
