import { prisma } from '@/lib/prisma'
import { getCurrentAdminUser } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const user = await getCurrentAdminUser()
  if (!user) {
    redirect('/login')
  }

  const since = new Date()
  since.setDate(since.getDate() - 30)

  const [
    programmeCount,
    editionCount,
    priceCount,
    targetAudienceCount,
    applicationAreaCount,
    faqCount,
    testimonialCount,
    documentCount,
    galleryCount,
    pageCount,
    formCount,
    userCount,
    registrationCount,
    emailsSent,
    emailsOpened,
    emailsClicked,
    emailsBounced,
  ] = await Promise.all([
    prisma.programme.count(),
    prisma.edition.count(),
    prisma.price.count(),
    prisma.targetAudience.count(),
    prisma.applicationArea.count(),
    prisma.fAQ.count(),
    prisma.testimonial.count(),
    prisma.document.count(),
    prisma.gallery.count(),
    prisma.page.count(),
    prisma.form.count(),
    prisma.user.count(),
    prisma.registration.count(),
    prisma.email.count({ where: { createdAt: { gte: since } } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'OPENED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'CLICKED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'BOUNCED' } }),
  ])

  const cards = [
    { label: 'Programmes', count: programmeCount, href: '/admin/programmes' },
    { label: 'Editions', count: editionCount, href: '/admin/editions' },
    { label: 'Prices', count: priceCount, href: '/admin/prices' },
    { label: 'Target Audiences', count: targetAudienceCount, href: '/admin/taxonomies' },
    { label: 'Application Areas', count: applicationAreaCount, href: '/admin/taxonomies' },
    { label: 'FAQs', count: faqCount, href: '/admin/faqs' },
    { label: 'Testimonials', count: testimonialCount, href: '/admin/testimonials' },
    { label: 'Documents', count: documentCount, href: '/admin/documents' },
    { label: 'Galleries', count: galleryCount, href: '/admin/galleries' },
    { label: 'Pages', count: pageCount, href: '/admin/pages' },
    { label: 'Forms', count: formCount, href: '/admin/forms' },
    { label: 'Users', count: userCount, href: '/admin/users' },
    { label: 'Registrations', count: registrationCount, href: '/admin' },
    { label: 'Emails Sent (30d)', count: emailsSent, href: '/admin/emails' },
    { label: 'Opened (30d)', count: emailsOpened, href: '/admin/emails' },
    { label: 'Clicked (30d)', count: emailsClicked, href: '/admin/emails' },
    { label: 'Bounced (30d)', count: emailsBounced, href: '/admin/emails' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Logged in as <strong>{user.name}</strong> ({user.role})
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.count}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
