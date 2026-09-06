"use client";

import { useMemo, useState } from "react";
import { Search, ArrowDownToLine, ArrowUpFromLine, PackagePlus, PackageOpen, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatDate } from "@/lib/utils";
import { dummyMutasiStok } from "@/lib/dummy/data-stok";
import { dummyProduk } from "@/lib/dummy/data-produk";
import type { MutasiStok } from "@/lib/dummy/types";

const columns: Column<MutasiStok>[] = [
  { key: "tanggal", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-600">{formatDate(r.tanggal)}</span> },
  { key: "sku", header: "SKU", render: (r) => <span className="font-mono text-xs font-semibold text-slate-500">{r.sku}</span> },
  { key: "produk", header: "Produk", render: (r) => <span className="font-medium text-slate-700">{r.namaProduk}</span> },
  { key: "jenis", header: "Jenis", render: (r) => <StatusBadge status={r.jenis} /> },
  {
    key: "jumlah",
    header: "Jumlah",
    sortable: true,
    sortValue: (r) => r.jumlah,
    render: (r) => (
      <span className={r.jumlah > 0 ? "font-bold text-emerald-600" : r.jumlah < 0 ? "font-bold text-rose-600" : "font-semibold text-slate-600"}>
        {r.jumlah > 0 ? `+${r.jumlah}` : r.jumlah}
      </span>
    ),
  },
  { key: "saldo", header: "Saldo Akhir", sortable: true, sortValue: (r) => r.saldoAkhir, render: (r) => <span className="font-semibold text-slate-800">{r.saldoAkhir}</span> },
  { key: "ket", header: "Keterangan", render: (r) => <span className="text-xs text-slate-500">{r.keterangan}</span> },
];

export default function StokPage() {
  const [q, setQ] = useState("");
  const [jenis, setJenis] = useState("");
  const [modal, setModal] = useState<null | "MASUK" | "KOREKSI">(null);

  const filtered = useMemo(() => dummyMutasiStok.filter((m) => {
    const okQ = !q || m.namaProduk.toLowerCase().includes(q.toLowerCase()) || m.sku.toLowerCase().includes(q.toLowerCase());
    const okJ = !jenis || m.jenis === jenis;
    return okQ && okJ;
  }), [q, jenis]);

  const totalStok = dummyProduk.reduce((a, p) => a + p.stok, 0);
  const kritis = dummyProduk.filter((p) => p.stok <= p.stokMinimum).length;

  return (
    <div>
      <PageHeader title="Manajemen Stok" description="Pantau mutasi & saldo stok gudang" />

      {/* Ringkasan */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><PackageOpen className="h-5 w-5" /></div>
          <div><p className="text-xs font-semibold text-slate-400">Total Stok Gudang</p><p className="text-xl font-extrabold text-slate-800">{totalStok.toLocaleString("id-ID")}</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><AlertTriangle className="h-5 w-5" /></div>
          <div><p className="text-xs font-semibold text-slate-400">Produk Stok Kritis</p><p className="text-xl font-extrabold text-slate-800">{kritis}</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><PackagePlus className="h-5 w-5" /></div>
          <div><p className="text-xs font-semibold text-slate-400">Barang Masuk (30 hari)</p><p className="text-xl font-extrabold text-slate-800">48</p></div>
        </div>
      </div>

      {/* Toolbar + aksi */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari produk / SKU..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:bg-white" />
        </div>
        <select value={jenis} onChange={(e) => setJenis(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400">
          <option value="">Semua Jenis</option>
          <option value="MASUK">Masuk</option>
          <option value="KELUAR">Keluar</option>
          <option value="KOREKSI">Koreksi</option>
        </select>
        <div className="flex gap-2">
          <button onClick={() => setModal("MASUK")} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-sm font-bold text-white hover:bg-emerald-500">
            <ArrowDownToLine className="h-4 w-4" /> Stok Masuk
          </button>
          <button onClick={() => setModal("KOREKSI")} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <ArrowUpFromLine className="h-4 w-4" /> Koreksi Stok
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} />
      </div>

      <Modal open={modal !== null} onClose={() => setModal(null)} title={modal === "MASUK" ? "Tambah Stok Masuk" : "Koreksi Stok"} description="Isi detail mutasi" size="md"
        footer={<>
          <button onClick={() => setModal(null)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
          <button onClick={() => setModal(null)} className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Simpan</button>
        </>}>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">Produk</span>
            <select className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400">
              {dummyProduk.map((p) => <option key={p.id}>{p.nama} ({p.kode})</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Jumlah {modal === "KOREKSI" ? "±" : "Masuk"}</span>
              <input type="number" min="1" placeholder="0" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Tanggal</span>
              <input type="date" defaultValue="2026-09-06" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">Keterangan</span>
            <textarea rows={3} placeholder="cth: Pembelian dari pabrik / koreksi opname"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" />
          </label>
        </div>
      </Modal>
    </div>
  );
}
