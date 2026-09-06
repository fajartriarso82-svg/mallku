"use client";

import { useState } from "react";
import { Building2, Landmark, Users, KeyRound, Plus, Pencil, Upload } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { dummyStaff } from "@/lib/dummy/data-finance";
import type { Staff } from "@/lib/dummy/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "profil" | "bank" | "staff" | "password";

const staffCols: Column<Staff>[] = [
  { key: "nama", header: "Nama", render: (r) => <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500 text-xs">{r.nama.charAt(0)}</div><div><p className="font-semibold text-slate-700">{r.nama}</p><p className="text-[11px] text-slate-400">{r.email}</p></div></div> },
  { key: "role", header: "Role", render: (r) => <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{r.role}</span> },
  { key: "telepon", header: "Telepon", render: (r) => <span className="text-slate-500">{r.telepon}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "last", header: "Terakhir Aktif", render: (r) => <span className="text-xs text-slate-500">{formatDate(r.terakhirAktif)}</span> },
];

export default function PengaturanPage() {
  const [tab, setTab] = useState<Tab>("profil");
  const [addStaffOpen, setAddStaffOpen] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profil", label: "Profil Usaha", icon: <Building2 className="h-4 w-4" /> },
    { id: "bank", label: "Rekening Bank", icon: <Landmark className="h-4 w-4" /> },
    { id: "staff", label: "Staff / Sub-user", icon: <Users className="h-4 w-4" /> },
    { id: "password", label: "Ganti Password", icon: <KeyRound className="h-4 w-4" /> },
  ];

  return (
    <div>
      <PageHeader title="Pengaturan Akun" description="Kelola profil usaha, rekening, staff, dan keamanan" />

      {/* Tabs */}
      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
              tab === t.id ? "bg-[#0e2238] text-white" : "text-slate-500 hover:bg-slate-100")}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === "profil" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold text-slate-800">Data Usaha</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Usaha / Perusahaan</span>
                <input defaultValue="PT Berkah Distribusi" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Alamat Lengkap</span>
                <textarea rows={3} defaultValue="Jl. Penghibur No. 45, Kec. Ujung Pandang, Kota Makassar, Sulawesi Selatan 90111"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Provinsi</span>
                <input defaultValue="Sulawesi Selatan" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kota / Kabupaten</span>
                <input defaultValue="Kota Makassar" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kode Pos</span>
                <input defaultValue="90111" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">No. NPWP</span>
                <input defaultValue="01.234.567.8-901.000" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            </div>
            <div className="mt-5 flex justify-end">
              <button className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Simpan Perubahan</button>
            </div>
          </div>

          {/* Dokumen legalitas */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-slate-800">Dokumen Legalitas</h3>
            <div className="space-y-3">
              {[{ n: "NIB (Nomor Induk Berusaha)", f: "nib.pdf", ok: true }, { n: "NPWP", f: "npwp.pdf", ok: true }, { n: "Surat Izin Usaha", f: "siup.pdf", ok: false }].map((d) => (
                <div key={d.n} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="flex-1 min-w-0"><p className="text-xs font-bold text-slate-700">{d.n}</p><p className="text-[11px] text-slate-400">{d.ok ? d.f : "Belum diunggah"}</p></div>
                  <button className={cn("inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold", d.ok ? "text-emerald-600 hover:bg-emerald-50" : "text-sky-600 hover:bg-sky-50")}>
                    <Upload className="h-3 w-3" /> {d.ok ? "Ganti" : "Upload"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "bank" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Kartu rekening terdaftar */}
          {[{ bank: "Bank BCA", no: "1234567890", an: "PT Berkah Distribusi", utama: true }, { bank: "Bank Mandiri", no: "9876543210", an: "PT Berkah Distribusi", utama: false }].map((r) => (
            <div key={r.no} className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0057a8] to-[#003a70] p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <Landmark className="h-6 w-6" />
                {r.utama && <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold">REKENING UTAMA</span>}
              </div>
              <p className="mt-6 text-xl font-extrabold tracking-widest">{r.no}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-white/70">
                <p className="font-bold text-white">{r.bank}</p>
                <p>{r.an}</p>
              </div>
              <button className="mt-4 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/20"><Pencil className="mr-1 inline h-3 w-3" /> Ubah</button>
            </div>
          ))}
          <button className="flex min-h-40 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-sky-400 hover:text-sky-500">
            <Plus className="h-5 w-5" /> Tambah Rekening Bank
          </button>
        </div>
      )}

      {tab === "staff" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Staff / Sub-user</h3>
              <p className="text-xs text-slate-400">Kelola akses tim Anda ke dashboard</p>
            </div>
            <button onClick={() => setAddStaffOpen(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-[#0e2238] px-3.5 py-2 text-sm font-bold text-white hover:bg-[#123050]">
              <Plus className="h-4 w-4" /> Tambah Staff
            </button>
          </div>
          <DataTable columns={staffCols} data={dummyStaff} rowKey={(r) => r.id} pageSize={8} />
        </div>
      )}

      {tab === "password" && (
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-800">Ganti Password</h3>
          <div className="space-y-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Password Lama</span>
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Password Baru</span>
              <input type="password" placeholder="Minimal 8 karakter" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Konfirmasi Password Baru</span>
              <input type="password" placeholder="Ulangi password baru" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
            <button className="w-full rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Perbarui Password</button>
          </div>
        </div>
      )}

      <Modal open={addStaffOpen} onClose={() => setAddStaffOpen(false)} title="Tambah Staff" description="Beri akses sub-user ke dashboard" size="md"
        footer={<>
          <button onClick={() => setAddStaffOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
          <button onClick={() => setAddStaffOpen(false)} className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Undang Staff</button>
        </>}>
        <div className="space-y-4">
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nama Lengkap</span>
            <input placeholder="Nama staff" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Email</span>
            <input type="email" placeholder="nama@perusahaan.id" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Role</span>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sky-400">
                <option>Admin</option><option>Kasir</option><option>Gudang</option><option>Keuangan</option>
              </select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Telepon</span>
              <input placeholder="08xx" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
