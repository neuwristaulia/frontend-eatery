import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const connectionString = process.env.DATABASE_URL || "file:./dev.db";
const adapter = new PrismaLibSql({ url: connectionString });

const prisma = new PrismaClient({ adapter });

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Fetch fresh user from DB to get points and role
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        
        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id,
            points: dbUser.points,
            role: dbUser.role,
          } as any;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
