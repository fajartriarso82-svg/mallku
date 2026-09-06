"use client";

import { useMemo, useState } from "react";
import { Search, Building2, UserPlus, MapPin, Handshake } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah } from "@/lib/utils";
import { dummyDistributorMitra } from "@/lib/dummy/toko-data";
import type { DistributorMitraToko } from "@/lib/dummy/toko-types";

const columns: Column<DistributorMitraToko>[] = [
  {
    key: "nama", header: "Distributor", sortable: true, sortValue: (r) => r.nama,
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600"><Building2 className="h-4 w-4" /></div>
        <div className="min-w-0"><p className="truncate font-semibold text-slate-800">{r.nama}</p><p className="text-[11px] text-slate-400">{r.kota}, {r.provinsi}</p></div>
      </div>
    ),
  },
  {
    key: "kategori", header: "Kategori",
    render: (r) => <div className="flex flex-wrap gap-1">{r.kategori.map((k) => <span key={k} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{k}</span>)}</div>,
  },
  { key: "po", header: "Total PO", sortable: true, sortValue: (r) => r.totalPO, render: (r) => <span className="font-semibold text-slate-700">{r.totalPO}x</span> },
  { key: "belanja", header: "Total Belanja", sortable: true, sortValue: (r) => r.totalBelanja, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.totalBelanja)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

// Direktori calon distributor (untuk dicari & dihubungkan)
const directory = [
  { id: "x1", nama: "PT Sumber Rejeki Pangan", kota: "Surabaya", provinsi: "Jawa Timur", kategori: ["Sembako", "Bumbu"] },
  { id: "x2", nama: "CV Makmur Abadi", kota: "Bandung", provinsi: "Jawa Barat", kategori: ["Minuman", "Makanan"] },
  { id: "x3", nama: "PT Indo Grosir Nusantara", kota: "Jakarta", provinsi: "DKI Jakarta", kategori: ["Perlengkapan Rumah", "Perawatan"] },
  { id: "x4", nama: "UD Sinar Timur", kota: "Semarang", provinsi: "Jawa Tengah", kategori: ["Sembako"] },
  { id: "x5", nama: "PT Pangan Sejahtera", kota: "Makassar", provinsi: "Sulawesi Selatan", kategori: ["Makanan", "Minuman"] },
];

export default function JaringanTokoPage() {
  const [q, setQ] = useState("");
  const [cariOpen, setCariOpen] = useState(false);
  const [dirQ, setDirQ] = useState("");
  const filtered = useMemo(() => dummyDistributorMitra.filter((d) => {
    const okQ = !q || d.nama.toLowerCase().includes(q.toLowerCase());
    return okQ;
  }), [q]);

  const dirFiltered = directory.filter((d) => !dirQ || d.nama.toLowerCase().includes(dirQ.toLowerCase()) || d.kota.toLowerCase().includes(dirQ.toLowerCase()));

  return (
    <div>
      <PageHeader title="SCM — Manajemen Jaringan" description="Distributor mitra tempat Anda belanja grosir"
        actions={<button onClick={() => setCariOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-500"><Search className="h-4 w-4" /> Cari Distributor Baru</button>} />

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari distributor mitra..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-cyan-400 focus:bg-white" />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} />
      </div>

      {/* Modal direktori */}
      <Modal open={cariOpen} onClose={() => setCariOpen(false)} title="Cari Distributor Baru" description="Temukan distributor untuk terhubung sebagai mitra" size="lg">
        <div className="mb-4 relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={dirQ} onChange={(e) => setDirQ(e.target.value)} placeholder="Cari nama / kota distributor..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-cyan-400 focus:bg-white" />
        </div>
        <div className="space-y-2">
          {dirFiltered.map((d) => (
            <div key={d.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Building2 className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-800">{d.nama}</p>
                <p className="flex items-center gap-1 text-[11px] text-slate-400"><MapPin className="h-3 w-3" /> {d.kota}, {d.provinsi}</p>
                <div className="mt-1 flex flex-wrap gap-1">{d.kategori.map((k) => <span key={k} className="rounded-full bg-slate-100 px-1.5 py-px text-[9px] font-semibold text-slate-500">{k}</span>)}</div>
              </div>
              <button className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white hover:bg-cyan-500"><Handshake className="h-3.5 w-3.5" /> Hubungkan</button>
            </div>
          ))}
          {dirFiltered.length === 0 && <p className="py-8 text-center text-sm text-slate-400">Distributor tidak ditemukan</p>}
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={() => setCariOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Tutup</button>
        </div>
      </Modal>
    </div>
  );
}
