"use client";

import { useEffect, useState } from "react";
import { Building2, FileText, Landmark, MapPin, Plus, Save, Trash2 } from "lucide-react";

type Address = { nama: string; alamatLengkap: string; provinsi: string; kabupatenKota: string; kecamatan: string; desa: string; kodePos: string };
type FormState = { namaUsaha: string; name: string; telepon: string; alamat: Address; gudang: Address[]; noNib: string; noNpwp: string; dokumenNibUrl: string; dokumenNpwpUrl: string; rekening: { bankNama: string; nomorRekening: string; namaPemilik: string } };
type DocumentType = "NIB" | "NPWP";

const blankAddress = (nama: string): Address => ({ nama, alamatLengkap: "", provinsi: "", kabupatenKota: "", kecamatan: "", desa: "", kodePos: "" });
const emptyForm: FormState = { namaUsaha: "", name: "", telepon: "", alamat: blankAddress("Alamat Utama"), gudang: [], noNib: "", noNpwp: "", dokumenNibUrl: "", dokumenNpwpUrl: "", rekening: { bankNama: "", nomorRekening: "", namaPemilik: "" } };

export default function AccountSettings({ role }: { role: "TOKO" | "DISTRIBUTOR" }) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [banks, setBanks] = useState<{ nama: string }[]>([]);
  const [tab, setTab] = useState<"profil" | "gudang" | "dokumen" | "rekening">("profil");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<DocumentType | null>(null);

  useEffect(() => {
    fetch("/api/scm/settings")
      .then((response) => response.json())
      .then((data) => {
        const profile = data.profile;
        if (!profile) return;
        setForm({
          namaUsaha: profile.namaToko || profile.namaUsaha || "",
          name: profile.user?.name || "",
          telepon: profile.user?.telepon || "",
          alamat: { nama: "Alamat Utama", alamatLengkap: profile.alamatLengkap || "", provinsi: profile.provinsi || "", kabupatenKota: profile.kabupatenKota || "", kecamatan: profile.kecamatan || "", desa: profile.desa || "", kodePos: profile.kodePos || "" },
          gudang: profile.gudang || [],
          noNib: profile.noNib || "",
          noNpwp: profile.noNpwp || "",
          dokumenNibUrl: profile.dokumenNibUrl || "",
          dokumenNpwpUrl: profile.dokumenNpwpUrl || "",
          rekening: profile.rekening?.[0] ? { bankNama: profile.rekening[0].bankNama, nomorRekening: profile.rekening[0].nomorRekening, namaPemilik: profile.rekening[0].namaPemilik } : emptyForm.rekening,
        });
        setBanks(data.banks || []);
      })
      .catch(() => setStatus("Data pengaturan belum dapat dimuat."))
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const updateAddress = (key: keyof Address, value: string) => setForm((current) => ({ ...current, alamat: { ...current.alamat, [key]: value } }));

  const save = async () => {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/scm/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    setStatus(response.ok ? "Data tersimpan. Pengajuan Anda menunggu verifikasi admin." : data.error || "Data belum dapat disimpan.");
    setSaving(false);
  };

  const uploadDocument = async (type: DocumentType, file?: File) => {
    if (!file) return;
    if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) { setStatus("File harus berformat PDF."); return; }
    if (file.size > 1024 * 1024) { setStatus("Ukuran file maksimal 1 MB."); return; }
    setUploading(type);
    const body = new FormData();
    body.append("type", type);
    body.append("file", file);
    const response = await fetch("/api/scm/documents", { method: "POST", body });
    const data = await response.json();
    if (response.ok) {
      setForm((current) => ({ ...current, [type === "NIB" ? "dokumenNibUrl" : "dokumenNpwpUrl"]: data.path }));
      setStatus(`File ${type} berhasil diunggah.`);
    } else setStatus(data.error || "File gagal diunggah.");
    setUploading(null);
  };

  if (loading) return <div className="p-8 text-sm text-slate-500">Memuat pengaturan...</div>;
  const tabs = [["profil", "Profil & Alamat", MapPin], ["gudang", "Gudang", Building2], ["dokumen", "Dokumen", FileText], ["rekening", "Rekening", Landmark]] as const;

  return <div className="space-y-5">
    <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">SCM</p><h1 className="mt-2 text-2xl font-extrabold text-slate-800">Pengaturan {role === "TOKO" ? "Toko" : "Distributor"}</h1><p className="mt-1 text-sm text-slate-500">Lengkapi data sebelum pengajuan akun ditinjau admin.</p></div>
    {status && <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">{status}</div>}
    <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2">{tabs.map(([key, label, Icon]) => <button key={key} onClick={() => setTab(key)} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${tab === key ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}><Icon className="h-4 w-4" />{label}</button>)}</div>
    {tab === "profil" && <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="mb-4 font-bold text-slate-800">Data Usaha dan Alamat Utama</h2><div className="grid gap-4 md:grid-cols-2"><Field label={role === "TOKO" ? "Nama Toko" : "Nama Perusahaan"} value={form.namaUsaha} onChange={(value) => update("namaUsaha", value)} /><Field label="Nama Pemilik / PIC" value={form.name} onChange={(value) => update("name", value)} /><Field label="Nomor Telepon / WA" value={form.telepon} onChange={(value) => update("telepon", value)} /><div /><AddressForm address={form.alamat} update={updateAddress} /></div><SaveButton onClick={save} saving={saving} /></section>}
    {tab === "gudang" && <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="font-bold text-slate-800">Alamat Gudang</h2><p className="text-xs text-slate-500">Maksimal 3 gudang.</p></div>{form.gudang.length < 3 && <button onClick={() => setForm((current) => ({ ...current, gudang: [...current.gudang, blankAddress(`Gudang ${current.gudang.length + 1}`)] }))} className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"><Plus className="h-4 w-4" /> Tambah Gudang</button>}</div>{form.gudang.map((address, index) => <div key={index} className="mt-5 rounded-xl border border-slate-200 p-4"><div className="mb-3 flex justify-between"><h3 className="font-semibold text-slate-700">{address.nama}</h3><button onClick={() => setForm((current) => ({ ...current, gudang: current.gudang.filter((_, itemIndex) => itemIndex !== index) }))} className="text-red-600" title="Hapus gudang"><Trash2 className="h-4 w-4" /></button></div><AddressForm address={address} update={(key, value) => setForm((current) => ({ ...current, gudang: current.gudang.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item) }))} /></div>)}<SaveButton onClick={save} saving={saving} /></section>}
    {tab === "dokumen" && <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="mb-4 font-bold text-slate-800">Dokumen Legalitas</h2><div className="grid gap-4 md:grid-cols-2"><Field label="Nomor NIB" value={form.noNib} onChange={(value) => update("noNib", value)} /><DocumentUpload label="File NIB" type="NIB" path={form.dokumenNibUrl} uploading={uploading === "NIB"} onUpload={uploadDocument} /><Field label="Nomor NPWP" value={form.noNpwp} onChange={(value) => update("noNpwp", value)} /><DocumentUpload label="File NPWP" type="NPWP" path={form.dokumenNpwpUrl} uploading={uploading === "NPWP"} onUpload={uploadDocument} /></div><p className="mt-4 text-xs text-slate-500">PDF saja, maksimal 1 MB per file.</p><SaveButton onClick={save} saving={saving} /></section>}
    {tab === "rekening" && <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="mb-4 font-bold text-slate-800">Rekening Pencairan</h2><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Bank<select value={form.rekening.bankNama} onChange={(event) => setForm((current) => ({ ...current, rekening: { ...current.rekening, bankNama: event.target.value } }))} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="">Pilih bank</option>{banks.map((bank) => <option key={bank.nama}>{bank.nama}</option>)}</select></label><Field label="Nomor Rekening" value={form.rekening.nomorRekening} onChange={(value) => setForm((current) => ({ ...current, rekening: { ...current.rekening, nomorRekening: value } }))} /><Field label="Nama Pemilik Rekening" value={form.rekening.namaPemilik} onChange={(value) => setForm((current) => ({ ...current, rekening: { ...current.rekening, namaPemilik: value } }))} /></div><SaveButton onClick={save} saving={saving} /></section>}
  </div>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block text-sm font-semibold text-slate-700">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" /></label>; }
function AddressForm({ address, update }: { address: Address; update: (key: keyof Address, value: string) => void }) { return <div className="grid gap-4 md:col-span-2 md:grid-cols-2"><label className="block text-sm font-semibold text-slate-700 md:col-span-2">Alamat Lengkap<textarea value={address.alamatLengkap} onChange={(event) => update("alamatLengkap", event.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" /></label><Field label="Provinsi" value={address.provinsi} onChange={(value) => update("provinsi", value)} /><Field label="Kabupaten / Kota" value={address.kabupatenKota} onChange={(value) => update("kabupatenKota", value)} /><Field label="Kecamatan" value={address.kecamatan} onChange={(value) => update("kecamatan", value)} /><Field label="Desa / Kelurahan" value={address.desa} onChange={(value) => update("desa", value)} /><Field label="Kode Pos" value={address.kodePos} onChange={(value) => update("kodePos", value)} /></div>; }
function DocumentUpload({ label, type, path, uploading, onUpload }: { label: string; type: DocumentType; path: string; uploading: boolean; onUpload: (type: DocumentType, file?: File) => void }) { return <label className="block text-sm font-semibold text-slate-700">{label}<input type="file" accept="application/pdf,.pdf" onChange={(event) => onUpload(type, event.target.files?.[0])} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" />{uploading && <span className="mt-1 block text-xs text-sky-600">Mengunggah...</span>}{path && !uploading && <span className="mt-1 block text-xs text-emerald-600">File tersimpan</span>}</label>; }
function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) { return <div className="mt-6 flex justify-end"><button onClick={onClick} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" />{saving ? "Menyimpan..." : "Simpan & Ajukan Verifikasi"}</button></div>; }
