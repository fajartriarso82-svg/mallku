"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Plus, Search, Trash2, UserRound, X } from "lucide-react";
import ScmAccountReviewDrawer from "@/components/admin/scm-account-review-drawer";

type Profile = { namaToko?: string; namaUsaha?: string; alamatLengkap?: string; provinsi?: string; kabupatenKota?: string; kecamatan?: string; desa?: string | null; kodePos?: string | null; noNib?: string | null; noNpwp?: string | null; dokumenNibUrl?: string | null; dokumenNpwpUrl?: string | null; gudang: { id: string; nama: string; alamatLengkap: string; provinsi: string; kabupatenKota: string; kecamatan: string; desa?: string | null; kodePos?: string | null }[]; rekening: { id: string; bankNama: string; nomorRekening: string; namaPemilik: string; utama: boolean }[] };
type Account = { id: string; name: string | null; email: string; role: "TOKO" | "DISTRIBUTOR"; statusAkun: string; reviewStatus?: string; telepon: string | null; createdAt: string; tokoProfile?: Profile | null; distributorProfile?: Profile | null };

const statusLabels: Record<string, string> = { MENUNGGU_VERIFIKASI: "Menunggu Review", AKTIF: "Aktif", DITOLAK: "Ditolak", NONAKTIF: "Nonaktif" };

