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
  Wallet,
  Receipt,
  ShoppingCart,
  Boxes,
} from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Dashboard Toko — SCM & MP" };

export default async function SellerDashboard() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "TOKO") redirect("/login");

  const userId = session.user!.id!;

  const toko = await prisma.tokoProfile.findUnique({
    where: { userId },
  });
  if (!toko) redirect("/login");

  // Sequential queries for pgbouncer stability
  const totalStokGudang = await prisma.stokToko.aggregate({
    where: { tokoId: toko.id },
    _sum: { jumlahTersedia: true },
    _count: { id: true },
  });

  const totalListingAktif = await prisma.listingMP.count({
    where: { tokoId: toko.id, status: "AKTIF" },
  });

  const totalListingNonaktif = await prisma.listingMP.count({
    where: { tokoId: toko.id, status: "NONAKTIF" },
  });

  const totalPOKeDistributor = await prisma.orderSCM.count({
    where: { tokoId: userId },
  });

  const totalPesananCustomer = await prisma.orderGroupMP.count({
    where: { tokoId: toko.id },
  });

  const totalOmzetMP = await prisma.orderGroupMP.aggregate({
    where: { tokoId: toko.id, status: "SELESAI" },
    _sum: { subtotal: true },
  });

  const kpiData: KPICardItem[] = [
    {
      title: "Total Produk Aktif di MP",
      value: totalListingAktif,
      change: { percentage: 16.24, period: "bulan lalu" },
      icon: <Package className="w-6 h-6" />,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Produk MP Nonaktif",
      value: totalListingNonaktif,
      change: { percentage: -3.96, period: "bulan lalu" },
      icon: <PackageX className="w-6 h-6" />,
      iconBgColor: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      title: "Total Omzet Penjualan",
      value: formatRupiah(Number(totalOmzetMP._sum.subtotal ?? 0)),
      change: { percentage: 14.5, period: "bulan lalu" },
      icon: <Wallet className="w-6 h-6" />,
      iconBgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Stok Tersedia (SCM)",
      value: `${totalStokGudang._sum.jumlahTersedia || 0} unit`,
      change: { percentage: 8.2, period: "bulan lalu" },
      icon: <Boxes className="w-6 h-6" />,
      iconBgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total PO ke Distributor",
      value: totalPOKeDistributor,
      change: { percentage: 11.0, period: "bulan lalu" },
      icon: <ShoppingCart className="w-6 h-6" />,
      iconBgColor: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      title: "Total Pesanan Pembeli MP",
      value: totalPesananCustomer,
      change: { percentage: 19.5, period: "bulan lalu" },
      icon: <Receipt className="w-6 h-6" />,
      iconBgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const stokTerbaru = await prisma.stokToko.findMany({
    where: { tokoId: toko.id },
    include: {
      produkMaster: { include: { distributor: true } },
      listingMp: true,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const pesananMpTerbaru = await prisma.orderGroupMP.findMany({
    where: { tokoId: toko.id },
    include: {
      order: { include: { buyer: true, alamat: true } },
      items: { include: { listing: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <AppShell role="TOKO" userName={session.user?.name ?? ""} userEmail={session.user?.email ?? ""}>
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
              Panel Mitra Toko (Seller SCM & MP)
            </span>
            <h1 className="text-2xl font-bold text-slate-800 mt-2">{toko.namaToko}</h1>
            <p className="text-xs text-slate-500">
              {toko.alamatLengkap}, {toko.kabupatenKota}, {toko.provinsi}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/scm/toko/catalog"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              Belanja Grosir (SCM)
            </Link>
            <Link
              href="/seller/stok"
              className="px-3.5 py-2 bg-[#B61F18] hover:bg-[#961913] text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              Alokasi Stok ke MP
            </Link>
          </div>
        </div>

        <KPICards data={kpiData} columns={3} />

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-sky-600" />
                <span>Stok Diterima dari SCM</span>
              </CardTitle>
              <Link href="/scm/toko/stok" className="text-xs font-semibold text-sky-600 hover:underline">
                Kelola Stok →
              </Link>
            </CardHeader>
            <CardContent>
              {stokTerbaru.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Belum ada stok dari PO SCM. Mulai belanja dari katalog grosir!
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {stokTerbaru.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.produkMaster.nama}</p>
                        <p className="text-xs text-slate-500">
                          Distributor: {item.produkMaster.distributor.namaUsaha}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800">
                          {item.jumlahTersedia} unit tersedia
                        </p>
                        {item.listingMp.length === 0 ? (
                          <Link
                            href="/seller/stok"
                            className="inline-block mt-0.5 text-[11px] font-bold text-rose-600 hover:underline"
                          >
                            + Publish ke MP
                          </Link>
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-600">
                            ✓ Aktif di MP ({item.jumlahAlokMP} unit)
                          </span>
                        )}
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
                <Receipt className="w-5 h-5 text-emerald-600" />
                <span>Pesanan Marketplace Terbaru</span>
              </CardTitle>
              <Link href="/seller/orders" className="text-xs font-semibold text-sky-600 hover:underline">
                Daftar Pesanan →
              </Link>
            </CardHeader>
            <CardContent>
              {pesananMpTerbaru.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Belum ada pesanan masuk dari pembeli marketplace.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pesananMpTerbaru.map((order) => (
                    <div key={order.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{order.order.nomorOrder}</p>
                        <p className="text-xs text-slate-500">
                          Pembeli: {order.order.buyer.name} ({order.order.alamat.kabupatenKota})
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800">{formatRupiah(Number(order.subtotal))}</p>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700">
                          {order.status}
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