"use client";

import { useMemo, useState } from "react";
import { Search, UserPlus, Store, MapPin } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah } from "@/lib/utils";
import { dummyMitraToko } from "@/lib/dummy/data-jaringan";
import type { MitraToko } from "@/lib/dummy/types";

const columns: Column<MitraToko>[] = [
  {
    key: "toko", header: "Toko", sortable: true, sortValue: (r) => r.namaToko,
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Store className="h-4 w-4" /></div>
        <div className="min-w-0"><p className="truncate font-semibold text-slate-800">{r.namaToko}</p><p className="text-[11px] text-slate-400">{r.pemilik}</p></div>
      </div>
    ),
  },
  { key: "lokasi", header: "Lokasi", render: (r) => <span className="inline-flex items-center gap-1 text-slate-500"><MapPin className="h-3.5 w-3.5" /> {r.kota}</span> },
  { key: "transaksi", header: "Transaksi", sortable: true, sortValue: (r) => r.totalTransaksi, render: (r) => <span className="font-semibold text-slate-700">{r.totalTransaksi}x</span> },
  { key: "omzet", header: "Total Omzet", sortable: true, sortValue: (r) => r.totalOmzet, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.totalOmzet)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "sejak", header: "Terhubung Sejak", render: (r) => <span className="text-slate-500">{r.terhubungSejak}</span> },
];

export default function MitraPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [tambahOpen, setTambahOpen] = useState(false);
  const filtered = useMemo(() => dummyMitraToko.filter((m) => {
    const okQ = !q || m.namaToko.toLowerCase().includes(q.toLowerCase()) || m.pemilik.toLowerCase().includes(q.toLowerCase());
    const okS = !status || m.status === status;
    return okQ && okS;
  }), [q, status]);

  return (
    <div>
      <PageHeader title="List Mitra (Toko)" description={`Jaringan mitra toko yang terhubung (${dummyMitraToko.length})`}
        actions={<button onClick={() => setTambahOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123050]"><UserPlus className="h-4 w-4" /> Tambah Mitra</button>} />

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari toko / pemilik..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:bg-white" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400">
          <option value="">Semua Status</option>
          <option value="AKTIF">Aktif</option>
          <option value="NONAKTIF">Nonaktif</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} />
      </div>

      <Modal open={tambahOpen} onClose={() => setTambahOpen(false)} title="Tambah Mitra Toko" description="Hubungkan toko baru ke jaringan Anda" size="md"
        footer={<>
          <button onClick={() => setTambahOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
          <button onClick={() => setTambahOpen(false)} className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Kirim Undangan</button>
        </>}>
        <div className="space-y-4">
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Toko</span>
            <input placeholder="cth: Toko Berkah Abadi" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Email Pemilik / PIC</span>
            <input type="email" placeholder="nama@tokobaru.id" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kota</span>
              <input placeholder="Makassar" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">No. Telepon</span>
              <input placeholder="08xx" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
