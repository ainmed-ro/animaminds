import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProgramList from "@/components/ProgramList";
import { getPublicProgrammes } from "@/app/admin/actions/cms";

export const metadata: Metadata = {
  title: "Programe",
  description:
    "Cele 5 programe fundamentale AnimaMinds: AI Fără Haos, Conversații care Contează, Calm sub Presiune, Busola Deciziilor, Avantajul Uman.",
};

export const dynamic = 'force-dynamic'

// Programme configuration mapping from CMS data to display format
const PROGRAMME_CONFIG = {
  'conversatii-care-conteaza': {
    image: "/images/celebration.jpg",
    badge: "COMUNICARE & COLABORARE",
    badgeColor: "var(--terracotta)",
    gradient: "linear-gradient(135deg, #8B3A2A 0%, #C4785A 50%, #d9956e 100%)",
    symbol: "◇",
    slogan: "Cuvintele potrivite schimbă totul."
  },
  'ai-fara-haos': {
    image: "/images/digital-training.jpg",
    badge: "AI & FUTURE SKILLS",
    badgeColor: "var(--sage)",
    gradient: "linear-gradient(135deg, #2D4A5C 0%, #3d6b8a 50%, #5d8fa8 100%)",
    symbol: "✦",
    slogan: "Folosește AI. Păstrează controlul."
  },
  'calm-sub-pressiune': {
    image: "/images/workshop-collab.jpg",
    badge: "CONFLICTE & REZILIENȚĂ PROFESIONALĂ",
    badgeColor: "var(--sage)",
    gradient: "linear-gradient(135deg, #4a7c59 0%, #7C9A7E 50%, #a8c5a0 100%)",
    symbol: "◎",
    slogan: "Pauză. Respirație. Reconstrucție."
  },
  'busola-deciziilor': {
    image: "/images/workshop-group-raise.jpg",
    badge: "LEADERSHIP & SCHIMBARE",
    badgeColor: "#A0715A",
    gradient: "linear-gradient(135deg, #7A5C3A 0%, #A0715A 50%, #C9A070 100%)",
    symbol: "✦",
    slogan: "Claritate și direcție atunci când lucrurile par neclare."
  },
  'avantajul-uman': {
    image: "/images/workshop-activity.jpg",
    badge: "COMPETENȚE UMANE PENTRU VIITOR",
    badgeColor: "var(--terracotta)",
    gradient: "linear-gradient(135deg, #5C3D6B 0%, #8a5da8 50%, #a87dc5 100%)",
    symbol: "△",
    slogan: "Mintea este cel mai puternic instrument pe care îl avem la dispoziție."
  }
};

// Helper function to get effective capacity for a format
function getCapacity(programme: any, format: string) {
  switch (format) {
    case 'ONLINE':
      return `${programme.onlineMinParticipants || 15}–${programme.onlineMaxParticipants || 30}`
    case 'ONSITE':
      return `max ${programme.onsiteMaxParticipants || 30}`
    case 'EXPERIENCE_EDITION':
      return `${programme.experienceMinParticipants || 20}–${programme.experienceMaxParticipants || 30}`
    default:
      return '—'
  }
}

// Helper function to get available formats for a programme
function getAvailableFormats(programme: any) {
  const formats = []
  if (programme.editions.some((e: any) => e.deliveryFormat === 'ONLINE')) {
    formats.push(`🌐 Online Live (${getCapacity(programme, 'ONLINE')})`)
  }
  if (programme.editions.some((e: any) => e.deliveryFormat === 'ONSITE')) {
    formats.push(`🏢 La sediul instituției / organizației (${getCapacity(programme, 'ONSITE')})`)
  }
  if (programme.editions.some((e: any) => e.deliveryFormat === 'EXPERIENCE_EDITION')) {
    formats.push(`🏔️ Experience Edition (${getCapacity(programme, 'EXPERIENCE_EDITION')})`)
  }
  return formats.length > 0 ? formats.join(' · ') : '🌐 Online Live (15–30) · 🏢 La sediul instituției / organizației (max 30) · 🏔️ Experience Edition (20–30)'
}

