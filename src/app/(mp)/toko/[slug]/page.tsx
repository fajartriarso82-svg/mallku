import { notFound } from "next/navigation";
import { Star, MapPin, BadgeCheck, Package, Store } from "lucide-react";
import { getTokoBySlug, getProdukByToko, mpTokoList } from "@/lib/dummy/mp-data";
import { ProductCard } from "@/components/mp/product-card";
import { StoreCard } from "@/components/mp/store-card";

export function generateStaticParams() {
  return mpTokoList.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = true;

export default async function TokoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const toko = getTokoBySlug(slug);
  if (!toko) notFound();

  const produk = getProdukByToko(slug);

  return (
    <div className="space-y-8">
      {/* Header toko */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-mk-navy-dark via-mk-navy to-mk-cyan" />
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end">
          <div className="-mt-14 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-mk-red to-mk-gold text-3xl font-extrabold text-white shadow-lg">
            {toko.nama.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-mk-navy">{toko.nama}</h1>
              {toko.isOfficial && <BadgeCheck className="h-5 w-5 text-mk-cyan" />}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> <b className="text-slate-700">{toko.rating}</b></span>
              <span className="flex items-center gap-1"><Package className="h-4 w-4" /> {toko.produkAktif} produk</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {toko.kota}, {toko.provinsi}</span>
            </div>
            {toko.deskripsi && <p className="mt-3 max-w-2xl text-sm text-slate-600">{toko.deskripsi}</p>}
          </div>
        </div>
      </div>

      {/* Produk toko */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-mk-navy">
          <Store className="h-5 w-5 text-mk-red" /> Produk Toko
          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">{produk.length}</span>
        </h2>
        {produk.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {produk.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
            Toko ini belum memiliki produk.
          </div>
        )}
      </section>

      {/* Toko lain */}
      <section>
        <h2 className="mb-4 text-lg font-extrabold text-mk-navy">Toko Lokal Lainnya</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {mpTokoList.filter((t) => t.slug !== slug).slice(0, 4).map((t) => <StoreCard key={t.id} store={t} />)}
        </div>
      </section>
    </div>
  );
}
