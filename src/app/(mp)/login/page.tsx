"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export default function MpLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }
    // Mock auth — nanti dihubungkan ke NextAuth role BUYER
    setError("");
    window.location.href = "/akun";
  }

  return (
    <div className="mx-auto my-8 flex w-full max-w-md flex-col items-center">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-block rounded-2xl bg-white p-2 shadow"><Logo size="md" /></div>
          <h1 className="text-xl font-extrabold text-mk-navy">Masuk ke Mall ku</h1>
          <p className="mt-1 text-sm text-slate-500">Belanja kebutuhan dari toko lokal terdekat</p>
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-bold text-slate-700">
            Email
            <span className="relative mt-1 block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-mk-red focus:ring-2 focus:ring-mk-red/20"
              />
            </span>
          </label>

          <label className="block text-sm font-bold text-slate-700">
            Kata Sandi
            <span className="relative mt-1 block">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-mk-red focus:ring-2 focus:ring-mk-red/20"
              />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label="Tampilkan sandi" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </label>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-500">
              <input type="checkbox" className="h-3.5 w-3.5 accent-mk-red" /> Ingat saya
            </label>
            <Link href="/" className="font-semibold text-mk-red hover:underline">Lupa kata sandi?</Link>
          </div>

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-mk-red py-3 text-sm font-bold text-white transition hover:bg-mk-red-light">
            Masuk <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-mk-navy hover:underline">Daftar sekarang</Link>
        </div>
      </div>

      <Link href="/scm/login" className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-mk-navy">
        <ShieldCheck className="h-4 w-4" /> Login untuk Mitra (Distributor / Toko) — SCM
      </Link>
    </div>
  );
}
