import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUSOLA INTERIOARĂ – Weekend Retreat | AnimaMinds",
  description:
    "Claritate și direcție la Zărnești – Piatra Craiului. Ediția I: 28–31 august 2026. Ediția II: 4–6 septembrie 2026. Maxim 25 participanți.",
  openGraph: {
    title: "BUSOLA INTERIOARĂ – Weekend Retreat",
    description: "Claritate și direcție atunci când lucrurile par neclare.",
    url: "https://animaminds.ro/retreats/busola-interioara",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
