import Link from "next/link";
import Image from "next/image";
import { Store } from "lucide-react";

export interface StoreInfo {
  id: string;
  namaToko: string;
  slug: string;
  kabupatenKota: string;
  fotoProfil?: string;
  listingCount: number;
}

export default function StoreCard({ store }: { store: StoreInfo }) {
  return (
    <Link href={`/toko/${store.slug}`} className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary hover:shadow-md">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
        {store.fotoProfil ? (
          <Image src={store.fotoProfil} alt={store.namaToko} width={56} height={56} className="object-cover" />
        ) : (
          <Store className="h-6 w-6 text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="truncate text-sm font-medium text-gray-800 group-hover:text-primary">{store.namaToko}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <span>{store.kabupatenKota}</span>
        </p>
        <p className="mt-1 text-xs text-gray-400">{store.listingCount} produk tersedia</p>
      </div>
    </Link>
  );
}
