import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/mp/product-card";

export async function ProductResults({ kota, kategori, q, tokoId }: { kota?: string; kategori?: string; q?: string; tokoId?: string }) {
  const products = await prisma.listingMP.findMany({
    where: {
      status: "AKTIF", stokTampil: { gt: 0 },
      ...(tokoId ? { tokoId } : {}),
      ...(kota ? { toko: { kabupatenKota: { contains: kota, mode: "insensitive" } } } : {}),
      ...(kategori ? { kategoriProduk: { slug: kategori } } : {}),
      ...(q ? { OR: [{ judulJual: { contains: q, mode: "insensitive" } }, { deskripsi: { contains: q, mode: "insensitive" } }, { toko: { namaToko: { contains: q, mode: "insensitive" } } }] } : {}),
    },
    include: { toko: { select: { id: true, namaToko: true, slug: true, kabupatenKota: true } }, kategoriProduk: { select: { nama: true, slug: true } } },
    orderBy: [{ terjual: "desc" }, { createdAt: "desc" }], take: 36,
  });
  if (!products.length) return <div className="col-span-full rounded-2xl border border-dashed border-[#cbd7dd] bg-white p-14 text-center"><Search className="mx-auto h-9 w-9 text-[#9aa8af]" /><h3 className="mt-4 font-bold text-[#26343f]">Tidak ditemukan di sekitar Anda</h3><p className="mx-auto mt-1 max-w-sm text-sm text-[#82919a]">Coba ubah kata kunci, kategori, atau perluas area pencarian.</p><Link href="/" className="mt-4 inline-flex text-xs font-bold text-[#168bc3]">Kembali ke home</Link></div>;
  return <>{products.map((product) => <ProductCard key={product.id} product={{ ...product, hargaJual: Number(product.hargaJual) }} />)}</>;
}
