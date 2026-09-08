import Link from "next/link";
import { ArrowUpRight, Building2, ClipboardList, ShieldAlert, Store, Users, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICards } from "@/components/ui/kpi-cards";
import {
  dummyAkunSCM,
  dummyPencairan,
  dummyStokSCM,
  dummyTransaksiSCM,
  metrikOverview,
} from "@/lib/dummy/admin-data";
import { formatRupiah } from "@/lib/utils";

export const metadata = { title: "Dashboard Admin SCM" };

const kpiData = [
  { title: "Distributor Aktif", value: metrikOverview.totalDistAktif, change: { percentage: 8.2, period: "bulan lalu" }, icon: <Building2 className="w-5 h-5" />, iconBgColor: "bg-sky-50", iconColor: "text-sky-600" },
  { title: "Toko Aktif", value: metrikOverview.totalTokoAktif, change: { percentage: 15.4, period: "bulan lalu" }, icon: <Store className="w-5 h-5" />, iconBgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
  { title: "GMV SCM", value: formatRupiah(metrikOverview.gmvSCM), change: { percentage: 12.5, period: "bulan lalu" }, icon: <Wallet className="w-5 h-5" />, iconBgColor: "bg-violet-50", iconColor: "text-violet-600" },
  { title: "Menunggu Approval", value: metrikOverview.pendingApproval, change: { percentage: -4.5, period: "hari ini" }, icon: <ShieldAlert className="w-5 h-5" />, iconBgColor: "bg-amber-50", iconColor: "text-amber-600" },
  { title: "Akun Terdaftar", value: dummyAkunSCM.length, change: { percentage: 10.1, period: "bulan lalu" }, icon: <Users className="w-5 h-5" />, iconBgColor: "bg-slate-100", iconColor: "text-slate-700" },
];

const approvalQueue = dummyAkunSCM.filter((item) => item.status === "PENDING").slice(0, 4);
const latestOrders = dummyTransaksiSCM.slice(0, 4);

export default function ScmAdminDashboard() {
  return (
    <div className="space-y-6 text-[#26343F]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC3]">Overview</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[#26343F]">Dashboard Admin SCM</h1>
        <p className="mt-1 text-sm text-[#687681]">Ringkasan operasional rantai pasok distributor & toko dalam satu panel.</p>
      </div>

      <KPICards data={kpiData} columns={3} />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              Approval Queue
            </CardTitle>
            <Link href="/scm/admin/akun" className="inline-flex items-center gap-1 text-xs font-semibold text-[#168BC3]">
              Lihat semua <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvalQueue.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#DDE3E7] bg-[#F5F7F8] p-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{item.namaUsaha}</p>
                    <p className="text-xs text-slate-500">{item.tipe} · {item.kota}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
              <ClipboardList className="h-5 w-5 text-violet-600" />
              PO SCM Terbaru
            </CardTitle>
            <Link href="/scm/admin/po" className="inline-flex items-center gap-1 text-xs font-semibold text-[#168BC3]">
              Monitoring <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestOrders.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#DDE3E7] bg-[#F5F7F8] p-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{item.nomorPO}</p>
                    <p className="text-xs text-slate-500">{item.dari} → {item.ke}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{formatRupiah(item.nominal)}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">Status Stok Kritikal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummyStokSCM.filter((item) => item.status !== "AMAN").slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                  <p className="text-sm font-semibold text-slate-700">{item.produk}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.distributor} · {item.stokTersedia}/{item.stokMinimum} {item.satuan}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">Pencairan Menunggu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummyPencairan.filter((item) => item.status === "MENUNGGU").slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-700">{item.namaUsaha}</p>
                  <p className="text-xs text-slate-500">{item.ref} · {formatRupiah(item.nominal)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}