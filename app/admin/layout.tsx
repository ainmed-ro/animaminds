import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentAdminUser } from '@/lib/auth'
import { LogoutButton } from '@/app/admin/components/logout-button'

export const metadata = {
  title: 'AnimaMinds CMS',
  description: 'Admin panel for AnimaMinds platform',
}

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/programmes', label: 'Programmes' },
  { href: '/admin/editions', label: 'Editions' },
  { href: '/admin/prices', label: 'Prices' },
  { href: '/admin/taxonomies', label: 'Taxonomies' },
  { href: '/admin/faqs', label: 'FAQs' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/documents', label: 'Documents' },
  { href: '/admin/galleries', label: 'Galleries' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/forms', label: 'Forms' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/globals', label: 'Globals' },
  { href: '/admin/emails', label: 'Email Analytics' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentAdminUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">AnimaMinds CMS</h1>
          <p className="text-sm text-gray-500 mt-1">{user.name}</p>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 space-y-2">
          <LogoutButton />
          <Link
            href="/"
            className="block text-sm text-gray-500 hover:text-gray-900"
          >
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
