// ============================================================
// DATA DUMMY TOKO — frontend only (akan diganti Supabase)
// ============================================================
import type {
  DistributorMitraToko, KatalogProdukSCM, ListingJual, MutasiSaldoMP,
  POPembelian, PesananMP, PembayaranVA, StokDiterima, VoucherToko,
} from "./toko-types";

export const dummyDistributorMitra: DistributorMitraToko[] = [
  { id: "dm1", nama: "PT Berkah Distribusi", kota: "Makassar", provinsi: "Sulawesi Selatan", kategori: ["Sembako", "Minuman", "Makanan"], status: "AKTIF", totalPO: 38, totalBelanja: 512000000, terhubungSejak: "2025-03-12" },
  { id: "dm2", nama: "PT Sumber Berkah Distribusi", kota: "Makassar", provinsi: "Sulawesi Selatan", kategori: ["Bumbu", "Sembako"], status: "AKTIF", totalPO: 22, totalBelanja: 286000000, terhubungSejak: "2025-06-20" },
  { id: "dm3", nama: "CV Sulawesi Pangan", kota: "Maros", provinsi: "Sulawesi Selatan", kategori: ["Minuman", "Perawatan Tubuh"], status: "AKTIF", totalPO: 9, totalBelanja: 118000000, terhubungSejak: "2025-11-03" },
  { id: "dm4", nama: "PT Nusantara Sembako", kota: "Surabaya", provinsi: "Jawa Timur", kategori: ["Sembako", "Makanan"], status: "NONAKTIF", totalPO: 4, totalBelanja: 72000000, terhubungSejak: "2025-09-15" },
];

export const dummyKatalogSCM: KatalogProdukSCM[] = [
  { id: "ks1", kode: "SKU-001", nama: "Beras Premium Ramos 5kg", kategori: "Sembako", satuan: "Karung", hargaTier: [{ minQty: 10, harga: 62000 }, { minQty: 50, harga: 61000 }, { minQty: 100, harga: 59800 }], distributor: "PT Berkah Distribusi", distributorKota: "Makassar", stok: 640, foto: "🍚" },
  { id: "ks2", kode: "SKU-002", nama: "Minyak Goreng Sania 2L", kategori: "Sembako", satuan: "Karton", hargaTier: [{ minQty: 12, harga: 218000 }, { minQty: 60, harga: 215000 }], distributor: "PT Berkah Distribusi", distributorKota: "Makassar", stok: 220, foto: "🛢️" },
  { id: "ks3", kode: "SKU-007", nama: "Mi Instan Indomie Goreng", kategori: "Makanan", satuan: "Dus", hargaTier: [{ minQty: 20, harga: 111000 }, { minQty: 100, harga: 108500 }], distributor: "PT Berkah Distribusi", distributorKota: "Makassar", stok: 890, foto: "🍜" },
  { id: "ks4", kode: "SKU-010", nama: "Kecap Manis ABC 520ml", kategori: "Bumbu", satuan: "Dus", hargaTier: [{ minQty: 12, harga: 129000 }, { minQty: 48, harga: 126000 }], distributor: "PT Sumber Berkah Distribusi", distributorKota: "Makassar", stok: 210, foto: "🍶" },
  { id: "ks5", kode: "SKU-006", nama: "Kopi Bubuk Kapal Api 250g", kategori: "Minuman", satuan: "Dus", hargaTier: [{ minQty: 12, harga: 138000 }, { minQty: 48, harga: 135000 }], distributor: "PT Sumber Berkah Distribusi", distributorKota: "Makassar", stok: 340, foto: "☕" },
  { id: "ks6", kode: "SKU-004", nama: "Air Mineral Prima 600ml (isi 24)", kategori: "Minuman", satuan: "Dus", hargaTier: [{ minQty: 10, harga: 48000 }, { minQty: 50, harga: 47000 }], distributor: "CV Sulawesi Pangan", distributorKota: "Maros", stok: 400, foto: "💧" },
  { id: "ks7", kode: "SKU-008", nama: "Sabun Mandi Lifebuoy 3-in-1", kategori: "Perawatan Tubuh", satuan: "Lusin", hargaTier: [{ minQty: 10, harga: 72000 }, { minQty: 50, harga: 70000 }], distributor: "CV Sulawesi Pangan", distributorKota: "Maros", stok: 150, foto: "🧼" },
  { id: "ks8", kode: "SKU-003", nama: "Gula Pasir Tebu 1kg", kategori: "Sembako", satuan: "Karung", hargaTier: [{ minQty: 20, harga: 15500 }, { minQty: 100, harga: 15200 }], distributor: "PT Berkah Distribusi", distributorKota: "Makassar", stok: 520, foto: "🍬" },
];

