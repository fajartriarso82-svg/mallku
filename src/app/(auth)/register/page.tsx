"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Store, ShoppingBag, ArrowRight } from "lucide-react";

const PROVINSI_LIST = [
  "Aceh","Sumatera Utara","Sumatera Barat","Riau","Kepulauan Riau","Jambi",
  "Sumatera Selatan","Kepulauan Bangka Belitung","Bengkulu","Lampung",
  "DKI Jakarta","Banten","Jawa Barat","Jawa Tengah","D.I. Yogyakarta","Jawa Timur",
  "Bali","Nusa Tenggara Barat","Nusa Tenggara Timur",
  "Kalimantan Barat","Kalimantan Tengah","Kalimantan Selatan","Kalimantan Timur","Kalimantan Utara",
  "Sulawesi Utara","Gorontalo","Sulawesi Tengah","Sulawesi Barat","Sulawesi Selatan","Sulawesi Tenggara",
  "Maluku","Maluku Utara","Papua Barat","Papua"
];

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "", password: "", confirmPassword: "", name: "", telepon: "",
    role: "TOKO",
    namaUsaha: "", provinsi: "", kabupatenKota: "", kecamatan: "", desa: "", kodePos: "", alamatLengkap: "",
  });

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok."); return;
    }
    setLoading(true); setError("");

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Pendaftaran akun gagal"); setLoading(false); return; }
      setSuccess(data.message);
    } catch {
      setError("Terjadi kesalahan server saat mendaftar.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
            ✓
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-slate-600 text-xs mb-6 leading-relaxed">{success}</p>
          <Link
            href="/auth/login"
            className="inline-block w-full py-3 rounded-lg text-white font-bold bg-[#10245a] hover:bg-[#0c1c45] text-sm"
          >
            Masuk ke Halaman Login
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <Card className="shadow-xl border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-[#10245a] to-[#247094] p-6 text-white text-center">
          <div className="bg-white p-2.5 rounded-xl inline-block shadow mb-3">
            <Logo size="md" />
          </div>
          <h1 className="text-xl font-bold">Pendaftaran Akun Baru SCM & MP</h1>
          <p className="text-xs text-slate-200 mt-1">Bergabung ke dalam jaringan ekosistem Mall ku</p>
        </div>

        <CardContent className="p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Select Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilih Tipe Mitra Akun
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: "TOKO", label: "Toko (Mitra SCM & MP)", icon: <Store className="w-5 h-5 mx-auto mb-1 text-[#B61F18]" /> },
                  { val: "DISTRIBUTOR", label: "Distributor (B2B)", icon: <Building2 className="w-5 h-5 mx-auto mb-1 text-[#247094]" /> },
                  { val: "BUYER", label: "Pembeli Marketplace", icon: <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-emerald-600" /> },
                ].map((r) => (
                  <button
                    key={r.val}
                    type="button"
                    onClick={() => update("role", r.val)}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                      form.role === r.val
                        ? "border-[#10245a] bg-blue-50/50 text-[#10245a] ring-2 ring-[#10245a]/20"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {r.icon}
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {form.role === "BUYER" ? "Nama Lengkap" : "Nama Pemilik / PIC"}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Nama lengkap"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nomor Telepon / WA
                </label>
                <input
                  type="tel"
                  value={form.telepon}
                  onChange={(e) => update("telepon", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {form.role !== "BUYER" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {form.role === "TOKO" ? "Nama Usaha / Toko" : "Nama Perusahaan / Distributor"}
                </label>
                <input
                  type="text"
                  value={form.namaUsaha}
                  onChange={(e) => update("namaUsaha", e.target.value)}
                  placeholder={form.role === "TOKO" ? "Toko Berkah Abadi" : "PT Distribusi Nusantara Jaya"}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Alamat Email Login
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Min. 8 karakter"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Konfirmasi Sandi
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Ulangi kata sandi"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {form.role !== "BUYER" && (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Alamat Lengkap Operasional Toko / Distributor
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Provinsi
                  </label>
                  <select
                    value={form.provinsi}
                    onChange={(e) => update("provinsi", e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  >
                    <option value="">Pilih Provinsi</option>
                    {PROVINSI_LIST.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Kabupaten / Kota
                    </label>
                    <input
                      type="text"
                      value={form.kabupatenKota}
                      onChange={(e) => update("kabupatenKota", e.target.value)}
                      placeholder="Contoh: Kota Makassar"
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Kecamatan
                    </label>
                    <input
                      type="text"
                      value={form.kecamatan}
                      onChange={(e) => update("kecamatan", e.target.value)}
                      placeholder="Nama kecamatan"
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Desa / Kelurahan
                    </label>
                    <input
                      type="text"
                      value={form.desa}
                      onChange={(e) => update("desa", e.target.value)}
                      placeholder="Nama kelurahan"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      value={form.kodePos}
                      onChange={(e) => update("kodePos", e.target.value)}
                      placeholder="90111"
                      maxLength={5}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Alamat Lengkap (Jalan / Nomor / RT / RW)
                  </label>
                  <textarea
                    value={form.alamatLengkap}
                    onChange={(e) => update("alamatLengkap", e.target.value)}
                    placeholder="Jl. Nama Jalan No. XX, ..."
                    rows={2}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white bg-[#10245a] hover:bg-[#0c1c45] transition-colors disabled:opacity-60 text-sm shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? "Mendaftarkan Akun..." : "Daftar Akun Mitra"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Sudah memiliki akun?{" "}
            <Link href="/auth/login" className="font-bold text-sky-600 hover:underline">
              Masuk di Sini
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}