import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

type AuthUser = {
  id: string;
  role: string;
  statusAkun: string;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/scm/login",
    error: "/scm/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            passwordHash: true,
            role: true,
            statusAkun: true,
            avatar: true,
          },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        if (user.statusAkun === "DITOLAK" || user.statusAkun === "NONAKTIF") {
          throw new Error("ACCOUNT_INACTIVE");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          statusAkun: user.statusAkun,
          image: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const authUser = user as AuthUser;
        token.role = authUser.role;
        token.statusAkun = authUser.statusAkun;
      }
      if (token.id) {
        const currentUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, statusAkun: true },
        });
        if (currentUser) {
          token.role = currentUser.role;
          token.statusAkun = currentUser.statusAkun;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        const sessionUser = session.user as typeof session.user & { role?: string; statusAkun?: string };
        sessionUser.role = token.role as string;
        sessionUser.statusAkun = token.statusAkun as string;
      }
      return session;
    },
  },
});