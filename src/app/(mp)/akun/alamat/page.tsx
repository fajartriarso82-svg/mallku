import Link from "next/link";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { mpAlamatDummy } from "@/lib/dummy/mp-data";

export default function AlamatPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mk-red">Akun</p>
          <h1 className="mt-1 text-2xl font-extrabold text-mk-navy">Alamat Saya</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-mk-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-mk-navy-light">
          <Plus className="h-4 w-4" /> Alamat Baru
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {mpAlamatDummy.map((a) => (
          <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-mk-red" />
                <span className="font-extrabold text-mk-navy">{a.label}</span>
                {a.utama && <span className="rounded-full bg-mk-green/10 px-2 py-0.5 text-[10px] font-bold text-mk-green">Utama</span>}
              </div>
              <div className="flex gap-1">
                <button className="rounded-lg p-1.5 text-slate-400 hover:bg-mk-bg hover:text-mk-navy" aria-label="Ubah"><Pencil className="h-4 w-4" /></button>
                <button className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Hapus"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-700">{a.nama} · {a.telepon}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {a.alamatLengkap}, {a.kecamatan}, {a.kabupatenKota}, {a.provinsi} {a.kodePos}
            </p>
          </div>
        ))}
      </div>

      <Link href="/akun" className="inline-block text-sm font-semibold text-mk-red hover:underline">← Kembali ke Akun</Link>
    </div>
  );
}
