"use client";

import { useMemo, useState } from "react";
import { Search, Landmark, Copy, CheckCircle2, Clock, XCircle, Banknote } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { formatRupiah, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { dummyPembayaranVA } from "@/lib/dummy/toko-data";
import type { PembayaranVA } from "@/lib/dummy/toko-types";

function StatusVA({ s }: { s: PembayaranVA["status"] }) {
  const map: Record<string, { c: string; label: string; icon: React.ReactNode }> = {
    MENUNGGU: { c: "bg-amber-50 text-amber-700 border-amber-200", label: "Menunggu", icon: <Clock className="h-3 w-3" /> },
    BERHASIL: { c: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Berhasil", icon: <CheckCircle2 className="h-3 w-3" /> },
    GAGAL: { c: "bg-rose-50 text-rose-700 border-rose-200", label: "Gagal", icon: <XCircle className="h-3 w-3" /> },
    EXPIRED: { c: "bg-slate-100 text-slate-500 border-slate-200", label: "Expired", icon: <Clock className="h-3 w-3" /> },
  };
  const m = map[s];
  return <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold", m.c)}>{m.icon} {m.label}</span>;
}

const columns: Column<PembayaranVA>[] = [
  { key: "po", header: "No. PO", render: (r) => <span className="font-semibold text-sky-700">{r.nomorPO}</span> },
  { key: "dist", header: "Distributor", render: (r) => <span className="font-medium text-slate-700">{r.distributor}</span> },
  { key: "metode", header: "Metode", render: (r) => <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{r.metode}</span> },
  { key: "va", header: "Nomor VA", render: (r) => <span className="font-mono text-xs text-slate-600">{r.vaNumber}</span> },
  { key: "jumlah", header: "Jumlah", sortable: true, sortValue: (r) => r.jumlah, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.jumlah)}</span> },
  { key: "tgl", header: "Tanggal", render: (r) => <span className="text-xs text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusVA s={r.status} /> },
];

export default function KeuanganSCMPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const filtered = useMemo(() => dummyPembayaranVA.filter((v) => {
    const okQ = !q || v.nomorPO.toLowerCase().includes(q.toLowerCase()) || v.distributor.toLowerCase().includes(q.toLowerCase());
    const okS = !status || v.status === status;
    return okQ && okS;
  }), [q, status]);

  const totalBelanja = dummyPembayaranVA.filter((v) => v.status === "BERHASIL").reduce((a, v) => a + v.jumlah, 0);
  const pending = dummyPembayaranVA.filter((v) => v.status === "MENUNGGU").reduce((a, v) => a + v.jumlah, 0);

  return (
    <div>
      <PageHeader title="SCM — Keuangan" description="Riwayat pembayaran Virtual Account ke distributor" />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border-l-4 border-emerald-500 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Total Dibayar</p><p className="text-xl font-extrabold text-slate-800">{formatRupiah(totalBelanja)}</p></div>
        <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Menunggu Pembayaran</p><p className="text-xl font-extrabold text-amber-600">{formatRupiah(pending)}</p></div>
        <div className="rounded-2xl border-l-4 border-cyan-500 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Metode Utama</p><p className="text-xl font-extrabold text-slate-800">VA BCA</p></div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari no. PO / distributor..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-cyan-400 focus:bg-white" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-400">
          <option value="">Semua Status</option>
          <option value="MENUNGGU">Menunggu</option>
          <option value="BERHASIL">Berhasil</option>
          <option value="GAGAL">Gagal</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} />
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
        <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
        <div className="text-xs text-cyan-900">
          <p className="mb-1 font-bold">Cara Bayar PO</p>
          <p>Transfer ke nomor Virtual Account sesuai PO sebelum batas waktu. Pembayaran terkonfirmasi otomatis dan stok akan dikirim distributor.</p>
        </div>
      </div>
    </div>
  );
}
