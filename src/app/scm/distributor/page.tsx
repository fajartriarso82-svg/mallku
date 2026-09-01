import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";
import { KPICards, KPICardItem } from "@/components/ui/kpi-cards";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Package,
  PackageX,
  Building2,
  ShoppingCart,
  TrendingUp,
  ArrowDownRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Dashboard Distributor SCM" };

export default async function DistributorDashboard() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "DISTRIBUTOR") redirect("/login");

  const userId = session.user!.id!;

  const distributor = await prisma.distributorProfile.findUnique({
    where: { userId },
    include: {
      produkMaster: { include: { stokGudang: true, hargaTier: true } },
      orderMasuk: { orderBy: { createdAt: "desc" }, take: 6, include: { toko: true, items: true } },
      mitraRelasi: { where: { status: "AKTIF" }, include: { toko: true } },
    },
  });

  if (!distributor) redirect("/login");

  const totalProduk = distributor.produkMaster.length;
  const activeProducts = distributor.produkMaster.filter((p) => p.aktif).length;
  const inactiveProducts = totalProduk - activeProducts;
  const totalMitra = distributor.mitraRelasi.length;

  const totalPOIncoming = await prisma.orderSCM.count({
    where: { distributorId: distributor.id },
  });

  const poPending = await prisma.orderSCM.count({
    where: {
      distributorId: distributor.id,
      status: { in: ["MENUNGGU_PEMBAYARAN", "DIBAYAR", "DIPROSES"] },
    },
  });

  const totalRevenue = await prisma.orderSCM.aggregate({
    where: { distributorId: distributor.id, status: "SELESAI" },
    _sum: { totalHarga: true },
  });

  const kpiData: KPICardItem[] = [
    {
      title: "Total PO Masuk",
      value: totalPOIncoming,
      change: { percentage: 16.24, period: "bulan lalu" },
      icon: <ArrowDownRight className="w-6 h-6" />,
      iconBgColor: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      title: "PO Perlu Diproses",
      value: poPending,
      change: { percentage: poPending > 0 ? 5.2 : 0, period: "bulan lalu" },
      icon: <Clock className="w-6 h-6" />,
      iconBgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Total Mitra Toko",
      value: totalMitra,
      change: { percentage: 8.5, period: "bulan lalu" },
      icon: <Building2 className="w-6 h-6" />,
      iconBgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Produk Aktif",
      value: activeProducts,
      change: { percentage: 12.0, period: "bulan lalu" },
      icon: <Package className="w-6 h-6" />,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Produk Nonaktif",
      value: inactiveProducts,
      change: { percentage: -2.4, period: "bulan lalu" },
      icon: <PackageX className="w-6 h-6" />,
      iconBgColor: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      title: "Total Pendapatan Selesai",
      value: formatRupiah(Number(totalRevenue._sum.totalHarga ?? 0)),
      change: { percentage: 18.7, period: "bulan lalu" },
      icon: <TrendingUp className="w-6 h-6" />,
      iconBgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <AppShell role="DISTRIBUTOR" userName={session.user?.name ?? ""} userEmail={session.user?.email ?? ""}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full">
              Portal Distributor SCM
            </span>
            <h1 className="text-2xl font-bold text-slate-800 mt-2">{distributor.namaUsaha}</h1>
            <p className="text-xs text-slate-500">
              {distributor.alamatLengkap}, {distributor.kabupatenKota}, {distributor.provinsi}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/scm/distributor/catalog"
              className="px-4 py-2 bg-[#247094] hover:bg-[#1d5c7a] text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              + Kelola Katalog Produk
            </Link>
          </div>
        </div>

        <KPICards data={kpiData} columns={3} />

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-sky-600" />
                <span>PO Masuk Terbaru</span>
              </CardTitle>
              <Link href="/scm/distributor/orders" className="text-xs font-semibold text-sky-600 hover:underline">
                Lihat Semua ({totalPOIncoming}) →
              </Link>
            </CardHeader>
            <CardContent>
              {distributor.orderMasuk.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Belum ada PO masuk dari mitra toko.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {distributor.orderMasuk.map((order) => (
                    <div key={order.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{order.nomorPo}</p>
                        <p className="text-xs text-slate-500">
                          Toko: {order.toko.name} • {order.items.length} item
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800">{formatRupiah(Number(order.totalHarga))}</p>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-50 text-sky-700">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>Mitra Toko Terdaftar</span>
              </CardTitle>
              <Link href="/scm/distributor/mitra" className="text-xs font-semibold text-sky-600 hover:underline">
                Kelola Mitra ({totalMitra}) →
              </Link>
            </CardHeader>
            <CardContent>
              {distributor.mitraRelasi.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Belum ada toko yang terhubung sebagai mitra.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {distributor.mitraRelasi.map((mitra) => (
                    <div key={mitra.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{mitra.toko.namaToko}</p>
                        <p className="text-xs text-slate-500">
                          {mitra.toko.kabupatenKota}, {mitra.toko.provinsi}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Aktif
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}