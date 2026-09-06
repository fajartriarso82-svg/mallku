"use client";

import { useMemo, useState } from "react";
import { Search, Building2, Star, ShoppingCart } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { formatRupiah } from "@/lib/utils";
import { dummyProdukKatalog } from "@/lib/dummy/data-orders";
import { cn } from "@/lib/utils";

export default function CariProdukPage() {
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("");
  const [dist, setDist] = useState("");
  const [minStok, setMinStok] = useState(false);

  const distributors = useMemo(() => Array.from(new Set(dummyProdukKatalog.map((p) => p.distributor))), []);
  const kategoris = useMemo(() => Array.from(new Set(dummyProdukKatalog.map((p) => p.kategoriMaster))), []);

  const filtered = useMemo(() => dummyProdukKatalog.filter((p) => {
    const okQ = !q || p.nama.toLowerCase().includes(q.toLowerCase()) || p.kode.toLowerCase().includes(q.toLowerCase());
    const okK = !kat || p.kategoriMaster === kat;
    const okD = !dist || p.distributor === dist;
    const okS = !minStok || p.stok > 0;
    return okQ && okK && okD && okS;
  }), [q, kat, dist, minStok]);

  return (
    <div>
      <PageHeader title="Cari Produk di Katalog SCM" description="Temukan & beli produk grosir dari distributor partner" />

      {/* Search + filter */}
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama produk / SKU..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:bg-white" />
          </div>
          <select value={kat} onChange={(e) => setKat(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400">
            <option value="">Kategori</option>
            {kategoris.map((k) => <option key={k}>{k}</option>)}
          </select>
          <select value={dist} onChange={(e) => setDist(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400">
            <option value="">Semua Distributor</option>
            {distributors.map((d) => <option key={d}>{d}</option>)}
          </select>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600">
            <input type="checkbox" checked={minStok} onChange={(e) => setMinStok(e.target.checked)} className="h-4 w-4 accent-sky-600" />
            Tersedia
          </label>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold text-slate-400">{filtered.length} produk ditemukan</p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-5xl">📦</div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Building2 className="h-3 w-3" /> {p.distributor}
              </div>
              <h3 className="mt-1 line-clamp-2 text-sm font-bold text-slate-800">{p.nama}</h3>
              <p className="text-[11px] text-slate-400">{p.kategoriMaster} · {p.subKategori} · {p.satuan}</p>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-0.5 rounded bg-amber-50 px-1.5 py-0.5 font-bold text-amber-600"><Star className="h-3 w-3 fill-current" /> 4.8</span>
                <span>{p.terjual} terjual</span>
              </div>
              <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[10px] text-slate-400">Harga Grosir</p>
                  <p className="text-base font-extrabold text-slate-800">{formatRupiah(p.harga)}</p>
                </div>
                <button className={cn("inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-white", p.stok > 0 ? "bg-sky-600 hover:bg-sky-500" : "cursor-not-allowed bg-slate-300")} disabled={p.stok <= 0}>
                  <ShoppingCart className="h-3.5 w-3.5" /> {p.stok > 0 ? "Beli" : "Habis"}
                </button>
              </div>
              <p className={cn("mt-2 text-[10px] font-semibold", p.stok > 0 ? "text-emerald-600" : "text-rose-500")}>
                Stok {p.stok > 0 ? `${p.stok} tersedia` : "habis"}
              </p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400">
            <Search className="mx-auto mb-2 h-10 w-10" />
            <p className="text-sm font-medium">Produk tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
