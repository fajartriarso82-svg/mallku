import type { AkunSCM, Dispute, IuranAkun, ListingMonitoringMP, MetrikOverview, MonitoringStokSCM, OrderMPAdmin, Pencairan, SaldoAkun, SellerMP, TransaksiSCM } from "./admin-types";

export const dummyAkunSCM: AkunSCM[] = [
  { id: "a1", namaUsaha: "PT Berkah Distribusi", tipe: "DISTRIBUTOR", pemilik: "Ahmad Fauzi", bidang: "FMCG / Sembako", kota: "Makassar", tanggalDaftar: "2026-09-01", status: "PENDING", dokumen: ["NIB", "NPWP"] },
  { id: "a2", namaUsaha: "Toko Sumber Rejeki", tipe: "TOKO", pemilik: "Siti Aminah", bidang: "Retail Sembako", kota: "Maros", tanggalDaftar: "2026-08-28", status: "PENDING", dokumen: ["NIB"] },
  { id: "a3", namaUsaha: "PT Nusantara Sembako", tipe: "DISTRIBUTOR", pemilik: "Budi Hartono", bidang: "FMCG", kota: "Surabaya", tanggalDaftar: "2025-02-01", status: "AKTIF", dokumen: ["NIB", "NPWP", "SIUP"] },
  { id: "a4", namaUsaha: "UD Maju Jaya", tipe: "TOKO", pemilik: "Budi Santoso", bidang: "Retail", kota: "Gowa", tanggalDaftar: "2025-09-21", status: "AKTIF", dokumen: ["NIB"] },
  { id: "a5", namaUsaha: "CV Sulawesi Pangan", tipe: "DISTRIBUTOR", pemilik: "Hasan Basri", bidang: "Minuman", kota: "Maros", tanggalDaftar: "2026-08-20", status: "PENDING", dokumen: ["NIB", "NPWP"] },
  { id: "a6", namaUsaha: "Toko Amanah Sentosa", tipe: "TOKO", pemilik: "Dewi Lestari", bidang: "Retail", kota: "Makassar", tanggalDaftar: "2025-11-30", status: "SUSPEND", dokumen: ["NIB"] },
  { id: "a7", namaUsaha: "PT Sumber Berkah", tipe: "DISTRIBUTOR", pemilik: "Joko Susilo", bidang: "Bumbu & Sembako", kota: "Makassar", tanggalDaftar: "2025-04-22", status: "AKTIF", dokumen: ["NIB", "NPWP"] },
];

export const dummyTransaksiSCM: TransaksiSCM[] = [
  { id: "t1", nomorPO: "PO-20260905-118", dari: "Toko Berkah Abadi", ke: "PT Berkah Distribusi", status: "MENUNGGU_PEMBAYARAN", nominal: 38500000, tanggal: "2026-09-05T09:20:00", hariDiam: 1 },
  { id: "t2", nomorPO: "PO-20260905-117", dari: "UD Maju Jaya", ke: "PT Berkah Distribusi", status: "DIBAYAR", nominal: 21800000, tanggal: "2026-09-05T08:10:00", hariDiam: 1 },
  { id: "t3", nomorPO: "PO-20260904-116", dari: "Toko Sumber Rejeki", ke: "PT Berkah Distribusi", status: "DIPROSES", nominal: 14600000, tanggal: "2026-09-04T15:40:00", hariDiam: 2 },
  { id: "t4", nomorPO: "PO-20260902-115", dari: "Toko Rizki Baru", ke: "PT Berkah Distribusi", status: "DIKIRIM", nominal: 27200000, tanggal: "2026-09-02T11:05:00", hariDiam: 4 },
  { id: "t5", nomorPO: "PO-20260828-114", dari: "Toko Berkah Abadi", ke: "CV Sulawesi Pangan", status: "DITERIMA", nominal: 19800000, tanggal: "2026-08-28T14:25:00", hariDiam: 9 },
  { id: "t6", nomorPO: "PO-20260822-113", dari: "Toko Sumber Rejeki", ke: "PT Sumber Berkah", status: "SELESAI", nominal: 42100000, tanggal: "2026-08-22T10:50:00", hariDiam: 15 },
  { id: "t7", nomorPO: "PO-20260903-116", dari: "Kios Berkah", ke: "PT Sumber Berkah", status: "MENUNGGU_PEMBAYARAN", nominal: 9200000, tanggal: "2026-09-03T09:00:00", hariDiam: 3 },
  { id: "t8", nomorPO: "PO-20260815-110", dari: "UD Maju Jaya", ke: "PT Nusantara Sembako", status: "DIBATALKAN", nominal: 34200000, tanggal: "2026-08-15T08:55:00", hariDiam: 22 },
];