// Helper function to get pricing information
function getPricingInfo(programme: any) {
  // Check if programme is COMING_SOON
  if (programme.status === 'COMING_SOON') {
    return { price: "", status: "În curând" }
  }
  
  const hasOnlineEdition = programme.editions.some((e: any) => e.deliveryFormat === 'ONLINE')
  const hasExperienceEdition = programme.editions.some((e: any) => e.deliveryFormat === 'EXPERIENCE_EDITION')
  
  if (hasExperienceEdition) {
    return { price: "Prețul va fi anunțat în curând", status: "În curând" }
  }
  
  if (hasOnlineEdition) {
    const onlineEdition = programme.editions.find((e: any) => e.deliveryFormat === 'ONLINE')
    if (onlineEdition?.displayPrice) {
      return { price: `${onlineEdition.displayPrice.priceCode}`, status: "Disponibil acum" }
    }
  }
  
  return { price: "Preț de lansare: 99 lei / participant", status: "În curând" }
}

// Helper function to check if programme has active editions
function hasActiveEditions(programme: any) {
  return programme.editions.some((edition: any) => {
    const deadline = edition.registrationDeadline ? new Date(edition.registrationDeadline) : null
    const now = new Date()
    const hasSeats = edition.availableSeats === null || edition.availableSeats > 0
    const notExpired = !deadline || deadline > now
    return hasSeats && notExpired
  })
}

export default async function ProgramePage() {
  const programmes = await getPublicProgrammes()
  
  // Define approved programme order
  const approvedOrder = [
    'conversatii-care-conteaza',
    'ai-fara-haos', 
    'calm-sub-pressiune',
    'busola-deciziilor',
    'avantajul-uman'
  ]
  
  // Transform CMS data to ProgramList format and sort by approved order
  const programData = programmes
    .map(programme => {
      const config = PROGRAMME_CONFIG[programme.slug as keyof typeof PROGRAMME_CONFIG]
      const isActive = hasActiveEditions(programme) && programme.status === 'ACTIVE'
      const pricingInfo = getPricingInfo(programme)
      const isComingSoon = programme.status === 'COMING_SOON'
      
      return {
        ...config,
        title: programme.name,
        description: programme.shortDescription || programme.fullDescription || '',
        for: programme.targetAudiences.map(ta => ta.targetAudience.name).join(' · ') || 'Profesioniști · Manageri · Tineri',
        formats: isComingSoon ? '' : getAvailableFormats(programme),
        price: pricingInfo.price,
        active: isActive,
        status: pricingInfo.status,
        href: isComingSoon ? '#' : (isActive ? `/inscriere?programmeSlug=${programme.slug}` : '/contact'),
        cta: isComingSoon ? 'În curând' : (isActive ? 'Înscrie-te' : 'Contactează-ne'),
        tags: isComingSoon ? ['coming-soon'] : (isActive ? ['open'] : ['upcoming']),
        // Additional data for enhanced display
        hours: programme.totalLearningHours || undefined,
        cpdCredits: programme.cpdCredits || undefined,
        duration: programme.duration || undefined,
        slug: programme.slug // Add slug for sorting
      }
    })
    .sort((a, b) => {
      const aIndex = approvedOrder.indexOf(a.slug)
      const bIndex = approvedOrder.indexOf(b.slug)
      return aIndex - bIndex
    })
  
  return (
    <div>
      {/* Hero */}
      <section className="py-12" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">Programe</span>
            <div className="line-accent my-4" />
            <h1
              className="text-3xl sm:text-4xl font-semibold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Dezvoltăm competențele esențiale pentru profesioniști, echipe și organizații într-o lume aflată în continuă schimbare.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-5" style={{ color: "var(--charcoal-soft)" }}>
              Cele 5 programe fundamentale AnimaMinds sunt pentru profesori, echipe din companii, tineri și organizații. Experiențe de învățare care se văd în comportamentul de zi cu zi — Online Live, La sediul instituției / organizației sau în format Experience Edition, la munte sau la mare.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 bg-white">
        <ProgramList programs={programData} />
      </section>

      {/* CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--sage)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold text-white mb-5"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {programmes.some(p => hasActiveEditions(p)) ? 'Programe disponibile acum' : 'Programe în curând'}
          </h2>
          <p className="text-base sm:text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            {programmes.some(p => hasActiveEditions(p)) 
              ? 'Alege programul potrivit pentru tine și înscrie-te acum.'
              : 'Pentru programele disponibile, filtrează după interesul tău sau solicită o ofertă pentru organizație.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {programmes.some(p => hasActiveEditions(p)) && (
              <Link
                href="/inscriere"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-white transition-all hover:shadow-lg"
                style={{ color: "var(--sage)" }}
              >
                Înscrie-te acum
                <ArrowRight size={15} />
              </Link>
            )}
            <Link
              href="/colaboreaza"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium transition-all border hover:bg-white/10"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
            >
              Pentru organizații
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
