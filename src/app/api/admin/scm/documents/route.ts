import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const BUCKET = "penyimpanan";
const ALLOWED_PATH = /^(NIB|NPWP)\/[A-Za-z0-9_-]+\.pdf$/;

export async function GET(request: NextRequest) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });

  const path = request.nextUrl.searchParams.get("path") || "";
  if (!ALLOWED_PATH.test(path)) return NextResponse.json({ error: "Path dokumen tidak valid" }, { status: 400 });

  const { data, error } = await getSupabaseAdmin().storage.from(BUCKET).createSignedUrl(path, 300);
  if (error || !data?.signedUrl) return NextResponse.json({ error: "Dokumen tidak dapat dibuka" }, { status: 404 });

  return NextResponse.json({ url: data.signedUrl, expiresIn: 300 });
}
