"use client";

import { useState } from "react";
import { Landmark, Download, CheckCircle2, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { formatRupiah } from "@/lib/utils";
import { dummyTagihanIuran } from "@/lib/dummy/data-finance";
import type { TagihanIuran } from "@/lib/dummy/types";

const columns: Column<TagihanIuran>[] = [
  { key: "periode", header: "Periode", sortable: true, sortValue: (r) => r.periode, render: (r) => <span className="font-semibold text-slate-700">{r.periode}</span> },
  { key: "judul", header: "Tagihan", render: (r) => <span className="text-slate-500">{r.judul}</span> },
  { key: "nominal", header: "Nominal", sortable: true, sortValue: (r) => r.nominal, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.nominal)}</span> },
  { key: "jatuhTempo", header: "Jatuh Tempo", sortable: true, sortValue: (r) => r.tanggalJatuhTempo, render: (r) => <span className="text-slate-500">{r.tanggalJatuhTempo}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "PROSES" ? "MENUNGGU" : r.status} /> },
  { key: "bayar", header: "Tanggal Bayar", render: (r) => <span className="text-slate-500">{r.tanggalBayar ?? "—"}</span> },
];

export default function IuranPage() {
  const [showAll, setShowAll] = useState(false);
  const lunas = dummyTagihanIuran.filter((i) => i.status === "LUNAS").length;
  const total = dummyTagihanIuran.reduce((a, i) => a + i.nominal, 0);
  const nunggak = dummyTagihanIuran.find((i) => i.status === "NUNGGAK");

  return (
    <div>
      <PageHeader title="Keuangan — Iuran" description="Riwayat tagihan iuran keanggotaan SCM"
        actions={<button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Download className="h-4 w-4" /> Unduh</button>} />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Total Tagihan</p><p className="text-xl font-extrabold text-slate-800">{formatRupiah(total)}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Lunas</p><p className="text-xl font-extrabold text-emerald-600">{lunas} periode</p></div>
        {nunggak ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 shadow-sm">
            <p className="inline-flex items-center gap-1 text-xs font-bold text-rose-600"><AlertTriangle className="h-3.5 w-3.5" /> Ada Tunggakan</p>
            <p className="text-xl font-extrabold text-rose-700">{formatRupiah(nunggak.nominal)}</p>
          </div>
        ) : <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Tunggakan</p><p className="text-xl font-extrabold text-emerald-600">Tidak ada</p></div>}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={dummyTagihanIuran} rowKey={(r) => r.id} pageSize={10} />
      </div>

      {/* Info pembayaran */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
        <div className="text-xs text-sky-900">
          <p className="font-bold mb-1">Pembayaran Iuran</p>
          <p>Pembayaran dapat dilakukan melalui Virtual Account BCA/Mandiri atau QRIS. Iuran berlaku per periode bulanan dan jatuh tempo tiap tanggal 25.</p>
        </div>
      </div>
    </div>
  );
}
