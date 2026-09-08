import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import { MarketplaceShell } from "@/components/mp/marketplace-shell";
import { ProductResults } from "@/components/mp/product-results";

export const metadata: Metadata = { title: "Cari Produk Lokal", description: "Cari produk dan toko lokal di Mall ku." };

type Params = { q?: string; kota?: string };
export default async function SearchPage({ searchParams }: { searchParams: Promise<Params> }) {
  const { q, kota } = await searchParams;
  return <MarketplaceShell><main className="mx-auto max-w-[1400px] px-4 py-8 md:px-8"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#168bc3]">Pencarian</p><h1 className="mt-2 text-3xl font-extrabold text-[#26343f]">{q ? `Hasil untuk “${q}”` : "Temukan produk lokal"}</h1><p className="mt-2 text-sm text-[#82919a]">Produk aktif dari toko mitra, diurutkan berdasarkan relevansi dan penjualan.</p></div><div className="mb-5 flex items-center justify-between rounded-xl border border-[#dce4e8] bg-white px-4 py-3"><span className="text-xs font-semibold text-[#53616d]">{kota ? `Area: ${kota}` : "Semua area"}</span><button className="inline-flex items-center gap-2 text-xs font-bold text-[#168bc3]"><SlidersHorizontal className="h-4 w-4" />Filter</button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"><ProductResults q={q} kota={kota} /></div></main></MarketplaceShell>;
}
