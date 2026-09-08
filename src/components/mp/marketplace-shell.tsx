"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Search, ShoppingBag, UserRound } from "lucide-react";
import { cartCount } from "@/lib/mp-cart";

export function MarketplaceShell({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(cartCount());
    update();
    window.addEventListener("mallku-cart-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("mallku-cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-[#26343f]">
      <header className="sticky top-0 z-30 border-b border-[#dce4e8] bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 md:px-8">
          <Link href="/" className="shrink-0" aria-label="Mall ku home">
            <img src="/Logo2 only2.png" alt="Mall ku" className="h-10 w-auto object-contain" />
          </Link>
          <form action="/cari" className="relative hidden min-w-0 flex-1 md:block md:max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#82919a]" />
            <input name="q" placeholder="Cari kebutuhan rumah, pangan, dan produk lokal..." className="w-full rounded-xl border border-[#dce4e8] bg-[#f7f9fa] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#168bc3] focus:bg-white focus:ring-2 focus:ring-[#168bc3]/10" />
          </form>
          <Link href="/akun/alamat" className="hidden items-center gap-2 rounded-xl px-2 py-2 text-left hover:bg-[#f5f7f8] lg:flex">
            <MapPin className="h-4 w-4 text-[#e53935]" />
            <span><span className="block text-[10px] font-bold uppercase tracking-wider text-[#82919a]">Belanja ke</span><span className="block max-w-32 truncate text-xs font-semibold text-[#26343f]">Pilih lokasi</span></span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <Link href="/keranjang" className="relative rounded-xl p-2.5 text-[#53616d] hover:bg-[#f5f7f8]" aria-label="Keranjang">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e53935] px-1 text-[9px] font-bold text-white">{count}</span>}
            </Link>
            <Link href="/akun" className="rounded-xl p-2.5 text-[#53616d] hover:bg-[#f5f7f8]" aria-label="Akun"><UserRound className="h-5 w-5" /></Link>
            <Link href="/mp/login" className="hidden rounded-xl bg-[#173b68] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#102d51] sm:inline-flex">Masuk</Link>
          </div>
        </div>
        <div className="border-t border-[#eef2f4] px-4 py-2 md:hidden">
          <form action="/cari" className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#82919a]" />
            <input name="q" placeholder="Cari produk lokal..." className="w-full rounded-xl border border-[#dce4e8] bg-[#f7f9fa] py-2.5 pl-10 pr-4 text-xs outline-none focus:border-[#168bc3] focus:bg-white" />
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
