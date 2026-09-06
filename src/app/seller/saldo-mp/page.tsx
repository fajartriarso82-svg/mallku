"use client";

import { useState } from "react";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Banknote } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { dummyMutasiSaldoMP } from "@/lib/dummy/toko-data";
import type { MutasiSaldoMP } from "@/lib/dummy/toko-types";

const columns: Column<MutasiSaldoMP>[] = [
  { key: "tgl", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "deskripsi", header: "Keterangan", render: (r) => <div><p className="font-medium text-slate-700">{r.deskripsi}</p><p className="font-mono text-[10px] text-slate-400">{r.ref}</p></div> },
  {
    key: "nominal", header: "Nominal", sortable: true, sortValue: (r) => r.nominal,
    render: (r) => (
      <span className={cn("inline-flex items-center gap-1 font-bold", r.jenis === "MASUK" ? "text-emerald-600" : "text-rose-600")}>
        {r.jenis === "MASUK" ? <ArrowDownCircle className="h-4 w-4" /> : <ArrowUpCircle className="h-4 w-4" />}
        {r.jenis === "MASUK" ? "+" : "-"}{formatRupiah(r.nominal)}
      </span>
    ),
  },
  { key: "saldo", header: "Saldo Akhir", sortable: true, sortValue: (r) => r.saldoAkhir, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.saldoAkhir)}</span> },
];

export default function SaldoMPPage() {
  const [open, setOpen] = useState(false);
  const saldo = dummyMutasiSaldoMP[1]?.saldoAkhir ?? 0;

  return (
    <div>
      <PageHeader title="Marketplace — Keuangan (Saldo)" description="Saldo hasil penjualan & riwayat mutasi" />

      {/* Kartu saldo */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#B45309] via-[#b66a1a] to-[#92400e] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200">
              <Wallet className="h-4 w-4" /> Saldo Marketplace (hasil jualan)
            </div>
            <p className="mt-2 text-3xl font-extrabold md:text-4xl">{formatRupiah(saldo)}</p>
            <p className="mt-1 text-[11px] text-amber-200/70">Dompet terpisah dari saldo SCM — hanya berisi hasil penjualan ke pembeli.</p>
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-bold text-amber-700 shadow hover:bg-amber-50 lg:self-auto">
            <Banknote className="h-4 w-4" /> Ajukan Pencairan
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-slate-800">Riwayat Mutasi Saldo</h3>
        <DataTable columns={columns} data={dummyMutasiSaldoMP} rowKey={(r) => r.id} pageSize={8} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Ajukan Pencairan Dana" description="Transfer ke rekening terdaftar" size="md"
        footer={<>
          <button onClick={() => setOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Batal</button>
          <button onClick={() => setOpen(false)} className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-400">Ajukan</button>
        </>}>
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-400">Saldo tersedia</p><p className="text-xl font-extrabold text-slate-800">{formatRupiah(saldo)}</p></div>
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nominal Pencairan</span>
            <input type="number" placeholder="Masukkan nominal" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-400" /></label>
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Rekening Tujuan</span>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-amber-400">
              <option>Bank BCA — 1234567890 (a.n. Toko Berkah Abadi)</option>
              <option>Bank Mandiri — 9876543210 (a.n. Toko Berkah Abadi)</option>
            </select></label>
        </div>
      </Modal>
    </div>
  );
}
