import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, PackageOpen } from "lucide-react";
import { getKategoriBySlug, getProdukByKategori } from "@/lib/dummy/mp-data";
import { ProductCard } from "@/components/mp/product-card";

export function generateStaticParams() {
  return ["sembako", "minuman", "makanan-ringan", "perawatan-rumah", "kebutuhan-bayi", "frozen-food", "pertanian", "perlengkapan-dapur"].map((slug) => ({ slug }));
}

export const dynamicParams = true;

export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kategori = getKategoriBySlug(slug);
  if (!kategori) notFound();

  const produk = getProdukByKategori(slug);

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-mk-red">Beranda</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-slate-700">{kategori.nama}</span>
      </nav>

      {/* Hero kategori */}
      <div className={`flex items-center gap-5 rounded-3xl ${kategori.warna} border border-slate-200 p-6`}>
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">{kategori.ikon}</span>
        <div>
          <h1 className="text-2xl font-extrabold text-mk-navy">{kategori.nama}</h1>
          <p className="mt-1 text-sm text-slate-500">{produk.length} produk tersedia dari toko lokal</p>
        </div>
      </div>

      {produk.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {produk.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <PackageOpen className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-bold text-slate-600">Belum ada produk di kategori ini</p>
        </div>
      )}
    </div>
  );
}