export const dummyStokDiterima: StokDiterima[] = [
  { id: "sd1", produk: "Beras Premium Ramos 5kg", sku: "SKU-001", distributor: "PT Berkah Distribusi", qtyDiterima: 150, qtyDitayangkan: 100, qtySisa: 50, satuan: "Karung", tanggalTerima: "2026-09-04", nomorPO: "PO-20260902-110" },
  { id: "sd2", produk: "Mi Instan Indomie Goreng", sku: "SKU-007", distributor: "PT Berkah Distribusi", qtyDiterima: 200, qtyDitayangkan: 200, qtySisa: 0, satuan: "Dus", tanggalTerima: "2026-09-02", nomorPO: "PO-20260829-105" },
  { id: "sd3", produk: "Kecap Manis ABC 520ml", sku: "SKU-010", distributor: "PT Sumber Berkah Distribusi", qtyDiterima: 96, qtyDitayangkan: 60, qtySisa: 36, satuan: "Dus", tanggalTerima: "2026-08-30", nomorPO: "PO-20260827-102" },
  { id: "sd4", produk: "Air Mineral Prima 600ml", sku: "SKU-004", distributor: "CV Sulawesi Pangan", qtyDiterima: 120, qtyDitayangkan: 0, qtySisa: 120, satuan: "Dus", tanggalTerima: "2026-08-28", nomorPO: "PO-20260825-098" },
  { id: "sd5", produk: "Kopi Bubuk Kapal Api 250g", sku: "SKU-006", distributor: "PT Sumber Berkah Distribusi", qtyDiterima: 48, qtyDitayangkan: 48, qtySisa: 0, satuan: "Dus", tanggalTerima: "2026-08-22", nomorPO: "PO-20260820-094" },
];

export const dummyPOPembelian: POPembelian[] = [
  { id: "po1", nomorPO: "PO-20260904-118", tanggal: "2026-09-04T10:15:00", distributor: "PT Berkah Distribusi", kota: "Makassar", itemCount: 5, total: 38500000, status: "MENUNGGU_PEMBAYARAN", vaNumber: "9880 4321 0123456", items: [{ nama: "Beras Premium Ramos 5kg", qty: 100, harga: 62000 }, { nama: "Mi Instan Indomie Goreng", qty: 150, harga: 111000 }, { nama: "Gula Pasir Tebu 1kg", qty: 80, harga: 15500 }] },
  { id: "po2", nomorPO: "PO-20260902-117", tanggal: "2026-09-02T14:05:00", distributor: "PT Sumber Berkah Distribusi", kota: "Makassar", itemCount: 3, total: 21800000, status: "DIBAYAR", vaNumber: "9880 4321 0011223", items: [{ nama: "Kecap Manis ABC 520ml", qty: 48, harga: 129000 }, { nama: "Kopi Bubuk Kapal Api 250g", qty: 24, harga: 138000 }] },
  { id: "po3", nomorPO: "PO-20260830-116", tanggal: "2026-08-30T09:40:00", distributor: "PT Berkah Distribusi", kota: "Makassar", itemCount: 4, total: 27500000, status: "DIPROSES", items: [{ nama: "Air Mineral Prima 600ml", qty: 50, harga: 47000 }] },
  { id: "po4", nomorPO: "PO-20260828-115", tanggal: "2026-08-28T16:20:00", distributor: "CV Sulawesi Pangan", kota: "Maros", itemCount: 2, total: 12900000, status: "DIKIRIM", items: [{ nama: "Sabun Mandi Lifebuoy 3-in-1", qty: 50, harga: 70000 }] },
  { id: "po5", nomorPO: "PO-20260825-114", tanggal: "2026-08-25T11:30:00", distributor: "PT Berkah Distribusi", kota: "Makassar", itemCount: 6, total: 42100000, status: "DITERIMA", items: [{ nama: "Mi Instan Indomie Goreng", qty: 200, harga: 108500 }] },
  { id: "po6", nomorPO: "PO-20260822-113", tanggal: "2026-08-22T13:10:00", distributor: "PT Berkah Distribusi", kota: "Makassar", itemCount: 3, total: 19800000, status: "SELESAI", items: [{ nama: "Kopi Bubuk Kapal Api 250g", qty: 48, harga: 135000 }] },
  { id: "po7", nomorPO: "PO-20260820-112", tanggal: "2026-08-20T08:55:00", distributor: "PT Nusantara Sembako", kota: "Surabaya", itemCount: 4, total: 34200000, status: "DIBATALKAN", items: [] },
];

