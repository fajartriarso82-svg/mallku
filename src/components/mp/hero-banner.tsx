import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Leaf, BadgePercent } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-mk-navy-dark via-mk-navy to-mk-cyan-light text-white shadow-lg">
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <Leaf className="h-3.5 w-3.5 text-emerald-300" /> Utamakan Lokal
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            Kebutuhan Sehari-hari dari{" "}
            <span className="text-amber-300">Toko Lokal</span> Terdekatmu
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
            Belanja sembako, minuman, dan kebutuhan rumah langsung dari toko &
            UMKM di daerahmu. Harga bersahabat, kualitas terpercaya.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/kategori/sembako" className="inline-flex items-center gap-2 rounded-xl bg-mk-red px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-mk-red-light">
              Belanja Sekarang <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/cari" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
              Jelajahi Produk
            </Link>
          </div>
        </div>

        {/* Emoji visual collage */}
        <div className="hidden shrink-0 select-none md:block">
          <div className="grid grid-cols-3 gap-3 text-5xl">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">🍚</span>
            <span className="mt-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">🛢️</span>
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">🥚</span>
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">🧃</span>
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-400/30 backdrop-blur">🍗</span>
            <span className="mt-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">🍪</span>
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div className="grid grid-cols-2 gap-3 border-t border-white/10 px-6 py-4 text-xs font-semibold md:grid-cols-4 md:px-10">
        <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-amber-300" /> Pengiriman Cepat</span>
        <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Pembayaran Aman</span>
        <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-300" /> Produk Lokal</span>
        <span className="flex items-center gap-2"><BadgePercent className="h-4 w-4 text-amber-300" /> Harga Bersahabat</span>
      </div>
    </section>
  );
}
