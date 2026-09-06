"use client";

import Link from "next/link";
import { ShoppingCart, Boxes, Store, PackageCheck, Wallet, ArrowRight, Truck, Inbox, Layers, Clock } from "lucide-react";
import { StatCard } from "@/components/distributor/stat-card";
import { LineChart } from "@/components/distributor/line-chart";
import { StatusBadge } from "@/components/distributor/status-badge";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { formatRupiah, formatDate } from "@/lib/utils";
import { dummyPesananMP, dummySalesMP30, dummyPOPembelian } from "@/lib/dummy/toko-data";
import type { PesananMP } from "@/lib/dummy/toko-types";

const salesData = dummySalesMP30.map((d) => ({ label: d.tanggal.slice(8) + "/" + d.tanggal.slice(5, 7), value: d.nominal }));

const orderCols: Column<PesananMP>[] = [
  { key: "nomor", header: "No. Order", render: (r) => <span className="font-semibold text-sky-700">{r.nomorOrder}</span> },
  { key: "pembeli", header: "Pembeli", render: (r) => <div><p className="font-medium text-slate-700">{r.pembeli}</p><p className="text-[11px] text-slate-400">{r.kota}</p></div> },
  { key: "tgl", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "total", header: "Total", sortable: true, sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.total)}</span> },
  { key: "kirim", header: "Kirim", render: (r) => <span className={r.metodeKirim === "BITESHIP" ? "inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-600" : "inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-600"}>{r.metodeKirim === "BITESHIP" ? <Truck className="h-3 w-3" /> : <Store className="h-3 w-3" />} {r.metodeKirim === "BITESHIP" ? "BiteShip" : "Kirim Sendiri"}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "BARU" ? "MENUNGGU" : r.status} /> },
];

export default function DashboardToko() {
  const pesananBaru = dummyPesananMP.filter((p) => p.status === "BARU" || p.status === "DIPROSES").length;
  const poAktif = dummyPOPembelian.filter((p) => ["MENUNGGU_PEMBAYARAN", "DIBAYAR", "DIPROSES", "DIKIRIM"].includes(p.status)).length;
  const terjualHariIni = 14;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0e2238] via-[#123050] to-[#0e2238] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">Dashboard Toko</p>
            <h1 className="mt-1 text-2xl font-extrabold">Selamat Datang kembali 👋</h1>
            <p className="mt-1 text-sm text-slate-300">Kelola belanja grosir (SCM) & penjualan (Marketplace) dalam satu akun.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/seller/po" className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-400"><Boxes className="h-4 w-4" /> Belanja Grosir</Link>
            <Link href="/seller/listing" className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-400"><Store className="h-4 w-4" /> Kelola Toko MP</Link>
          </div>
        </div>
      </div>

      {/* Kartu saldo gabungan — dua dompet berbeda */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white"><Wallet className="h-4 w-4" /></span>
              <div><p className="text-xs font-bold text-cyan-700">Dompet SCM</p><p className="text-[10px] text-slate-400">Untuk bayar PO belanja grosir</p></div>
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-800">{formatRupiah(152500000)}</p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-cyan-600"><Clock className="h-3 w-3" /> {poAktif} PO aktif menunggu</div>
          <Link href="/seller/keuangan-scm" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:underline">Kelola Keuangan SCM <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><Wallet className="h-4 w-4" /></span>
              <div><p className="text-xs font-bold text-amber-700">Saldo Marketplace</p><p className="text-[10px] text-slate-400">Hasil penjualan ke pembeli</p></div>
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-800">{formatRupiah(857000)}</p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-600"><Store className="h-3 w-3" /> Bisa dicairkan ke rekening</div>
          <Link href="/seller/saldo-mp" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline">Ajukan Pencairan <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>

      {/* 4 KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard data={{ label: "PO Belanja Aktif (SCM)", value: String(poAktif), icon: <Boxes className="h-5 w-5" />, iconBg: "bg-cyan-50 text-cyan-600", hint: "menunggu bayar / kirim", accent: "blue" }} />
        <StatCard data={{ label: "Stok Baru Diterima", value: "150", icon: <PackageCheck className="h-5 w-5" />, iconBg: "bg-cyan-50 text-cyan-600", hint: "unit siap tayang", accent: "blue" }} />
        <StatCard data={{ label: "Pesanan Masuk (MP)", value: String(pesananBaru), icon: <ShoppingCart className="h-5 w-5" />, iconBg: "bg-amber-50 text-amber-600", change: 18, changeLabel: "dari kemarin", accent: "amber" }} />
        <StatCard data={{ label: "Terjual Hari Ini", value: String(terjualHariIni), icon: <Inbox className="h-5 w-5" />, iconBg: "bg-emerald-50 text-emerald-600", hint: "produk", accent: "emerald" }} />
      </div>

      {/* Section dua konteks */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-amber-500" /><div><h3 className="text-sm font-bold text-slate-800">Penjualan Marketplace 30 Hari</h3><p className="text-xs text-slate-400">Total nilai pesanan diterima</p></div></div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">▲ 22%</span>
          </div>
          <LineChart data={salesData} formatValue={(v) => formatRupiah(v)} />
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
            <span>Total 30 hari</span><span className="font-extrabold text-slate-700">{formatRupiah(11500000)}</span>
          </div>
        </div>

        {/* Ringkasan konteks */}
        <div className="space-y-4">
          <div className="rounded-2xl border-l-4 border-cyan-500 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600">Ringkasan SCM · Belanja</p>
            <div className="mt-2 flex justify-between text-sm"><span className="text-slate-500">Belanja bulan ini</span><span className="font-bold text-slate-800">{formatRupiah(64200000)}</span></div>
            <div className="mt-1 flex justify-between text-sm"><span className="text-slate-500">Distributor mitra</span><span className="font-bold text-slate-800">3 aktif</span></div>
            <Link href="/seller/produk" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:underline">Cek stok & PO <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600">Ringkasan Marketplace · Jual</p>
            <div className="mt-2 flex justify-between text-sm"><span className="text-slate-500">Listing aktif</span><span className="font-bold text-slate-800">4 produk</span></div>
            <div className="mt-1 flex justify-between text-sm"><span className="text-slate-500">Pesanan perlu proses</span><span className="font-bold text-rose-600">{dummyPesananMP.filter((p) => p.status === "BARU").length}</span></div>
            <Link href="/seller/pesanan" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline">Proses pesanan <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </div>

      {/* Pesanan terbaru MP */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div><h3 className="text-sm font-bold text-slate-800">Pesanan Masuk Terbaru (MP)</h3><p className="text-xs text-slate-400">Pesanan dari pembeli</p></div>
          <Link href="/seller/pesanan" className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline">Lihat Semua <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <DataTable columns={orderCols} data={dummyPesananMP.slice(0, 5)} rowKey={(r) => r.id} pageSize={5} />
      </div>
    </div>
  );
}
