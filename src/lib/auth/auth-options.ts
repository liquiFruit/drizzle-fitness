import { DefaultSession, type NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { db } from "@/lib/db"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  callbacks: {
    session: async ({ session, user, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      }
    }),
  }
}