"use client";

import Link from "next/link";
import {
  UserRound, Package, MapPin, Heart, Settings, LogOut, ChevronRight,
  ShoppingBag, Star, Clock,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";

const menuItems = [
  { icon: <Package className="h-5 w-5" />, label: "Pesanan Saya", href: "/pesanan", desc: "Lacak & kelola pesananmu" },
  { icon: <MapPin className="h-5 w-5" />, label: "Alamat", href: "/akun/alamat", desc: "Kelola alamat pengiriman" },
  { icon: <Heart className="h-5 w-5" />, label: "Wishlist", href: "/", desc: "Produk yang kamu simpan" },
  { icon: <Settings className="h-5 w-5" />, label: "Pengaturan Akun", href: "/", desc: "Profil, keamanan & notifikasi" },
];

export default function AkunPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Profil */}
      <section className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-mk-navy-dark to-mk-cyan-light p-6 text-white shadow">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-extrabold backdrop-blur">
          F
        </div>
        <div className="flex-1">
          <p className="text-lg font-extrabold">Fajar Pratama</p>
          <p className="text-sm text-white/80">fajar@email.com · Makassar</p>
        </div>
        <button className="rounded-xl bg-white/10 p-2.5 backdrop-blur transition hover:bg-white/20" aria-label="Keluar">
          <LogOut className="h-5 w-5" />
        </button>
      </section>

      {/* Statistik */}
      <section className="grid grid-cols-3 gap-3">
        {[
          { icon: <ShoppingBag className="h-5 w-5 text-mk-red" />, val: "12", label: "Pesanan" },
          { icon: <Star className="h-5 w-5 text-mk-gold" />, val: "4.9", label: "Rating" },
          { icon: <Clock className="h-5 w-5 text-mk-green" />, val: "2", label: "Menunggu" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-mk-bg">{s.icon}</span>
            <p className="mt-2 text-xl font-extrabold text-mk-navy">{s.val}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Menu */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {menuItems.map((m, i) => (
          <Link
            key={m.label}
            href={m.href}
            className={`flex items-center gap-4 p-4 transition hover:bg-mk-bg ${i > 0 ? "border-t border-slate-100" : ""}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mk-bg text-mk-navy">{m.icon}</span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-slate-800">{m.label}</span>
              <span className="block text-xs text-slate-400">{m.desc}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </Link>
        ))}
      </section>

      <p className="text-center text-xs text-slate-400">
        Belum bisa login sebagai pembeli? Ini pratinjau dashboard buyer. Saldo: <b className="text-mk-navy">{formatRupiah(0)}</b>
      </p>
    </div>
  );
}
