import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const origin = req.headers.get("origin");
        const res = await fetch(`${origin}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  trustHost: true,
});
