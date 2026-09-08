import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: string;
  namaProduk: string;
  hargaJual: number;
  fotoProduk?: string;
  toko: {
    namaToko: string;
    slug: string;
    kabupatenKota: string;
  };
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.id}`} className="group block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50">
        {product.fotoProduk ? (
          <Image src={product.fotoProduk} alt={product.namaProduk} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}
      </div>
      <h3 className="mt-3 truncate text-sm font-medium text-gray-800 group-hover:text-primary">
        {product.namaProduk}
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        {product.toko.namaToko} • {product.toko.kabupatenKota}
      </p>
      <p className="mt-2 text-sm font-semibold text-gray-900">Rp {product.hargaJual.toLocaleString()}</p>
    </Link>
  );
}
