// Data dummy: PO Masuk, Katalog SCM, Order Terbaru, Sales 30 hari
import type { OrderTerbaru, POIn, ProdukKatalog } from "./types";

export const dummyPOIn: POIn[] = [
  { id: "poi1", nomorPO: "PO-20260905-118", tanggal: "2026-09-05T09:20:00", toko: "Toko Berkah Abadi", kota: "Makassar", itemCount: 6, total: 38500000, status: "MENUNGGU_PEMBAYARAN", items: [{ nama: "Beras Premium Ramos 5kg", qty: 100, harga: 62000 }, { nama: "Gula Pasir Tebu 1kg", qty: 80, harga: 15500 }, { nama: "Mi Instan Indomie Goreng", qty: 150, harga: 111000 }] },
  { id: "poi2", nomorPO: "PO-20260905-117", tanggal: "2026-09-05T08:10:00", toko: "UD Maju Jaya", kota: "Gowa", itemCount: 4, total: 21800000, status: "DIBAYAR", items: [{ nama: "Mi Instan Indomie Goreng", qty: 100, harga: 111000 }, { nama: "Kopi Bubuk Kapal Api 250g", qty: 24, harga: 138000 }] },
  { id: "poi3", nomorPO: "PO-20260904-116", tanggal: "2026-09-04T15:40:00", toko: "Toko Sumber Rejeki", kota: "Maros", itemCount: 3, total: 14600000, status: "DIPROSES", items: [{ nama: "Beras Premium Ramos 5kg", qty: 200, harga: 61000 }] },
  { id: "poi4", nomorPO: "PO-20260904-115", tanggal: "2026-09-04T11:05:00", toko: "Toko Rizki Baru", kota: "Makassar", itemCount: 5, total: 27200000, status: "DIKIRIM", items: [{ nama: "Kecap Manis ABC 520ml", qty: 48, harga: 129000 }, { nama: "Teh Celup Tong Tji 25s", qty: 24, harga: 42500 }] },
  { id: "poi5", nomorPO: "PO-20260902-114", tanggal: "2026-09-02T14:25:00", toko: "Kios Berkah", kota: "Takalar", itemCount: 2, total: 9800000, status: "DITERIMA", items: [{ nama: "Kopi Bubuk Kapal Api 250g", qty: 60, harga: 135000 }] },
  { id: "poi6", nomorPO: "PO-20260901-113", tanggal: "2026-09-01T10:50:00", toko: "Toko Berkah Abadi", kota: "Makassar", itemCount: 8, total: 46100000, status: "SELESAI", items: [{ nama: "Beras Premium Ramos 5kg", qty: 250, harga: 59800 }, { nama: "Air Mineral Prima 600ml", qty: 300, harga: 47000 }] },
  { id: "poi7", nomorPO: "PO-20260829-112", tanggal: "2026-08-29T13:15:00", toko: "Toko Amanah Sentosa", kota: "Makassar", itemCount: 3, total: 12400000, status: "DIBATALKAN", items: [{ nama: "Sabun Mandi Lifebuoy 3-in-1", qty: 40, harga: 70000 }] },
];

