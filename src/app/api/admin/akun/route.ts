import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

async function isAdmin() {
  const session = await auth();
  return (session?.user as { role?: string } | undefined)?.role === "ADMIN";
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
  const users = await prisma.user.findMany({
    where: { role: { in: ["TOKO", "DISTRIBUTOR"] } },
    select: {
      id: true, name: true, email: true, role: true, statusAkun: true, telepon: true, createdAt: true,
      tokoProfile: { include: { gudang: true, rekening: true } },
      distributorProfile: { include: { gudang: true, rekening: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users.map((user) => {
    const profile = user.tokoProfile || user.distributorProfile;
    const complete = Boolean(profile?.noNib && profile?.dokumenNibUrl && profile?.noNpwp && profile?.dokumenNpwpUrl);
    return { ...user, reviewStatus: user.statusAkun === "MENUNGGU_VERIFIKASI" && !complete ? "BELUM_LENGKAP" : user.statusAkun };
  }));
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
  const body = await request.json();
  if (!body.id || !["AKTIF", "DITOLAK", "NONAKTIF"].includes(body.statusAkun)) return NextResponse.json({ error: "Data status tidak valid" }, { status: 400 });
  const user = await prisma.user.update({ where: { id: body.id }, data: { statusAkun: body.statusAkun } });
  if (body.statusAkun === "AKTIF") await prisma.tokoProfile.updateMany({ where: { userId: body.id }, data: { tokoMpAktif: true } });
  return NextResponse.json(user);
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  const adminId = (session?.user as { id?: string; role?: string } | undefined);
  if (adminId?.role !== "ADMIN" || !adminId.id) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  const body = await request.json();
  if (!body.id || typeof body.password !== "string" || body.password.length < 1) return NextResponse.json({ error: "Password admin wajib diisi" }, { status: 400 });
  if (body.id === adminId.id) return NextResponse.json({ error: "Akun admin yang sedang digunakan tidak dapat dihapus" }, { status: 400 });

  const admin = await prisma.user.findUnique({ where: { id: adminId.id }, select: { passwordHash: true } });
  if (!admin?.passwordHash || !(await bcrypt.compare(body.password, admin.passwordHash))) return NextResponse.json({ error: "Password admin salah" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: body.id },
    select: { id: true, role: true, tokoProfile: { select: { id: true, dokumenNibUrl: true, dokumenNpwpUrl: true } }, distributorProfile: { select: { id: true, dokumenNibUrl: true, dokumenNpwpUrl: true } } },
  });
  if (!user || !["TOKO", "DISTRIBUTOR"].includes(user.role)) return NextResponse.json({ error: "Akun SCM tidak ditemukan" }, { status: 404 });

  const profile = user.tokoProfile || user.distributorProfile;
  const profileId = profile?.id;
  const isToko = user.role === "TOKO";

  const files = [profile?.dokumenNibUrl, profile?.dokumenNpwpUrl].filter((path): path is string => Boolean(path));
  if (files.length) {
    const storageResult = await getSupabaseAdmin().storage.from("penyimpanan").remove(files);
    if (storageResult.error) return NextResponse.json({ error: "Dokumen Storage gagal dihapus; akun belum dihapus" }, { status: 502 });
  }

  await prisma.$transaction(async (tx) => {
    if (profileId) {
      if (isToko) {
        await tx.orderGroupMP.deleteMany({ where: { tokoId: profileId } });
        await tx.listingMP.deleteMany({ where: { tokoId: profileId } });
        await tx.stokToko.deleteMany({ where: { tokoId: profileId } });
        await tx.mitraRelasi.deleteMany({ where: { tokoId: profileId } });
        await tx.orderGroupMP.deleteMany({ where: { tokoId: profileId } });
        await tx.rekeningBank.deleteMany({ where: { tokoId: profileId } });
        await tx.gudang.deleteMany({ where: { tokoId: profileId } });
        await tx.tokoProfile.delete({ where: { id: profileId } });
      } else {
        const products = await tx.produkMasterSCM.findMany({ where: { distributorId: profileId }, select: { id: true } });
        const productIds = products.map((product) => product.id);
        const orders = await tx.orderSCM.findMany({ where: { distributorId: profileId }, select: { id: true } });
        const orderIds = orders.map((order) => order.id);
        if (productIds.length) {
          await tx.orderItemSCM.deleteMany({ where: { produkId: { in: productIds } } });
          await tx.listingMP.deleteMany({ where: { stokToko: { produkMasterId: { in: productIds } } } });
          await tx.stokToko.deleteMany({ where: { produkMasterId: { in: productIds } } });
        }
        await tx.produkMasterSCM.deleteMany({ where: { distributorId: profileId } });
        await tx.mitraRelasi.deleteMany({ where: { distributorId: profileId } });
        if (orderIds.length) await tx.stokToko.deleteMany({ where: { orderScmId: { in: orderIds } } });
        await tx.orderSCM.deleteMany({ where: { distributorId: profileId } });
        await tx.rekeningBank.deleteMany({ where: { distributorId: profileId } });
        await tx.gudang.deleteMany({ where: { distributorId: profileId } });
        await tx.distributorProfile.delete({ where: { id: profileId } });
      }
    }
    await tx.alamat.deleteMany({ where: { userId: user.id } });
    await tx.account.deleteMany({ where: { userId: user.id } });
    await tx.session.deleteMany({ where: { userId: user.id } });
    await tx.buyerProfile.deleteMany({ where: { userId: user.id } });
    await tx.user.delete({ where: { id: user.id } });
  });

  return NextResponse.json({ ok: true });
}
