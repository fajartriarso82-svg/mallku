import Link from "next/link";
import { PackageOpen } from "lucide-react";

export const metadata = { title: "Pesanan Saya" };

const tabs = ["Semua", "Menunggu Bayar", "Dikemas", "Dikirim", "Selesai"];

export default function PesananPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-mk-red">Akun</p>
        <h1 className="mt-1 text-2xl font-extrabold text-mk-navy">Pesanan Saya</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
        {tabs.map((t, i) => (
          <button key={t} className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-bold ${i === 0 ? "border-mk-red text-mk-red" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Kosong */}
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-mk-bg">
          <PackageOpen className="h-10 w-10 text-slate-300" />
        </div>
        <p className="mt-4 text-lg font-bold text-slate-700">Belum ada pesanan</p>
        <p className="mt-1 text-sm text-slate-500">Pesanan yang kamu buat akan muncul di sini.</p>
        <Link href="/" className="mt-5 inline-block rounded-xl bg-mk-red px-6 py-3 text-sm font-bold text-white hover:bg-mk-red-light">
          Mulai Belanja
        </Link>
      </div>
    </div>
  );
}
