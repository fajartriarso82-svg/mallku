import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateOrderNumber } from "@/lib/utils";
import { z } from "zod";

const createOrderSchema = z.object({
  distributorId: z.string(),
  items: z.array(z.object({
    produkId: z.string(),
    qty: z.number().min(1),
    hargaSatuan: z.number().min(0),
  })),
  catatan: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = (session.user as any)?.role;
  const userId = session.user!.id!;

  try {
    let orders;
    if (role === "TOKO") {
      orders = await prisma.orderSCM.findMany({
        where: { tokoId: userId },
        include: {
          distributor: true,
          items: { include: { produk: true } },
          pembayaran: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (role === "DISTRIBUTOR") {
      const dist = await prisma.distributorProfile.findUnique({ where: { userId } });
      if (!dist) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
      orders = await prisma.orderSCM.findMany({
        where: { distributorId: dist.id },
        include: {
          toko: true,
          items: { include: { produk: true } },
          pembayaran: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (role === "ADMIN") {
      orders = await prisma.orderSCM.findMany({
        include: {
          toko: true,
          distributor: true,
          items: { include: { produk: true } },
          pembayaran: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("[SCM_ORDERS_GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "TOKO") {
    return NextResponse.json({ error: "Hanya Toko yang bisa membuat PO" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Data tidak valid", details: parsed.error.flatten() }, { status: 400 });
    }

    const { distributorId, items, catatan } = parsed.data;
    const userId = session.user!.id!;

    // Hitung total
    const totalHarga = items.reduce((sum, item) => sum + item.qty * item.hargaSatuan, 0);

    const order = await prisma.$transaction(async (tx) => {
      // Buat order
      const newOrder = await tx.orderSCM.create({
        data: {
          nomorPo: generateOrderNumber("PO"),
          tokoId: userId,
          distributorId,
          totalHarga,
          catatan,
          status: "MENUNGGU_PEMBAYARAN",
          items: {
            create: items.map((item) => ({
              produkId: item.produkId,
              namaSnapshot: "", // akan diisi dari produk
              qty: item.qty,
              hargaSatuan: item.hargaSatuan,
              subtotal: item.qty * item.hargaSatuan,
            })),
          },
        },
      });

      // Update snapshot nama produk
      for (const item of items) {
        const produk = await tx.produkMasterSCM.findUnique({ where: { id: item.produkId } });
        if (produk) {
          await tx.orderItemSCM.updateMany({
            where: { orderId: newOrder.id, produkId: item.produkId },
            data: { namaSnapshot: produk.nama },
          });
        }
      }

      // Buat VA simulasi
      const vaNumber = "8882" + Date.now().toString().slice(-8);
      await tx.pembayaranSCM.create({
        data: {
          orderId: newOrder.id,
          metode: "VA",
          status: "MENUNGGU",
          vaNumber,
          vaExpiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam
          jumlah: totalHarga,
        },
      });

      return newOrder;
    });

    return NextResponse.json({ message: "PO berhasil dibuat", orderId: order.id, nomorPo: order.nomorPo }, { status: 201 });
  } catch (err) {
    console.error("[SCM_ORDER_CREATE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}