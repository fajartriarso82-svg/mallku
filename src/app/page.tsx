import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import {
  Building2,
  Store,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Layers,
  MapPin
} from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (role === "ADMIN") redirect("/admin");
  if (role === "DISTRIBUTOR") redirect("/scm/distributor");
  if (role === "TOKO") redirect("/seller");
  if (role === "BUYER") redirect("/mp");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="lg" />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2.5 bg-[#10245a] hover:bg-[#0c1c45] text-white text-sm font-bold rounded-lg shadow transition"
            >
              Daftar Akun
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#10245a] to-[#0a1840] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-sky-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Platform Ekosistem Digital Lokal Terpadu</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Satu Ekosistem untuk <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                SCM Grosir & Marketplace Lokal
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Hubungkan Distributor resmi dengan Toko UMKM lokal melalui sistem Supply Chain (B2B), dan perluas jangkauan pembeli sekitar melalui Marketplace (B2C) Lokal-First.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/mp"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Belanja Marketplace Lokal</span>
              </Link>
              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <Store className="w-4 h-4 text-[#B61F18]" />
                <span>Gabung Toko / Distributor SCM</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Role Architecture */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Arsitektur Aliran Produk Terpadu
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Distributor memegang stok resmi, Toko melakukan restok dan menjual eceran langsung ke pembeli lokal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Distributor Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Distributor (B2B)</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kelola master produk, atur tier harga grosir, dan terima Purchase Order resmi dari mitra toko terdaftar secara otomatis.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Katalog Produk Grosir</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Manajemen PO & Pembayaran VA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Jaringan Mitra Toko Resmi</span>
                </li>
              </ul>
            </div>

            {/* Toko / Seller Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-5">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Mitra Usaha / Toko</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Beli stok grosir dari Distributor di SCM, lalu alokasikan stok secara fleksibel untuk dijual ke Marketplace lokal.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Stok SCM Masuk Otomatis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Alokasi & Custom Listing MP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Pilihan Kurir Toko / Ekspedisi</span>
                </li>
              </ul>
            </div>

            {/* Marketplace Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Marketplace Lokal</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Pembeli menemukan toko dan produk terdekat di kabupaten/kota tempat tinggal untuk pengiriman cepat dan hemat.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Filter Otomatis Berbasis Kota</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pembayaran QRIS & Virtual Account</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Produk Asli & Bergaransi Lokal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded">
              <Logo size="sm" />
            </div>
            <span>© {new Date().getFullYear()} Mall ku. Hak Cipta Dilindungi.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/auth/login" className="hover:text-white">Portal SCM</Link>
            <Link href="/mp" className="hover:text-white">Marketplace</Link>
            <Link href="/auth/register" className="hover:text-white">Pendaftaran Mitra</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}