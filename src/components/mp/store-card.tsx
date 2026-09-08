import Link from "next/link";
import { Star, BadgeCheck, MapPin, Package } from "lucide-react";
import type { MPToko } from "@/lib/dummy/mp-types";

export function StoreCard({ store }: { store: MPToko }) {
  return (
    <Link
      href={`/toko/${store.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-mk-cyan hover:shadow-md"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-mk-navy to-mk-cyan text-xl font-extrabold text-white">
        {store.nama.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate font-bold text-slate-800 group-hover:text-mk-navy">{store.nama}</p>
          {store.isOfficial && <BadgeCheck className="h-4 w-4 shrink-0 text-mk-cyan" />}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {store.rating}</span>
          <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" /> {store.produkAktif} produk</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {store.kota}</span>
        </div>
      </div>
      <span className="hidden shrink-0 text-sm font-bold text-mk-red group-hover:underline sm:block">Kunjungi →</span>
    </Link>
  );
}
