// ============================================================
// TIPE DATA ADMIN (mock) — dummy frontend
// ============================================================

export interface AkunSCM {
  id: string;
  namaUsaha: string;
  tipe: "DISTRIBUTOR" | "TOKO";
  pemilik: string;
  bidang: string;
  kota: string;
  tanggalDaftar: string;
  status: "PENDING" | "AKTIF" | "SUSPEND" | "DITOLAK";
  dokumen: string[];
}

export interface TransaksiSCM {
  id: string;
  nomorPO: string;
  dari: string;
  ke: string;
  status: "MENUNGGU_PEMBAYARAN" | "DIBAYAR" | "DIPROSES" | "DIKIRIM" | "DITERIMA" | "SELESAI" | "DIBATALKAN";
  nominal: number;
  tanggal: string;
  hariDiam: number;
}

export interface MonitoringStokSCM {
  id: string;
  produk: string;
  distributor: string;
  kode: string;
  stokTersedia: number;
  stokMinimum: number;
  satuan: string;
  status: "AMAN" | "KRITIS" | "HABIS";
}

export interface IuranAkun {
  id: string;
  namaUsaha: string;
  tipe: "DISTRIBUTOR" | "TOKO";
  periode: string;
  nominal: number;
  status: "LUNAS" | "NUNGGAK" | "PROSES";
  jatuhTempo: string;
  tglBayar?: string;
}

export interface SaldoAkun {
  id: string;
  namaUsaha: string;
  tipe: "DISTRIBUTOR" | "TOKO";
  saldo: number;
  status: "SEHAT" | "MINIM" | "NEGATIF";
}

export interface Pencairan {
  id: string;
  ref: string;
  namaUsaha: string;
  tipe: "DISTRIBUTOR" | "TOKO";
  nominal: number;
  rekening: string;
  tanggal: string;
  status: "MENUNGGU" | "DISETUJUI" | "DITOLAK" | "DIPROSES";
}

export interface SellerMP {
  id: string;
  namaToko: string;
  pemilik: string;
  kota: string;
  tanggalDaftar: string;
  status: "PENDING" | "AKTIF" | "SUSPEND";
}

export interface ListingMonitoringMP {
  id: string;
  produk: string;
  toko: string;
  harga: number;
  stok: number;
  status: "AKTIF" | "NONAKTIF" | "HABIS";
  kategoriMP: string;
}

export interface OrderMPAdmin {
  id: string;
  nomorOrder: string;
  toko: string;
  pembeli: string;
  status: "BARU" | "DIPROSES" | "DIKIRIM" | "DITERIMA" | "SELESAI" | "DIBATALKAN" | "DISPUTE";
  metodeKirim: "TOKO_SENDIRI" | "BITESHIP";
  nominal: number;
  tanggal: string;
}

export interface Dispute {
  id: string;
  nomorOrder: string;
  toko: string;
  pembeli: string;
  alasan: string;
  catatanAdmin?: string;
  status: "DIAJUKAN" | "DIPROSES" | "SELESAI";
}

export interface MetrikOverview {
  totalDistAktif: number;
  totalTokoAktif: number;
  gmvSCM: number;
  gmvMP: number;
  pendingApproval: number;
}