export const dummyStokSCM: MonitoringStokSCM[] = [
  { id: "s1", produk: "Beras Premium Ramos 5kg", distributor: "PT Berkah Distribusi", kode: "SKU-001", stokTersedia: 640, stokMinimum: 100, satuan: "Karung", status: "AMAN" },
  { id: "s2", produk: "Minyak Goreng Sania 2L", distributor: "PT Berkah Distribusi", kode: "SKU-002", stokTersedia: 32, stokMinimum: 40, satuan: "Karton", status: "KRITIS" },
  { id: "s3", produk: "Tissue Jolly 250s", distributor: "PT Berkah Distribusi", kode: "SKU-009", stokTersedia: 0, stokMinimum: 24, satuan: "Dus", status: "HABIS" },
  { id: "s4", produk: "Kecap Manis ABC 520ml", distributor: "PT Sumber Berkah", kode: "SKU-010", stokTersedia: 210, stokMinimum: 20, satuan: "Dus", status: "AMAN" },
  { id: "s5", produk: "Kopi Bubuk Kapal Api 250g", distributor: "PT Sumber Berkah", kode: "SKU-006", stokTersedia: 340, stokMinimum: 50, satuan: "Dus", status: "AMAN" },
  { id: "s6", produk: "Air Mineral Prima 600ml", distributor: "CV Sulawesi Pangan", kode: "SKU-004", stokTersedia: 15, stokMinimum: 30, satuan: "Dus", status: "KRITIS" },
  { id: "s7", produk: "Sabun Mandi Lifebuoy 3-in-1", distributor: "CV Sulawesi Pangan", kode: "SKU-008", stokTersedia: 0, stokMinimum: 40, satuan: "Lusin", status: "HABIS" },
];

export const dummyIuranSCM: IuranAkun[] = [
  { id: "i1", namaUsaha: "PT Berkah Distribusi", tipe: "DISTRIBUTOR", periode: "September 2026", nominal: 250000, status: "PROSES", jatuhTempo: "2026-09-25" },
  { id: "i2", namaUsaha: "PT Sumber Berkah", tipe: "DISTRIBUTOR", periode: "Agustus 2026", nominal: 250000, status: "LUNAS", jatuhTempo: "2026-08-25", tglBayar: "2026-08-20" },
  { id: "i3", namaUsaha: "Toko Sumber Rejeki", tipe: "TOKO", periode: "September 2026", nominal: 150000, status: "NUNGGAK", jatuhTempo: "2026-09-10" },
  { id: "i4", namaUsaha: "Toko Berkah Abadi", tipe: "TOKO", periode: "Agustus 2026", nominal: 150000, status: "LUNAS", jatuhTempo: "2026-08-10", tglBayar: "2026-08-08" },
  { id: "i5", namaUsaha: "UD Maju Jaya", tipe: "TOKO", periode: "Juli 2026", nominal: 150000, status: "NUNGGAK", jatuhTempo: "2026-07-10" },
];
export const dummySaldoSCM: SaldoAkun[] = [
  { id: "b1", namaUsaha: "PT Berkah Distribusi", tipe: "DISTRIBUTOR", saldo: 198250000, status: "SEHAT" },
  { id: "b2", namaUsaha: "PT Sumber Berkah", tipe: "DISTRIBUTOR", saldo: 145000000, status: "SEHAT" },
  { id: "b3", namaUsaha: "Toko Berkah Abadi", tipe: "TOKO", saldo: 24000000, status: "SEHAT" },
  { id: "b4", namaUsaha: "UD Maju Jaya", tipe: "TOKO", saldo: 3500000, status: "MINIM" },
  { id: "b5", namaUsaha: "Toko Amanah Sentosa", tipe: "TOKO", saldo: -250000, status: "NEGATIF" },
];

