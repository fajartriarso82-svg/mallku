"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, MapPin, UserRound, ChevronDown } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { mpKategoriList } from "@/lib/dummy/mp-data";
import { useMpCart, useHydrated } from "@/lib/mp-cart-store";

export function MpHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams?.get("q") ?? "");
  const hydrated = useHydrated();
  const totalQty = useMpCart((s) => s.totalQty());
  const badgeQty = hydrated ? totalQty : 0;

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/cari?q=${encodeURIComponent(query)}` : "/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      {/* Top bar: logo + search + actions */}
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3 md:px-6">
        {/* Logo sudah berupa Link ke / */}
        <Logo size="md" />

        <form
          onSubmit={submitSearch}
          className="flex min-w-0 flex-1 items-center overflow-hidden rounded-full border-2 border-mk-red bg-white focus-within:ring-2 focus-within:ring-mk-red/20"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari sembako, minuman, kebutuhan rumah..."
            className="w-full bg-transparent px-4 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            aria-label="Cari"
            className="flex shrink-0 items-center gap-1.5 rounded-r-full bg-mk-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-mk-red-light"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Cari</span>
          </button>
        </form>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          {/* Lokasi */}
          <div className="hidden items-center gap-1 text-xs text-slate-500 lg:flex">
            <MapPin className="h-4 w-4 text-mk-red" />
            <span className="max-w-[110px] truncate font-medium text-slate-700">Makassar</span>
            <ChevronDown className="h-3 w-3" />
          </div>

          {/* Keranjang */}
          <Link
            href="/keranjang"
            className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline">Keranjang</span>
            {badgeQty > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-mk-red px-1 text-[10px] font-bold text-white">
                {badgeQty}
              </span>
            )}
          </Link>

          {/* Akun */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-xl bg-mk-navy px-3.5 py-2 text-sm font-bold text-white transition hover:bg-mk-navy-light"
          >
            <UserRound className="h-4 w-4" />
            <span className="hidden md:inline">Masuk</span>
          </Link>
        </div>
      </div>

      {/* Bottom bar: kategori */}
      <nav className="mx-auto hidden max-w-[1280px] items-center gap-1 overflow-x-auto px-4 pb-0 md:flex md:px-6">
        <Link
          href="/"
          className="whitespace-nowrap px-3 py-2 text-xs font-bold text-mk-red"
        >
          Semua
        </Link>
        {mpKategoriList.map((k) => (
          <Link
            key={k.id}
            href={`/kategori/${k.slug}`}
            className="whitespace-nowrap px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-mk-bg hover:text-mk-navy"
          >
            {k.nama}
          </Link>
        ))}
      </nav>
    </header>
  );
}
