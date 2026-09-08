import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_FILE_SIZE = 1024 * 1024;
const BUCKET = "penyimpanan";

export async function POST(request: NextRequest) {
  const session = await auth();
  const user = session?.user as { id?: string; role?: string } | undefined;
  if (!user?.id || !["TOKO", "DISTRIBUTOR"].includes(user.role ?? "")) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  const formData = await request.formData();
  const type = formData.get("type");
  const file = formData.get("file");
  if (!(type === "NIB" || type === "NPWP") || !(file instanceof File)) return NextResponse.json({ error: "Jenis dokumen atau file tidak valid" }, { status: 400 });
  if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) return NextResponse.json({ error: "File harus berformat PDF" }, { status: 400 });
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Ukuran file maksimal 1 MB" }, { status: 400 });
  const fileBytes = Buffer.from(await file.arrayBuffer());
  if (fileBytes.subarray(0, 5).toString() !== "%PDF-") return NextResponse.json({ error: "Isi file bukan PDF yang valid" }, { status: 400 });

  const profile = user.role === "TOKO"
    ? await prisma.tokoProfile.findUnique({ where: { userId: user.id }, select: { id: true } })
    : await prisma.distributorProfile.findUnique({ where: { userId: user.id }, select: { id: true } });
  if (!profile) return NextResponse.json({ error: "Profil SCM belum tersedia" }, { status: 404 });

  const extension = file.name.toLowerCase().endsWith(".pdf") ? "pdf" : "bin";
  const path = `${type}/${user.id}-${Date.now()}.${extension}`;
  const upload = await supabaseAdmin.storage.from(BUCKET).upload(path, fileBytes, { contentType: "application/pdf", upsert: true });
  if (upload.error) return NextResponse.json({ error: "File gagal diunggah ke penyimpanan" }, { status: 502 });

  if (user.role === "TOKO") {
    await prisma.tokoProfile.update({ where: { userId: user.id }, data: type === "NIB" ? { dokumenNibUrl: path } : { dokumenNpwpUrl: path } });
  } else {
    await prisma.distributorProfile.update({ where: { userId: user.id }, data: type === "NIB" ? { dokumenNibUrl: path } : { dokumenNpwpUrl: path } });
  }

  return NextResponse.json({ ok: true, type, path });
}
