import Link from "next/link";
import { MapPin, Package } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

export interface MarketplaceProduct {
  id: string;
  judulJual: string;
  hargaJual: number | string;
  fotoUrls: string[];
  stokTampil: number;
  terjual: number;
  toko: { id: string; namaToko: string; slug: string; kabupatenKota: string };
  kategoriProduk?: { nama: string; slug: string } | null;
}

export function ProductCard({ product }: { product: MarketplaceProduct }) {
  const lowStock = product.stokTampil > 0 && product.stokTampil <= 5;
  return (
    <Link href={`/produk/${product.id}`} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#dce4e8] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-[#edf2f4]">
        {product.fotoUrls[0] ? <img src={product.fotoUrls[0]} alt={product.judulJual} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-[#9aa8af]"><Package className="h-10 w-10" /></div>}
        <span className="absolute left-2 top-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1 truncate rounded-lg bg-white/95 px-2 py-1 text-[10px] font-bold text-[#53616d] shadow-sm"><MapPin className="h-3 w-3 shrink-0 text-[#e53935]" />{product.toko.kabupatenKota}</span>
        {lowStock && <span className="absolute bottom-2 left-2 rounded-md bg-[#fff4df] px-2 py-1 text-[10px] font-bold text-[#a26100]">Sisa {product.stokTampil}</span>}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="truncate text-[11px] font-semibold text-[#168bc3]">{product.toko.namaToko}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#26343f] group-hover:text-[#168bc3]">{product.judulJual}</h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4"><div><p className="text-base font-extrabold text-[#e53935]">{formatRupiah(product.hargaJual)}</p><p className="mt-0.5 text-[10px] text-[#82919a]">{product.terjual} terjual</p></div><span className="text-[10px] font-medium text-[#82919a]">Lokal</span></div>
      </div>
    </Link>
  );
}
