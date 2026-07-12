import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Fără Haos – Program pentru Profesioniști | AnimaMinds",
  description:
    "Folosește AI. Păstrează controlul. Program practic pentru profesori, manageri, antreprenori și specialiști. 8 ore, fără cunoștințe tehnice.",
  openGraph: {
    title: "AI Fără Haos – Program pentru Profesioniști",
    description: "Folosește AI. Păstrează controlul. Program practic pentru profesori, manageri, antreprenori și specialiști.",
    url: "https://animaminds.ro/programe/ai-fara-haos",
    type: "website",
    locale: "ro_RO",
    siteName: "AnimaMinds",
    images: [
      {
        url: "https://animaminds.ro/programe/ai-fara-haos/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Fără Haos – Program pentru Profesioniști",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Fără Haos – Program pentru Profesioniști | AnimaMinds",
    description: "Folosește AI. Păstrează controlul. Program practic pentru profesori, manageri, antreprenori și specialiști.",
    images: ["https://animaminds.ro/programe/ai-fara-haos/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
