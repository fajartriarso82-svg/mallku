import { cn } from "@/lib/utils";

// Peta warna konsisten berdasarkan tipe status
// kuning = pending/menunggu, biru = diproses/dikirim, hijau = sukses/aktif,
// merah = gagal/nunggak/dibatalkan, abu = draft/netral
const toneMap: Record<string, string> = {
  // Netral / draft
  DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
  KADALUARSA: "bg-slate-100 text-slate-500 border-slate-200",
  NONAKTIF: "bg-slate-100 text-slate-500 border-slate-200",
  // Kuning — pending/menunggu
  MENUNGGU_PEMBAYARAN: "bg-amber-50 text-amber-700 border-amber-200",
  MENUNGGU: "bg-amber-50 text-amber-700 border-amber-200",
  PROSES: "bg-amber-50 text-amber-700 border-amber-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  NUNGGAK: "bg-rose-50 text-rose-700 border-rose-200",
  // Biru — diproses/dikirim
  DIBAYAR: "bg-sky-50 text-sky-700 border-sky-200",
  DIPROSES: "bg-sky-50 text-sky-700 border-sky-200",
  DIKIRIM: "bg-sky-50 text-sky-700 border-sky-200",
  DIKONFIRMASI: "bg-indigo-50 text-indigo-700 border-indigo-200",
  KOREKSI: "bg-violet-50 text-violet-700 border-violet-200",
  // Hijau — sukses/aktif
  AKTIF: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SELESAI: "bg-emerald-50 text-emerald-700 border-emerald-200",
  DITERIMA: "bg-emerald-50 text-emerald-700 border-emerald-200",
  LUNAS: "bg-emerald-50 text-emerald-700 border-emerald-200",
  MASUK: "bg-emerald-50 text-emerald-700 border-emerald-200",
  // Merah — gagal/batal/keluar/nonaktif tunggakan
  DIBATALKAN: "bg-rose-50 text-rose-700 border-rose-200",
  GAGAL: "bg-rose-50 text-rose-700 border-rose-200",
  KELUAR: "bg-rose-50 text-rose-700 border-rose-200",
  REFUND: "bg-rose-50 text-rose-700 border-rose-200",
};

const labelMap: Record<string, string> = {
  MENUNGGU_PEMBAYARAN: "Menunggu Bayar",
  DIBAYAR: "Dibayar",
  DIPROSES: "Diproses",
  DIKIRIM: "Dikirim",
  DITERIMA: "Diterima",
  SELESAI: "Selesai",
  DIBATALKAN: "Dibatalkan",
  DIKONFIRMASI: "Dikonfirmasi",
  AKTIF: "Aktif",
  NONAKTIF: "Nonaktif",
  KADALUARSA: "Kadaluarsa",
  LUNAS: "Lunas",
  NUNGGAK: "Nunggak",
  PROSES: "Diproses",
  MASUK: "Masuk",
  KELUAR: "Keluar",
  KOREKSI: "Koreksi",
  DRAFT: "Draft",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const normalized = status.toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
        toneMap[normalized] ?? "bg-slate-100 text-slate-600 border-slate-200",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {labelMap[normalized] ?? status}
    </span>
  );
}
