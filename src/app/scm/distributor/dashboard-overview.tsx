"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Clock,
  AlertTriangle,
  Wallet,
  ArrowRight,
  Plus,
  TrendingUp,
  Landmark,
  Inbox,
} from "lucide-react";
import { StatCard } from "@/components/distributor/stat-card";
import { LineChart } from "@/components/distributor/line-chart";
import { StatusBadge } from "@/components/distributor/status-badge";
import { DataTable } from "@/components/distributor/data-table";
import type { Column } from "@/components/distributor/data-table";
import { formatRupiah, formatDate } from "@/lib/utils";
import { dummyOrderTerbaru, dummySales30Days } from "@/lib/dummy/data-orders";
import { dummyTagihanIuran } from "@/lib/dummy/data-finance";
import { dummyProduk } from "@/lib/dummy/data-produk";

const salesData = dummySales30Days.map((d) => ({
  label: d.tanggal.slice(8) + "/" + d.tanggal.slice(5, 7),
  value: d.nominal,
}));

const columns: Column<(typeof dummyOrderTerbaru)[number]>[] = [
  {
    key: "nomor",
    header: "No. Order",
    render: (r) => <span className="font-semibold text-sky-700">{r.nomor}</span>,
  },
  { key: "pelanggan", header: "Mitra Toko", render: (r) => <span className="font-medium text-slate-700">{r.pelanggan}</span> },
  { key: "tanggal", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "total", header: "Total", sortable: true, sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.total)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

export function DashboardOverview({ companyName }: { companyName: string }) {
  const stokKritis = dummyProduk.filter((p) => p.stok <= p.stokMinimum).length;
  const iuran = dummyTagihanIuran.find((i) => i.status === "PROSES") ?? dummyTagihanIuran[0];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0e2238] via-[#123050] to-[#0e2238] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">Dashboard Distributor</p>
            <h1 className="mt-1 text-2xl font-extrabold">{companyName}</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/scm/distributor/produk" className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              <Plus className="h-4 w-4" /> Produk
            </Link>
            <Link href="/scm/distributor/po-keluar" className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-400">
              Buat PO <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard data={{ label: "Order Baru", value: "24", icon: <ShoppingCart className="h-5 w-5" />, iconBg: "bg-sky-50 text-sky-600", change: 12, changeLabel: "dari minggu lalu", accent: "blue" }} />
        <StatCard data={{ label: "Perlu Diproses", value: "8", icon: <Clock className="h-5 w-5" />, iconBg: "bg-amber-50 text-amber-600", change: -3, changeLabel: "dari kemarin", accent: "amber" }} />
        <StatCard data={{ label: "Stok Kritis", value: String(stokKritis), icon: <AlertTriangle className="h-5 w-5" />, iconBg: "bg-rose-50 text-rose-600", hint: "produk di bawah minimum", accent: "red" }} />
        <StatCard data={{ label: "Saldo Tersedia", value: formatRupiah(198250000), icon: <Wallet className="h-5 w-5" />, iconBg: "bg-emerald-50 text-emerald-600", change: 8.4, changeLabel: "dari bulan lalu", accent: "emerald" }} />
      </div>

      {/* Chart + Iuran */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Line chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Penjualan 30 Hari Terakhir</h3>
              <p className="text-xs text-slate-400">Total nilai PO diterima</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> +18,4%
            </span>
          </div>
          <LineChart data={salesData} formatValue={(v) => formatRupiah(v)} />
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
            <span>Total 30 hari</span>
            <span className="font-extrabold text-slate-700">{formatRupiah(1_976_000_000)}</span>
          </div>
        </div>

        {/* Iuran jatuh tempo widget */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-800">Iuran Jatuh Tempo</h3>
              </div>
              <Link href="/scm/distributor/keuangan/iuran" className="text-xs font-semibold text-sky-600 hover:underline">Kelola</Link>
            </div>
            <div className="p-5">
              <p className="text-xs text-slate-400">Periode {iuran.periode}</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-800">{formatRupiah(iuran.nominal)}</p>
              <div className="mt-3">
                <StatusBadge status={iuran.status === "PROSES" ? "MENUNGGU" : iuran.status} />
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Jatuh tempo: <span className="font-semibold text-slate-600">{formatDate(iuran.tanggalJatuhTempo)}</span>
              </p>
              <Link href="/scm/distributor/keuangan/saldo" className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#123050]">
                Bayar Iuran <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick summary PO */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-800">Ringkasan PO Masuk</h3>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-sky-50 p-3">
                <p className="text-xl font-extrabold text-sky-700">16</p>
                <p className="text-[11px] font-medium text-slate-500">Menunggu</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <p className="text-xl font-extrabold text-emerald-700">6</p>
                <p className="text-[11px] font-medium text-slate-500">Selesai</p>
              </div>
            </div>
            <Link href="/scm/distributor/po-masuk" className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
              Lihat semua PO <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tabel Order Terbaru */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Order Terbaru</h3>
            <p className="text-xs text-slate-400">5 transaksi terakhir</p>
          </div>
          <Link href="/scm/distributor/po-masuk" className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline">
            Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <DataTable columns={columns} data={dummyOrderTerbaru.slice(0, 5)} rowKey={(r) => r.id} pageSize={5} />
      </div>
    </div>
  );
}
