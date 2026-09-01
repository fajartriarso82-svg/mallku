"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between">
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
        <div className="flex flex-col items-center lg:items-end justify-center lg:pr-8 border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0">
          <div className="max-w-md w-full flex flex-col items-center lg:items-end text-center lg:text-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo-BG.png"
              alt="Logo Mall ku"
              className="w-72 sm:w-80 md:w-96 h-auto object-contain mb-6"
            />
            <p className="text-sm font-medium text-slate-500 max-w-xs">
              Pemulihan Akses Akun SCM Portal
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start justify-center lg:pl-8">
          <div className="w-full max-w-md">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Halaman Login</span>
            </Link>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Lupa Password
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed mb-6">
              Masukkan alamat email Anda untuk menerima instruksi reset password.
            </p>

            {submitted ? (
              <div className="p-5 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 text-sm">
                <p className="font-bold mb-1">Tautan terkirim!</p>
                <p className="text-xs text-sky-700">
                  Instruksi reset password telah dikirimkan ke <strong>{email}</strong> jika email tersebut terdaftar di sistem kami.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Terdaftar
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@perusahaan.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#10245a] text-sm text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#10245a] hover:bg-[#0a1840] text-sm shadow-md transition"
                >
                  Kirim Tautan Reset
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
        © {new Date().getFullYear()} Mall ku SCM. All Rights Reserved.
      </footer>
    </div>
  );
}