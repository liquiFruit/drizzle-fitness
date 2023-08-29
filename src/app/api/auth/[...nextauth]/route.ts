import NextAuth, { type NextAuthOptions } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db, type User } from "@/db"

import GithubProvider from "next-auth/providers/github"


export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECERT!,
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }