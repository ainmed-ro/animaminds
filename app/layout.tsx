import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://animaminds.ro"),
  title: {
    default: "AnimaMinds — Locul unde oamenii și ideile cresc împreună",
    template: "%s | AnimaMinds",
  },
  description:
    "AnimaMinds este o comunitate de învățare și dezvoltare profesională. Programe de formare, mentorat și colaborare pentru profesori, formatori, lideri și organizații.",
  keywords: [
    "formare profesională",
    "dezvoltare personală",
    "comunitate de învățare",
    "mentorat",
    "workshopuri",
    "AnimaMinds",
    "CPD",
  ],
  authors: [{ name: "AnimaMinds" }],
  creator: "AnimaMinds",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://animaminds.ro",
    siteName: "AnimaMinds",
    title: "AnimaMinds — Creșterea se construiește împreună",
    description:
      "Comunitate de învățare și dezvoltare profesională pentru profesori, formatori, lideri și organizații.",
    images: [
      {
        url: "/images/hero-workshop.jpg",
        width: 1200,
        height: 630,
        alt: "AnimaMinds — Locul unde oamenii și ideile cresc împreună",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimaMinds — Creșterea se construiește împreună",
    description:
      "Comunitate de învățare și dezvoltare profesională pentru profesori, formatori, lideri și organizații.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AnimaMinds",
              url: "https://animaminds.ro",
              description: "Comunitate de învățare și dezvoltare profesională pentru profesori, formatori, lideri și organizații.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "contact@animaminds.ro",
                availableLanguage: "Romanian",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
