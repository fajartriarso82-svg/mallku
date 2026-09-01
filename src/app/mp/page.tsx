import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/layout/Logo";
import {
  Search,
  ShoppingCart,
  MapPin,
  Store,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Tag
} from "lucide-react";

export const metadata = {
  title: "Marketplace Lokal — Mall ku",
  description: "Belanja produk dari mitra toko lokal terdekat di sekitar Anda.",
};

interface SearchParams {
  kota?: string;
  kategori?: string;
  q?: string;
}

async function ProductGrid({ kota, kategori, q }: SearchParams) {
  const listings = await prisma.listingMP.findMany({
    where: {
      status: "AKTIF",
      stokTampil: { gt: 0 },
      ...(kota && {
        toko: { kabupatenKota: { contains: kota, mode: "insensitive" } },
      }),
      ...(kategori && {
        kategoriProduk: { slug: kategori },
      }),
      ...(q && {
        OR: [
          { judulJual: { contains: q, mode: "insensitive" } },
          { deskripsi: { contains: q, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      toko: true,
      kategoriProduk: { include: { kategoriMaster: true } },
    },
    orderBy: [{ terjual: "desc" }, { createdAt: "desc" }],
    take: 24,
  });

  if (listings.length === 0) {
    return (
      <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-1">
          {kota ? `Belum ada produk lokal dari ${kota}` : "Produk tidak ditemukan"}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {kota
            ? "Coba ganti filter kota atau jelajahi toko di wilayah sekitar."
            : "Belum ada penjual yang mencantumkan produk pada kategori ini."}
        </p>
      </div>
    );
  }

  return (
    <>
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/mp/product/${listing.id}`}
          className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
        >
          {/* Product Image */}
          <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
            {listing.fotoUrls.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={listing.fotoUrls[0]}
                alt={listing.judulJual}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Store className="w-12 h-12 text-slate-300" />
            )}
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-sm">
                <MapPin className="w-2.5 h-2.5" />
                <span>{listing.toko.kabupatenKota}</span>
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-3.5 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">
                {listing.toko.namaToko}
              </p>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-2 mt-0.5 group-hover:text-sky-700 transition-colors">
                {listing.judulJual}
              </h3>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-extrabold text-[#B61F18]">
                  {formatRupiah(Number(listing.hargaJual))}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {listing.terjual} terjual
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default async function MPStorefront({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { kota, kategori, q } = params;

  const kategoriList = await prisma.kategoriProduk.findMany({
    where: { aktif: true },
    orderBy: { urutan: "asc" },
    take: 12,
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Marketplace Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <Logo size="md" />

          {/* Search bar */}
          <form className="flex-1 max-w-xl hidden sm:block">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Cari produk lokal, sembako, elektronik..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {kota && <input type="hidden" name="kota" value={kota} />}
            </div>
          </form>

          <div className="flex items-center gap-3">
            <Link
              href="/mp/cart"
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition relative"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#10245a] hover:bg-[#0c1c45] transition"
            >
              Portal Masuk
            </Link>
          </div>
        </div>
      </header>

      {/* Location Filter Banner */}
      <div className="bg-white border-b border-slate-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <form className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Lokasi Belanja:</span>
            </div>
            <input
              type="text"
              name="kota"
              defaultValue={kota}
              placeholder="Ketik Kota/Kabupaten (cth: Kota Makassar)"
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {q && <input type="hidden" name="q" value={q} />}
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition"
            >
              Pilih Kota
            </button>
            {kota && (
              <Link
                href="/mp"
                className="text-xs text-slate-500 hover:text-slate-800 underline ml-1"
              >
                Reset
              </Link>
            )}
          </form>

          {kota ? (
            <div className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Menampilkan toko resmi di <strong>{kota}</strong> (Lokal First)</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">
              Semua toko di seluruh wilayah ditampilkan
            </span>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Category Sidebar */}
        <aside className="w-full md:w-56 shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Kategori Produk</span>
            </h3>
            <div className="space-y-1">
              <Link
                href={kota ? `/mp?kota=${kota}` : "/mp"}
                className={`block px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  !kategori
                    ? "bg-[#10245a] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Semua Kategori
              </Link>
              {kategoriList.map((kat) => (
                <Link
                  key={kat.id}
                  href={`/mp?kategori=${kat.slug}${kota ? `&kota=${kota}` : ""}`}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium transition ${
                    kategori === kat.slug
                      ? "bg-[#10245a] text-white font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {kat.nama}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Suspense
              fallback={
                <div className="col-span-full py-16 text-center text-slate-400 text-xs">
                  Memuat katalog produk lokal...
                </div>
              }
            >
              <ProductGrid kota={kota} kategori={kategori} q={q} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}