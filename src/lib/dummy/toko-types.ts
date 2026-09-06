// ============================================================
// TIPE DATA TOKO (mock/frontend) — peran ganda: SCM buyer + MP seller
// ============================================================

export interface DistributorMitraToko {
  id: string;
  nama: string;
  kota: string;
  provinsi: string;
  kategori: string[];
  status: "AKTIF" | "NONAKTIF";
  totalPO: number;
  totalBelanja: number;
  terhubungSejak: string;
}

export interface KatalogProdukSCM {
  id: string;
  kode: string;
  nama: string;
  kategori: string;
  satuan: string;
  hargaTier: { minQty: number; harga: number }[];
  distributor: string;
  distributorKota: string;
  stok: number;
  foto?: string;
}

export interface StokDiterima {
  id: string;
  produk: string;
  sku: string;
  distributor: string;
  qtyDiterima: number;
  qtyDitayangkan: number;
  qtySisa: number;
  satuan: string;
  tanggalTerima: string;
  nomorPO: string;
}

export interface POPembelian {
  id: string;
  nomorPO: string;
  tanggal: string;
  distributor: string;
  kota: string;
  itemCount: number;
  total: number;
  status:
    | "DRAFT"
    | "MENUNGGU_PEMBAYARAN"
    | "DIBAYAR"
    | "DIPROSES"
    | "DIKIRIM"
    | "DITERIMA"
    | "SELESAI"
    | "DIBATALKAN";
  items?: { nama: string; qty: number; harga: number }[];
  vaNumber?: string;
}

export interface PembayaranVA {
  id: string;
  nomorPO: string;
  distributor: string;
  metode: "VA BCA" | "VA Mandiri" | "QRIS";
  vaNumber: string;
  jumlah: number;
  status: "MENUNGGU" | "BERHASIL" | "GAGAL" | "EXPIRED";
  tanggal: string;
  batasBayar: string;
}

export interface ListingJual {
  id: string;
  skuWarisan: string;
  namaProduk: string;
  judulJual: string;
  kategoriMP: string;
  foto?: string;
  hargaSCM: number;
  hargaJual: number;
  stokPokok: number; // warisan dari SCM (read-only)
  stokTersedia: number;
  terjual: number;
  status: "AKTIF" | "NONAKTIF";
}

export interface PesananMP {
  id: string;
  nomorOrder: string;
  tanggal: string;
  pembeli: string;
  kota: string;
  items: { nama: string; qty: number; harga: number }[];
  metodeKirim: "TOKO_SENDIRI" | "BITESHIP";
  kurir?: string;
  resi?: string;
  subtotal: number;
  ongkir: number;
  total: number;
  status: "BARU" | "DIPROSES" | "DIKIRIM" | "DITERIMA" | "SELESAI" | "DIBATALKAN";
}

export interface VoucherToko {
  id: string;
  kode: string;
  nama: string;
  tipe: "NOMINAL" | "PERSEN";
  nilai: number;
  minBelanja: number;
  periodeMulai: string;
  periodeSelesai: string;
  kuota: number;
  terpakai: number;
  status: "AKTIF" | "NONAKTIF" | "KADALUARSA";
}

export interface MutasiSaldoMP {
  id: string;
  tanggal: string;
  deskripsi: string;
  jenis: "MASUK" | "KELUAR";
  nominal: number;
  saldoAkhir: number;
  ref?: string;
}

export interface RingkasanDashboard {
  poAktif: number;
  stokBaruDiterima: number;
  pesananMasuk: number;
  produkTerjualHariIni: number;
  saldoSCM: number;
  saldoMP: number;
}

export interface StaffToko {
  id: string;
  nama: string;
  email: string;
  role: "Admin" | "Kasir" | "Gudang";
  telepon: string;
  status: "AKTIF" | "NONAKTIF";
}
