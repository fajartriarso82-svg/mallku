import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: userId } = await params;
  const url = req.nextUrl.pathname;
  const isApprove = url.includes("/approve");

  await prisma.user.update({
    where: { id: userId },
    data: {
      statusAkun: isApprove ? "AKTIF" : "DITOLAK",
    },
  });

  if (isApprove) {
    await prisma.tokoProfile.updateMany({
      where: { userId },
      data: { tokoMpAktif: true },
    });
  }

  return NextResponse.redirect(new URL("/scm/admin/akun", req.url));
}