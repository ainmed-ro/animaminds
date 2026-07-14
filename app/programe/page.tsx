import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Calendar, MapPin, Users, CheckCircle, Globe, Building2, Mountain } from "lucide-react";
import ProgramList from "@/components/ProgramList";
import ProgrameInPregatire from "@/components/ProgrameInPregatire";
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

// Helper function to check if programme has organization-only formats
function hasOrganizationFormats(programme: any) {
  return programme.editions.some((e: any) => 
    e.deliveryFormat === 'ONSITE' || 
    (e.deliveryFormat === 'ONLINE' && e.editionTitle && e.editionTitle.toLowerCase().includes('dedicat'))
  )
}

// Helper function to get pricing information
function getPricingInfo(programme: any) {
  // Check if programme is COMING_SOON
  if (programme.status === ('COMING_SOON' as any)) {
    return { price: "", status: "În curând" }
  }
  
  const hasOnlineEdition = programme.editions.some((e: any) => e.deliveryFormat === 'ONLINE')
  const hasOnsiteEdition = programme.editions.some((e: any) => e.deliveryFormat === 'ONSITE')
  const hasExperienceEdition = programme.editions.some((e: any) => e.deliveryFormat === 'EXPERIENCE_EDITION')
  
  // Show price from the first available edition
  if (hasOnlineEdition) {
    const onlineEdition = programme.editions.find((e: any) => e.deliveryFormat === 'ONLINE')
    if (onlineEdition?.displayPrice) {
      return { price: `${onlineEdition.displayPrice.priceCode}`, status: "Disponibil Online" }
    }
  }
  
  if (hasOnsiteEdition) {
    const onsiteEdition = programme.editions.find((e: any) => e.deliveryFormat === 'ONSITE')
    if (onsiteEdition?.displayPrice) {
      return { price: `${onsiteEdition.displayPrice.priceCode}`, status: "Disponibil Fizic" }
    }
  }
  
  if (hasExperienceEdition) {
    const experienceEdition = programme.editions.find((e: any) => e.deliveryFormat === 'EXPERIENCE_EDITION')
    if (experienceEdition?.displayPrice) {
      return { price: `${experienceEdition.displayPrice.priceCode}`, status: "Disponibil La Munte" }
    }
  }
  
  return { price: "Preț: 99-299 lei / participant", status: "În curând" }
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
  
  // Filter to show only approved programmes
  const approvedSlugs = [
    'conversatii-care-conteaza',
    'ai-fara-haos', 
    'calm-sub-pressiune',
    'busola-deciziilor',
    'avantajul-uman'
  ]
  
  const approvedProgrammes = programmes.filter(programme => 
    approvedSlugs.includes(programme.slug)
  )

  // Transform CMS data to ProgramList format and sort by approved order
  const programData = approvedProgrammes
    .map(programme => {
      const config = PROGRAMME_CONFIG[programme.slug as keyof typeof PROGRAMME_CONFIG]
      const isActive = hasActiveEditions(programme) && programme.status === ('ACTIVE' as any)
      const pricingInfo = getPricingInfo(programme)
      const isComingSoon = programme.status === ('COMING_SOON' as any)
      const hasOrgFormats = hasOrganizationFormats(programme)
      
      return {
        ...config,
        title: programme.name,
        description: programme.shortDescription || programme.fullDescription || '',
        for: programme.targetAudiences.map(ta => ta.targetAudience.name).join(' · ') || 'Profesioniști · Manageri · Tineri',
        formats: isComingSoon ? '' : getAvailableFormats(programme),
        price: pricingInfo.price,
        active: isActive,
        status: pricingInfo.status,
        href: isComingSoon ? '#' : (hasOrgFormats ? '/colaboreaza#solicita-oferta' : (isActive ? `/inscriere?programmeSlug=${programme.slug}` : '/contact')),
        cta: isComingSoon ? 'În curând' : (hasOrgFormats ? 'Cere ofertă' : (isActive ? 'Înscrie-te' : 'Contactează-ne')),
        tags: isComingSoon ? ['coming-soon'] : (hasOrgFormats ? ['organization'] : (isActive ? ['open'] : ['upcoming'])),
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

      {/* ===== HERO: Experience Edition – scos în evidență ===== */}
      <section className="relative py-14 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2e1c 0%, #2d4a2f 50%, #3a5c3c 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 border border-amber-400/40 rounded-full mb-4">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-bold text-sm uppercase tracking-wide">Program activ · Înscrierea deschisă</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
              Conversații care Contează
            </h1>
            <p className="text-lg text-white/80 mb-2">Comunicare profesională · 8 credite CPD · 7,5 ore</p>
            <p className="text-sm text-white/60">Singurul program activ AnimaMinds · Disponibil în 3 formate</p>
          </div>

          {/* 3 formate */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Experience Edition – primul, cel mai vizibil */}
            <div className="md:col-span-1 relative bg-amber-500 rounded-2xl p-6 border-2 border-amber-300 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-amber-700 text-xs font-bold px-3 py-1 rounded-full shadow">⭐ RECOMANDAT</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-2">
                <Mountain className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">Experience Edition™</h3>
              </div>
              <p className="text-white/90 text-sm mb-4">Formare rezidențială · 3 zile la munte · Hotel Afrodita****</p>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">1.200 lei / cameră dublă</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/80" />
                  <span className="text-white/90 text-sm">1.400 lei / cameră single</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white/80" />
                  <span className="text-white/90 text-sm">23–25 octombrie 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/80" />
                  <a href="https://www.google.com/maps/dir//Hotel+Afrodita,+Bulevardul+Nicolae+Iorga+14,+106400+V%C4%83lenii+de+Munte/@44.3711488,26.1292032,14z" target="_blank" rel="noopener noreferrer" className="text-white/90 text-sm underline hover:text-white">Hotel Afrodita**** · Vălenii de Munte</a>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-white/80" />
                  <span className="text-white/90 text-sm">Max 30 locuri · grupă limitată</span>
                </div>
              </div>
              <div className="space-y-2">
                <Link href="/programe/experience-edition/conversatii-care-conteaza" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-amber-700 rounded-xl font-bold hover:bg-amber-50 transition-all text-sm">
                  Vezi detalii complete
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/programe/experience-edition/conversatii-care-conteaza#rezerva-loc" className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-700 text-white rounded-xl font-bold hover:bg-amber-800 transition-all text-sm">
                  Rezervă un loc
                </Link>
              </div>
            </div>

            {/* Online Live */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">Online Live</h3>
              </div>
              <p className="text-white/80 text-sm mb-4">Participi de oriunde · 3 întâlniri live + Google Classroom</p>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-white font-semibold text-sm">199 lei / participant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">7,5 ore · 8 credite CPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">Certificat de participare</span>
                </div>
              </div>
              <Link href="/programe/online-live/conversatii-care-conteaza" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm">
                Înscrie-mă online
              </Link>
            </div>

            {/* Pentru organizații */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">Pentru organizații</h3>
              </div>
              <p className="text-white/80 text-sm mb-4">Școli · Instituții · ONG-uri · Companii</p>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-white font-semibold text-sm">3.500 lei / grup · online</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">5.000 lei / grup · la sediu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">7,5 ore · 8 CPD / participant</span>
                </div>
              </div>
              <Link href="/colaboreaza#solicita-oferta" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm">
                Solicită ofertă
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Experience Edition – Hotel highlight ===== */}
      <section className="py-12 px-4 bg-amber-50 border-b border-amber-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
              Experience Edition™ · 23–25 octombrie 2026
            </h2>
            <p className="text-gray-600">Hotel Afrodita**** · Vălenii de Munte · Grupă limitată la 30 de locuri</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
            {/* Hotel info */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-gray-900">Locație premium</h3>
              </div>
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Hotel Afrodita****</p>
                    <p className="text-sm text-gray-600">Bulevardul Nicolae Iorga 14, Vălenii de Munte</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Sală de conferințe dedicată</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">2 nopți cazare incluse în tarif</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mese incluse: cină vineri, mic dejun + prânz + cină sâmbătă, mic dejun duminică</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Acces Rooftop8 cu vedere panoramică</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Coffee break premium</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://hotelafrodita.ro/valeni/contact/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-amber-700 font-medium hover:text-amber-800 underline underline-offset-2">
                  Site hotel
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a href="https://www.google.com/maps/dir//Hotel+Afrodita,+Bulevardul+Nicolae+Iorga+14,+106400+V%C4%83lenii+de+Munte/@44.3711488,26.1292032,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40b3affed454b427:0xaa58f43d712816dd!2m2!1d26.0356329!2d45.1781049?entry=ttu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700 underline underline-offset-2">
                  Google Maps
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Ce este inclus */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Ce este inclus în tarif</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Participarea la programul de formare profesională",
                  "8 credite CPD + certificat de participare",
                  "Fișa competențelor dobândite",
                  "2 nopți cazare la Hotel Afrodita****",
                  "Toate mesele incluse (vineri–duminică)",
                  "Coffee break premium",
                  "Acces Rooftop8 cu vedere panoramică",
                  "Resurse digitale și materiale de curs",
                  "Networking profesional",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-gray-600 mb-1">Tarif ediție de lansare</p>
                <p className="font-bold text-gray-900">1.200 lei · cameră dublă</p>
                <p className="text-sm text-gray-700">1.400 lei · cameră single</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/programe/experience-edition/conversatii-care-conteaza#rezerva-loc"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg text-lg"
            >
              Rezervă un loc la Experience Edition
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="conversatii-care-conteaza" className="py-12 bg-white scroll-mt-20">
        <ProgramList programs={programData} />
      </section>

      {/* Programe în pregătire */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Programe în pregătire
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Detaliile vor fi comunicate la lansare
          </p>
          <ProgrameInPregatire />
        </div>
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
              href="/colaboreaza#solicita-oferta"
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
