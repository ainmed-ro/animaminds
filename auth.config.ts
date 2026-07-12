import { Role } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith('/admin')
      const isAuthRoute = nextUrl.pathname === '/login'
      const role = auth?.user?.role as Role | undefined

      if (isAdminRoute) {
        if (!isLoggedIn) return false
        return (
          role === Role.SUPER_ADMIN ||
          role === Role.CONTENT_MANAGER ||
          role === Role.COMMERCIAL_MANAGER
        )
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl))
      }

      return true
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.role = token.role as Role
        session.user.id = token.id as string
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