export const dummyPembayaranVA: PembayaranVA[] = [
  { id: "va1", nomorPO: "PO-20260904-118", distributor: "PT Berkah Distribusi", metode: "VA BCA", vaNumber: "9880 4321 0123456", jumlah: 38500000, status: "MENUNGGU", tanggal: "2026-09-04T10:15:00", batasBayar: "2026-09-06T23:59:00" },
  { id: "va2", nomorPO: "PO-20260902-117", distributor: "PT Sumber Berkah Distribusi", metode: "VA Mandiri", vaNumber: "8910 9876 5443 2100", jumlah: 21800000, status: "BERHASIL", tanggal: "2026-09-02T14:05:00", batasBayar: "2026-09-03T23:59:00" },
  { id: "va3", nomorPO: "PO-20260830-116", distributor: "PT Berkah Distribusi", metode: "VA BCA", vaNumber: "9880 4321 0088776", jumlah: 27500000, status: "BERHASIL", tanggal: "2026-08-30T09:40:00", batasBayar: "2026-08-31T23:59:00" },
  { id: "va4", nomorPO: "PO-20260825-114", distributor: "PT Berkah Distribusi", metode: "QRIS", vaNumber: "QR-88211-00987", jumlah: 42100000, status: "BERHASIL", tanggal: "2026-08-25T11:30:00", batasBayar: "2026-08-26T23:59:00" },
  { id: "va5", nomorPO: "PO-20260820-112", distributor: "PT Nusantara Sembako", metode: "VA BCA", vaNumber: "9880 4321 0066554", jumlah: 34200000, status: "EXPIRED", tanggal: "2026-08-20T08:55:00", batasBayar: "2026-08-21T23:59:00" },
];

export const dummyListingJual: ListingJual[] = [
  { id: "lj1", skuWarisan: "SKU-001", namaProduk: "Beras Premium Ramos 5kg", judulJual: "Beras Premium Ramos 5kg — Pulen", kategoriMP: "Sembako", foto: "🍚", hargaSCM: 62000, hargaJual: 72000, stokPokok: 150, stokTersedia: 100, terjual: 45, status: "AKTIF" },
  { id: "lj2", skuWarisan: "SKU-007", namaProduk: "Mi Instan Indomie Goreng", judulJual: "Indomie Goreng (1 dus isi 40)", kategoriMP: "Makanan", foto: "🍜", hargaSCM: 111000, hargaJual: 125000, stokPokok: 200, stokTersedia: 200, terjual: 120, status: "AKTIF" },
  { id: "lj3", skuWarisan: "SKU-010", namaProduk: "Kecap Manis ABC 520ml", judulJual: "Kecap Manis ABC 520ml", kategoriMP: "Bumbu", foto: "🍶", hargaSCM: 129000, hargaJual: 142000, stokPokok: 96, stokTersedia: 60, terjual: 15, status: "AKTIF" },
  { id: "lj4", skuWarisan: "SKU-004", namaProduk: "Air Mineral Prima 600ml", judulJual: "Air Mineral Prima 600ml isi 24", kategoriMP: "Minuman", foto: "💧", hargaSCM: 48000, hargaJual: 55000, stokPokok: 120, stokTersedia: 0, terjual: 60, status: "NONAKTIF" },
  { id: "lj5", skuWarisan: "SKU-006", namaProduk: "Kopi Bubuk Kapal Api 250g", judulJual: "Kopi Bubuk Kapal Api 250g", kategoriMP: "Minuman", foto: "☕", hargaSCM: 138000, hargaJual: 150000, stokPokok: 48, stokTersedia: 48, terjual: 8, status: "AKTIF" },
];

