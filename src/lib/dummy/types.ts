// ============================================================
// TIPE DATA DISTRIBUTOR (mock/frontend)
// ============================================================

export interface TierHarga {
  minQty: number;
  harga: number;
}

export interface ProdukDummy {
  id: string;
  kode: string;
  nama: string;
  kategoriMaster: string;
  subKategori: string;
  satuan: string;
  foto: string; // emoji/placeholder or url
  hargaTier: TierHarga[];
  stok: number;
  stokMinimum: number;
  status: "AKTIF" | "NONAKTIF";
  terjual?: number;
}

export interface MutasiStok {
  id: string;
  tanggal: string;
  sku: string;
  namaProduk: string;
  jenis: "MASUK" | "KELUAR" | "KOREKSI";
  jumlah: number; // + / -
  saldoAkhir: number;
  keterangan: string;
}

export type StatusPO =
  | "DRAFT"
  | "DIKIRIM"
  | "DIKONFIRMASI"
  | "DITERIMA"
  | "MENUNGGU_PEMBAYARAN"
  | "DIBAYAR"
  | "DIPROSES"
  | "SELESAI"
  | "DIBATALKAN";

export interface DistributorPartner {
  id: string;
  nama: string;
  kota: string;
  provinsi: string;
  kategori: string[];
  status: "AKTIF" | "NONAKTIF";
  totalTransaksi: number;
  totalOmzet: number;
  terhubungSejak: string;
}

export interface MitraToko {
  id: string;
  namaToko: string;
  pemilik: string;
  kota: string;
  totalTransaksi: number;
  totalOmzet: number;
  status: "AKTIF" | "NONAKTIF";
  terhubungSejak: string;
}

export interface POOut {
  id: string;
  nomorPO: string;
  tanggal: string;
  distributor: string;
  kota: string;
  itemCount: number;
  total: number;
  status: "DRAFT" | "DIKIRIM" | "DIKONFIRMASI" | "DITERIMA" | "DIBATALKAN";
}

export interface POIn {
  id: string;
  nomorPO: string;
  tanggal: string;
  toko: string;
  kota: string;
  itemCount: number;
  total: number;
  status:
    | "MENUNGGU_PEMBAYARAN"
    | "DIBAYAR"
    | "DIPROSES"
    | "DIKIRIM"
    | "DITERIMA"
    | "SELESAI"
    | "DIBATALKAN";
  items?: { nama: string; qty: number; harga: number }[];
}

export interface ProdukKatalog {
  id: string;
  kode: string;
  nama: string;
  kategoriMaster: string;
  subKategori: string;
  satuan: string;
  harga: number;
  distributor: string;
  distributorKota: string;
  stok: number;
  rating?: number;
  terjual?: number;
}

export interface KartuDiskon {
  id: string;
  kode: string;
  nama: string;
  tipe: "NOMINAL" | "PERSEN";
  nilai: number;
  target: "SEMUA" | "TERTENTU";
  targetNama?: string;
  periodeMulai: string;
  periodeSelesai: string;
  kuota: number;
  terpakai: number;
  status: "AKTIF" | "NONAKTIF" | "KADALUARSA";
}

export interface TagihanIuran {
  id: string;
  periode: string;
  judul: string;
  nominal: number;
  status: "LUNAS" | "NUNGGAK" | "PROSES";
  tanggalJatuhTempo: string;
  tanggalBayar?: string;
}

export interface MutasiSaldo {
  id: string;
  tanggal: string;
  deskripsi: string;
  jenis: "MASUK" | "KELUAR";
  nominal: number;
  saldoAkhir: number;
  ref?: string;
}

export interface OrderTerbaru {
  id: string;
  nomor: string;
  pelanggan: string;
  tanggal: string;
  total: number;
  status:
    | "MENUNGGU_PEMBAYARAN"
    | "DIBAYAR"
    | "DIPROSES"
    | "DIKIRIM"
    | "DITERIMA"
    | "SELESAI"
    | "DIBATALKAN";
}

export interface Staff {
  id: string;
  nama: string;
  email: string;
  role: "Admin" | "Kasir" | "Gudang" | "Keuangan";
  telepon: string;
  status: "AKTIF" | "NONAKTIF";
  terakhirAktif: string;
}
