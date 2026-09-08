import { HeroBanner } from "@/components/mp/hero-banner";
import { CategoryStrip } from "@/components/mp/category-strip";
import { SectionHeader } from "@/components/mp/section-header";
import { ProductCard } from "@/components/mp/product-card";
import { StoreCard } from "@/components/mp/store-card";
import { mpProdukList, mpTokoList, mpKategoriList } from "@/lib/dummy/mp-data";
import { getProdukUnggulan } from "@/lib/dummy/mp-data";

export const metadata = {
  title: "Marketplace Lokal",
};

export default function MarketplaceHome() {
  const unggulan = getProdukUnggulan();
  const murah = [...mpProdukList]
    .filter((p) => p.hargaCoret && p.hargaCoret > p.harga)
    .slice(0, 8);
  const tokoPopuler = [...mpTokoList]
    .sort((a, b) => b.jumlahTerjual - a.jumlahTerjual)
    .slice(0, 4);

  // kategori dengan hitungan produk
  const kategoriCount = mpKategoriList
    .map((k) => ({ ...k, jumlah: mpProdukList.filter((p) => p.kategoriSlug === k.slug).length }))
    .filter((k) => k.jumlah > 0);

  return (
    <div className="space-y-8">
      <HeroBanner />

      <CategoryStrip />

      {/* Kategori pilihan */}
      {kategoriCount.length > 0 && (
        <section>
          <SectionHeader title="Belanja per Kategori" subtitle="Temukan kebutuhanmu dari toko lokal" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {kategoriCount.map((k) => (
              <a
                key={k.id}
                href={`/kategori/${k.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-mk-cyan hover:shadow-md"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl ${k.warna}`}>
                  {k.ikon}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-800 group-hover:text-mk-navy">{k.nama}</p>
                  <p className="text-xs text-slate-400">{k.jumlah} produk</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Produk unggulan */}
      <section>
        <SectionHeader title="Produk Unggulan" subtitle="Paling laris & disukai pembeli" href="/cari" linkLabel="Lihat semua" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {unggulan.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Diskon besar */}
      {murah.length > 0 && (
        <section>
          <SectionHeader title="Sedang Diskon" subtitle="Promo terbatas hari ini" href="/cari" linkLabel="Lihat semua" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {murah.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Toko terdekat */}
      <section>
        <SectionHeader title="Toko Lokal Terdekat" subtitle="Belanja dari toko kepercayaan di sekitarmu" href="/cari" linkLabel="Jelajahi toko" />
        <div className="grid gap-3 md:grid-cols-2">
          {tokoPopuler.map((t) => (
            <StoreCard key={t.id} store={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
