"use client";

import { useState } from "react";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Banknote, Plus } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah, formatDate } from "@/lib/utils";
import { dummyMutasiSaldo } from "@/lib/dummy/data-finance";
import type { MutasiSaldo } from "@/lib/dummy/types";
import { cn } from "@/lib/utils";

const columns: Column<MutasiSaldo>[] = [
  { key: "tanggal", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
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

export default function SaldoPage() {
  const [topupOpen, setTopupOpen] = useState(false);
  const [wdOpen, setWdOpen] = useState(false);
  const saldoAkhir = dummyMutasiSaldo[0]?.saldoAkhir ?? 0;
  const masuk = dummyMutasiSaldo.filter((m) => m.jenis === "MASUK").reduce((a, m) => a + m.nominal, 0);
  const keluar = dummyMutasiSaldo.filter((m) => m.jenis === "KELUAR").reduce((a, m) => a + m.nominal, 0);

  return (
    <div>
      <PageHeader title="Keuangan — Saldo" description="Saldo escrow & riwayat mutasi" />

      {/* Kartu saldo besar */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e2238] via-[#123050] to-[#0e2238] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-300">
              <Wallet className="h-4 w-4" /> Saldo Tersedia
            </div>
            <p className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">{formatRupiah(saldoAkhir)}</p>
            <div className="mt-4 flex gap-6 text-xs text-white/60">
              <div><p className="inline-flex items-center gap-1 font-semibold text-emerald-400"><ArrowDownCircle className="h-3.5 w-3.5" /> Masuk {formatRupiah(masuk)}</p></div>
              <div><p className="inline-flex items-center gap-1 font-semibold text-rose-300"><ArrowUpCircle className="h-3.5 w-3.5" /> Keluar {formatRupiah(keluar)}</p></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setWdOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-400">
              <Banknote className="h-4 w-4" /> Ajukan Pencairan
            </button>
            <button onClick={() => setTopupOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur hover:bg-white/20">
              <Plus className="h-4 w-4" /> Top Up
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-slate-800">Riwayat Mutasi Saldo</h3>
        <DataTable columns={columns} data={dummyMutasiSaldo} rowKey={(r) => r.id} pageSize={8} />
      </div>

      <Modal open={wdOpen} onClose={() => setWdOpen(false)} title="Ajukan Pencairan Dana" description="Dana akan ditransfer ke rekening terdaftar" size="md"
        footer={<>
          <button onClick={() => setWdOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
          <button onClick={() => setWdOpen(false)} className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500">Ajukan</button>
        </>}>
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <p className="text-xs text-slate-400">Saldo tersedia</p>
            <p className="text-xl font-extrabold text-slate-800">{formatRupiah(saldoAkhir)}</p>
          </div>
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nominal Pencairan</span>
            <input type="number" placeholder="Masukkan nominal" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Rekening Tujuan</span>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sky-400">
              <option>Bank BCA — 1234567890 (a.n. PT Berkah Distribusi)</option>
              <option>Bank Mandiri — 9876543210 (a.n. PT Berkah Distribusi)</option>
            </select></label>
        </div>
      </Modal>

      <Modal open={topupOpen} onClose={() => setTopupOpen(false)} title="Top Up Saldo" description="Isi saldo escrow untuk transaksi" size="md"
        footer={<>
          <button onClick={() => setTopupOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
          <button onClick={() => setTopupOpen(false)} className="rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Bayar Top Up</button>
        </>}>
        <div className="space-y-4">
          <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Nominal Top Up</span>
            <input type="number" placeholder="Minimal Rp100.000" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-sky-400" /></label>
          <div>
            <span className="mb-1.5 block text-xs font-bold text-slate-600">Metode Pembayaran</span>
            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-xl border-2 border-sky-500 bg-sky-50 px-4 py-3 text-sm font-bold text-sky-700">Virtual Account</button>
              <button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">QRIS</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
