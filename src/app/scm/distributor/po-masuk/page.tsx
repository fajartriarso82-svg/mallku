"use client";

import { useMemo, useState } from "react";
import { Search, Printer, PackageCheck, Truck, XCircle } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah, formatDate } from "@/lib/utils";
import { dummyPOIn } from "@/lib/dummy/data-orders";
import type { POIn } from "@/lib/dummy/types";

const STATUS_FILTERS = [
  { v: "", l: "Semua" },
  { v: "MENUNGGU_PEMBAYARAN", l: "Menunggu Bayar" },
  { v: "DIBAYAR", l: "Dibayar" },
  { v: "DIPROSES", l: "Diproses" },
  { v: "DIKIRIM", l: "Dikirim" },
  { v: "DITERIMA", l: "Diterima" },
  { v: "SELESAI", l: "Selesai" },
];

const columns: Column<POIn>[] = [
  { key: "nomor", header: "No. PO", render: (r) => <span className="font-semibold text-sky-700">{r.nomorPO}</span> },
  { key: "tanggal", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "toko", header: "Dari Toko", render: (r) => <div><p className="font-medium text-slate-700">{r.toko}</p><p className="text-[11px] text-slate-400">{r.kota}</p></div> },
  { key: "item", header: "Item", sortable: true, sortValue: (r) => r.itemCount, render: (r) => <span className="text-slate-600">{r.itemCount} produk</span> },
  { key: "total", header: "Total", sortable: true, sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.total)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

export default function POMasukPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState<POIn | null>(null);

  const filtered = useMemo(() => dummyPOIn.filter((p) => {
    const okQ = !q || p.nomorPO.toLowerCase().includes(q.toLowerCase()) || p.toko.toLowerCase().includes(q.toLowerCase());
    const okS = !status || p.status === status;
    return okQ && okS;
  }), [q, status]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    dummyPOIn.forEach((p) => { c[p.status] = (c[p.status] || 0) + 1; });
    return c;
  }, []);

  const total = dummyPOIn.filter((p) => p.status !== "DIBATALKAN").reduce((a, p) => a + p.total, 0);

  return (
    <div>
      <PageHeader title="PO Masuk (dari Toko)" description={`Kelola Purchase Order dari mitra toko · total ${formatRupiah(total)}`} />

      {/* Stat mini */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["MENUNGGU_PEMBAYARAN", "DIBAYAR", "DIPROSES", "DIKIRIM"] as const).map((s) => (
          <button key={s} onClick={() => setStatus(status === s ? "" : s)}
            className={`rounded-2xl border p-3 text-left transition ${status === s ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
            <p className="text-xl font-extrabold text-slate-800">{counts[s] ?? 0}</p>
            <p className="text-[11px] font-medium text-slate-400">{STATUS_FILTERS.find((f) => f.v === s)?.l}</p>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari no. PO / nama toko..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:bg-white" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400">
          {STATUS_FILTERS.map((f) => <option key={f.v} value={f.v}>{f.l}</option>)}
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} onRowClick={(r) => setDetail(r)} />
      </div>

      {/* Detail modal */}
      <Modal open={detail !== null} onClose={() => setDetail(null)} title={detail?.nomorPO ?? ""} description="Detail Purchase Order dari toko" size="lg"
        footer={<>
          <button onClick={() => setDetail(null)} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Printer className="h-4 w-4" /> Cetak Invoice
          </button>
          {detail && detail.status === "DIBAYAR" && (
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-500">
              <PackageCheck className="h-4 w-4" /> Proses
            </button>
          )}
          {detail && detail.status === "DIPROSES" && (
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500">
              <Truck className="h-4 w-4" /> Tandai Dikirim
            </button>
          )}
          {detail && (detail.status === "MENUNGGU_PEMBAYARAN" || detail.status === "DIBAYAR") && (
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-100">
              <XCircle className="h-4 w-4" /> Batalkan
            </button>
          )}
        </>}>
        {detail && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4">
              <div><p className="text-xs text-slate-400">Toko Pemesan</p><p className="font-bold text-slate-800">{detail.toko}</p><p className="text-xs text-slate-400">{detail.kota}</p></div>
              <div><p className="text-xs text-slate-400">Tanggal</p><p className="font-bold text-slate-800">{formatDate(detail.tanggal)}</p><div className="mt-1"><StatusBadge status={detail.status} /></div></div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="px-3 py-2">Produk</th><th className="px-3 py-2 text-center">Qty</th><th className="px-3 py-2 text-right">Harga</th><th className="px-3 py-2 text-right">Subtotal</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {(detail.items ?? []).map((it, i) => (
                    <tr key={i}><td className="px-3 py-2 font-medium text-slate-700">{it.nama}</td><td className="px-3 py-2 text-center">{it.qty}</td><td className="px-3 py-2 text-right text-slate-500">{formatRupiah(it.harga)}</td><td className="px-3 py-2 text-right font-bold text-slate-800">{formatRupiah(it.harga * it.qty)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end rounded-xl bg-[#0e2238] px-4 py-3 text-white">
              <div className="text-right"><p className="text-xs text-white/60">Total Tagihan</p><p className="text-2xl font-extrabold">{formatRupiah(detail.total)}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
