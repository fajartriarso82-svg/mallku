"use client";

import { useState } from "react";
import { Search, Pencil, Store, Lock, Boxes } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { dummyListingJual } from "@/lib/dummy/toko-data";
import type { ListingJual } from "@/lib/dummy/toko-types";

const columns: Column<ListingJual>[] = [
  {
    key: "produk", header: "Produk",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl">{r.foto ?? "🛍️"}</div>
        <div className="min-w-0"><p className="truncate font-semibold text-slate-800">{r.judulJual}</p><p className="text-[11px] text-slate-400">{r.namaProduk} · <span className="font-mono">{r.skuWarisan}</span></p></div>
      </div>
    ),
  },
  { key: "kategori", header: "Kategori MP", render: (r) => <span className="text-slate-600">{r.kategoriMP}</span> },
  { key: "harga", header: "Harga Jual", sortable: true, sortValue: (r) => r.hargaJual, render: (r) => <div><p className="font-bold text-slate-800">{formatRupiah(r.hargaJual)}</p><p className="text-[10px] text-emerald-600">margin {Math.round(((r.hargaJual - r.hargaSCM) / r.hargaSCM) * 100)}%</p></div> },
  { key: "stok", header: "Stok Tersedia", sortable: true, sortValue: (r) => r.stokTersedia, render: (r) => <span className={cn("font-bold", r.stokTersedia > 0 ? "text-slate-800" : "text-rose-500")}>{r.stokTersedia}</span> },
  { key: "terjual", header: "Terjual", sortable: true, sortValue: (r) => r.terjual, render: (r) => <span className="text-slate-600">{r.terjual}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "aksi", header: "",
    render: (r) => (
      <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
        <Pencil className="h-3.5 w-3.5" /> Edit
      </button>
    ),
  },
];

export default function ListingPage() {
  const [edit, setEdit] = useState<ListingJual | null>(null);

  return (
    <div>
      <PageHeader title="Marketplace — Manajemen Produk" description="Listing produk yang Anda jual ke pembeli akhir" />

      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        <Lock className="h-4 w-4 shrink-0" />
        <p><strong>SKU &amp; stok pokok</strong> diwarisi dari SCM (read-only). Anda bebas mengubah nama tampilan, harga jual, dan lainnya.</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input placeholder="Cari listing..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-amber-400 focus:bg-white" />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={dummyListingJual} rowKey={(r) => r.id} pageSize={8} onRowClick={(r) => setEdit(r)} />
      </div>

      {/* Edit modal */}
      <Modal open={edit !== null} onClose={() => setEdit(null)} title="Edit Listing Produk" description="Atur cara produk tampil di Marketplace" size="lg">
        {edit && (
          <div className="space-y-4">
            {/* Warisan SCM - readonly */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400"><Lock className="h-3.5 w-3.5" /> Warisan dari SCM (tidak bisa diubah)</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div><p className="text-[10px] text-slate-400">SKU</p><p className="font-mono text-sm font-bold text-slate-700">{edit.skuWarisan}</p></div>
                <div><p className="text-[10px] text-slate-400">Produk Pokok</p><p className="text-sm font-bold text-slate-700">{edit.namaProduk}</p></div>
                <div><p className="text-[10px] text-slate-400">Stok Pokok (SCM)</p><p className="text-sm font-bold text-slate-700 flex items-center gap-1"><Boxes className="h-3.5 w-3.5 text-slate-400" /> {edit.stokPokok}</p></div>
              </div>
            </div>

            {/* Editable */}
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Bisa Diedit Bebas</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Tampilan</span>
                <input defaultValue={edit.judulJual} className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Deskripsi</span>
                <textarea rows={3} placeholder="Deskripsi produk untuk pembeli..." className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kategori Tampilan</span>
                <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-400">
                  <option>{edit.kategoriMP}</option><option>Sembako</option><option>Makanan</option><option>Minuman</option><option>Perawatan</option>
                </select></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Harga Jual</span>
                <input type="number" defaultValue={edit.hargaJual} className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            </div>
            <div>
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Varian (opsional)</span>
              <div className="grid grid-cols-2 gap-2">
                {["varian-1", "varian-2"].map((v) => (
                  <div key={v} className="flex gap-2 rounded-lg border border-slate-200 p-2">
                    <input placeholder="Nama (cth: ukuran)" className="w-full rounded border border-slate-100 px-2 py-1.5 text-xs outline-none focus:border-amber-400" />
                    <input placeholder="+Rp" className="w-20 rounded border border-slate-100 px-2 py-1.5 text-xs outline-none focus:border-amber-400" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Foto Tambahan</span>
              <div className="flex gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400"><Store className="h-5 w-5" /></div>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">+</div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button onClick={() => setEdit(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Batal</button>
              <button onClick={() => setEdit(null)} className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-400">Simpan Listing</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
