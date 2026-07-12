import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Busola Deciziilor – Experience Edition | AnimaMinds",
  description:
    "Program experiențial de 3 zile pentru claritate și direcție. Cazare inclusă, natură, reflecție și dialog. Ediția I: 28–30 august 2026.",
  openGraph: {
    title: "Busola Deciziilor – Experience Edition | AnimaMinds",
    description: "3 zile de activități experiențiale, dialog și reflecție în natură. Claritate și direcție pentru persoane și echipe — AnimaMinds.",
    url: "https://animaminds.ro/programe/busola-deciziilor/experience-edition",
    type: "website",
    locale: "ro_RO",
    siteName: "AnimaMinds",
    images: [
      {
        url: "https://animaminds.ro/programe/busola-deciziilor/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Busola Deciziilor – Experience Edition | AnimaMinds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Busola Deciziilor – Experience Edition | AnimaMinds",
    description: "3 zile de activități experiențiale, dialog și reflecție în natură. Claritate și direcție pentru persoane și echipe — AnimaMinds.",
    images: ["https://animaminds.ro/programe/busola-deciziilor/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
