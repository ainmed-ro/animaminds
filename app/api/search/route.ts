import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const staticPages = [
  { title: 'Acasă', href: '/', description: 'Pagina principală AnimaMinds' },
  { title: 'Povestea noastră', href: '/povestea-noastra', description: 'Cine suntem și ce ne animă' },
  { title: 'Programe', href: '/programe', description: 'Cele 5 programe fundamentale' },
  { title: 'Busola Deciziilor', href: '/programe/busola-deciziilor', description: 'Claritate și direcție' },
  { title: 'AI Fără Haos', href: '/programe/ai-fara-haos', description: 'Folosește AI. Păstrează controlul.' },
  { title: 'Conversații care Contează', href: '/programe', description: 'Comunicare și colaborare' },
  { title: 'Calm sub Presiune', href: '/programe', description: 'Conflict și reziliență' },
  { title: 'Avantajul Uman', href: '/programe', description: 'Competențe umane pentru viitor' },
  { title: 'Calendar Ediții', href: '/calendar', description: 'Vezi edițiile deschise' },
  { title: 'Înscrie-te', href: '/inscriere', description: 'Formular de înscriere' },
  { title: 'Contact', href: '/contact', description: 'Trimite un mesaj' },
  { title: 'Pentru organizații', href: '/colaboreaza#solicita-oferta', description: 'Colaborare personalizată' },
  { title: 'Busola Deciziilor — Experience Edition', href: '/programe/busola-deciziilor/experience-edition', description: '3 zile în natură' },
  { title: 'Politică de confidențialitate', href: '/politica-de-confidentialitate', description: 'Legal' },
  { title: 'Termeni și condiții', href: '/termeni-si-conditii', description: 'Legal' },
  { title: 'Politica cookies', href: '/cookies', description: 'Legal' },
]

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim().toLowerCase() || ''

  if (!q) {
    return NextResponse.json({ results: staticPages.slice(0, 6) })
  }

  const staticResults = staticPages.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  )

  const programmes = await prisma.programme.findMany({
    where: {
      status: { in: ['ACTIVE', 'PILOT', 'UNDER_REVIEW'] },
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { subtitle: { contains: q, mode: 'insensitive' } },
        { shortDescription: { contains: q, mode: 'insensitive' } },
      ],
    },
    select: { slug: true, name: true, subtitle: true },
  })

  const programmeResults = programmes.map((p) => ({
    title: p.name,
    href: `/programe/${p.slug}`,
    description: p.subtitle || 'Program AnimaMinds',
  }))

  const editions = await prisma.edition.findMany({
    where: {
      status: { in: ['OPEN', 'DRAFT'] },
      OR: [
        { editionTitle: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
        { notes: { contains: q, mode: 'insensitive' } },
      ],
    },
    include: { programme: { select: { slug: true, name: true } } },
    take: 10,
  })

  const editionResults = editions.map((e) => ({
    title: `${e.programme.name} — ${e.editionTitle}`,
    href: `/inscriere?editionId=${e.id}`,
    description: `${e.deliveryFormat}${e.city ? ` — ${e.city}` : ''} — Înscrie-te`,
  }))

  const results = [
    ...staticResults,
    ...programmeResults,
    ...editionResults,
  ].slice(0, 20)

  return NextResponse.json({ results })
}
