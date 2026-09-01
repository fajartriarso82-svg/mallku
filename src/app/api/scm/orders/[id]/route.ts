import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateStatusSchema = z.object({
  status: z.enum(["DIBAYAR", "DIPROSES", "DIKIRIM", "DITERIMA", "SELESAI", "DIBATALKAN"]),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = (session.user as any)?.role;
  const userId = session.user!.id!;
  const { id: orderId } = await params;

  try {
    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });

    const { status } = parsed.data;
    const order = await prisma.orderSCM.findUnique({
      where: { id: orderId },
      include: { items: true, distributor: true },
    });

    if (!order) return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });

    const distProfile = role === "DISTRIBUTOR"
      ? await prisma.distributorProfile.findUnique({ where: { userId } })
      : null;

    if (role === "TOKO" && order.tokoId !== userId && status !== "DITERIMA") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (role === "DISTRIBUTOR" && distProfile?.id !== order.distributorId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.orderSCM.update({ where: { id: orderId }, data: { status } });

      if (status === "DITERIMA") {
        for (const item of order.items) {
          const existing = await tx.stokToko.findFirst({
            where: { tokoId: order.tokoId, produkMasterId: item.produkId, orderScmId: orderId },
          });

          if (existing) {
            await tx.stokToko.update({
              where: { id: existing.id },
              data: {
                jumlahDiterima: { increment: item.qty },
                jumlahTersedia: { increment: item.qty },
              },
            });
          } else {
            await tx.stokToko.create({
              data: {
                tokoId: order.tokoId,
                produkMasterId: item.produkId,
                orderScmId: orderId,
                jumlahDiterima: item.qty,
                jumlahTersedia: item.qty,
                jumlahAlokMP: 0,
              },
            });
          }
        }
      }
    });

    return NextResponse.json({ message: "Status diperbarui", status });
  } catch (err) {
    console.error("[SCM_ORDER_STATUS]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}