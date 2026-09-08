"use client";

import { useEffect, useState } from "react";
import { Edit3, Plus, Trash2, X } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

type MasterType = "BANK" | "UNIT" | "BRAND" | "SUB_BRAND" | "CATEGORY" | "SUB_CATEGORY";
type Item = { id: string; nama: string; singkatan?: string; brand?: { id: string; nama: string }; kategoriMaster?: { id: string; nama: string } };
type Settings = { id?: string; minimalPenarikan: number; biayaBankPenarikan: number; batasNilaiPg: number; biayaPayoutDibawahBatas: number; biayaPayoutDiatasBatas: number; limitPoDistributor: number; limitPoToko: number };
type ApiData = { banks: Item[]; units: Item[]; brands: Item[]; subBrands: Item[]; categories: Item[]; subCategories: Item[]; settings: Settings | null };

const emptySettings: Settings = { minimalPenarikan: 0, biayaBankPenarikan: 0, batasNilaiPg: 0, biayaPayoutDibawahBatas: 0, biayaPayoutDiatasBatas: 0, limitPoDistributor: 0, limitPoToko: 0 };
const fallback: ApiData = {
  banks: ["BCA", "BRI", "Mandiri", "BNI", "Danamon"].map((nama, index) => ({ id: `bank-${index}`, nama })),
  units: ["Pcs", "Dus", "Karton", "Kg", "Liter"].map((nama, index) => ({ id: `unit-${index}`, nama, singkatan: nama.slice(0, 3).toUpperCase() })),
  brands: ["Nusantara", "Berkah Jaya", "Mitra Pangan"].map((nama, index) => ({ id: `brand-${index}`, nama })),
  subBrands: [
    { id: "sub-1", nama: "Premium", brand: { id: "brand-0", nama: "Nusantara" } },
    { id: "sub-2", nama: "Hemat", brand: { id: "brand-1", nama: "Berkah Jaya" } },
    { id: "sub-3", nama: "Pilihan", brand: { id: "brand-2", nama: "Mitra Pangan" } },
  ],
  categories: ["Sembako", "Minuman", "Perawatan Rumah", "Pertanian"].map((nama, index) => ({ id: `category-${index}`, nama })),
  subCategories: [
    { id: "subcat-1", nama: "Beras", kategoriMaster: { id: "category-0", nama: "Sembako" } },
    { id: "subcat-2", nama: "Minyak Goreng", kategoriMaster: { id: "category-0", nama: "Sembako" } },
    { id: "subcat-3", nama: "Air Mineral", kategoriMaster: { id: "category-1", nama: "Minuman" } },
  ],
  settings: emptySettings,
};

const tabs: { key: MasterType | "SETTINGS"; label: string; title: string }[] = [
  { key: "BANK", label: "Bank", title: "List Bank" },
  { key: "UNIT", label: "Unit", title: "Unit Produk" },
  { key: "BRAND", label: "Brand", title: "Brand" },
  { key: "SUB_BRAND", label: "Sub Brand", title: "Sub Brand" },
  { key: "CATEGORY", label: "Kategori", title: "Kategori" },
  { key: "SUB_CATEGORY", label: "Sub Kategori", title: "Sub Kategori" },
  { key: "SETTINGS", label: "Pengaturan", title: "Pengaturan SCM" },
];

