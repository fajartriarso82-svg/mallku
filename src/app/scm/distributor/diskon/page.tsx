"use client";

import { useState } from "react";
import { Plus, BadgePercent, Percent, Banknote, Users } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah } from "@/lib/utils";
import { dummyKartuDiskon } from "@/lib/dummy/data-finance";
import type { KartuDiskon } from "@/lib/dummy/types";
import { cn } from "@/lib/utils";

const columns: Column<KartuDiskon>[] = [
  {
    key: "nama", header: "Voucher / Kartu",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", r.tipe === "PERSEN" ? "bg-amber-50 text-amber-600" : "bg-sky-50 text-sky-600")}>
          {r.tipe === "PERSEN" ? <Percent className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-800">{r.nama}</p>
          <p className="font-mono text-[11px] text-slate-400">{r.kode}</p>
        </div>
      </div>
    ),
  },
  {
    key: "nilai", header: "Nilai", sortable: true, sortValue: (r) => r.nilai,
    render: (r) => <span className="font-bold text-slate-800">{r.tipe === "PERSEN" ? `${r.nilai}%` : formatRupiah(r.nilai)}</span>,
  },
  {
    key: "target", header: "Target",
    render: (r) => (
      <div>
        <p className="inline-flex items-center gap-1 text-slate-600">{r.target === "SEMUA" ? <Users className="h-3.5 w-3.5" /> : <BadgePercent className="h-3.5 w-3.5" />} {r.target === "SEMUA" ? "Semua Mitra" : "Tertentu"}</p>
        {r.target === "TERTENTU" && <p className="max-w-[160px] truncate text-[10px] text-slate-400" title={r.targetNama}>{r.targetNama}</p>}
      </div>
    ),
  },
  {
    key: "periode", header: "Periode",
    render: (r) => <div className="text-xs text-slate-500"><p>{r.periodeMulai}</p><p>→ {r.periodeSelesai}</p></div>,
  },
  {
    key: "pemakaian", header: "Pemakaian", sortable: true, sortValue: (r) => r.terpakai,
    render: (r) => (
      <div>
        <p className="text-xs font-semibold text-slate-600">{r.terpakai}/{r.kuota}</p>
        <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
          <div className={cn("h-full rounded-full", r.terpakai / r.kuota > 0.8 ? "bg-rose-400" : "bg-sky-500")} style={{ width: `${(r.terpakai / r.kuota) * 100}%` }} />
        </div>
      </div>
    ),
  },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

export default function DiskonPage() {
  const [buatOpen, setBuatOpen] = useState(false);

  return (
    <div>
      <PageHeader title="Manajemen Kartu Diskon" description="Buat & kelola voucher diskon untuk mitra toko"
        actions={<button onClick={() => setBuatOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123050]"><Plus className="h-4 w-4" /> Buat Voucher</button>} />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Voucher Aktif</p><p className="text-xl font-extrabold text-slate-800">{dummyKartuDiskon.filter((d) => d.status === "AKTIF").length}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Total Terpakai</p><p className="text-xl font-extrabold text-slate-800">{dummyKartuDiskon.reduce((a, d) => a + d.terpakai, 0)}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Nilai Diskon Diberikan</p><p className="text-xl font-extrabold text-slate-800">{formatRupiah(8450000)}</p></div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={dummyKartuDiskon} rowKey={(r) => r.id} pageSize={8} />
      </div>

      <Modal open={buatOpen} onClose={() => setBuatOpen(false)} title="Buat Voucher Baru" description="Atur diskon untuk mitra toko" size="lg"
        footer={<>
          <button onClick={() => setBuatOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
          <button onClick={() => setBuatOpen(false)} className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Terbitkan Voucher</button>
        </>}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Voucher</span>
              <input placeholder="cth: Diskon 5% Bulan Ini" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Tipe Diskon</span>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sky-400">
                <option>PERSEN (%)</option><option>NOMINAL (Rp)</option>
              </select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nilai</span>
              <input placeholder="cth: 5 atau 25000" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Target</span>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sky-400">
                <option>Semua Mitra</option><option>Mitra Tertentu</option>
              </select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kuota</span>
              <input type="number" placeholder="cth: 500" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Periode Mulai</span>
              <input type="date" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Periode Selesai</span>
              <input type="date" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
