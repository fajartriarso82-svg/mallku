"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, FileText } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah, formatDate } from "@/lib/utils";
import { dummyPOOut } from "@/lib/dummy/data-po-out";
import type { POOut } from "@/lib/dummy/types";

const columns: Column<POOut>[] = [
  { key: "nomor", header: "No. PO", render: (r) => <span className="font-semibold text-sky-700">{r.nomorPO}</span> },
  { key: "tanggal", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "dist", header: "Ke Distributor", render: (r) => <div><p className="font-medium text-slate-700">{r.distributor}</p><p className="text-[11px] text-slate-400">{r.kota}</p></div> },
  { key: "item", header: "Item", sortable: true, sortValue: (r) => r.itemCount, render: (r) => <span className="text-slate-600">{r.itemCount} produk</span> },
  { key: "total", header: "Total", sortable: true, sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.total)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "aksi", header: "",
    render: (r) => (
      <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
        <Eye className="h-3.5 w-3.5" /> Detail
      </button>
    ),
  },
];

export default function POKeluarPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState<POOut | null>(null);

  const filtered = useMemo(() => dummyPOOut.filter((p) => {
    const okQ = !q || p.nomorPO.toLowerCase().includes(q.toLowerCase()) || p.distributor.toLowerCase().includes(q.toLowerCase());
    const okS = !status || p.status === status;
    return okQ && okS;
  }), [q, status]);

  return (
    <div>
      <PageHeader title="PO ke Distributor Lain" description="Kelola Purchase Order yang Anda kirim ke distributor partner"
        actions={
          <Link href="/scm/distributor/po-keluar/buat" className="inline-flex items-center gap-2 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#123050]">
            <Plus className="h-4 w-4" /> Buat PO Baru
          </Link>
        }
      />

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari no. PO / distributor..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:bg-white" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400">
          <option value="">Semua Status</option>
          <option value="DRAFT">Draft</option>
          <option value="DIKIRIM">Dikirim</option>
          <option value="DIKONFIRMASI">Dikonfirmasi</option>
          <option value="DITERIMA">Diterima</option>
          <option value="DIBATALKAN">Dibatalkan</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} onRowClick={(r) => setDetail(r)} />
      </div>

      <Modal open={detail !== null} onClose={() => setDetail(null)} title={detail?.nomorPO ?? ""} description="Detail Purchase Order keluar" size="md"
        footer={<>
          <button onClick={() => setDetail(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Tutup</button>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">
            <FileText className="h-4 w-4" /> Cetak
          </button>
        </>}>
        {detail && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-xs text-slate-400">Distributor</p><p className="font-bold text-slate-700">{detail.distributor}</p></div>
              <div><p className="text-xs text-slate-400">Tanggal</p><p className="font-bold text-slate-700">{formatDate(detail.tanggal)}</p></div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-2xl font-extrabold text-slate-800">{formatRupiah(detail.total)}</p>
              <p className="text-xs text-slate-400 mt-1">{detail.itemCount} produk</p>
            </div>
            <div><StatusBadge status={detail.status} /></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
