import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";
import { KPICards, KPICardItem } from "@/components/ui/kpi-cards";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, ShieldAlert, ShoppingCart, Store, Building2, PackageCheck } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Dashboard Admin SCM" };

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") redirect("/login");

  // Query secara berurutan agar aman dengan PgBouncer pooler
  const totalDistributor = await prisma.user.count({ where: { role: "DISTRIBUTOR", statusAkun: "AKTIF" } });
  const totalToko = await prisma.user.count({ where: { role: "TOKO", statusAkun: "AKTIF" } });
  const totalBuyer = await prisma.user.count({ where: { role: "BUYER" } });
  const unverified = await prisma.user.count({ where: { statusAkun: "MENUNGGU_VERIFIKASI" } });
  const totalOrderSCM = await prisma.orderSCM.count();
  const totalOrderMP = await prisma.orderMP.count();
  const revenueSCM = await prisma.orderSCM.aggregate({ where: { status: "SELESAI" }, _sum: { totalHarga: true } });
  const revenueMP = await prisma.orderMP.aggregate({ where: { status: "SELESAI" }, _sum: { totalBayar: true } });

  const totalAkun = totalDistributor + totalToko + totalBuyer;

  const kpiData: KPICardItem[] = [
    {
      title: "Total Akun Terdaftar",
      value: totalAkun,
      change: { percentage: 12.5, period: "bulan lalu" },
      icon: <Users className="w-6 h-6" />,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Distributor Aktif",
      value: totalDistributor,
      change: { percentage: 8.2, period: "bulan lalu" },
      icon: <Building2 className="w-6 h-6" />,
      iconBgColor: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      title: "Toko / Mitra Aktif",
      value: totalToko,
      change: { percentage: 15.4, period: "bulan lalu" },
      icon: <Store className="w-6 h-6" />,
      iconBgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Akun Belum Tervalidasi",
      value: unverified,
      change: { percentage: unverified > 0 ? -5.0 : 0, period: "bulan lalu" },
      icon: <ShieldAlert className="w-6 h-6" />,
      iconBgColor: unverified > 0 ? "bg-amber-50" : "bg-slate-50",
      iconColor: unverified > 0 ? "text-amber-600" : "text-slate-400",
    },
    {
      title: "Total Order SCM",
      value: totalOrderSCM,
      change: { percentage: 21.0, period: "bulan lalu" },
      icon: <ShoppingCart className="w-6 h-6" />,
      iconBgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Transaksi Marketplace",
      value: totalOrderMP,
      change: { percentage: 18.3, period: "bulan lalu" },
      icon: <PackageCheck className="w-6 h-6" />,
      iconBgColor: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];

  const pendingAccounts = await prisma.user.findMany({
    where: { statusAkun: "MENUNGGU_VERIFIKASI" },
    include: { distributorProfile: true, tokoProfile: true },
    orderBy: { createdAt: "asc" },
    take: 5,
  });

  const recentOrders = await prisma.orderSCM.findMany({
    include: { toko: true, distributor: true, items: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <AppShell role="ADMIN" userName={session.user?.name ?? ""} userEmail={session.user?.email ?? ""}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Administrator</h1>
          <p className="text-sm text-slate-500">Ringkasan statistik operasional ekosistem SCM & Marketplace</p>
        </div>

        {/* 6 KPI Cards Grid */}
        <KPICards data={kpiData} columns={3} />

        {/* GMV Summary Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-sky-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Nilai Transaksi SCM (B2B)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-sky-700">
                {formatRupiah(Number(revenueSCM._sum.totalHarga ?? 0))}
              </div>
              <p className="text-xs text-slate-400 mt-1">Akumulasi PO status SELESAI</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Nilai Transaksi MP (B2C)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-emerald-700">
                {formatRupiah(Number(revenueMP._sum.totalBayar ?? 0))}
              </div>
              <p className="text-xs text-slate-400 mt-1">Akumulasi Penjualan Toko ke Buyer</p>
            </CardContent>
          </Card>
        </div>

        {/* Tables Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Akun Menunggu Verifikasi */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <span>Akun Menunggu Validasi</span>
              </CardTitle>
              <Link href="/admin/akun" className="text-xs font-semibold text-sky-600 hover:underline">
                Lihat Semua ({unverified}) →
              </Link>
            </CardHeader>
            <CardContent>
              {pendingAccounts.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Tidak ada akun yang menunggu validasi saat ini.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingAccounts.map((acc) => {
                    const nama = acc.distributorProfile?.namaUsaha ?? acc.tokoProfile?.namaToko ?? acc.name;
                    return (
                      <div key={acc.id} className="py-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{nama}</p>
                          <p className="text-xs text-slate-500">{acc.email} • <span className="font-medium text-slate-700">{acc.role}</span></p>
                        </div>
                        <Link
                          href={`/admin/akun`}
                          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700"
                        >
                          Review
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaksi SCM Terbaru */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                <span>Purchase Order SCM Terbaru</span>
              </CardTitle>
              <Link href="/admin/transaksi" className="text-xs font-semibold text-sky-600 hover:underline">
                Monitoring →
              </Link>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Belum ada transaksi SCM tercatat.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentOrders.map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{ord.nomorPo}</p>
                        <p className="text-xs text-slate-500">Toko: {ord.toko.name} • Dist: {ord.distributor.namaUsaha}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800">{formatRupiah(Number(ord.totalHarga))}</p>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700">
                          {ord.status}
                        </span>
                      </div>
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