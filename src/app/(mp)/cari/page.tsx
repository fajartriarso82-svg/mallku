import Link from "next/link";
import { Search, Store } from "lucide-react";
import { cariProduk, getProdukByKategori, mpTokoList, mpKategoriList } from "@/lib/dummy/mp-data";
import { ProductCard } from "@/components/mp/product-card";
import { StoreCard } from "@/components/mp/store-card";
import { SectionHeader } from "@/components/mp/section-header";

export const metadata = { title: "Cari Produk" };

type SearchParams = { q?: string; k?: string };

export default async function CariPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { q = "", k = "" } = await searchParams;
  const query = q.trim();
  const kategori = k.trim();

  const hasilKategori = kategori ? getProdukByKategori(kategori) : [];
  const hasilCari = query ? cariProduk(query) : [];

  // Produk yang ditampilkan: prioritas pencarian, filter kategori jika ada
  let produkTampil = query ? hasilCari : kategori ? hasilKategori : [];
  if (kategori && query) {
    produkTampil = hasilCari.filter((p) => p.kategoriSlug === kategori);
  }

  const tokoTampil = query
    ? mpTokoList.filter((t) => t.nama.toLowerCase().includes(query.toLowerCase()) || t.kota.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-mk-red">Marketplace</p>
        <h1 className="mt-1 text-2xl font-extrabold text-mk-navy">
          {query ? <>Hasil untuk “{query}”</> : kategori ? <>Kategori {kategori}</> : "Jelajahi Produk"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {produkTampil.length} produk ditemukan
          {kategori && <> di kategori <span className="font-bold text-mk-red">{kategori}</span></>}
        </p>
      </div>

      {/* Filter kategori */}
      <div className="flex flex-wrap gap-2">
        <Link href="/cari" className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${!kategori ? "bg-mk-navy text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"}`}>
          Semua
        </Link>
        {mpKategoriList.map((kc) => (
          <Link
            key={kc.id}
            href={query ? `/cari?q=${encodeURIComponent(query)}&k=${kc.slug}` : `/cari?k=${kc.slug}`}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${kategori === kc.slug ? "bg-mk-navy text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"}`}
          >
            {kc.nama}
          </Link>
        ))}
      </div>

      {/* Produk */}
      {produkTampil.length > 0 ? (
        <section>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {produkTampil.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mk-bg text-slate-400">
            <Search className="h-8 w-8" />
          </div>
          <p className="mt-4 font-bold text-slate-700">Produk tidak ditemukan</p>
          <p className="mt-1 text-sm text-slate-500">Coba kata kunci lain atau jelajahi semua produk.</p>
          <Link href="/" className="mt-4 inline-block rounded-xl bg-mk-red px-5 py-2.5 text-sm font-bold text-white hover:bg-mk-red-light">
            Kembali ke Beranda
          </Link>
        </div>
      )}

      {/* Toko hasil pencarian */}
      {tokoTampil.length > 0 && (
        <section>
          <SectionHeader title="Toko" subtitle="Toko yang cocok dengan pencarianmu" />
          <div className="grid gap-3 md:grid-cols-2">
            {tokoTampil.map((t) => <StoreCard key={t.id} store={t} />)}
          </div>
        </section>
      )}

      {/* Fallback toko populer */}
      {!query && !kategori && (
        <section>
          <SectionHeader title="Toko Lokal Terdekat" href="/cari" linkLabel="Jelajahi" />
          <div className="grid gap-3 md:grid-cols-2">
            {mpTokoList.slice(0, 4).map((t) => <StoreCard key={t.id} store={t} />)}
          </div>
        </section>
      )}
    </div>
  );
}
