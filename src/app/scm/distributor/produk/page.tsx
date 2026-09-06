"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Package, Upload, X } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah } from "@/lib/utils";
import { dummyProduk } from "@/lib/dummy/data-produk";
import type { ProdukDummy } from "@/lib/dummy/types";

const KATEGORI_MASTER = ["Sembako", "Minuman", "Makanan", "Bumbu", "Perawatan Tubuh", "Perlengkapan Rumah"];
const SUB_KATEGORI: Record<string, string[]> = {
  Sembako: ["Beras", "Minyak", "Gula", "Tepung", "Telur"],
  Minuman: ["Air Mineral", "Teh", "Kopi", "Susu", "Sirup"],
  Makanan: ["Mi Instan", "Biskuit", "Kerupuk", "Makanan Kaleng"],
  Bumbu: ["Kecap", "Saus", "Bumbu Instan"],
  "Perawatan Tubuh": ["Sabun", "Sampo", "Pasta Gigi"],
  "Perlengkapan Rumah": ["Tissue", "Pembersih", "Deterjen"],
};
const SATUAN = ["Karung", "Dus", "Karton", "Lusin", "Pcs", "Botol"];

const columns: Column<ProdukDummy>[] = [
  {
    key: "produk",
    header: "Produk",
    sortable: true,
    sortValue: (r) => r.nama,
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">{r.foto}</div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-800">{r.nama}</p>
          <p className="text-[11px] text-slate-400">{r.kode}</p>
        </div>
      </div>
    ),
  },
  { key: "kategori", header: "Kategori", render: (r) => <div><p className="text-slate-700">{r.kategoriMaster}</p><p className="text-[11px] text-slate-400">{r.subKategori}</p></div> },
  { key: "satuan", header: "Satuan", render: (r) => <span className="text-slate-600">{r.satuan}</span> },
  {
    key: "harga",
    header: "Harga Tier",
    sortable: true,
    sortValue: (r) => r.hargaTier[0]?.harga ?? 0,
    render: (r) => (
      <div className="space-y-0.5">
        {r.hargaTier.map((t, i) => (
          <p key={i} className="text-[11px] text-slate-500">
            ≥{t.minQty} <span className="text-slate-400">→</span> <span className="font-semibold text-slate-700">{formatRupiah(t.harga)}</span>
          </p>
        ))}
      </div>
    ),
  },
  {
    key: "stok",
    header: "Stok",
    sortable: true,
    sortValue: (r) => r.stok,
    render: (r) => {
      const kritis = r.stok <= r.stokMinimum;
      return (
        <div>
          <span className={kritis ? "font-bold text-rose-600" : "font-semibold text-slate-700"}>{r.stok}</span>
          <p className={kritis ? "text-[10px] font-semibold text-rose-500" : "text-[10px] text-slate-400"}>
            {kritis ? "⚠ Stok kritis" : `min. ${r.stokMinimum}`}
          </p>
        </div>
      );
    },
  },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "aksi",
    header: "Aksi",
    render: () => (
      <div className="flex items-center gap-1">
        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-sky-600" title="Edit"><Pencil className="h-4 w-4" /></button>
        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600" title="Hapus"><Trash2 className="h-4 w-4" /></button>
      </div>
    ),
  },
];

interface TierRow { minQty: string; harga: string; }

export default function ProdukSayaPage() {
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nama: "", kategoriMaster: "Sembako", subKategori: "Beras", satuan: "Dus", foto: "" });
  const [tiers, setTiers] = useState<TierRow[]>([{ minQty: "10", harga: "" }]);

  const filtered = useMemo(() => {
    return dummyProduk.filter((p) => {
      const okQ = !q || p.nama.toLowerCase().includes(q.toLowerCase()) || p.kode.toLowerCase().includes(q.toLowerCase());
      const okK = !kat || p.kategoriMaster === kat;
      return okQ && okK;
    });
  }, [q, kat]);

  const masterOptions = Object.keys(SUB_KATEGORI);

  return (
    <div>
      <PageHeader
        title="Produk Saya"
        description={`Kelola katalog produk grosir Anda (${filtered.length} produk)`}
        actions={
          <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#123050]">
            <Plus className="h-4 w-4" /> Tambah Produk
          </button>
        }
      />

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama / SKU produk..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:bg-white" />
        </div>
        <select value={kat} onChange={(e) => setKat(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400">
          <option value="">Semua Kategori</option>
          {masterOptions.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} />
      </div>

      {/* Modal Tambah Produk */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Tambah Produk Baru"
        description="Lengkapi informasi produk grosir Anda"
        size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
            <button onClick={() => setModalOpen(false)} className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Simpan Produk</button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Produk</span>
              <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="cth: Beras Premium 5kg"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Kategori Master</span>
              <select value={form.kategoriMaster} onChange={(e) => setForm({ ...form, kategoriMaster: e.target.value, subKategori: SUB_KATEGORI[e.target.value]?.[0] ?? "" })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400">
                {masterOptions.map((m) => <option key={m}>{m}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Sub Kategori</span>
              <select value={form.subKategori} onChange={(e) => setForm({ ...form, subKategori: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400">
                {(SUB_KATEGORI[form.kategoriMaster] ?? []).map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">Satuan</span>
              <select value={form.satuan} onChange={(e) => setForm({ ...form, satuan: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400">
                {SATUAN.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          {/* Upload foto */}
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">{form.foto || "📦"}</div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-600">Foto Produk</p>
              <p className="text-[11px] text-slate-400">PNG/JPG maks 2MB</p>
              <div className="mt-2 flex gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  <Upload className="h-3.5 w-3.5" /> Upload
                </button>
                <button onClick={() => setForm({ ...form, foto: "🧺" })} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">Pilih Emoji</button>
              </div>
            </div>
          </div>

          {/* Tier harga */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Harga Tier (per qty minimum)</span>
              <button onClick={() => setTiers([...tiers, { minQty: "", harga: "" }])} className="text-xs font-bold text-sky-600 hover:underline">+ Tambah Tier</button>
            </div>
            <div className="space-y-2">
              {tiers.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input value={t.minQty} onChange={(e) => setTiers(tiers.map((x, j) => (j === i ? { ...x, minQty: e.target.value } : x)))}
                    placeholder="Min qty" className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400" />
                  <input value={t.harga} onChange={(e) => setTiers(tiers.map((x, j) => (j === i ? { ...x, harga: e.target.value } : x)))}
                    placeholder="Harga (Rp)" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400" />
                  {tiers.length > 1 && (
                    <button onClick={() => setTiers(tiers.filter((_, j) => j !== i))} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500" aria-label="Hapus tier">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
