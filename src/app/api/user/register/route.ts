import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateSlug } from "@/lib/utils";

const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  telepon: z.string().optional(),
  role: z.enum(["DISTRIBUTOR", "TOKO", "BUYER"]),
  namaUsaha: z.string().optional(),
  provinsi: z.string().optional(),
  kabupatenKota: z.string().optional(),
  kecamatan: z.string().optional(),
  desa: z.string().optional(),
  kodePos: z.string().optional(),
  alamatLengkap: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Cek email sudah terdaftar
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          name: data.name,
          telepon: data.telepon,
          role: data.role,
          statusAkun: data.role === "BUYER" ? "AKTIF" : "MENUNGGU_VERIFIKASI",
        },
      });

      if (data.role === "DISTRIBUTOR" && data.namaUsaha) {
        await tx.distributorProfile.create({
          data: {
            userId: newUser.id,
            namaUsaha: data.namaUsaha,
            slug: generateSlug(data.namaUsaha) + "-" + newUser.id.slice(-4),
            alamatLengkap: data.alamatLengkap ?? "",
            provinsi: data.provinsi ?? "",
            kabupatenKota: data.kabupatenKota ?? "",
            kecamatan: data.kecamatan ?? "",
            desa: data.desa,
            kodePos: data.kodePos,
          },
        });
      } else if (data.role === "TOKO" && data.namaUsaha) {
        await tx.tokoProfile.create({
          data: {
            userId: newUser.id,
            namaToko: data.namaUsaha,
            slug: generateSlug(data.namaUsaha) + "-" + newUser.id.slice(-4),
            alamatLengkap: data.alamatLengkap ?? "",
            provinsi: data.provinsi ?? "",
            kabupatenKota: data.kabupatenKota ?? "",
            kecamatan: data.kecamatan ?? "",
            desa: data.desa,
            kodePos: data.kodePos,
          },
        });
      } else if (data.role === "BUYER") {
        await tx.buyerProfile.create({
          data: { userId: newUser.id, nama: data.name, telepon: data.telepon },
        });
      }

      return newUser;
    });

    return NextResponse.json(
      {
        message:
          data.role === "BUYER"
            ? "Akun berhasil dibuat. Silakan login."
            : "Pendaftaran berhasil! Akun Anda sedang diverifikasi oleh admin.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[REGISTER_ERROR]", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}