"use client";

import { useMemo, useState } from "react";
import { Search, Building2, Handshake, MapPin } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah } from "@/lib/utils";
import { dummyDistributorPartner } from "@/lib/dummy/data-jaringan";
import type { DistributorPartner } from "@/lib/dummy/types";

const columns: Column<DistributorPartner>[] = [
  {
    key: "nama", header: "Distributor Partner", sortable: true, sortValue: (r) => r.nama,
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Building2 className="h-4 w-4" /></div>
        <div className="min-w-0"><p className="truncate font-semibold text-slate-800">{r.nama}</p><p className="text-[11px] text-slate-400">{r.kota}, {r.provinsi}</p></div>
      </div>
    ),
  },
  {
    key: "kategori", header: "Kategori",
    render: (r) => (
      <div className="flex flex-wrap gap-1">
        {r.kategori.map((k) => <span key={k} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{k}</span>)}
      </div>
    ),
  },
  { key: "transaksi", header: "Transaksi", sortable: true, sortValue: (r) => r.totalTransaksi, render: (r) => <span className="font-semibold text-slate-700">{r.totalTransaksi}x</span> },
  { key: "omzet", header: "Total Omzet", sortable: true, sortValue: (r) => r.totalOmzet, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.totalOmzet)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "sejak", header: "Terhubung Sejak", render: (r) => <span className="text-slate-500">{r.terhubungSejak}</span> },
];

export default function PartnerPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [hubungOpen, setHubungOpen] = useState(false);
  const filtered = useMemo(() => dummyDistributorPartner.filter((d) => {
    const okQ = !q || d.nama.toLowerCase().includes(q.toLowerCase());
    const okS = !status || d.status === status;
    return okQ && okS;
  }), [q, status]);

  return (
    <div>
      <PageHeader title="List Distributor Partner" description={`Sesama distributor yang terhubung (${dummyDistributorPartner.length})`}
        actions={<button onClick={() => setHubungOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123050]"><Handshake className="h-4 w-4" /> Hubungkan</button>} />

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari distributor..."
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

      <Modal open={hubungOpen} onClose={() => setHubungOpen(false)} title="Hubungkan Distributor Partner" description="Terhubung dengan distributor lain untuk saling membeli stok" size="md"
        footer={<>
          <button onClick={() => setHubungOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
          <button onClick={() => setHubungOpen(false)} className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Kirim Permintaan</button>
        </>}>
        <div className="space-y-4">
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Distributor / Perusahaan</span>
            <input placeholder="cth: PT Sumber Pangan" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kota</span>
              <div className="relative"><MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" /><input placeholder="Surabaya" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-sky-400" /></div></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">No. NPWP (opsional)</span>
              <input placeholder="00.000.000.0-000.000" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          </div>
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kategori Produk</span>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sky-400">
              <option>Sembako</option><option>Minuman</option><option>Makanan</option><option>Bumbu</option><option>Perawatan Tubuh</option><option>Perlengkapan Rumah</option>
            </select></label>
        </div>
      </Modal>
    </div>
  );
}
