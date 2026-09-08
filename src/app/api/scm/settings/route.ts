import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const addressSchema = z.object({
  nama: z.string().trim().min(1),
  alamatLengkap: z.string().trim().min(1),
  provinsi: z.string().trim().min(1),
  kabupatenKota: z.string().trim().min(1),
  kecamatan: z.string().trim().min(1),
  desa: z.string().trim().optional(),
  kodePos: z.string().trim().optional(),
});

const profileSchema = z.object({
  namaUsaha: z.string().trim().min(2),
  name: z.string().trim().min(2),
  telepon: z.string().trim().min(8),
  alamat: addressSchema,
  gudang: z.array(addressSchema).max(3),
  noNib: z.string().trim().optional(),
  noNpwp: z.string().trim().optional(),
  dokumenNibUrl: z.string().trim().optional(),
  dokumenNpwpUrl: z.string().trim().optional(),
  rekening: z.object({
    bankNama: z.string().trim().min(1),
    nomorRekening: z.string().trim().min(5),
    namaPemilik: z.string().trim().min(2),
  }).optional(),
});

export async function GET() {
  const session = await auth();
  const user = session?.user as { id?: string; role?: string } | undefined;
  if (!user?.id || !["TOKO", "DISTRIBUTOR"].includes(user.role ?? "")) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  const profile = user.role === "TOKO"
    ? await prisma.tokoProfile.findUnique({ where: { userId: user.id }, include: { gudang: true, rekening: true, user: true } })
    : await prisma.distributorProfile.findUnique({ where: { userId: user.id }, include: { gudang: true, rekening: true, user: true } });
  const banks = await prisma.bankMaster.findMany({ where: { aktif: true }, orderBy: { nama: "asc" } });
  return NextResponse.json({ profile, banks, role: user.role });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  const user = session?.user as { id?: string; role?: string } | undefined;
  if (!user?.id || !["TOKO", "DISTRIBUTOR"].includes(user.role ?? "")) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  try {
    const data = profileSchema.parse(await request.json());
    const bank = data.rekening ? await prisma.bankMaster.findFirst({ where: { nama: data.rekening.bankNama, aktif: true } }) : null;
    if (data.rekening && !bank) return NextResponse.json({ error: "Bank tidak tersedia di Master SCM" }, { status: 400 });

    await prisma.$transaction(async (tx) => {
      await tx.user.update({ where: { id: user.id }, data: { name: data.name, telepon: data.telepon, statusAkun: "MENUNGGU_VERIFIKASI" } });
      if (user.role === "TOKO") {
        const profile = await tx.tokoProfile.findUniqueOrThrow({ where: { userId: user.id } });
        await tx.tokoProfile.update({ where: { id: profile.id }, data: { namaToko: data.namaUsaha, alamatLengkap: data.alamat.alamatLengkap, provinsi: data.alamat.provinsi, kabupatenKota: data.alamat.kabupatenKota, kecamatan: data.alamat.kecamatan, desa: data.alamat.desa, kodePos: data.alamat.kodePos, noNib: data.noNib, noNpwp: data.noNpwp, dokumenNibUrl: data.dokumenNibUrl, dokumenNpwpUrl: data.dokumenNpwpUrl } });
        await tx.gudang.deleteMany({ where: { tokoId: profile.id } });
        await tx.gudang.createMany({ data: data.gudang.map((item) => ({ ...item, tokoId: profile.id })) });
        if (data.rekening) { await tx.rekeningBank.updateMany({ where: { tokoId: profile.id }, data: { utama: false } }); await tx.rekeningBank.create({ data: { ...data.rekening, tokoId: profile.id, utama: true } }); }
      } else {
        const profile = await tx.distributorProfile.findUniqueOrThrow({ where: { userId: user.id } });
        await tx.distributorProfile.update({ where: { id: profile.id }, data: { namaUsaha: data.namaUsaha, alamatLengkap: data.alamat.alamatLengkap, provinsi: data.alamat.provinsi, kabupatenKota: data.alamat.kabupatenKota, kecamatan: data.alamat.kecamatan, desa: data.alamat.desa, kodePos: data.alamat.kodePos, noNib: data.noNib, noNpwp: data.noNpwp, dokumenNibUrl: data.dokumenNibUrl, dokumenNpwpUrl: data.dokumenNpwpUrl } });
        await tx.gudang.deleteMany({ where: { distributorId: profile.id } });
        await tx.gudang.createMany({ data: data.gudang.map((item) => ({ ...item, distributorId: profile.id })) });
        if (data.rekening) { await tx.rekeningBank.updateMany({ where: { distributorId: profile.id }, data: { utama: false } }); await tx.rekeningBank.create({ data: { ...data.rekening, distributorId: profile.id, utama: true } }); }
      }
    });

    return NextResponse.json({ ok: true, message: "Pengaturan berhasil disimpan", status: "MENUNGGU_VERIFIKASI" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Data tidak valid" }, { status: 400 });
  }
}
