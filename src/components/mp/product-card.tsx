"use client";

import Link from "next/link";
import { Star, ShoppingCart, Store } from "lucide-react";
import type { MPProduk } from "@/lib/dummy/mp-types";
import { formatRupiah } from "@/lib/utils";
import { useMpCart } from "@/lib/mp-cart-store";

export function ProductCard({ product }: { product: MPProduk }) {
  const addItem = useMpCart((s) => s.addItem);

  const diskon = product.hargaCoret && product.hargaCoret > product.harga
    ? Math.round(((product.hargaCoret - product.harga) / product.hargaCoret) * 100)
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/produk/${product.slug}`} className="relative flex h-40 items-center justify-center bg-gradient-to-br from-mk-bg to-slate-100 text-6xl">
        <span className="drop-shadow-sm">{product.foto}</span>
        {diskon > 0 && (
          <span className="absolute left-2 top-2 rounded-lg bg-mk-red px-2 py-1 text-[10px] font-extrabold text-white">
            -{diskon}%
          </span>
        )}
        {product.stok <= 10 && (
          <span className="absolute right-2 top-2 rounded-lg bg-slate-800/80 px-2 py-1 text-[10px] font-bold text-white">
            Sisa {product.stok}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link href={`/toko/${product.tokoSlug}`} className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-mk-cyan">
          <Store className="h-3 w-3" />
          <span className="truncate">{product.tokoNama}</span>
          <span>· {product.tokoKota}</span>
        </Link>

        <Link href={`/produk/${product.slug}`} className="mt-1 line-clamp-2 min-h-[2.4rem] text-sm font-semibold leading-snug text-slate-800 hover:text-mk-red">
          {product.judul}
        </Link>

        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-700">{product.rating}</span>
          <span className="text-slate-400">| {product.terjual} terjual</span>
        </div>

        <div className="mt-2 flex items-end justify-between gap-2">
          <div>
            <p className="text-base font-extrabold text-mk-navy">{formatRupiah(product.harga)}</p>
            {product.hargaCoret && (
              <p className="text-[11px] text-slate-400 line-through">{formatRupiah(product.hargaCoret)}</p>
            )}
          </div>
          <button
            onClick={() => addItem(product.id)}
            aria-label={`Tambah ${product.judul} ke keranjang`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mk-red text-white shadow-sm transition hover:bg-mk-red-light"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
