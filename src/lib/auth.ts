import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

function verifyPassword(plain: string, stored: string): boolean {
  // If the stored value looks like a bcrypt hash, use bcrypt.compareSync
  if (stored.startsWith('$2')) {
    return bcrypt.compareSync(plain, stored)
  }
  // Plain-text fallback (warn once during migration period)
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[auth] Plain-text password in use — please migrate ADMIN_PASSWORD to a bcrypt hash')
  }
  return plain === stored
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 }, // 8 hours
  pages: { signIn: '/admin/login' },
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        password: { label: 'Heslo', type: 'password' },
      },
      async authorize(credentials) {
        const admins = [
          { password: process.env.ADMIN_PASSWORD, email: process.env.ADMIN_EMAIL, name: 'Tomáš' },
          { password: process.env.ADMIN_2_PASSWORD, email: process.env.ADMIN_2_EMAIL, name: 'Martin' },
        ]
        const match = admins.find(
          (a) => a.password && credentials?.password && verifyPassword(credentials.password, a.password)
        )
        if (!match) return null
        return { id: match.email ?? 'admin', name: match.name, email: match.email ?? 'admin' }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) { return token },
    async session({ session }) { return session },
  },
}
