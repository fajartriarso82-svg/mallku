import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Store, MapPin, ShieldCheck, Truck, Undo2, Package, ChevronRight, Plus } from "lucide-react";
import { getProdukBySlug, getProdukByToko, getProdukByKategori, getTokoBySlug, getKategoriBySlug, mpProdukSlugs } from "@/lib/dummy/mp-data";
import { formatRupiah } from "@/lib/utils";
import { ProductCard } from "@/components/mp/product-card";
import { AddToCartButton } from "@/components/mp/add-to-cart-button";

export function generateStaticParams() {
  return mpProdukSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = true;

export default async function ProdukDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const produk = getProdukBySlug(slug);
  if (!produk) notFound();

  const toko = getTokoBySlug(produk.tokoSlug);
  const kategori = getKategoriBySlug(produk.kategoriSlug);
  const produkToko = getProdukByToko(produk.tokoSlug).filter((p) => p.id !== produk.id).slice(0, 4);
  const serupa = getProdukByKategori(produk.kategoriSlug).filter((p) => p.id !== produk.id).slice(0, 5);
  const diskon = produk.hargaCoret && produk.hargaCoret > produk.harga
    ? Math.round(((produk.hargaCoret - produk.harga) / produk.hargaCoret) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-mk-red">Beranda</Link>
        <ChevronRight className="h-3 w-3" />
        {kategori && (
          <>
            <Link href={`/kategori/${kategori.slug}`} className="hover:text-mk-red">{kategori.nama}</Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="font-semibold text-slate-700">{produk.judul}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        {/* Foto produk */}
        <div className="flex h-full min-h-[320px] items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-mk-bg to-slate-100 p-10 text-[7rem] shadow-sm">
          <span>{produk.foto}</span>
        </div>

        {/* Info */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Toko */}
          <Link href={`/toko/${produk.tokoSlug}`} className="flex items-center gap-2 text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mk-navy text-sm font-extrabold text-white">
              {produk.tokoNama.charAt(0)}
            </span>
            <span className="font-bold text-slate-700 hover:text-mk-red">{produk.tokoNama}</span>
            {toko?.isOfficial && <ShieldCheck className="h-4 w-4 text-mk-cyan" />}
            <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin className="h-3 w-3" /> {produk.tokoKota}</span>
          </Link>

          <h1 className="mt-4 text-xl font-extrabold leading-snug text-slate-800 md:text-2xl">{produk.judul}</h1>

          {/* Rating */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
              <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" /> {produk.rating}
            </span>
            <span className="text-slate-400">{produk.terjual} terjual</span>
            <span className="text-slate-400">{produk.stok} stok tersedia</span>
          </div>

          {/* Harga */}
          <div className="mt-5 rounded-2xl bg-mk-bg p-4">
            <div className="flex items-end gap-3">
              <p className="text-3xl font-extrabold text-mk-red">{formatRupiah(produk.harga)}</p>
              {produk.hargaCoret && (
                <p className="pb-1 text-sm text-slate-400 line-through">{formatRupiah(produk.hargaCoret)}</p>
              )}
              {diskon > 0 && (
                <span className="mb-1 rounded-lg bg-mk-red px-2 py-0.5 text-xs font-extrabold text-white">-{diskon}%</span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">Harga per {produk.satuan ?? "item"}</p>
          </div>

          {/* Deskripsi */}
          {produk.deskripsi && (
            <p className="mt-5 text-sm leading-relaxed text-slate-600">{produk.deskripsi}</p>
          )}

          {/* Tags */}
          {produk.tags && produk.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {produk.tags.map((t) => (
                <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{t}</span>
              ))}
            </div>
          )}

          {/* Aksi */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={produk} />
            <Link
              href={`/checkout?produk=${produk.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-mk-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-mk-navy-light"
            >
              <Plus className="h-4 w-4" /> Beli Sekarang
            </Link>
          </div>

          {/* Keunggulan */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 text-center text-[11px] font-semibold text-slate-500">
            <div className="flex flex-col items-center gap-1.5"><Truck className="h-5 w-5 text-mk-cyan" /> Gratis Ongkir*</div>
            <div className="flex flex-col items-center gap-1.5"><ShieldCheck className="h-5 w-5 text-mk-green" /> Garansi 100%</div>
            <div className="flex flex-col items-center gap-1.5"><Undo2 className="h-5 w-5 text-mk-gold" /> Mudah Retur</div>
          </div>
        </div>
      </div>

      {/* Produk lain dari toko */}
      {produkToko.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-mk-navy">
            <Store className="h-5 w-5 text-mk-red" /> Produk Lain dari {produk.tokoNama}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {produkToko.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Produk serupa */}
      {serupa.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-mk-navy">
            <Package className="h-5 w-5 text-mk-red" /> Produk Serupa
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {serupa.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
