"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingCart, Building2, Plus, Minus, Trash2, Send } from "lucide-react";
import { PageHeader } from "@/components/distributor/page-header";
import { formatRupiah } from "@/lib/utils";
import { dummyDistributorPartner } from "@/lib/dummy/data-jaringan";
import { dummyProdukKatalog } from "@/lib/dummy/data-orders";
import { cn } from "@/lib/utils";

interface CartLine { id: string; nama: string; harga: number; qty: number; satuan: string; }

export default function BuatPOKeluarPage() {
  const [step, setStep] = useState(1);
  const [distId, setDistId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [done, setDone] = useState(false);

  const dist = dummyDistributorPartner.filter((d) => d.status === "AKTIF");
  const catalog = distId ? dummyProdukKatalog.filter((p) => p.distributor === dist.find((x) => x.id === distId)?.nama || distId === "all") : dummyProdukKatalog;
  const selectedDist = dist.find((d) => d.id === distId);

  function addToCart(p: (typeof dummyProdukKatalog)[number]) {
    setCart((prev) => {
      const ex = prev.find((l) => l.id === p.id);
      if (ex) return prev.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id: p.id, nama: p.nama, harga: p.harga, qty: 1, satuan: p.satuan }];
    });
  }
  function updateQty(id: string, delta: number) {
    setCart((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l)).filter((l) => l.qty > 0));
  }
  function removeLine(id: string) {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }
  const total = cart.reduce((a, l) => a + l.harga * l.qty, 0);

  if (done) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check className="h-8 w-8" /></div>
          <h2 className="text-xl font-extrabold text-slate-800">PO Berhasil Dibuat!</h2>
          <p className="mt-2 text-sm text-slate-500">Purchase Order <span className="font-bold text-sky-700">PO-KL-20260906-013</span> telah dikirim ke {selectedDist?.nama}.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link href="/scm/distributor/po-keluar" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Lihat Riwayat PO</Link>
            <button onClick={() => { setStep(1); setDistId(null); setCart([]); setDone(false); }} className="rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123050]">Buat PO Lagi</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Buat PO Baru" description="Kirim Purchase Order ke distributor partner"
        actions={<Link href="/scm/distributor/po-keluar" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"><ArrowLeft className="h-4 w-4" /> Kembali</Link>} />

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-2">
        {["Pilih Distributor", "Pilih Produk", "Review & Kirim"].map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold", step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-[#0e2238] text-white" : "bg-slate-200 text-slate-500")}>
              {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("hidden text-xs font-semibold sm:block", step === i + 1 ? "text-slate-800" : "text-slate-400")}>{s}</span>
            {i < 2 && <div className={cn("h-0.5 flex-1 rounded", step > i + 1 ? "bg-emerald-400" : "bg-slate-200")} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-800">Pilih Distributor Tujuan</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dist.map((d) => (
              <button key={d.id} onClick={() => setDistId(d.id)}
                className={cn("flex flex-col rounded-2xl border p-4 text-left transition", distId === d.id ? "border-sky-500 bg-sky-50 ring-2 ring-sky-200" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Building2 className="h-5 w-5" /></div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-800">{d.nama}</p>
                    <p className="text-[11px] text-slate-400">{d.kota}, {d.provinsi}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {d.kategori.slice(0, 3).map((k) => <span key={k} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{k}</span>)}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button disabled={!distId} onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0e2238] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40 hover:bg-[#123050]">
              Lanjut Pilih Produk <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Katalog {selectedDist?.nama}</h3>
                <p className="text-xs text-slate-400">Pilih produk yang akan dibeli</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {catalog.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-xl">📦</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-700">{p.nama}</p>
                    <p className="text-[11px] text-slate-400">{p.kategoriMaster} · stok {p.stok}</p>
                    <p className="text-sm font-extrabold text-slate-800">{formatRupiah(p.harga)}</p>
                  </div>
                  <button onClick={() => addToCart(p)} className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-2.5 py-2 text-xs font-bold text-white hover:bg-sky-500">
                    <Plus className="h-3.5 w-3.5" /> Tambah
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Keranjang */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2"><ShoppingCart className="h-4 w-4 text-sky-600" /><h3 className="text-sm font-bold text-slate-800">Keranjang</h3></div>
            {cart.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">Belum ada produk dipilih</p>
            ) : (
              <div className="space-y-2">
                {cart.map((l) => (
                  <div key={l.id} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                    <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold text-slate-700">{l.nama}</p><p className="text-[10px] text-slate-400">{formatRupiah(l.harga)} / {l.satuan}</p></div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(l.id, -1)} className="rounded p-0.5 text-slate-400 hover:bg-slate-200"><Minus className="h-3 w-3" /></button>
                      <span className="w-5 text-center text-xs font-bold">{l.qty}</span>
                      <button onClick={() => updateQty(l.id, 1)} className="rounded p-0.5 text-slate-400 hover:bg-slate-200"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => removeLine(l.id)} className="rounded p-1 text-rose-400 hover:bg-rose-50"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Total</span><span className="font-extrabold text-slate-800">{formatRupiah(total)}</span></div>
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-between gap-2">
              <button onClick={() => setStep(1)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Kembali</button>
              <button disabled={cart.length === 0} onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0e2238] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-40 hover:bg-[#123050]">
                Review <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-800">Review Purchase Order</h3>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead><tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-400">
                    <th className="px-3 py-2">Produk</th><th className="px-3 py-2">Qty</th><th className="px-3 py-2 text-right">Harga</th><th className="px-3 py-2 text-right">Subtotal</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {cart.map((l) => (
                      <tr key={l.id}><td className="px-3 py-2 font-medium text-slate-700">{l.nama}</td><td className="px-3 py-2">{l.qty} {l.satuan}</td><td className="px-3 py-2 text-right text-slate-500">{formatRupiah(l.harga)}</td><td className="px-3 py-2 text-right font-bold text-slate-800">{formatRupiah(l.harga * l.qty)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Kepada Distributor</p>
                <p className="font-bold text-slate-800">{selectedDist?.nama}</p>
                <p className="text-xs text-slate-400">{selectedDist?.kota}, {selectedDist?.provinsi}</p>
              </div>
              <div className="rounded-xl bg-[#0e2238] p-4 text-white">
                <p className="text-xs text-white/60">Total Tagihan</p>
                <p className="text-2xl font-extrabold">{formatRupiah(total)}</p>
                <p className="text-[11px] text-white/60 mt-1">{cart.length} jenis produk</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Kembali</button>
                <button onClick={() => setDone(true)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500">
                  <Send className="h-4 w-4" /> Kirim PO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
