import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const itemSchema = z.object({
  type: z.enum(["BANK", "UNIT", "BRAND", "SUB_BRAND", "CATEGORY", "SUB_CATEGORY"]),
  id: z.string().optional(),
  nama: z.string().trim().min(1),
  singkatan: z.string().trim().optional(),
  parentId: z.string().optional(),
  icon: z.string().trim().optional(),
});

const settingsSchema = z.object({
  minimalPenarikan: z.coerce.number().min(0),
  biayaBankPenarikan: z.coerce.number().min(0),
  batasNilaiPg: z.coerce.number().min(0),
  biayaPayoutDibawahBatas: z.coerce.number().min(0),
  biayaPayoutDiatasBatas: z.coerce.number().min(0),
  limitPoDistributor: z.coerce.number().min(0),
  limitPoToko: z.coerce.number().min(0),
});

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  return role === "ADMIN";
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  const [banks, units, brands, subBrands, categories, subCategories, settings] = await Promise.all([
    prisma.bankMaster.findMany({ orderBy: { nama: "asc" } }),
    prisma.unitMaster.findMany({ orderBy: { nama: "asc" } }),
    prisma.brandMaster.findMany({ orderBy: { nama: "asc" } }),
    prisma.subBrandMaster.findMany({ include: { brand: true }, orderBy: { nama: "asc" } }),
    prisma.kategoriMaster.findMany({ orderBy: { urutan: "asc" } }),
    prisma.kategoriProduk.findMany({ include: { kategoriMaster: true }, orderBy: { nama: "asc" } }),
    prisma.scmSetting.findFirst({ orderBy: { createdAt: "asc" } }),
  ]);

  return NextResponse.json({ banks, units, brands, subBrands, categories, subCategories, settings });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  try {
    const body = await request.json();
    if (body.type === "SETTINGS") {
      const data = settingsSchema.parse(body);
      const current = await prisma.scmSetting.findFirst({ orderBy: { createdAt: "asc" } });
      const settings = current
        ? await prisma.scmSetting.update({ where: { id: current.id }, data })
        : await prisma.scmSetting.create({ data });
      return NextResponse.json(settings);
    }

    const data = itemSchema.parse(body);
    const record = await createItem(data);
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Data tidak valid" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  try {
    const body = await request.json();
    if (body.type === "SETTINGS") {
      const data = settingsSchema.parse(body);
      if (!body.id) return NextResponse.json({ error: "Pengaturan belum tersedia" }, { status: 404 });
      return NextResponse.json(await prisma.scmSetting.update({ where: { id: body.id }, data }));
    }
    const data = itemSchema.parse(body);
    if (!data.id) return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    return NextResponse.json(await updateItem(data));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Data tidak valid" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
  const body = await request.json();
  if (!body.id || !body.type) return NextResponse.json({ error: "ID dan tipe wajib diisi" }, { status: 400 });

  try {
    switch (body.type) {
      case "BANK": await prisma.bankMaster.delete({ where: { id: body.id } }); break;
      case "UNIT": await prisma.unitMaster.delete({ where: { id: body.id } }); break;
      case "BRAND": await prisma.brandMaster.delete({ where: { id: body.id } }); break;
      case "SUB_BRAND": await prisma.subBrandMaster.delete({ where: { id: body.id } }); break;
      case "CATEGORY": await prisma.kategoriMaster.delete({ where: { id: body.id } }); break;
      case "SUB_CATEGORY": await prisma.kategoriProduk.delete({ where: { id: body.id } }); break;
      default: return NextResponse.json({ error: "Tipe tidak dikenal" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Data tidak dapat dihapus" }, { status: 409 });
  }
}

async function createItem(data: z.infer<typeof itemSchema>) {
  switch (data.type) {
    case "BANK": return prisma.bankMaster.create({ data: { nama: data.nama } });
    case "UNIT": return prisma.unitMaster.create({ data: { nama: data.nama, singkatan: data.singkatan || data.nama.slice(0, 3).toUpperCase() } });
    case "BRAND": return prisma.brandMaster.create({ data: { nama: data.nama } });
    case "SUB_BRAND": return prisma.subBrandMaster.create({ data: { nama: data.nama, brandId: data.parentId! }, include: { brand: true } });
    case "CATEGORY": return prisma.kategoriMaster.create({ data: { nama: data.nama, slug: slugify(data.nama), icon: data.icon || "📦" } });
    case "SUB_CATEGORY": return prisma.kategoriProduk.create({ data: { nama: data.nama, slug: slugify(data.nama), kategoriMasterId: data.parentId! } });
  }
}

async function updateItem(data: z.infer<typeof itemSchema>) {
  switch (data.type) {
    case "BANK": return prisma.bankMaster.update({ where: { id: data.id }, data: { nama: data.nama } });
    case "UNIT": return prisma.unitMaster.update({ where: { id: data.id }, data: { nama: data.nama, singkatan: data.singkatan || data.nama.slice(0, 3).toUpperCase() } });
    case "BRAND": return prisma.brandMaster.update({ where: { id: data.id }, data: { nama: data.nama } });
    case "SUB_BRAND": return prisma.subBrandMaster.update({ where: { id: data.id }, data: { nama: data.nama, brandId: data.parentId! }, include: { brand: true } });
    case "CATEGORY": return prisma.kategoriMaster.update({ where: { id: data.id }, data: { nama: data.nama, slug: slugify(data.nama), icon: data.icon || "📦" } });
    case "SUB_CATEGORY": return prisma.kategoriProduk.update({ where: { id: data.id }, data: { nama: data.nama, slug: slugify(data.nama), kategoriMasterId: data.parentId! } });
  }
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
