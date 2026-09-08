// ============================================================
// TIPE DATA MP (Marketplace B2C) — mock/frontend
// ============================================================

export interface MPKategori {
  id: string;
  nama: string;
  slug: string;
  ikon: string; // emoji fallback
  warna: string; // tailwind bg class
}

export interface MPToko {
  id: string;
  nama: string;
  slug: string;
  kota: string;
  provinsi: string;
  foto?: string;
  rating: number;
  jumlahTerjual: number;
  produkAktif: number;
  isOfficial?: boolean;
  jamBuka?: string;
  deskripsi?: string;
}

export interface MPProduk {
  id: string;
  slug: string;
  judul: string;
  foto: string;
  harga: number;
  hargaCoret?: number;
  stok: number;
  terjual: number;
  rating: number;
  kategoriSlug: string;
  kategori: string;
  tokoId: string;
  tokoNama: string;
  tokoKota: string;
  tokoSlug: string;
  satuan?: string;
  deskripsi?: string;
  tags?: string[];
  isUnggulan?: boolean;
  createdAt: string;
}

export interface MPKeranjangItem {
  produkId: string;
  qty: number;
}

export interface MPAlamat {
  id: string;
  label: string;
  nama: string;
  telepon: string;
  provinsi: string;
  kabupatenKota: string;
  kecamatan: string;
  alamatLengkap: string;
  kodePos: string;
  utama: boolean;
}
