'use client'

import { signOut } from 'next-auth/react'

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="w-full text-left text-sm text-red-600 hover:text-red-900"
    >
      Sign out
    </button>
  )
}
