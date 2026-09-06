"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ShoppingCart, Store, Plus, PackageCheck } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { formatRupiah, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { dummyKatalogSCM, dummyStokDiterima } from "@/lib/dummy/toko-data";
import type { StokDiterima } from "@/lib/dummy/toko-types";

const stokCols: Column<StokDiterima>[] = [
  { key: "produk", header: "Produk", render: (r) => <div><p className="font-semibold text-slate-800">{r.produk}</p><p className="font-mono text-[11px] text-slate-400">{r.sku} · {r.nomorPO}</p></div> },
  { key: "dist", header: "Distributor", render: (r) => <span className="text-slate-600">{r.distributor}</span> },
  { key: "tgl", header: "Diterima", sortable: true, sortValue: (r) => r.tanggalTerima, render: (r) => <span className="text-slate-500">{formatDate(r.tanggalTerima)}</span> },
  { key: "qtyTerima", header: "Qty Diterima", sortable: true, sortValue: (r) => r.qtyDiterima, render: (r) => <span className="font-semibold text-slate-700">{r.qtyDiterima} {r.satuan}</span> },
  { key: "qtyTayang", header: "Sudah ke MP", sortable: true, sortValue: (r) => r.qtyDitayangkan, render: (r) => <span className="text-sky-600 font-semibold">{r.qtyDitayangkan}</span> },
  { key: "qtySisa", header: "Sisa", sortable: true, sortValue: (r) => r.qtySisa, render: (r) => <span className={cn("font-bold", r.qtySisa > 0 ? "text-emerald-600" : "text-slate-400")}>{r.qtySisa}</span> },
  {
    key: "aksi", header: "",
    render: (r) => r.qtySisa > 0 ? (
      <button className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-sky-500"><Store className="h-3.5 w-3.5" /> Tayangkan</button>
    ) : <span className="text-[11px] text-slate-300">Habis ditayangkan</span>,
  },
];

export default function ProdukTokoPage() {
  const [tab, setTab] = useState<"katalog" | "stok">("katalog");
  const [q, setQ] = useState("");
  const [dist, setDist] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const dists = useMemo(() => Array.from(new Set(dummyKatalogSCM.map((p) => p.distributor))), []);
  const filtered = useMemo(() => dummyKatalogSCM.filter((p) => {
    const okQ = !q || p.nama.toLowerCase().includes(q.toLowerCase()) || p.kode.toLowerCase().includes(q.toLowerCase());
    const okD = !dist || p.distributor === dist;
    return okQ && okD;
  }), [q, dist]);
  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div>
      <PageHeader title="SCM — Manajemen Produk" description="Belanja dari katalog distributor & kelola stok yang diterima" />

      {/* Tab SCM produk */}
      <div className="mb-5 flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <button onClick={() => setTab("katalog")} className={cn("flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition", tab === "katalog" ? "bg-cyan-600 text-white" : "text-slate-500 hover:bg-slate-100")}>
          Katalog Distributor
        </button>
        <button onClick={() => setTab("stok")} className={cn("flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition", tab === "stok" ? "bg-cyan-600 text-white" : "text-slate-500 hover:bg-slate-100")}>
          Stok Diterima
        </button>
      </div>

      {tab === "katalog" && (
        <>
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari produk distributor..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-cyan-400 focus:bg-white" />
            </div>
            <select value={dist} onChange={(e) => setDist(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-400">
              <option value="">Semua Distributor</option>
              {dists.map((d) => <option key={d}>{d}</option>)}
            </select>
            <Link href="/seller/po" className="relative inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-500">
              <ShoppingCart className="h-4 w-4" /> Keranjang PO
              {cartTotal > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">{cartTotal}</span>}
            </Link>
          </div>

          <p className="mb-3 text-xs font-semibold text-slate-400">{filtered.length} produk dari distributor mitra</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="flex h-24 items-center justify-center bg-gradient-to-br from-cyan-50 to-slate-50 text-4xl">{p.foto ?? "📦"}</div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-cyan-600">{p.distributor}</p>
                  <h3 className="mt-0.5 line-clamp-2 text-sm font-bold text-slate-800">{p.nama}</h3>
                  <p className="text-[11px] text-slate-400">{p.kategori} · stok {p.stok}</p>
                  <div className="mt-2 space-y-0.5">
                    {p.hargaTier.map((t, i) => (
                      <p key={i} className="text-[11px] text-slate-500">≥{t.minQty} → <span className="font-bold text-slate-700">{formatRupiah(t.harga)}</span></p>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <button onClick={() => setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))} className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white hover:bg-cyan-500">
                      <Plus className="h-3.5 w-3.5" /> Tambah ke PO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "stok" && (
        <>
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 p-3 text-xs text-cyan-800">
            <PackageCheck className="h-4 w-4 shrink-0" />
            <p><strong>Stok diterima</strong> adalah barang hasil PO yang sudah sampai. Tayangkan sisa stok ke Marketplace untuk mulai menjual eceran.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <DataTable columns={stokCols} data={dummyStokDiterima} rowKey={(r) => r.id} pageSize={8} />
          </div>
        </>
      )}
    </div>
  );
}