export const dummyProdukKatalog: ProdukKatalog[] = [
  { id: "k1", kode: "NS-2201", nama: "Beras Pandan Wangi 10kg", kategoriMaster: "Sembako", subKategori: "Beras", satuan: "Karung", harga: 135000, distributor: "PT Nusantara Sembako", distributorKota: "Surabaya", stok: 1200, terjual: 3200 },
  { id: "k2", kode: "NS-3301", nama: "Tepung Terigu Segitiga Biru 1kg", kategoriMaster: "Sembako", subKategori: "Tepung", satuan: "Karung", harga: 11500, distributor: "PT Nusantara Sembako", distributorKota: "Surabaya", stok: 800, terjual: 5400 },
  { id: "k3", kode: "MPM-4402", nama: "Susu UHT Ultra 1L Full Cream", kategoriMaster: "Minuman", subKategori: "Susu", satuan: "Karton", harga: 158000, distributor: "CV Mitra Pangan Makmur", distributorKota: "Jakarta Utara", stok: 340, terjual: 980 },
  { id: "k4", kode: "SBD-7701", nama: "Kecap Ikan Cap Bintang 300ml", kategoriMaster: "Bumbu", subKategori: "Kecap", satuan: "Dus", harga: 98000, distributor: "PT Sumber Berkah Distribusi", distributorKota: "Makassar", stok: 210, terjual: 450 },
  { id: "k5", kode: "SBD-8803", nama: "Kerupuk Udang Mentah 200g", kategoriMaster: "Makanan", subKategori: "Kerupuk", satuan: "Dus", harga: 42000, distributor: "PT Sumber Berkah Distribusi", distributorKota: "Makassar", stok: 95, terjual: 320 },
  { id: "k6", kode: "SGT-5501", nama: "Sabun Cuci Piring Sunlight 800ml", kategoriMaster: "Perlengkapan Rumah", subKategori: "Pembersih", satuan: "Dus", harga: 116000, distributor: "UD Sentra Grosir Timur", distributorKota: "Denpasar", stok: 150, terjual: 610 },
  { id: "k7", kode: "NS-6605", nama: "Sirup Marjan Cocopandan 460ml", kategoriMaster: "Minuman", subKategori: "Sirup", satuan: "Dus", harga: 132000, distributor: "PT Nusantara Sembako", distributorKota: "Surabaya", stok: 60, terjual: 275 },
  { id: "k8", kode: "MPM-1201", nama: "Sampo Lifebuoy 170ml", kategoriMaster: "Perawatan Tubuh", subKategori: "Sampo", satuan: "Dus", harga: 105000, distributor: "CV Mitra Pangan Makmur", distributorKota: "Jakarta Utara", stok: 420, terjual: 1500 },
];

export const dummyOrderTerbaru: OrderTerbaru[] = [
  { id: "o1", nomor: "PO-20260905-118", pelanggan: "Toko Berkah Abadi", tanggal: "2026-09-05T09:20:00", total: 38500000, status: "MENUNGGU_PEMBAYARAN" },
  { id: "o2", nomor: "PO-20260905-117", pelanggan: "UD Maju Jaya", tanggal: "2026-09-05T08:10:00", total: 21800000, status: "DIBAYAR" },
  { id: "o3", nomor: "PO-20260904-116", pelanggan: "Toko Sumber Rejeki", tanggal: "2026-09-04T15:40:00", total: 14600000, status: "DIPROSES" },
  { id: "o4", nomor: "PO-20260904-115", pelanggan: "Toko Rizki Baru", tanggal: "2026-09-04T11:05:00", total: 27200000, status: "DIKIRIM" },
  { id: "o5", nomor: "PO-20260902-114", pelanggan: "Kios Berkah", tanggal: "2026-09-02T14:25:00", total: 9800000, status: "DITERIMA" },
];

export const dummySales30Days: { tanggal: string; nominal: number }[] = [
  { tanggal: "2026-08-08", nominal: 42000000 }, { tanggal: "2026-08-09", nominal: 38000000 },
  { tanggal: "2026-08-10", nominal: 51000000 }, { tanggal: "2026-08-11", nominal: 46000000 },
  { tanggal: "2026-08-12", nominal: 61000000 }, { tanggal: "2026-08-13", nominal: 55000000 },
  { tanggal: "2026-08-14", nominal: 48000000 }, { tanggal: "2026-08-15", nominal: 72000000 },
  { tanggal: "2026-08-16", nominal: 59000000 }, { tanggal: "2026-08-17", nominal: 44000000 },
  { tanggal: "2026-08-18", nominal: 67000000 }, { tanggal: "2026-08-19", nominal: 63000000 },
  { tanggal: "2026-08-20", nominal: 52000000 }, { tanggal: "2026-08-21", nominal: 81000000 },
  { tanggal: "2026-08-22", nominal: 69000000 }, { tanggal: "2026-08-23", nominal: 74000000 },
  { tanggal: "2026-08-24", nominal: 58000000 }, { tanggal: "2026-08-25", nominal: 88000000 },
  { tanggal: "2026-08-26", nominal: 76000000 }, { tanggal: "2026-08-27", nominal: 65000000 },
  { tanggal: "2026-08-28", nominal: 92000000 }, { tanggal: "2026-08-29", nominal: 71000000 },
  { tanggal: "2026-08-30", nominal: 83000000 }, { tanggal: "2026-08-31", nominal: 95000000 },
  { tanggal: "2026-09-01", nominal: 78000000 }, { tanggal: "2026-09-02", nominal: 69000000 },
  { tanggal: "2026-09-03", nominal: 86000000 }, { tanggal: "2026-09-04", nominal: 74000000 },
  { tanggal: "2026-09-05", nominal: 99000000 }, { tanggal: "2026-09-06", nominal: 42000000 },
];