export const dummyPesananMP: PesananMP[] = [
  { id: "pm1", nomorOrder: "ORD-20260905-2041", tanggal: "2026-09-05T19:24:00", pembeli: "Andi Saputra", kota: "Makassar", metodeKirim: "TOKO_SENDIRI", items: [{ nama: "Beras Premium Ramos 5kg — Pulen", qty: 2, harga: 72000 }, { nama: "Indomie Goreng (1 dus isi 40)", qty: 1, harga: 125000 }], subtotal: 269000, ongkir: 12000, total: 281000, status: "BARU" },
  { id: "pm2", nomorOrder: "ORD-20260905-2038", tanggal: "2026-09-05T16:02:00", pembeli: "Siti Nurhaliza", kota: "Gowa", metodeKirim: "BITESHIP", kurir: "JNE", resi: "JP0098821034", items: [{ nama: "Beras Premium Ramos 5kg — Pulen", qty: 1, harga: 72000 }], subtotal: 72000, ongkir: 15000, total: 87000, status: "DIPROSES" },
  { id: "pm3", nomorOrder: "ORD-20260905-2029", tanggal: "2026-09-05T10:45:00", pembeli: "Budi Hartono", kota: "Maros", metodeKirim: "TOKO_SENDIRI", items: [{ nama: "Kecap Manis ABC 520ml", qty: 3, harga: 142000 }, { nama: "Kopi Bubuk Kapal Api 250g", qty: 1, harga: 150000 }], subtotal: 576000, ongkir: 0, total: 576000, status: "DIKIRIM" },
  { id: "pm4", nomorOrder: "ORD-20260904-2018", tanggal: "2026-09-04T18:30:00", pembeli: "Rina Kartika", kota: "Makassar", metodeKirim: "BITESHIP", kurir: "SiCepat", resi: "SC0002887731", items: [{ nama: "Indomie Goreng (1 dus isi 40)", qty: 2, harga: 125000 }], subtotal: 250000, ongkir: 20000, total: 270000, status: "DITERIMA" },
  { id: "pm5", nomorOrder: "ORD-20260903-2005", tanggal: "2026-09-03T15:12:00", pembeli: "Joko Susilo", kota: "Takalar", metodeKirim: "BITESHIP", kurir: "J&T", resi: "JT443109876", items: [{ nama: "Kopi Bubuk Kapal Api 250g", qty: 2, harga: 150000 }], subtotal: 300000, ongkir: 18000, total: 318000, status: "SELESAI" },
  { id: "pm6", nomorOrder: "ORD-20260902-1992", tanggal: "2026-09-02T11:40:00", pembeli: "Dewi Anggraini", kota: "Makassar", metodeKirim: "TOKO_SENDIRI", items: [{ nama: "Beras Premium Ramos 5kg — Pulen", qty: 1, harga: 72000 }], subtotal: 72000, ongkir: 0, total: 72000, status: "DIBATALKAN" },
];

