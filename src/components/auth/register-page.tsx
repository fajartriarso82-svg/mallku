"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Store, ShoppingBag, ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Card, CardContent } from "@/components/ui/card";

const PROVINSI_LIST = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi",
  "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung", "DKI Jakarta",
  "Banten", "Jawa Barat", "Jawa Tengah", "D.I. Yogyakarta", "Jawa Timur", "Bali",
  "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah",
  "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara",
  "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua",
];

type RegisterPageProps = { scmOnly?: boolean };
type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  telepon: string;
  role: "TOKO" | "DISTRIBUTOR" | "BUYER";
  namaUsaha: string;
  provinsi: string;
  kabupatenKota: string;
  kecamatan: string;
  desa: string;
  kodePos: string;
  alamatLengkap: string;
};

export default function RegisterPage({ scmOnly = false }: RegisterPageProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<RegisterForm>({
    email: "", password: "", confirmPassword: "", name: "", telepon: "",
    role: "TOKO", namaUsaha: "", provinsi: "", kabupatenKota: "", kecamatan: "",
    desa: "", kodePos: "", alamatLengkap: "",
  });

  const update = (field: keyof RegisterForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Pendaftaran akun gagal");
        return;
      }
      setSuccess(data.message);
    } catch {
      setError("Terjadi kesalahan server saat mendaftar.");
    } finally {
      setLoading(false);
    }
  }

  const loginHref = scmOnly ? "/scm/login" : "/mp/login";
  const roles = [
    { val: "TOKO" as const, label: "Toko (Mitra SCM & MP)", icon: <Store className="mx-auto mb-1 h-5 w-5 text-[#B61F18]" /> },
    { val: "DISTRIBUTOR" as const, label: "Distributor (B2B)", icon: <Building2 className="mx-auto mb-1 h-5 w-5 text-[#247094]" /> },
    ...(!scmOnly ? [{ val: "BUYER" as const, label: "Pembeli Marketplace", icon: <ShoppingBag className="mx-auto mb-1 h-5 w-5 text-emerald-600" /> }] : []),
  ];

  if (success) {
    return (
      <div className="mx-auto w-full max-w-md">
        <Card className="p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">✓</div>
          <h2 className="mb-2 text-xl font-bold text-slate-800">Pendaftaran Berhasil!</h2>
          <p className="mb-6 text-xs leading-relaxed text-slate-600">{success}</p>
          <Link href={loginHref} className="inline-block w-full rounded-lg bg-[#10245a] py-3 text-sm font-bold text-white hover:bg-[#0c1c45]">Masuk ke Halaman Login</Link>
        </Card>
      </div>
    );
  }

  const isBusiness = form.role !== "BUYER";
  return (
    <div className="mx-auto my-8 w-full max-w-xl">
      <Card className="overflow-hidden border-slate-200 shadow-xl">
        <div className="bg-gradient-to-r from-slate-900 via-[#10245a] to-[#247094] p-6 text-center text-white">
          <div className="mb-3 inline-block rounded-xl bg-white p-2.5 shadow"><Logo size="md" /></div>
          <h1 className="text-xl font-bold">Pendaftaran Akun Mall ku</h1>
          <p className="mt-1 text-xs text-slate-200">{scmOnly ? "Daftar sebagai distributor atau toko mitra SCM" : "Pilih akun pembeli atau mitra usaha sesuai kebutuhan"}</p>
        </div>
        <CardContent className="p-6 md:p-8">
          {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Pilih Tipe Mitra Akun</label>
              <div className={`grid ${scmOnly ? "grid-cols-2" : "grid-cols-3"} gap-2`}>
                {roles.map((role) => <button key={role.val} type="button" onClick={() => update("role", role.val)} className={`rounded-xl border p-3 text-center text-xs font-bold transition-all ${form.role === role.val ? "border-[#10245a] bg-blue-50/50 text-[#10245a] ring-2 ring-[#10245a]/20" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>{role.icon}<span>{role.label}</span></button>)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label={form.role === "BUYER" ? "Nama Lengkap" : "Nama Pemilik / PIC"} value={form.name} onChange={(value) => update("name", value)} placeholder="Nama lengkap" required />
              <Field label="Nomor Telepon / WA" value={form.telepon} onChange={(value) => update("telepon", value)} placeholder="08xxxxxxxxxx" required />
            </div>
            {isBusiness && <Field label={form.role === "TOKO" ? "Nama Usaha / Toko" : "Nama Perusahaan / Distributor"} value={form.namaUsaha} onChange={(value) => update("namaUsaha", value)} placeholder={form.role === "TOKO" ? "Toko Berkah Abadi" : "PT Distribusi Nusantara Jaya"} required />}
            <Field label="Alamat Email Login" type="email" value={form.email} onChange={(value) => update("email", value)} placeholder="nama@email.com" required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Kata Sandi" type="password" value={form.password} onChange={(value) => update("password", value)} placeholder="Min. 8 karakter" minLength={8} required />
              <Field label="Konfirmasi Sandi" type="password" value={form.confirmPassword} onChange={(value) => update("confirmPassword", value)} placeholder="Ulangi kata sandi" required />
            </div>
            {isBusiness && <AddressFields form={form} update={update} />}
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#10245a] py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#0c1c45] disabled:opacity-60"><span>{loading ? "Mendaftarkan Akun..." : "Daftar Akun Mitra"}</span><ArrowRight className="h-4 w-4" /></button>
          </form>
          <div className="mt-6 text-center text-xs text-slate-500">Sudah memiliki akun? <Link href={loginHref} className="font-bold text-sky-600 hover:underline">Masuk di Sini</Link></div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false, minLength }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean; minLength?: number }) {
  return <div><label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{label}</label><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} minLength={minLength} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>;
}

function AddressFields({ form, update }: { form: RegisterForm; update: (field: keyof RegisterForm, value: string) => void }) {
  return <div className="space-y-3 border-t border-slate-200 pt-3"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Alamat Lengkap Operasional Toko / Distributor</p><div><label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Provinsi</label><select value={form.provinsi} onChange={(event) => update("provinsi", event.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800"><option value="">Pilih Provinsi</option>{PROVINSI_LIST.map((province) => <option key={province} value={province}>{province}</option>)}</select></div><div className="grid grid-cols-2 gap-3"><Field label="Kabupaten / Kota" value={form.kabupatenKota} onChange={(value) => update("kabupatenKota", value)} placeholder="Contoh: Kota Makassar" required /><Field label="Kecamatan" value={form.kecamatan} onChange={(value) => update("kecamatan", value)} placeholder="Nama kecamatan" required /></div><div className="grid grid-cols-2 gap-3"><Field label="Desa / Kelurahan" value={form.desa} onChange={(value) => update("desa", value)} placeholder="Nama kelurahan" required /><Field label="Kode Pos" value={form.kodePos} onChange={(value) => update("kodePos", value)} placeholder="90111" required /></div><div><label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Alamat Lengkap (Jalan / Nomor / RT / RW)</label><textarea value={form.alamatLengkap} onChange={(event) => update("alamatLengkap", event.target.value)} placeholder="Jl. Nama Jalan No. XX, ..." rows={2} required className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div></div>;
}
