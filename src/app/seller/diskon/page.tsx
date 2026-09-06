"use client";

import { useState } from "react";
import { Plus, Percent, Banknote, Tag } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { dummyVoucherToko } from "@/lib/dummy/toko-data";
import type { VoucherToko } from "@/lib/dummy/toko-types";

const columns: Column<VoucherToko>[] = [
  {
    key: "nama", header: "Voucher",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", r.tipe === "PERSEN" ? "bg-amber-50 text-amber-600" : "bg-violet-50 text-violet-600")}>
          {r.tipe === "PERSEN" ? <Percent className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
        </div>
        <div className="min-w-0"><p className="truncate font-semibold text-slate-800">{r.nama}</p><p className="font-mono text-[11px] text-slate-400">{r.kode}</p></div>
      </div>
    ),
  },
  { key: "tipe", header: "Tipe", render: (r) => <span className="text-slate-600">{r.tipe === "PERSEN" ? "Persentase" : "Nominal"}</span> },
  { key: "nilai", header: "Nilai", sortable: true, sortValue: (r) => r.nilai, render: (r) => <span className="font-bold text-slate-800">{r.tipe === "PERSEN" ? `${r.nilai}%` : formatRupiah(r.nilai)}</span> },
  { key: "min", header: "Min. Belanja", sortable: true, sortValue: (r) => r.minBelanja, render: (r) => <span className="text-slate-600">{formatRupiah(r.minBelanja)}</span> },
  { key: "periode", header: "Periode", render: (r) => <div className="text-xs text-slate-500"><p>{r.periodeMulai}</p><p>→ {r.periodeSelesai}</p></div> },
  { key: "pakai", header: "Terpakai", sortable: true, sortValue: (r) => r.terpakai, render: (r) => <span className="text-slate-600">{r.terpakai}/{r.kuota}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

export default function DiskonTokoPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader title="Marketplace — Kartu Diskon" description="Voucher diskon untuk pembeli di Marketplace"
        actions={<button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-400"><Plus className="h-4 w-4" /> Buat Voucher</button>} />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Voucher Aktif</p><p className="text-xl font-extrabold text-slate-800">{dummyVoucherToko.filter((v) => v.status === "AKTIF").length}</p></div>
        <div className="rounded-2xl border-l-4 border-emerald-500 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Total Terpakai</p><p className="text-xl font-extrabold text-slate-800">{dummyVoucherToko.reduce((a, v) => a + v.terpakai, 0)}</p></div>
        <div className="rounded-2xl border-l-4 border-sky-500 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">Nilai Diskon</p><p className="text-xl font-extrabold text-slate-800">{formatRupiah(1280000)}</p></div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={dummyVoucherToko} rowKey={(r) => r.id} pageSize={8} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Buat Voucher Baru" description="Diskon untuk pembeli Marketplace" size="md"
        footer={<>
          <button onClick={() => setOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Batal</button>
          <button onClick={() => setOpen(false)} className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-400">Terbitkan</button>
        </>}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Voucher</span>
              <input placeholder="cth: Diskon 10% Akhir Pekan" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Tipe</span>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-amber-400"><option>PERSEN</option><option>NOMINAL</option></select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nilai</span>
              <input placeholder="5 / 10000" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Min. Belanja</span>
              <input type="number" placeholder="50000" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kuota</span>
              <input type="number" placeholder="100" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Mulai</span>
              <input type="date" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Selesai</span>
              <input type="date" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