export const dummyPencairan: Pencairan[] = [
  { id: "w1", ref: "WDR-20260906-001", namaUsaha: "PT Berkah Distribusi", tipe: "DISTRIBUTOR", nominal: 50000000, rekening: "BCA 1234567890", tanggal: "2026-09-06T09:00:00", status: "MENUNGGU" },
  { id: "w2", ref: "WDR-20260905-003", namaUsaha: "Toko Berkah Abadi", tipe: "TOKO", nominal: 15000000, rekening: "Mandiri 9876543210", tanggal: "2026-09-05T11:00:00", status: "MENUNGGU" },
  { id: "w3", ref: "WDR-20260904-002", namaUsaha: "PT Berkah Distribusi", tipe: "DISTRIBUTOR", nominal: 75000000, rekening: "BCA 1234567890", tanggal: "2026-09-04T10:15:00", status: "DIPROSES" },
  { id: "w4", ref: "WDR-20260902-001", namaUsaha: "PT Sumber Berkah", tipe: "DISTRIBUTOR", nominal: 40000000, rekening: "BNI 555666777", tanggal: "2026-09-02T13:30:00", status: "DISETUJUI" },
  { id: "w5", ref: "WDR-20260830-009", namaUsaha: "UD Maju Jaya", tipe: "TOKO", nominal: 5000000, rekening: "BRI 111222333", tanggal: "2026-08-30T09:45:00", status: "DITOLAK" },
];

export const dummySellerMP: SellerMP[] = [
  { id: "m1", namaToko: "Toko Rizki Baru", pemilik: "Rahmat Hidayat", kota: "Makassar", tanggalDaftar: "2026-09-04", status: "PENDING" },
  { id: "m2", namaToko: "Kios Berkah", pemilik: "Junaedi", kota: "Takalar", tanggalDaftar: "2026-09-01", status: "PENDING" },
  { id: "m3", namaToko: "Toko Berkah Abadi", pemilik: "H. Ahmad Fauzi", kota: "Makassar", tanggalDaftar: "2025-03-12", status: "AKTIF" },
  { id: "m4", namaToko: "Toko Sumber Rejeki", pemilik: "Siti Aminah", kota: "Maros", tanggalDaftar: "2025-06-08", status: "AKTIF" },
  { id: "m5", namaToko: "Toko Amanah Sentosa", pemilik: "Dewi Lestari", kota: "Makassar", tanggalDaftar: "2025-11-30", status: "SUSPEND" },
  { id: "m6", namaToko: "Toko Sinar Bahari", pemilik: "Hasan Basri", kota: "Pangkep", tanggalDaftar: "2026-08-20", status: "PENDING" },
];

