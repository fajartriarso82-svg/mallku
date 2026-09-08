"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Store } from "lucide-react";
import { useMpCart, useHydrated } from "@/lib/mp-cart-store";
import { getProdukById, getProdukUnggulan } from "@/lib/dummy/mp-data";
import { formatRupiah } from "@/lib/utils";
import { ProductCard } from "@/components/mp/product-card";

export default function KeranjangPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { lines, setQty, removeItem } = useMpCart();

  const items = lines
    .map((l) => ({ ...l, produk: getProdukById(l.produkId) }))
    .filter((l) => l.produk);

  const subtotal = items.reduce((acc, l) => acc + (l.produk?.harga ?? 0) * l.qty, 0);
  const rekomendasi = getProdukUnggulan().slice(0, 5);

  // Hindari hydration mismatch dari zustand persist (localStorage).
  // Server & render pertama client sama-sama menampilkan skeleton.
  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mk-red">Belanja</p>
          <h1 className="mt-1 text-2xl font-extrabold text-mk-navy">Keranjang Belanja</h1>
        </div>
        <div className="grid gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/70" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-mk-red">Belanja</p>
        <h1 className="mt-1 text-2xl font-extrabold text-mk-navy">Keranjang Belanja</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-mk-bg">
            <ShoppingCart className="h-10 w-10 text-slate-300" />
          </div>
          <p className="mt-4 text-lg font-bold text-slate-700">Keranjangmu masih kosong</p>
          <p className="mt-1 text-sm text-slate-500">Yuk mulai belanja kebutuhan dari toko lokal.</p>
          <Link href="/" className="mt-5 inline-block rounded-xl bg-mk-red px-6 py-3 text-sm font-bold text-white hover:bg-mk-red-light">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Daftar item */}
          <div className="space-y-3">
            {items.map(({ produk, qty }) => {
              if (!produk) return null;
              return (
                <div key={produk.id} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <Link href={`/produk/${produk.slug}`} className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-mk-bg text-4xl">
                    {produk.foto}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href={`/produk/${produk.slug}`} className="line-clamp-1 font-bold text-slate-800 hover:text-mk-red">
                          {produk.judul}
                        </Link>
                        <Link href={`/toko/${produk.tokoSlug}`} className="mt-0.5 flex items-center gap-1 text-xs text-slate-400 hover:text-mk-cyan">
                          <Store className="h-3 w-3" /> {produk.tokoNama}
                        </Link>
                      </div>
                      <button onClick={() => removeItem(produk.id)} aria-label="Hapus" className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-xl border border-slate-200">
                        <button onClick={() => setQty(produk.id, qty - 1)} aria-label="Kurangi" className="p-2 text-slate-500 hover:text-mk-red"><Minus className="h-4 w-4" /></button>
                        <span className="w-10 text-center text-sm font-bold text-slate-700">{qty}</span>
                        <button onClick={() => setQty(produk.id, qty + 1)} aria-label="Tambah" className="p-2 text-slate-500 hover:text-mk-red"><Plus className="h-4 w-4" /></button>
                      </div>
                      <p className="text-base font-extrabold text-mk-red">{formatRupiah(produk.harga * qty)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ringkasan */}
          <div className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-extrabold text-mk-navy">Ringkasan Belanja</h2>
            <div className="space-y-2 border-b border-slate-100 pb-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Total Harga ({items.reduce((a, l) => a + l.qty, 0)} item)</span>
                <span className="font-semibold text-slate-800">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ongkos Kirim</span>
                <span className="font-semibold text-mk-green">Gratis</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Total</span>
              <span className="text-xl font-extrabold text-mk-red">{formatRupiah(subtotal)}</span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full rounded-xl bg-mk-red py-3 text-sm font-bold text-white transition hover:bg-mk-red-light"
            >
              Lanjut ke Checkout
            </button>
            <Link href="/" className="flex items-center justify-center gap-1 text-center text-xs font-semibold text-slate-500 hover:text-mk-navy">
              <ArrowLeft className="h-3.5 w-3.5" /> Lanjut Belanja
            </Link>
          </div>
        </div>
      )}

      {/* Rekomendasi */}
      {rekomendasi.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-extrabold text-mk-navy">Mungkin Kamu Suka</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {rekomendasi.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
