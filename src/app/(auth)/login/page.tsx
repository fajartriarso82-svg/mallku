"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function MPLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      if (result.error === "ACCOUNT_INACTIVE") {
        setError("Akun Anda sedang dinonaktifkan atau belum diverifikasi oleh admin.");
      } else {
        setError("Email atau kata sandi salah. Silakan periksa kembali.");
      }
      return;
    }

    router.push("/mp");
    router.refresh();
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between">
      {/* Main Split Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        
        {/* BAGIAN KIRI: Logo Mall ku Geser ke Kanan, Rata Kanan Presisi (Right Aligned) */}
        <div className="flex flex-col items-center lg:items-end justify-center lg:pr-12 border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0 w-full">
          <div className="w-full max-w-lg flex flex-col items-center lg:items-end text-center lg:text-right">
            {/* Wrapper logo dengan justify-end agar sisi kanan logo presisi sejajar dengan teks di bawahnya */}
            <div className="w-full flex justify-center lg:justify-end mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo-BG.png"
                alt="Logo Mall ku"
                className="w-80 sm:w-96 md:w-[460px] lg:w-[480px] h-auto object-contain block"
              />
            </div>

            <div className="flex flex-col items-center lg:items-end space-y-2">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold bg-sky-50 text-[#247094] border border-sky-200 uppercase tracking-wider shadow-2xs">
                SCM Supply Chain Portal
              </span>
              <p className="text-sm font-medium text-slate-500 max-w-md text-center lg:text-right leading-relaxed">
                Platform B2B resmi distributor dan jaringan mitra usaha toko lokal Indonesia.
              </p>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: Login Field (Align ke Kiri) */}
        <div className="flex flex-col items-center lg:items-start justify-center lg:pl-8">
          <div className="w-full max-w-md">
            
            {/* Header Text */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Login
              </h1>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                Login ke dashboard dan mulai produktif hari ini
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Field: Username / Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Username / Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan username atau email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#10245a] focus:border-transparent text-sm text-slate-800 transition"
                  />
                </div>
              </div>

              {/* Field: Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/auth/login"
                    className="text-xs font-semibold text-[#247094] hover:text-[#10245a] hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    required
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#10245a] focus:border-transparent text-sm text-slate-800 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-1"
                    tabIndex={-1}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#10245a] hover:bg-[#0a1840] active:scale-[0.99] transition-all disabled:opacity-60 text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{loading ? "Memproses..." : "Login"}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Registrasi Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-bold text-[#247094] hover:text-[#10245a] hover:underline ml-1"
              >
                    Daftar sebagai pembeli
              </Link>
            </div>

            {/* Quick Demo Credentials Helper */}
            <div className="mt-6 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-700">Akun Uji Coba Demo:</span>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                <div>• Buyer: buyer@mallku.id / buyer123</div>
                <div>• Belanja dari toko lokal</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Minimalis */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
        © {new Date().getFullYear()} Mall ku Marketplace. All Rights Reserved.
      </footer>
    </div>
  );
}