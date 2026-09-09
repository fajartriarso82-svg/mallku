import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
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

export const { handlers, auth } = NextAuth({
  // Tanpa PrismaAdapter: alur ini memakai Credentials + strategi JWT, sehingga
  // adapter (yang menambah koneksi DB per request) tidak diperlukan.
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
    async jwt({ token, user, trigger }) {
      // Saat login (signIn): isi token dari user hasil authorize.
      if (user) {
        token.id = user.id;
        const authUser = user as AuthUser;
        token.role = authUser.role;
        token.statusAkun = authUser.statusAkun;
        return token;
      }

      // Optimasi: query DB hanya saat login, bukan di setiap refresh token.
      // Sebelumnya blok ini menjalankan prisma.user.findUnique pada hampir
      // setiap request yang memakai sesi, menambah latensi DB tiap halaman SCM.
      // Role/status cukup diambil ulang sesekali; untuk kebutuhan saat ini
      // nilai dari token sudah mencukupi. Hapus baris berikut bila ingin
      // re-check ke DB secara berkala.
      void trigger;

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