export default function MasterScmPage() {
  const [active, setActive] = useState<MasterType | "SETTINGS">("BANK");
  const [data, setData] = useState<ApiData>(fallback);
  const [drawer, setDrawer] = useState<{ type: MasterType; item?: Item } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: MasterType; item: Item } | null>(null);
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/admin/scm/master").then(async (response) => {
      if (!response.ok) return;
      const next = await response.json() as ApiData;
      setData(next);
      if (next.settings) setSettings({ ...emptySettings, ...next.settings });
    }).catch(() => undefined);
  }, []);

  const items = active === "BANK" ? data.banks : active === "UNIT" ? data.units : active === "BRAND" ? data.brands : active === "SUB_BRAND" ? data.subBrands : active === "CATEGORY" ? data.categories : data.subCategories;
  const tab = tabs.find((entry) => entry.key === active)!;

  async function removeItem() {
    if (!deleteTarget) return;
    const response = await fetch("/api/admin/scm/master", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: deleteTarget.type, id: deleteTarget.item.id }) });
    if (response.ok) {
      setData((current) => ({ ...current, [collectionKey(deleteTarget.type)]: current[collectionKey(deleteTarget.type)].filter((item) => item.id !== deleteTarget.item.id) }));
      setNotice("Data berhasil dihapus.");
    }
    setDeleteTarget(null);
  }

  async function saveItem(type: MasterType, values: Record<string, string>, id?: string) {
    const response = await fetch("/api/admin/scm/master", { method: id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, id, ...values }) });
    if (!response.ok) { setNotice("Data belum dapat disimpan. Pastikan database sudah disinkronkan."); return; }
    const saved = await response.json();
    const key = collectionKey(type);
    setData((current) => ({ ...current, [key]: id ? current[key].map((item) => item.id === id ? saved : item) : [...current[key], saved] }));
    setDrawer(null);
    setNotice("Data berhasil disimpan.");
  }

  async function saveSettings() {
    const response = await fetch("/api/admin/scm/master", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "SETTINGS", ...settings }) });
    if (response.ok) { setSettings(await response.json()); setNotice("Pengaturan berhasil disimpan."); }
  }

  return (
    <div className="space-y-5">
      <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">SCM</p><h1 className="mt-2 text-2xl font-extrabold text-slate-800">Master SCM</h1><p className="mt-1 text-sm text-slate-500">Kelola referensi operasional dan aturan transaksi SCM.</p></div>
      {notice && <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">{notice}</div>}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200">{tabs.map((entry) => <button key={entry.key} onClick={() => setActive(entry.key)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${active === entry.key ? "border-sky-600 text-sky-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}>{entry.label}</button>)}</div>
      {active === "SETTINGS" ? <SettingsPanel settings={settings} setSettings={setSettings} onSave={saveSettings} /> : <section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-bold text-slate-800">{tab.title}</h2><p className="text-xs text-slate-500">{items.length} data terdaftar</p></div><button onClick={() => setDrawer({ type: active })} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700"><Plus className="h-4 w-4" /> Tambah</button></div><div className="divide-y divide-slate-100">{items.map((item) => <div key={item.id} className="flex items-center justify-between px-5 py-4"><div><p className="text-sm font-semibold text-slate-800">{item.nama}</p><p className="text-xs text-slate-500">{item.singkatan || item.brand?.nama || item.kategoriMaster?.nama || "Aktif"}</p></div><div className="flex gap-1"><button onClick={() => setDrawer({ type: active, item })} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-sky-600" title="Edit"><Edit3 className="h-4 w-4" /></button><button onClick={() => setDeleteTarget({ type: active, item })} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Hapus"><Trash2 className="h-4 w-4" /></button></div></div>)}</div></section>}
      {drawer && <MasterDrawer type={drawer.type} item={drawer.item} brands={data.brands} categories={data.categories} onClose={() => setDrawer(null)} onSave={saveItem} />}
      {deleteTarget && <ConfirmDelete item={deleteTarget.item} onCancel={() => setDeleteTarget(null)} onConfirm={removeItem} />}
    </div>
  );
}

function collectionKey(type: MasterType) { return ({ BANK: "banks", UNIT: "units", BRAND: "brands", SUB_BRAND: "subBrands", CATEGORY: "categories", SUB_CATEGORY: "subCategories" } as const)[type]; }
function SettingsPanel({ settings, setSettings, onSave }: { settings: Settings; setSettings: (value: Settings) => void; onSave: () => void }) {
  const [open, setOpen] = useState(false);
  const field = (key: keyof Settings, label: string) => (
    <label className="space-y-1 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      <input type="number" min="0" value={settings[key] as number} onChange={(event) => setSettings({ ...settings, [key]: Number(event.target.value) })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" />
    </label>
  );
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div><h2 className="font-bold text-slate-800">Pengaturan Penarikan Dana & PO</h2><p className="text-xs text-slate-500">Nilai Rp 0 pada limit PO berarti tidak dibatasi.</p></div>
        <button onClick={() => setOpen(true)} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white">Edit Pengaturan</button>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2"><p>Minimal penarikan: <strong>{formatRupiah(settings.minimalPenarikan)}</strong></p><p>Batas nilai PG: <strong>{formatRupiah(settings.batasNilaiPg)}</strong></p><p>Limit PO distributor: <strong>{formatRupiah(settings.limitPoDistributor)}</strong></p><p>Limit PO toko: <strong>{formatRupiah(settings.limitPoToko)}</strong></p></div>
      {open && <div className="fixed inset-0 z-50 bg-slate-900/40"><button className="absolute inset-0" onClick={() => setOpen(false)} aria-label="Tutup drawer" /><aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-lg font-bold text-slate-800">Edit Pengaturan SCM</h2><button onClick={() => setOpen(false)} aria-label="Tutup"><X className="h-5 w-5 text-slate-500" /></button></div><div className="mt-6 space-y-4">{field("minimalPenarikan", "Minimal Penarikan (Rp)")}{field("biayaBankPenarikan", "Biaya Bank Penarikan (Rp)")}{field("batasNilaiPg", "Batas Nilai PG (Rp)")}{field("biayaPayoutDibawahBatas", "Biaya Payout Jika Di Bawah Batas (Rp)")}{field("biayaPayoutDiatasBatas", "Biaya Payout Jika Di Atas Batas (Rp)")}{field("limitPoDistributor", "Limit PO Per Tahun Distributor (Rp)")}{field("limitPoToko", "Limit PO Per Tahun Toko (Rp)")}<button onClick={() => { onSave(); setOpen(false); }} className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white">Simpan Pengaturan</button></div></aside></div>}
    </section>
  );
}
function MasterDrawer({ type, item, brands, categories, onClose, onSave }: { type: MasterType; item?: Item; brands: Item[]; categories: Item[]; onClose: () => void; onSave: (type: MasterType, values: Record<string, string>, id?: string) => void }) { const [nama, setNama] = useState(item?.nama || ""); const [singkatan, setSingkatan] = useState(item?.singkatan || ""); const [parentId, setParentId] = useState(item?.brand?.id || item?.kategoriMaster?.id || ""); const title = item ? "Edit" : "Tambah"; const needsParent = type === "SUB_BRAND" || type === "SUB_CATEGORY"; const options = type === "SUB_BRAND" ? brands : categories; return <div className="fixed inset-0 z-50 bg-slate-900/40"><button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Tutup drawer" /><aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-lg font-bold text-slate-800">{title} {tabs.find((tab) => tab.key === type)?.label}</h2><button onClick={onClose} aria-label="Tutup"><X className="h-5 w-5 text-slate-500" /></button></div><div className="mt-6 space-y-4"><label className="block text-sm font-semibold text-slate-700">Nama<input value={nama} onChange={(event) => setNama(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" /></label>{type === "UNIT" && <label className="block text-sm font-semibold text-slate-700">Singkatan<input value={singkatan} onChange={(event) => setSingkatan(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" /></label>}{needsParent && <label className="block text-sm font-semibold text-slate-700">Induk<select value={parentId} onChange={(event) => setParentId(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal"><option value="">Pilih induk</option>{options.map((option) => <option key={option.id} value={option.id}>{option.nama}</option>)}</select></label>}<button onClick={() => onSave(type, { nama, singkatan, parentId }, item?.id)} disabled={!nama || (needsParent && !parentId)} className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Simpan</button></div></aside></div>; }
function ConfirmDelete({ item, onCancel, onConfirm }: { item: Item; onCancel: () => void; onConfirm: () => void }) { return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><h2 className="text-lg font-bold text-slate-800">Hapus data?</h2><p className="mt-2 text-sm text-slate-600">Apakah Anda yakin ingin menghapus <strong>{item.nama}</strong>?</p><div className="mt-6 flex justify-end gap-2"><button onClick={onCancel} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">Batal</button><button onClick={onConfirm} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white">Ya, hapus</button></div></div></div>; }
