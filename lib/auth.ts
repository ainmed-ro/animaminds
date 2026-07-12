import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { authConfig } from '@/auth.config'

export type CMSRole = Role

export const ROLES = {
  SUPER_ADMIN: Role.SUPER_ADMIN,
  CONTENT_MANAGER: Role.CONTENT_MANAGER,
  COMMERCIAL_MANAGER: Role.COMMERCIAL_MANAGER,
} as const

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: Role
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
})

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  const session = await auth()
  if (!session?.user?.email || !session.user.role) return null
  return {
    id: session.user.id as string,
    email: session.user.email,
    name: session.user.name ?? null,
    role: session.user.role as Role,
  }
}

export async function requireAdminUser(): Promise<AdminUser> {
  const user = await getCurrentAdminUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export function canAccess(user: AdminUser, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(user.role) || user.role === Role.SUPER_ADMIN
}

export function canEditPrices(user: AdminUser): boolean {
  return user.role === Role.SUPER_ADMIN || user.role === Role.COMMERCIAL_MANAGER
}

export function canViewGovernance(user: AdminUser): boolean {
  return user.role === Role.SUPER_ADMIN
}

export function canManageContent(user: AdminUser): boolean {
  return (
    user.role === Role.SUPER_ADMIN ||
    user.role === Role.CONTENT_MANAGER ||
    user.role === Role.COMMERCIAL_MANAGER
  )
}

export function isAdminRole(role: Role): boolean {
  return (
    role === Role.SUPER_ADMIN ||
    role === Role.CONTENT_MANAGER ||
    role === Role.COMMERCIAL_MANAGER
  )
}
