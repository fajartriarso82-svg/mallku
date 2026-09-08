"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { CheckCircle2, ChevronRight, MapPin, Plus, ShieldCheck, Store } from "lucide-react";
import { useMpCart } from "@/lib/mp-cart-store";
import { getProdukById, mpAlamatDummy } from "@/lib/dummy/mp-data";
import { formatRupiah } from "@/lib/utils";

const metodeBayarList = [
  { id: "transfer", label: "Transfer Bank", deskripsi: "BCA, BRI, Mandiri, BNI", ikon: "🏦" },
  { id: "va", label: "Virtual Account", deskripsi: "Bayar lewat ATM / m-banking", ikon: "🏧" },
  { id: "ewallet", label: "E-Wallet", deskripsi: "GoPay, OVO, DANA, ShopeePay", ikon: "📱" },
  { id: "cod", label: "COD", deskripsi: "Bayar di tempat", ikon: "💵" },
];

const kurirList = [
  { id: "reguler", label: "Reguler", estimasi: "2-3 hari", ongkir: 12000 },
  { id: "express", label: "Express", estimasi: "1 hari", ongkir: 22000 },
  { id: "sameday", label: "Same Day", estimasi: "Hari ini", ongkir: 28000 },
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-slate-400">Memuat checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lines, clear } = useMpCart();

  const [alamatId, setAlamatId] = useState(mpAlamatDummy[0]?.id ?? "");
  const [kurirId, setKurirId] = useState("reguler");
  const [bayarId, setBayarId] = useState("transfer");
  const [selesai, setSelesai] = useState(false);
  const [nomorOrder, setNomorOrder] = useState("");

  // Bila datang dari "Beli Sekarang" (produk langsung)
  const langsungId = searchParams?.get("produk");
  const produkLangsung = langsungId ? getProdukById(langsungId) : undefined;

  const items = produkLangsung
    ? [{ produk: produkLangsung, qty: 1 }]
    : lines
        .map((l) => ({ produk: getProdukById(l.produkId), qty: l.qty }))
        .filter((l) => l.produk);

  const subtotal = items.reduce((acc, l) => acc + (l.produk?.harga ?? 0) * l.qty, 0);
  const ongkir = kurirList.find((k) => k.id === kurirId)?.ongkir ?? 0;
  const total = subtotal + ongkir;
  const alamat = mpAlamatDummy.find((a) => a.id === alamatId);

  function buatPesanan() {
    const now = new Date();
    const no = `MP${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
    setNomorOrder(no);
    setSelesai(true);
    if (!produkLangsung) clear();
  }

  if (selesai) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-mk-green" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-mk-navy">Pesanan Berhasil Dibuat!</h1>
        <p className="mt-2 text-sm text-slate-500">Pesanan kamu sedang diproses toko. Simpan nomor berikut:</p>
        <p className="mt-3 inline-block rounded-xl bg-mk-bg px-5 py-2 font-mono text-lg font-extrabold text-mk-navy">{nomorOrder}</p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/pesanan" className="rounded-xl bg-mk-navy px-6 py-3 text-sm font-bold text-white hover:bg-mk-navy-light">
            Lihat Pesanan Saya
          </Link>
          <Link href="/" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">
            Belanja Lagi
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <p className="text-lg font-bold text-slate-700">Tidak ada produk untuk di-checkout</p>
        <Link href="/" className="mt-4 inline-block rounded-xl bg-mk-red px-6 py-3 text-sm font-bold text-white">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-mk-red">Checkout</p>
        <h1 className="mt-1 text-2xl font-extrabold text-mk-navy">Selesaikan Pesanan</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          {/* Alamat */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-extrabold text-mk-navy"><MapPin className="h-5 w-5 text-mk-red" /> Alamat Pengiriman</h2>
              <button className="flex items-center gap-1 text-xs font-bold text-mk-red"><Plus className="h-3.5 w-3.5" /> Alamat baru</button>
            </div>
            <div className="space-y-2">
              {mpAlamatDummy.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAlamatId(a.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                    alamatId === a.id ? "border-mk-red bg-red-50/40" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${alamatId === a.id ? "border-mk-red" : "border-slate-300"}`}>
                    {alamatId === a.id && <span className="block h-2.5 w-2.5 translate-x-[1px] translate-y-[1px] rounded-full bg-mk-red" />}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-800">{a.label} · {a.nama}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{a.alamatLengkap}, {a.kecamatan}, {a.kabupatenKota}, {a.provinsi} {a.kodePos}</span>
                    <span className="mt-0.5 block text-xs text-slate-400">{a.telepon}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Produk */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-extrabold text-mk-navy">Produk Dipesan</h2>
            <div className="space-y-3">
              {items.map(({ produk, qty }) => produk && (
                <div key={produk.id} className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-mk-bg text-3xl">{produk.foto}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">{produk.judul}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-400"><Store className="h-3 w-3" /> {produk.tokoNama}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-mk-red">{formatRupiah(produk.harga * qty)}</p>
                    <p className="text-xs text-slate-400">×{qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kurir */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-extrabold text-mk-navy">Metode Pengiriman</h2>
            <div className="space-y-2">
              {kurirList.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setKurirId(k.id)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 transition ${
                    kurirId === k.id ? "border-mk-red bg-red-50/40" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    {k.label} <span className="text-xs font-normal text-slate-400">{k.estimasi}</span>
                  </span>
                  <span className="text-sm font-bold text-slate-700">{k.ongkir === 0 ? "Gratis" : formatRupiah(k.ongkir)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Pembayaran */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-extrabold text-mk-navy"><ShieldCheck className="h-5 w-5 text-mk-green" /> Metode Pembayaran</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {metodeBayarList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setBayarId(m.id)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                    bayarId === m.id ? "border-mk-red bg-red-50/40" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-2xl">{m.ikon}</span>
                  <span>
                    <span className="block text-sm font-bold text-slate-800">{m.label}</span>
                    <span className="block text-[11px] text-slate-400">{m.deskripsi}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Ringkasan */}
        <div className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-extrabold text-mk-navy">Ringkasan</h2>
          <div className="space-y-2 border-b border-slate-100 pb-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Ongkos Kirim</span>
              <span className="font-semibold">{formatRupiah(ongkir)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">Total Bayar</span>
            <span className="text-xl font-extrabold text-mk-red">{formatRupiah(total)}</span>
          </div>
          <button
            onClick={buatPesanan}
            className="flex w-full items-center justify-center gap-1 rounded-xl bg-mk-red py-3 text-sm font-bold text-white transition hover:bg-mk-red-light"
          >
            Buat Pesanan <ChevronRight className="h-4 w-4" />
          </button>
          <p className="text-center text-[11px] text-slate-400">Dengan membuat pesanan, kamu menyetujui Syarat & Ketentuan Mall ku.</p>
        </div>
      </div>
    </div>
  );
}
