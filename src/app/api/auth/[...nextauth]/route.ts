import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { usersTable } from "@/drizzle/schema";
import { compare } from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password)
          return Promise.reject("error: credentials not provided");

        const user = await db.query.usersTable.findFirst({
          where: eq(usersTable.email, credentials?.password),
        });

        if (!user) return Promise.reject("error: specified user not exists");

        const isPasswordValid = await compare(password, user.password);

        if (isPasswordValid)
          return Promise.reject("error: specified user not exists");

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
