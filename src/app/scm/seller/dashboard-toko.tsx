"use client";

import Link from "next/link";
import { Boxes, PackageCheck, Network, Wallet, ArrowRight, Clock, Layers } from "lucide-react";
import { StatCard } from "@/components/distributor/stat-card";
import { LineChart } from "@/components/distributor/line-chart";
import { StatusBadge } from "@/components/distributor/status-badge";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { formatRupiah, formatDate } from "@/lib/utils";
import { dummyPOPembelian, dummyPembayaranVA, dummyKatalogSCM, dummyDistributorMitra, dummyBelanjaSCM30 } from "@/lib/dummy/toko-data";
import type { POPembelian } from "@/lib/dummy/toko-types";

const belanjaData = dummyBelanjaSCM30.map((d) => ({ label: d.tanggal.slice(8) + "/" + d.tanggal.slice(5, 7), value: d.nominal }));

const orderCols: Column<POPembelian>[] = [
  { key: "nomor", header: "No. PO", render: (r) => <span className="font-semibold text-sky-700">{r.nomorPO}</span> },
  { key: "dist", header: "Distributor", render: (r) => <div><p className="font-medium text-slate-700">{r.distributor}</p><p className="text-[11px] text-slate-400">{r.kota}</p></div> },
  { key: "tgl", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "total", header: "Total", sortable: true, sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.total)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

export default function DashboardTokoScm() {
  const poAktif = dummyPOPembelian.filter((p) => ["MENUNGGU_PEMBAYARAN", "DIBAYAR", "DIPROSES", "DIKIRIM"].includes(p.status)).length;
  const stokBaru = dummyKatalogSCM.filter((p) => p.stok > 0).reduce((acc, p) => acc + p.stok, 0);
  const mitraAktif = dummyDistributorMitra.filter((d) => d.status === "AKTIF").length;
  const tagihanBelumBayar = dummyPembayaranVA.filter((p) => p.status === "MENUNGGU").length;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0e2238] via-[#123050] to-[#0e2238] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">Dashboard Toko · SCM</p>
            <h1 className="mt-1 text-2xl font-extrabold">Selamat Datang kembali 👋</h1>
            <p className="mt-1 text-sm text-slate-300">Kelola belanja grosir, stok, dan jaringan distributor Anda.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/scm/seller/po" className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-400"><Boxes className="h-4 w-4" /> Belanja Grosir</Link>
            <Link href="/scm/seller/produk" className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-400"><PackageCheck className="h-4 w-4" /> Cek Stok</Link>
          </div>
        </div>
      </div>

      {/* Dompet SCM */}
      <div className="overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white"><Wallet className="h-4 w-4" /></span>
            <div><p className="text-xs font-bold text-cyan-700">Dompet SCM</p><p className="text-[10px] text-slate-400">Untuk bayar PO belanja grosir</p></div>
          </div>
        </div>
        <p className="mt-3 text-2xl font-extrabold text-slate-800">{formatRupiah(152500000)}</p>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-cyan-600"><Clock className="h-3 w-3" /> {poAktif} PO aktif · {tagihanBelumBayar} tagihan menunggu pembayaran</div>
        <Link href="/scm/seller/keuangan-scm" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:underline">Kelola Keuangan SCM <ArrowRight className="h-3.5 w-3.5" /></Link>
      </div>

      {/* 4 KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard data={{ label: "PO Belanja Aktif", value: String(poAktif), icon: <Boxes className="h-5 w-5" />, iconBg: "bg-cyan-50 text-cyan-600", hint: "menunggu bayar / kirim", accent: "blue" }} />
        <StatCard data={{ label: "Stok Baru Diterima", value: String(stokBaru), icon: <PackageCheck className="h-5 w-5" />, iconBg: "bg-cyan-50 text-cyan-600", hint: "unit siap dipakai", accent: "blue" }} />
        <StatCard data={{ label: "Distributor Mitra", value: String(mitraAktif), icon: <Network className="h-5 w-5" />, iconBg: "bg-sky-50 text-sky-600", hint: "aktif", accent: "blue" }} />
        <StatCard data={{ label: "Tagihan Belum Bayar", value: String(tagihanBelumBayar), icon: <Wallet className="h-5 w-5" />, iconBg: "bg-amber-50 text-amber-600", hint: "pembayaran VA", accent: "amber" }} />
      </div>

      {/* Grafik belanja + ringkasan */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-cyan-500" /><div><h3 className="text-sm font-bold text-slate-800">Belanja Grosir 30 Hari</h3><p className="text-xs text-slate-400">Total nilai PO ke distributor</p></div></div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">▲ 12%</span>
          </div>
          <LineChart data={belanjaData} formatValue={(v) => formatRupiah(v)} />
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
            <span>Total 30 hari</span><span className="font-extrabold text-slate-700">{formatRupiah(dummyBelanjaSCM30.reduce((acc, d) => acc + d.nominal, 0))}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border-l-4 border-cyan-500 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600">Ringkasan SCM · Belanja</p>
            <div className="mt-2 flex justify-between text-sm"><span className="text-slate-500">Belanja bulan ini</span><span className="font-bold text-slate-800">{formatRupiah(64200000)}</span></div>
            <div className="mt-1 flex justify-between text-sm"><span className="text-slate-500">Distributor mitra</span><span className="font-bold text-slate-800">{mitraAktif} aktif</span></div>
            <Link href="/scm/seller/produk" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:underline">Cek stok & PO <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="rounded-2xl border-l-4 border-sky-500 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">Ringkasan Jaringan</p>
            <div className="mt-2 flex justify-between text-sm"><span className="text-slate-500">Distributor terhubung</span><span className="font-bold text-slate-800">{mitraAktif}</span></div>
            <Link href="/scm/seller/jaringan" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline">Kelola jaringan <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </div>

      {/* PO terbaru */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div><h3 className="text-sm font-bold text-slate-800">PO Belanja Terbaru</h3><p className="text-xs text-slate-400">Purchase order ke distributor</p></div>
          <Link href="/scm/seller/po" className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline">Lihat Semua <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <DataTable columns={orderCols} data={dummyPOPembelian.slice(0, 5)} rowKey={(r) => r.id} pageSize={5} />
      </div>
    </div>
  );
}
