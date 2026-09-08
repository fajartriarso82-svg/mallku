"use client";

import Link from "next/link";
import { useState } from "react";
import { UserRound, Mail, Lock, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export default function MpRegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nama || !email || !password) {
      setError("Nama, email, dan kata sandi wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }
    // Mock auth — nanti dihubungkan ke NextAuth role BUYER
    setError("");
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="mx-auto my-8 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-mk-green" />
        </div>
        <h1 className="mt-4 text-xl font-extrabold text-mk-navy">Pendaftaran Berhasil!</h1>
        <p className="mt-2 text-sm text-slate-500">Akun pembeli <b>{email}</b> berhasil dibuat. Silakan masuk untuk mulai belanja.</p>
        <Link href="/login" className="mt-6 inline-block w-full rounded-xl bg-mk-red py-3 text-sm font-bold text-white hover:bg-mk-red-light">
          Masuk Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 w-full max-w-md">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-block rounded-2xl bg-white p-2 shadow"><Logo size="md" /></div>
          <h1 className="text-xl font-extrabold text-mk-navy">Buat Akun Mall ku</h1>
          <p className="mt-1 text-sm text-slate-500">Daftar sebagai pembeli untuk mulai belanja</p>
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-bold text-slate-700">
            Nama Lengkap
            <span className="relative mt-1 block">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama lengkap" className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-mk-red focus:ring-2 focus:ring-mk-red/20" />
            </span>
          </label>

          <label className="block text-sm font-bold text-slate-700">
            No. Handphone
            <span className="relative mt-1 block">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={telepon} onChange={(e) => setTelepon(e.target.value)} placeholder="08xxxxxxxxxx" className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-mk-red focus:ring-2 focus:ring-mk-red/20" />
            </span>
          </label>

          <label className="block text-sm font-bold text-slate-700">
            Email
            <span className="relative mt-1 block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-mk-red focus:ring-2 focus:ring-mk-red/20" />
            </span>
          </label>

          <label className="block text-sm font-bold text-slate-700">
            Kata Sandi
            <span className="relative mt-1 block">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 karakter" className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-mk-red focus:ring-2 focus:ring-mk-red/20" />
            </span>
          </label>

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-mk-red py-3 text-sm font-bold text-white transition hover:bg-mk-red-light">
            Daftar <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-slate-500">
          Sudah punya akun? <Link href="/login" className="font-bold text-mk-navy hover:underline">Masuk</Link>
        </div>
      </div>

      <Link href="/scm/register" className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-mk-navy">
        <ShieldCheck className="h-4 w-4" /> Daftar sebagai Mitra (Distributor / Toko) — SCM
      </Link>
    </div>
  );
}
