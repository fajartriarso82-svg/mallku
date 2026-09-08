"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Eye, CheckCircle2, Building2, ArrowRight, ShoppingCart, Send, Landmark, Minus } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { DataTable, type Column } from "@/components/distributor/data-table";
import { StatusBadge } from "@/components/distributor/status-badge";
import { Modal } from "@/components/distributor/modal";
import { formatRupiah, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { dummyPOPembelian, dummyKatalogSCM, dummyDistributorMitra } from "@/lib/dummy/toko-data";
import type { POPembelian } from "@/lib/dummy/toko-types";

const columns: Column<POPembelian>[] = [
  { key: "nomor", header: "No. PO", render: (r) => <span className="font-semibold text-sky-700">{r.nomorPO}</span> },
  { key: "tgl", header: "Tanggal", sortable: true, sortValue: (r) => r.tanggal, render: (r) => <span className="text-slate-500">{formatDate(r.tanggal)}</span> },
  { key: "dist", header: "Distributor", render: (r) => <div><p className="font-medium text-slate-700">{r.distributor}</p><p className="text-[11px] text-slate-400">{r.kota}</p></div> },
  { key: "total", header: "Total", sortable: true, sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-800">{formatRupiah(r.total)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "aksi", header: "", render: () => <span className="text-xs text-slate-400">klik utk detail</span> },
];

export default function POTokoPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState<POPembelian | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [chosenDist, setChosenDist] = useState("");
  const [cart, setCart] = useState<{ id: string; nama: string; harga: number; qty: number; satuan: string }[]>([]);
  const [done, setDone] = useState(false);

  const filtered = useMemo(() => dummyPOPembelian.filter((p) => {
    const okQ = !q || p.nomorPO.toLowerCase().includes(q.toLowerCase()) || p.distributor.toLowerCase().includes(q.toLowerCase());
    const okS = !status || p.status === status;
    return okQ && okS;
  }), [q, status]);

  const distActive = dummyDistributorMitra.filter((d) => d.status === "AKTIF");
  const catalog = chosenDist ? dummyKatalogSCM.filter((k) => k.distributor === chosenDist) : [];
  const total = cart.reduce((a, c) => a + c.harga * c.qty, 0);

  function addItem(id: string) {
    const p = catalog.find((k) => k.id === id);
    if (!p) return;
    setCart((prev) => {
      const ex = prev.find((c) => c.id === id);
      return ex ? prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)) : [...prev, { id: p.id, nama: p.nama, harga: p.hargaTier[0].harga, qty: 1, satuan: p.satuan }];
    });
  }
  function inc(id: string, d: number) {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: Math.max(1, c.qty + d) } : c)));
  }

  return (
    <div>
      <PageHeader title="SCM — Manajemen PO" description="Purchase Order belanja grosir ke distributor"
        actions={<button onClick={() => { setWizardOpen(true); setStep(1); setChosenDist(""); setCart([]); setDone(false); }} className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-500"><Plus className="h-4 w-4" /> Buat PO Baru</button>} />

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari no. PO / distributor..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-cyan-400 focus:bg-white" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-400">
          <option value="">Semua Status</option>
          <option value="MENUNGGU_PEMBAYARAN">Menunggu Bayar</option>
          <option value="DIBAYAR">Dibayar</option>
          <option value="DIPROSES">Diproses</option>
          <option value="DIKIRIM">Dikirim</option>
          <option value="DITERIMA">Diterima</option>
          <option value="SELESAI">Selesai</option>
          <option value="DIBATALKAN">Dibatalkan</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable columns={columns} data={filtered} rowKey={(r) => r.id} pageSize={8} onRowClick={(r) => setDetail(r)} />
      </div>

      {/* Detail modal */}
      <Modal open={detail !== null} onClose={() => setDetail(null)} title={detail?.nomorPO ?? ""} description="Detail PO belanja ke distributor" size="lg"
        footer={<>
          <button onClick={() => setDetail(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Tutup</button>
          {detail && detail.status === "DIKIRIM" && (
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500">
              <CheckCircle2 className="h-4 w-4" /> Konfirmasi Diterima
            </button>
          )}
          {detail && detail.status === "MENUNGGU_PEMBAYARAN" && (
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-500">
              <Landmark className="h-4 w-4" /> Bayar via VA
            </button>
          )}
        </>}>
        {detail && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4">
              <div><p className="text-xs text-slate-400">Distributor</p><p className="font-bold text-slate-800">{detail.distributor}</p><p className="text-xs text-slate-400">{detail.kota}</p></div>
              <div><p className="text-xs text-slate-400">Tanggal</p><p className="font-bold text-slate-800">{formatDate(detail.tanggal)}</p><div className="mt-1"><StatusBadge status={detail.status} /></div></div>
            </div>
            {detail.vaNumber && (
              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-xs text-cyan-800">
                <p className="font-bold mb-0.5">Virtual Account</p>
                <p className="font-mono text-lg font-extrabold">{detail.vaNumber}</p>
              </div>
            )}
            {(detail.items ?? []).length > 0 && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead><tr className="bg-slate-50 text-left text-[11px] uppercase text-slate-400"><th className="px-3 py-2">Produk</th><th className="px-3 py-2 text-center">Qty</th><th className="px-3 py-2 text-right">Subtotal</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {(detail.items ?? []).map((it, i) => (
                      <tr key={i}><td className="px-3 py-2 font-medium text-slate-700">{it.nama}</td><td className="px-3 py-2 text-center">{it.qty}</td><td className="px-3 py-2 text-right font-bold text-slate-800">{formatRupiah(it.harga * it.qty)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-end rounded-xl bg-[#0e2238] px-4 py-3 text-white"><p className="text-right"><span className="block text-[10px] text-white/50">Total PO</span><span className="text-xl font-extrabold">{formatRupiah(detail.total)}</span></p></div>
          </div>
        )}
      </Modal>

      {/* Wizard Buat PO */}
      <Modal open={wizardOpen} onClose={() => setWizardOpen(false)} title={done ? "PO Berhasil Dibuat!" : "Buat PO Baru"} description={done ? "" : `Langkah ${step} dari 3`} size="xl">
        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-7 w-7" /></div>
            <p className="text-sm text-slate-500">PO ke <strong>{chosenDist}</strong> senilai {formatRupiah(total)} berhasil dibuat.</p>
            <div className="mx-auto mt-4 max-w-sm rounded-xl border border-cyan-200 bg-cyan-50 p-4">
              <p className="text-xs font-bold text-cyan-800">Virtual Account BCA</p>
              <p className="font-mono text-xl font-extrabold text-cyan-900">9880 4321 0192837</p>
              <p className="text-[10px] text-cyan-600">Berlaku hingga {formatDate("2026-09-08T23:59:00")}</p>
            </div>
            <button onClick={() => setWizardOpen(false)} className="mt-5 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-cyan-500">Selesai</button>
          </div>
        ) : (
          <div>
            {/* Stepper */}
            <div className="mb-5 flex items-center gap-2">
              {["Pilih Distributor", "Pilih Produk", "Checkout"].map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold", step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-cyan-600 text-white" : "bg-slate-200 text-slate-500")}>{i + 1}</div>
                  <span className={cn("hidden text-[11px] font-semibold sm:block", step === i + 1 ? "text-slate-800" : "text-slate-400")}>{s}</span>
                  {i < 2 && <div className={cn("h-0.5 flex-1 rounded", step > i + 1 ? "bg-emerald-400" : "bg-slate-200")} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {distActive.map((d) => (
                  <button key={d.id} onClick={() => setChosenDist(d.nama)}
                    className={cn("flex items-center gap-3 rounded-2xl border p-4 text-left transition", chosenDist === d.nama ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-200" : "border-slate-200 hover:bg-slate-50")}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Building2 className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1"><p className="truncate font-bold text-slate-800">{d.nama}</p><p className="text-[11px] text-slate-400">{d.kota}</p></div>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
                  {catalog.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-lg">{p.foto ?? "📦"}</div>
                      <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-700">{p.nama}</p><p className="text-[10px] text-slate-400">{formatRupiah(p.hargaTier[0].harga)} / {p.satuan}</p></div>
                      <button onClick={() => addItem(p.id)} className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-2 py-1.5 text-[11px] font-bold text-white hover:bg-cyan-500"><Plus className="h-3 w-3" /> Tambah</button>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><ShoppingCart className="h-4 w-4 text-cyan-600" /> Keranjang</div>
                  {cart.length === 0 ? <p className="py-6 text-center text-xs text-slate-400">Belum ada produk</p> : (
                    <div className="space-y-2">
                      {cart.map((c) => (
                        <div key={c.id} className="flex items-center gap-2 text-xs">
                          <span className="min-w-0 flex-1 truncate text-slate-600">{c.nama}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => inc(c.id, -1)} className="rounded bg-slate-100 p-0.5 text-slate-500 hover:bg-slate-200"><Minus className="h-3 w-3" /></button>
                            <span className="w-5 text-center font-bold">{c.qty}</span>
                            <button onClick={() => inc(c.id, 1)} className="rounded bg-slate-100 p-0.5 text-slate-500 hover:bg-slate-200"><Plus className="h-3 w-3" /></button>
                          </div>
                          <span className="font-bold text-slate-700">{formatRupiah(c.harga * c.qty)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-slate-100 pt-2 text-sm"><span className="text-slate-500">Total</span><span className="font-extrabold text-slate-800">{formatRupiah(total)}</span></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-50 p-4 text-sm">
                  <p className="text-xs text-slate-400">Distributor tujuan</p>
                  <p className="font-bold text-slate-800">{chosenDist}</p>
                  <div className="mt-2 flex justify-between text-sm"><span className="text-slate-500">Total tagihan</span><span className="text-xl font-extrabold text-slate-800">{formatRupiah(total)}</span></div>
                  <p className="mt-1 text-[11px] text-slate-400">{cart.length} jenis produk</p>
                </div>
                <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-xs text-cyan-800">
                  <p className="mb-1 font-bold">Metode Pembayaran</p>
                  <p>Setelah PO dikirim, Anda akan mendapat <strong>Virtual Account</strong> untuk transfer. Stok otomatis masuk &amp; bisa ditayangkan ke MP setelah pembayaran dikonfirmasi distributor.</p>
                </div>
              </div>
            )}

            {/* Footer nav */}
            <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
              {step > 1 && <button onClick={() => setStep(step - 1)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Kembali</button>}
              {step === 1 && <button disabled={!chosenDist} onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40 hover:bg-cyan-500">Lanjut <ArrowRight className="h-4 w-4" /></button>}
              {step === 2 && <button disabled={cart.length === 0} onClick={() => setStep(3)} className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40 hover:bg-cyan-500">Checkout <ArrowRight className="h-4 w-4" /></button>}
              {step === 3 && <button onClick={() => setDone(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"><Send className="h-4 w-4" /> Kirim PO</button>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
