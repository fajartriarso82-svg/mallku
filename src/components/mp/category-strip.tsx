import Link from "next/link";
import { mpKategoriList } from "@/lib/dummy/mp-data";

export function CategoryStrip() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {mpKategoriList.map((k) => (
          <Link
            key={k.id}
            href={`/kategori/${k.slug}`}
            className="group flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-mk-bg"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${k.warna} transition group-hover:scale-105`}>
              {k.ikon}
            </span>
            <span className="text-center text-[11px] font-semibold leading-tight text-slate-600 group-hover:text-mk-navy">
              {k.nama}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
