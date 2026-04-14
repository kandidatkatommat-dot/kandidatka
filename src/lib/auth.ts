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
        const admins = [
          { password: process.env.ADMIN_PASSWORD, email: process.env.ADMIN_EMAIL, name: 'Tomáš' },
          { password: process.env.ADMIN_2_PASSWORD, email: process.env.ADMIN_2_EMAIL, name: 'Martin' },
        ]
        const match = admins.find(
          (a) => a.password && credentials?.password === a.password
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