export const dummyListingMP: ListingMonitoringMP[] = [
  { id: "l1", produk: "Beras Premium Ramos 5kg — Pulen", toko: "Toko Berkah Abadi", harga: 72000, stok: 100, status: "AKTIF", kategoriMP: "Sembako" },
  { id: "l2", produk: "Indomie Goreng (1 dus isi 40)", toko: "Toko Berkah Abadi", harga: 125000, stok: 200, status: "AKTIF", kategoriMP: "Makanan" },
  { id: "l3", produk: "Air Mineral Prima 600ml isi 24", toko: "Toko Sumber Rejeki", harga: 55000, stok: 0, status: "HABIS", kategoriMP: "Minuman" },
  { id: "l4", produk: "Kopi Bubuk Kapal Api 250g", toko: "UD Maju Jaya", harga: 150000, stok: 48, status: "AKTIF", kategoriMP: "Minuman" },
  { id: "l5", produk: "Sabun Mandi Lifebuoy 3-in-1", toko: "Toko Sinar Bahari", harga: 78000, stok: 30, status: "NONAKTIF", kategoriMP: "Perawatan" },
  { id: "l6", produk: "Kecap Manis ABC 520ml", toko: "Toko Berkah Abadi", harga: 142000, stok: 60, status: "AKTIF", kategoriMP: "Bumbu" },
];

export const dummyOrderMP: OrderMPAdmin[] = [
  { id: "o1", nomorOrder: "ORD-20260905-2041", toko: "Toko Berkah Abadi", pembeli: "Andi Saputra", status: "BARU", metodeKirim: "TOKO_SENDIRI", nominal: 281000, tanggal: "2026-09-05T19:24:00" },
  { id: "o2", nomorOrder: "ORD-20260905-2038", toko: "Toko Berkah Abadi", pembeli: "Siti Nurhaliza", status: "DIPROSES", metodeKirim: "BITESHIP", nominal: 87000, tanggal: "2026-09-05T16:02:00" },
  { id: "o3", nomorOrder: "ORD-20260905-2029", toko: "UD Maju Jaya", pembeli: "Budi Hartono", status: "DIKIRIM", metodeKirim: "TOKO_SENDIRI", nominal: 576000, tanggal: "2026-09-05T10:45:00" },
  { id: "o4", nomorOrder: "ORD-20260904-2018", toko: "Toko Sumber Rejeki", pembeli: "Rina Kartika", status: "DITERIMA", metodeKirim: "BITESHIP", nominal: 270000, tanggal: "2026-09-04T18:30:00" },
  { id: "o5", nomorOrder: "ORD-20260903-2005", toko: "Toko Berkah Abadi", pembeli: "Joko Susilo", status: "SELESAI", metodeKirim: "BITESHIP", nominal: 318000, tanggal: "2026-09-03T15:12:00" },
  { id: "o6", nomorOrder: "ORD-20260902-1992", toko: "UD Maju Jaya", pembeli: "Dewi Anggraini", status: "DIBATALKAN", metodeKirim: "TOKO_SENDIRI", nominal: 72000, tanggal: "2026-09-02T11:40:00" },
  { id: "o7", nomorOrder: "ORD-20260905-2055", toko: "Toko Sumber Rejeki", pembeli: "Fajar Pratama", status: "DISPUTE", metodeKirim: "BITESHIP", nominal: 450000, tanggal: "2026-09-05T21:00:00" },
];

export const dummyDispute: Dispute[] = [
  { id: "d1", nomorOrder: "ORD-20260905-2055", toko: "Toko Sumber Rejeki", pembeli: "Fajar Pratama", alasan: "Barang tidak sesuai (jumlah kurang)", status: "DIAJUKAN" },
  { id: "d2", nomorOrder: "ORD-20260901-1980", toko: "Toko Berkah Abadi", pembeli: "Rina Kartika", alasan: "Belum diterima padahal sudah DIKIRIM", status: "DIPROSES", catatanAdmin: "Menunggu resi pengiriman dari toko" },
];

