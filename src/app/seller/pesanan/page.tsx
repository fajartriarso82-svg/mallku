"use client";

import { useMemo, useState } from "react";
import { Search, Truck, Store, Printer, PackageCheck, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { dummyPesananMP } from "@/lib/dummy/toko-data";
import type { PesananMP } from "@/lib/dummy/toko-types";

const STATUS_FILTERS = [
  { v: "", l: "Semua" }, { v: "BARU", l: "Baru" }, { v: "DIPROSES", l: "Diproses" },
  { v: "DIKIRIM", l: "Dikirim" }, { v: "DITERIMA", l: "Diterima" }, { v: "SELESAI", l: "Selesai" },
];

function KirimBadge({ m }: { m: PesananMP["metodeKirim"] }) {
  return m === "BITESHIP" ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-600"><Truck className="h-3 w-3" /> BiteShip</span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-600"><Store className="h-3 w-3" /> Kirim Sendiri</span>
  );
}

const columns: Column<PesananMP>[] = [
  { key: "nomor", header: "No. Order", render: (r) => <span className="font-semibold text-sky-700">{r.nomorOrder}</span> },
  { key: "pembeli", header: "Pembeli", render: (r) => <div><p className="font-medium text-slate-700">{r.pembeli}</p><p className="text-[11px] text-slate-400">{r.kota}</p></div> },
  { key: "tgl", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "kirim", header: "Kirim", render: (r) => <KirimBadge m={r.metodeKirim} /> },
  { key: "total", header: "Total", sortable: true, sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.total)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "BARU" ? "MENUNGGU" : r.status} /> },
];

export default function PesananMPPage() {
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState<PesananMP | null>(null);
  const filtered = useMemo(() => dummyPesananMP.filter((p) => !status || p.status === status), [status]);

  const nextStatus = detail ? (detail.status === "BARU" ? "DIPROSES" : detail.status === "DIPROSES" ? "DIKIRIM" : detail.status === "DIKIRIM" ? "DITERIMA" : null) : null;

  return (
    <div>
      <PageHeader title="Marketplace — PO / Pesanan Masuk" description="Kelola pesanan dari pembeli di Marketplace" />

      {/* Filter chips */}
      <div className="mb-4 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {STATUS_FILTERS.map((f) => (
          <button key={f.v} onClick={() => setStatus(f.v)}
            className={cn("rounded-lg px-3.5 py-1.5 text-xs font-bold transition", status === f.v ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200")}>
            {f.l}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} onRowClick={(r) => setDetail(r)} />
      </div>

      {/* Detail modal */}
      <Modal open={detail !== null} onClose={() => setDetail(null)} title={detail?.nomorOrder ?? ""} description="Detail pesanan dari pembeli" size="lg"
        footer={<>
          <button onClick={() => setDetail(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Printer className="mr-1.5 inline h-4 w-4" />Cetak Label</button>
          {nextStatus && (
            <button className={cn("inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-white", nextStatus === "DIKIRIM" ? "bg-violet-600 hover:bg-violet-500" : "bg-amber-500 hover:bg-amber-400")}>
              <PackageCheck className="h-4 w-4" /> Update: {nextStatus === "DIPROSES" ? "Mulai Proses" : nextStatus === "DIKIRIM" ? "Tandai Dikirim" : "Tandai Terkirim"}
            </button>
          )}
        </>}>
        {detail && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
              <div><p className="text-xs text-slate-400">Pembeli</p><p className="font-bold text-slate-800">{detail.pembeli}</p><p className="text-xs text-slate-400">{detail.kota}</p></div>
              <div className="text-right"><p className="text-xs text-slate-400">Pengiriman</p><KirimBadge m={detail.metodeKirim} /></div>
              <div><StatusBadge status={detail.status === "BARU" ? "MENUNGGU" : detail.status} /></div>
            </div>
            {detail.kurir && (
              <div className="rounded-xl border border-slate-200 p-3 text-xs text-slate-600">
                <p>Kurir: <strong>{detail.kurir}</strong> · Resi: <span className="font-mono">{detail.resi}</span></p>
              </div>
            )}
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50 text-left text-[11px] uppercase text-slate-400"><th className="px-3 py-2">Produk</th><th className="px-3 py-2 text-center">Qty</th><th className="px-3 py-2 text-right">Subtotal</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {detail.items.map((it, i) => (
                    <tr key={i}><td className="px-3 py-2 font-medium text-slate-700">{it.nama}</td><td className="px-3 py-2 text-center">{it.qty}</td><td className="px-3 py-2 text-right font-bold text-slate-800">{formatRupiah(it.harga * it.qty)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatRupiah(detail.subtotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>Ongkir</span><span>{detail.ongkir === 0 ? "Gratis" : formatRupiah(detail.ongkir)}</span></div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-extrabold text-slate-800"><span>Total</span><span>{formatRupiah(detail.total)}</span></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
