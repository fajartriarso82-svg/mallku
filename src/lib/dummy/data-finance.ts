// Data dummy: Kartu Diskon, Iuran, Mutasi Saldo, Staff
import type { KartuDiskon, MutasiSaldo, Staff, TagihanIuran } from "./types";

export const dummyKartuDiskon: KartuDiskon[] = [
  { id: "d1", kode: "DISC-PCT-5", nama: "Diskon 5% Ramadan", tipe: "PERSEN", nilai: 5, target: "SEMUA", periodeMulai: "2026-03-01", periodeSelesai: "2026-04-15", kuota: 1000, terpakai: 684, status: "KADALUARSA" },
  { id: "d2", kode: "DISC-NOM-25", nama: "Potongan Rp25.000 Min. Belanja 1jt", tipe: "NOMINAL", nilai: 25000, target: "TERTENTU", targetNama: "Toko Berkah Abadi, UD Maju Jaya", periodeMulai: "2026-08-01", periodeSelesai: "2026-12-31", kuota: 500, terpakai: 122, status: "AKTIF" },
  { id: "d3", kode: "DISC-PCT-10", nama: "Diskon 10% Pelanggan Baru", tipe: "PERSEN", nilai: 10, target: "TERTENTU", targetNama: "Kios Berkah, Toko Sinar Bahari", periodeMulai: "2026-09-01", periodeSelesai: "2026-11-30", kuota: 200, terpakai: 34, status: "AKTIF" },
  { id: "d4", kode: "DISC-NOM-50", nama: "Voucher Rp50.000 Anniversary", tipe: "NOMINAL", nilai: 50000, target: "SEMUA", periodeMulai: "2026-10-01", periodeSelesai: "2026-10-31", kuota: 300, terpakai: 0, status: "NONAKTIF" },
];

export const dummyTagihanIuran: TagihanIuran[] = [
  { id: "i1", periode: "September 2026", judul: "Iuran Keanggotaan SCM — Distributor", nominal: 250000, status: "PROSES", tanggalJatuhTempo: "2026-09-25" },
  { id: "i2", periode: "Agustus 2026", judul: "Iuran Keanggotaan SCM — Distributor", nominal: 250000, status: "LUNAS", tanggalJatuhTempo: "2026-08-25", tanggalBayar: "2026-08-20" },
  { id: "i3", periode: "Juli 2026", judul: "Iuran Keanggotaan SCM — Distributor", nominal: 250000, status: "LUNAS", tanggalJatuhTempo: "2026-07-25", tanggalBayar: "2026-07-18" },
  { id: "i4", periode: "Juni 2026", judul: "Iuran Keanggotaan SCM — Distributor", nominal: 250000, status: "LUNAS", tanggalJatuhTempo: "2026-06-25", tanggalBayar: "2026-06-22" },
  { id: "i5", periode: "Mei 2026", judul: "Iuran Keanggotaan SCM — Distributor", nominal: 250000, status: "NUNGGAK", tanggalJatuhTempo: "2026-05-25" },
];

export const dummyMutasiSaldo: MutasiSaldo[] = [
  { id: "s1", tanggal: "2026-09-06T09:00:00", deskripsi: "Pencairan dana ke rekening bank", jenis: "KELUAR", nominal: 50000000, saldoAkhir: 148250000, ref: "WDR-20260906-001" },
  { id: "s2", tanggal: "2026-09-05T14:30:00", deskripsi: "Pembayaran PO-20260905-118 (Toko Berkah Abadi)", jenis: "MASUK", nominal: 38500000, saldoAkhir: 198250000, ref: "PO-20260905-118" },
  { id: "s3", tanggal: "2026-09-05T11:00:00", deskripsi: "Pembayaran PO-20260905-117 (UD Maju Jaya)", jenis: "MASUK", nominal: 21800000, saldoAkhir: 159750000, ref: "PO-20260905-117" },
  { id: "s4", tanggal: "2026-09-04T16:20:00", deskripsi: "Iuran keanggotaan Agustus", jenis: "KELUAR", nominal: 250000, saldoAkhir: 137950000, ref: "IUR-202608" },
  { id: "s5", tanggal: "2026-09-04T10:15:00", deskripsi: "Pencairan dana ke rekening bank", jenis: "KELUAR", nominal: 75000000, saldoAkhir: 138200000, ref: "WDR-20260904-002" },
  { id: "s6", tanggal: "2026-09-03T13:40:00", deskripsi: "Pembayaran PO-20260903-110 (Toko Sumber Rejeki)", jenis: "MASUK", nominal: 15200000, saldoAkhir: 213200000, ref: "PO-20260903-110" },
];

export const dummyStaff: Staff[] = [
  { id: "st1", nama: "Andi Pratama", email: "andi@berkahdistribusi.id", role: "Admin", telepon: "081234567890", status: "AKTIF", terakhirAktif: "2026-09-06T08:30:00" },
  { id: "st2", nama: "Rina Wulandari", email: "rina@berkahdistribusi.id", role: "Keuangan", telepon: "081298765432", status: "AKTIF", terakhirAktif: "2026-09-06T07:55:00" },
  { id: "st3", nama: "Fajar Ramadhan", email: "fajar@berkahdistribusi.id", role: "Gudang", telepon: "082134567812", status: "AKTIF", terakhirAktif: "2026-09-05T17:10:00" },
  { id: "st4", nama: "Sari Dewi", email: "sari@berkahdistribusi.id", role: "Kasir", telepon: "085211122233", status: "NONAKTIF", terakhirAktif: "2026-07-30T12:00:00" },
];