export const metrikOverview: MetrikOverview = {
  totalDistAktif: 24,
  totalTokoAktif: 186,
  gmvSCM: 4210000000,
  gmvMP: 486000000,
  pendingApproval: 8,
};
// Tren transaksi 30 hari (SCM & MP) untuk grafik admin
export const dummyTrend30: { tanggal: string; scm: number; mp: number }[] = [
  { tanggal: "2026-08-08", scm: 152000000, mp: 4200000 }, { tanggal: "2026-08-09", scm: 148000000, mp: 3900000 },
  { tanggal: "2026-08-10", scm: 201000000, mp: 5100000 }, { tanggal: "2026-08-11", scm: 176000000, mp: 4600000 },
  { tanggal: "2026-08-12", scm: 232000000, mp: 6100000 }, { tanggal: "2026-08-13", scm: 188000000, mp: 5400000 },
  { tanggal: "2026-08-14", scm: 215000000, mp: 6200000 }, { tanggal: "2026-08-15", scm: 276000000, mp: 7200000 },
  { tanggal: "2026-08-16", scm: 201000000, mp: 5600000 }, { tanggal: "2026-08-17", scm: 174000000, mp: 4800000 },
  { tanggal: "2026-08-18", scm: 243000000, mp: 6500000 }, { tanggal: "2026-08-19", scm: 228000000, mp: 7000000 },
  { tanggal: "2026-08-20", scm: 195000000, mp: 5800000 }, { tanggal: "2026-08-21", scm: 287000000, mp: 8100000 },
  { tanggal: "2026-08-22", scm: 254000000, mp: 7300000 }, { tanggal: "2026-08-23", scm: 266000000, mp: 6800000 },
  { tanggal: "2026-08-24", scm: 210000000, mp: 6400000 }, { tanggal: "2026-08-25", scm: 302000000, mp: 8800000 },
  { tanggal: "2026-08-26", scm: 271000000, mp: 7600000 }, { tanggal: "2026-08-27", scm: 236000000, mp: 6900000 },
  { tanggal: "2026-08-28", scm: 318000000, mp: 9200000 }, { tanggal: "2026-08-29", scm: 262000000, mp: 7800000 },
  { tanggal: "2026-08-30", scm: 289000000, mp: 8400000 }, { tanggal: "2026-08-31", scm: 341000000, mp: 9500000 },
  { tanggal: "2026-09-01", scm: 275000000, mp: 7900000 }, { tanggal: "2026-09-02", scm: 254000000, mp: 8600000 },
  { tanggal: "2026-09-03", scm: 296000000, mp: 8200000 }, { tanggal: "2026-09-04", scm: 263000000, mp: 7400000 },
  { tanggal: "2026-09-05", scm: 352000000, mp: 11200000 }, { tanggal: "2026-09-06", scm: 120000000, mp: 3900000 },
];

// Kategori master (SCM & MP) untuk master tools CRUD
export const dummyKategoriTree = [
  { id: "k1", nama: "Sembako", children: ["Beras", "Minyak", "Gula", "Tepung", "Telur"] },
  { id: "k2", nama: "Minuman", children: ["Air Mineral", "Teh", "Kopi", "Susu", "Sirup"] },
  { id: "k3", nama: "Makanan", children: ["Mi Instan", "Biskuit", "Kerupuk", "Kaleng"] },
  { id: "k4", nama: "Bumbu", children: ["Kecap", "Saus", "Bumbu Instan"] },
  { id: "k5", nama: "Perawatan Tubuh", children: ["Sabun", "Sampo", "Pasta Gigi"] },
  { id: "k6", nama: "Perlengkapan Rumah", children: ["Tissue", "Pembersih", "Deterjen"] },
];

export const dummySatuan = [
  { id: "u1", nama: "Kilogram", singkatan: "kg", aktif: true },
  { id: "u2", nama: "Pcs", singkatan: "pcs", aktif: true },
  { id: "u3", nama: "Dus", singkatan: "dus", aktif: true },
  { id: "u4", nama: "Karton", singkatan: "karton", aktif: true },
  { id: "u5", nama: "Lusin", singkatan: "lusin", aktif: true },
  { id: "u6", nama: "Karung", singkatan: "karung", aktif: true },
  { id: "u7", nama: "Botol", singkatan: "botol", aktif: true },
];
