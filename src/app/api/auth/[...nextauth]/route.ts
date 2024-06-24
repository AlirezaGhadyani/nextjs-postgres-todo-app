import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
  authenticators,
} from "@/drizzle/schema";

import type { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    newUser: "/signup",
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