export default function ScmUserManagementPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Account | null>(null);
  const [message, setMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);

  const loadAccounts = () => fetch("/api/admin/akun").then((response) => response.json()).then(setAccounts).catch(() => setMessage("Data akun belum dapat dimuat."));
  useEffect(() => { loadAccounts(); }, []);

  const getReviewStatus = (account: Account) => account.reviewStatus || account.statusAkun;
  const filtered = useMemo(() => accounts.filter((account) => {
    const profile = account.tokoProfile || account.distributorProfile;
    const name = profile?.namaToko || profile?.namaUsaha || "";
    return (statusFilter === "ALL" || getReviewStatus(account) === statusFilter) && (roleFilter === "ALL" || account.role === roleFilter) && `${name} ${account.email} ${account.name || ""}`.toLowerCase().includes(search.toLowerCase());
  }), [accounts, roleFilter, search, statusFilter]);

  const updateStatus = async (account: Account, statusAkun: string) => {
    const action = statusAkun === "AKTIF" ? "approve" : statusAkun === "DITOLAK" ? "menolak" : "menonaktifkan";
    if (!window.confirm(`Apakah Anda yakin ingin ${action} akun ${account.email}?`)) return;
    const response = await fetch("/api/admin/akun", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: account.id, statusAkun }) });
    if (!response.ok) { setMessage("Perubahan status gagal disimpan."); return; }
    setAccounts((current) => current.map((item) => item.id === account.id ? { ...item, statusAkun } : item));
    setSelected(null);
    setMessage(`Status akun ${account.email} berhasil diperbarui.`);
  };

  const deleteAccount = async (account: Account, password: string) => {
    const response = await fetch("/api/admin/akun", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: account.id, password }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "Akun gagal dihapus."); return; }
    setAccounts((current) => current.filter((item) => item.id !== account.id));
    setDeleteTarget(null);
    setMessage(`Akun ${account.email} dan seluruh datanya berhasil dihapus.`);
  };

  const count = (status: string) => accounts.filter((account) => status === "ALL" ? true : getReviewStatus(account) === status).length;
  return <div className="space-y-6">
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">SCM / Akun</p><h1 className="mt-2 text-2xl font-extrabold text-slate-800">Manajemen Akun SCM</h1><p className="mt-1 text-sm text-slate-500">Kelola registrasi, verifikasi, dan akses distributor serta toko.</p></div><a href="/scm/register" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700"><Plus className="h-4 w-4" /> Buka Registrasi SCM</a></header>
    {message && <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">{message}</div>}
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{[["ALL", "Total Akun", "text-slate-800"], ["BELUM_LENGKAP", "Belum Submit Dokumen", "text-slate-600"], ["MENUNGGU_VERIFIKASI", "Menunggu Review", "text-amber-700"], ["AKTIF", "Akun Aktif", "text-emerald-700"], ["DITOLAK", "Ditolak", "text-red-700"]].map(([key, label, color]) => <button key={key} onClick={() => setStatusFilter(key)} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-sky-300"><p className="text-xs font-semibold text-slate-500">{label}</p><p className={`mt-1 text-2xl font-extrabold ${color}`}>{count(key)}</p></button>)}</div>
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama usaha, email, atau PIC" className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-sky-400" /></label><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option value="ALL">Semua tipe akun</option><option value="TOKO">Toko</option><option value="DISTRIBUTOR">Distributor</option></select><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option value="ALL">Semua status</option><option value="MENUNGGU_VERIFIKASI">Menunggu Review</option><option value="AKTIF">Aktif</option><option value="DITOLAK">Ditolak</option><option value="NONAKTIF">Nonaktif</option></select></div><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Usaha / PIC</th><th className="px-5 py-3">Tipe</th><th className="px-5 py-3">Kontak</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Aksi</th></tr></thead><tbody>{filtered.map((account) => { const profile = account.tokoProfile || account.distributorProfile; return <tr key={account.id} className="border-t border-slate-100"><td className="px-5 py-4"><p className="font-semibold text-slate-800">{profile?.namaToko || profile?.namaUsaha || "Belum dilengkapi"}</p><p className="text-xs text-slate-500">{account.name || "PIC belum diisi"}</p></td><td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{account.role}</span></td><td className="px-5 py-4 text-slate-600"><p>{account.email}</p><p className="text-xs">{account.telepon || "-"}</p></td><td className="px-5 py-4"><Status status={account.statusAkun} /></td><td className="px-5 py-4 text-right"><button onClick={() => setSelected(account)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-sky-400 hover:text-sky-700"><Eye className="h-3.5 w-3.5" /> Detail</button></td></tr>; })}</tbody></table>{filtered.length === 0 && <div className="p-10 text-center text-sm text-slate-500"><UserRound className="mx-auto mb-2 h-6 w-6" />Belum ada akun sesuai filter.</div>}</div></section>
    {selected && <ScmAccountReviewDrawer account={selected} onClose={() => setSelected(null)} onStatus={updateStatus} onDelete={() => setDeleteTarget(selected)} />}
    {deleteTarget && <DeleteDialog account={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={deleteAccount} />}
  </div>;
}

function Status({ status }: { status: string }) {
  const label = status === "BELUM_LENGKAP" ? "Belum Submit Dokumen" : statusLabels[status] || status;
  const color = status === "AKTIF" ? "bg-emerald-100 text-emerald-700" : status === "DITOLAK" ? "bg-red-100 text-red-700" : status === "NONAKTIF" ? "bg-slate-200 text-slate-700" : status === "BELUM_LENGKAP" ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-700";
  return <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${color}`}>{label}</span>;
}

function DeleteDialog({ account, onCancel, onConfirm }: { account: Account; onCancel: () => void; onConfirm: (account: Account, password: string) => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async () => { setBusy(true); await onConfirm(account, password); setBusy(false); };
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-red-600">Tindakan permanen</p><h2 className="mt-1 text-lg font-extrabold text-slate-900">Hapus akun ini?</h2></div><button onClick={onCancel} aria-label="Tutup"><X className="h-5 w-5 text-slate-500" /></button></div><p className="mt-4 text-sm leading-relaxed text-slate-600">Semua data akun <strong>{account.email}</strong>, profil, gudang, rekening, dokumen Storage, dan data terkait akan dihapus permanen.</p><label className="mt-5 block text-sm font-semibold text-slate-700">Password admin<input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Masukkan password Anda" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" /></label><div className="mt-6 flex justify-end gap-2"><button onClick={onCancel} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Batal</button><button onClick={submit} disabled={!password || busy} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"><Trash2 className="h-4 w-4" />{busy ? "Menghapus..." : "Hapus Permanen"}</button></div></div></div>;
}

