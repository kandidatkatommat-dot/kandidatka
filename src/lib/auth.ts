import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
        const adminPassword = process.env.ADMIN_PASSWORD
        if (!adminPassword) return null
        if (credentials?.password === adminPassword) {
          return { id: 'admin', name: 'Admin', email: process.env.ADMIN_EMAIL ?? 'admin' }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) { return token },
    async session({ session }) { return session },
  },
}