export const dummyVoucherToko: VoucherToko[] = [
  { id: "v1", kode: "TOKO-5%", nama: "Diskon 5% Pembelian Pertama", tipe: "PERSEN", nilai: 5, minBelanja: 50000, periodeMulai: "2026-08-01", periodeSelesai: "2026-10-31", kuota: 300, terpakai: 87, status: "AKTIF" },
  { id: "v2", kode: "TOKO-10K", nama: "Potongan Rp10.000", tipe: "NOMINAL", nilai: 10000, minBelanja: 100000, periodeMulai: "2026-09-01", periodeSelesai: "2026-09-30", kuota: 200, terpakai: 45, status: "AKTIF" },
  { id: "v3", kode: "RAMADAN-15", nama: "Diskon Ramadan 15%", tipe: "PERSEN", nilai: 15, minBelanja: 150000, periodeMulai: "2026-03-01", periodeSelesai: "2026-04-10", kuota: 150, terpakai: 150, status: "KADALUARSA" },
  { id: "v4", kode: "GRATIS-ONGKIR", nama: "Gratis Ongkir", tipe: "NOMINAL", nilai: 20000, minBelanja: 200000, periodeMulai: "2026-10-01", periodeSelesai: "2026-10-31", kuota: 100, terpakai: 0, status: "NONAKTIF" },
];

export const dummyMutasiSaldoMP: MutasiSaldoMP[] = [
  { id: "mp1", tanggal: "2026-09-06T08:00:00", deskripsi: "Saldo awal periode", jenis: "MASUK", nominal: 0, saldoAkhir: 0, ref: "" },
  { id: "mp2", tanggal: "2026-09-05T21:10:00", deskripsi: "Pembayaran ORD-20260905-2041 (Andi Saputra)", jenis: "MASUK", nominal: 281000, saldoAkhir: 281000, ref: "ORD-20260905-2041" },
  { id: "mp3", tanggal: "2026-09-05T17:30:00", deskripsi: "Pembayaran ORD-20260905-2029 (Budi Hartono)", jenis: "MASUK", nominal: 576000, saldoAkhir: 857000, ref: "ORD-20260905-2029" },
  { id: "mp4", tanggal: "2026-09-04T20:00:00", deskripsi: "Pencairan dana ke rekening BCA", jenis: "KELUAR", nominal: 1500000, saldoAkhir: 1500000, ref: "WDR-20260904-001" },
  { id: "mp5", tanggal: "2026-09-04T19:00:00", deskripsi: "Pembayaran ORD-20260904-2018 (Rina Kartika)", jenis: "MASUK", nominal: 270000, saldoAkhir: 3000000, ref: "ORD-20260904-2018" },
];

export const dummySalesMP30: { tanggal: string; nominal: number }[] = [
  { tanggal: "2026-08-08", nominal: 145000 }, { tanggal: "2026-08-09", nominal: 120000 },
  { tanggal: "2026-08-10", nominal: 230000 }, { tanggal: "2026-08-11", nominal: 180000 },
  { tanggal: "2026-08-12", nominal: 310000 }, { tanggal: "2026-08-13", nominal: 205000 },
  { tanggal: "2026-08-14", nominal: 260000 }, { tanggal: "2026-08-15", nominal: 420000 },
  { tanggal: "2026-08-16", nominal: 280000 }, { tanggal: "2026-08-17", nominal: 190000 },
  { tanggal: "2026-08-18", nominal: 350000 }, { tanggal: "2026-08-19", nominal: 310000 },
  { tanggal: "2026-08-20", nominal: 240000 }, { tanggal: "2026-08-21", nominal: 380000 },
  { tanggal: "2026-08-22", nominal: 460000 }, { tanggal: "2026-08-23", nominal: 520000 },
  { tanggal: "2026-08-24", nominal: 300000 }, { tanggal: "2026-08-25", nominal: 480000 },
  { tanggal: "2026-08-26", nominal: 410000 }, { tanggal: "2026-08-27", nominal: 330000 },
  { tanggal: "2026-08-28", nominal: 550000 }, { tanggal: "2026-08-29", nominal: 390000 },
  { tanggal: "2026-08-30", nominal: 470000 }, { tanggal: "2026-08-31", nominal: 610000 },
  { tanggal: "2026-09-01", nominal: 430000 }, { tanggal: "2026-09-02", nominal: 520000 },
  { tanggal: "2026-09-03", nominal: 380000 }, { tanggal: "2026-09-04", nominal: 460000 },
  { tanggal: "2026-09-05", nominal: 720000 }, { tanggal: "2026-09-06", nominal: 281000 },
];
