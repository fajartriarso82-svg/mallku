"use client";

import { useState } from "react";
import { Store, Landmark, Settings, Users, KeyRound, MapPin, Truck, Bike, Plus, Info, Upload } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { StatusBadge } from "@/components/distributor/status-badge";
import { cn } from "@/lib/utils";

type Tab = "profil" | "dokumen" | "rekening" | "mp" | "staff" | "password";
const staff = [
  { id: "s1", nama: "Rina Kasir", email: "rina@tokob.com", role: "Kasir", status: "AKTIF" },
  { id: "s2", nama: "Budi Gudang", email: "budi@tokob.com", role: "Gudang", status: "AKTIF" },
];

export default function PengaturanTokoPage() {
  const [tab, setTab] = useState<Tab>("profil");
  const [kirimSendiri, setKirimSendiri] = useState(true);
  const [biteship, setBiteship] = useState(true);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profil", label: "Profil & Alamat", icon: <Store className="h-4 w-4" /> },
    { id: "dokumen", label: "Dokumen", icon: <Upload className="h-4 w-4" /> },
    { id: "rekening", label: "Rekening", icon: <Landmark className="h-4 w-4" /> },
    { id: "mp", label: "Pengaturan Toko MP", icon: <Settings className="h-4 w-4" /> },
    { id: "staff", label: "Staff", icon: <Users className="h-4 w-4" /> },
    { id: "password", label: "Ganti Password", icon: <KeyRound className="h-4 w-4" /> },
  ];

  return (
    <div>
      <PageHeader title="Pengaturan Akun" description="Kelola profil toko, alamat, dan pengaturan Marketplace" />

      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition", tab === t.id ? "bg-[#0e2238] text-white" : "text-slate-500 hover:bg-slate-100")}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      {tab === "profil" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold text-slate-800">Data Toko</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Toko</span>
                <input defaultValue="Toko Berkah Abadi" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Pemilik / PIC</span>
                <input defaultValue="H. Ahmad Fauzi" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Deskripsi Toko</span>
                <textarea rows={3} placeholder="Tampil di halaman toko Marketplace Anda" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><MapPin className="h-4 w-4" /></span>
              <h3 className="text-sm font-bold text-slate-800">Alamat Utama Toko</h3>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block"><span className="mb-1 block text-[11px] font-bold text-slate-500">Alamat Lengkap</span>
                <textarea rows={3} defaultValue="Jl. Pengayoman No. 12, Kec. Mamajang, Kota Makassar 90132" className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><span className="mb-1 block text-[11px] font-bold text-slate-500">Provinsi</span><input defaultValue="Sulawesi Selatan" className="w-full rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" /></label>
                <label className="block"><span className="mb-1 block text-[11px] font-bold text-slate-500">Kota/Kab</span><input defaultValue="Kota Makassar" className="w-full rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" /></label>
                <label className="block"><span className="mb-1 block text-[11px] font-bold text-slate-500">Kecamatan</span><input defaultValue="Mamajang" className="w-full rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" /></label>
                <label className="block"><span className="mb-1 block text-[11px] font-bold text-slate-500">Kode Pos</span><input defaultValue="90132" className="w-full rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" /></label>
              </div>
              <p className="flex items-start gap-1.5 text-[11px] text-amber-700"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Alamat utama dipakai untuk menentukan visibilitas toko Anda ke pembeli lokal.</p>
            </div>
          </div>
        </div>
      )}
      {tab === "dokumen" && (
        <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-800">Dokumen Legalitas</h3>
          <div className="space-y-3">
            {[{ n: "NIB (Nomor Induk Berusaha)", ok: true }, { n: "NPWP", ok: true }, { n: "Foto Identitas (KTP)", ok: true }, { n: "Surat Izin Usaha / NIB Toko", ok: false }].map((d) => (
              <div key={d.n} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <div className="flex-1"><p className="text-xs font-bold text-slate-700">{d.n}</p><p className="text-[11px] text-slate-400">{d.ok ? "Terunggah" : "Belum diunggah"}</p></div>
                <button className={cn("rounded-lg px-3 py-1.5 text-[11px] font-semibold", d.ok ? "text-emerald-600 hover:bg-emerald-50" : "text-amber-600 hover:bg-amber-50")}><Upload className="mr-1 inline h-3 w-3" />{d.ok ? "Ganti" : "Upload"}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "rekening" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[{ bank: "Bank BCA", no: "1234567890", an: "Toko Berkah Abadi", utama: true }, { bank: "Bank Mandiri", no: "9876543210", an: "Toko Berkah Abadi", utama: false }].map((r) => (
            <div key={r.no} className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0057a8] to-[#003a70] p-6 text-white shadow-lg">
              <div className="flex items-center justify-between"><Landmark className="h-6 w-6" />{r.utama && <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">UTAMA</span>}</div>
              <p className="mt-6 text-xl font-extrabold tracking-widest">{r.no}</p>
              <div className="mt-4 flex justify-between text-xs text-white/70"><p className="font-bold text-white">{r.bank}</p><p>{r.an}</p></div>
            </div>
          ))}
          <button className="flex min-h-36 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-amber-400 hover:text-amber-500"><Plus className="h-5 w-5" /> Tambah Rekening</button>
        </div>
      )}
      {tab === "mp" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-slate-800">Jam Operasional</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="block"><span className="mb-1 block text-[11px] font-bold text-slate-500">Buka</span><input type="time" defaultValue="08:00" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="block"><span className="mb-1 block text-[11px] font-bold text-slate-500">Tutup</span><input type="time" defaultValue="21:00" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">Pesanan di luar jam akan diproses pada jam buka berikutnya.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-sm font-bold text-slate-800">Metode Pengiriman</h3>
            <p className="mb-4 text-xs text-slate-400">Pilih cara mengirim pesanan ke pembeli</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600"><Truck className="h-4 w-4" /></span>
                  <div><p className="text-sm font-bold text-slate-700">Kirim Sendiri</p><p className="text-[11px] text-slate-400">Anda antar sendiri / kurir toko</p></div>
                </div>
                <button onClick={() => setKirimSendiri(!kirimSendiri)} className={cn("relative h-6 w-11 rounded-full transition", kirimSendiri ? "bg-emerald-500" : "bg-slate-200")} aria-label="Toggle Kirim Sendiri">
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", kirimSendiri ? "left-[22px]" : "left-0.5")} />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600"><Bike className="h-4 w-4" /></span>
                  <div><p className="text-sm font-bold text-slate-700">Gunakan BiteShip</p><p className="text-[11px] text-slate-400">Ongkir otomatis & kurir ekspedisi</p></div>
                </div>
                <button onClick={() => setBiteship(!biteship)} className={cn("relative h-6 w-11 rounded-full transition", biteship ? "bg-emerald-500" : "bg-slate-200")} aria-label="Toggle BiteShip">
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", biteship ? "left-[22px]" : "left-0.5")} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "staff" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div><h3 className="text-sm font-bold text-slate-800">Staff / Sub-user</h3><p className="text-xs text-slate-400">Kelola akses tim</p></div>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#0e2238] px-3.5 py-2 text-sm font-bold text-white hover:bg-[#123050]"><Plus className="h-4 w-4" /> Tambah Staff</button>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-[11px] uppercase text-slate-400"><th className="px-3 py-2">Nama</th><th className="px-3 py-2">Email</th><th className="px-3 py-2">Role</th><th className="px-3 py-2">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {staff.map((s) => (
                <tr key={s.id}><td className="px-3 py-3 font-semibold text-slate-700">{s.nama}</td><td className="px-3 py-3 text-slate-500">{s.email}</td><td className="px-3 py-3"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{s.role}</span></td><td className="px-3 py-3"><StatusBadge status={s.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "password" && (
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-800">Ganti Password</h3>
          <div className="space-y-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Password Lama</span><input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Password Baru</span><input type="password" placeholder="Minimal 8 karakter" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Konfirmasi Password Baru</span><input type="password" placeholder="Ulangi password" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
            <button className="w-full rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Perbarui Password</button>
          </div>
        </div>
      )}
    </div>
  );
}
