// Data dummy: Produk Saya
import type { ProdukDummy } from "./types";

export const dummyProduk: ProdukDummy[] = [
  { id: "p1", kode: "SKU-001", nama: "Beras Premium Ramos 5kg", kategoriMaster: "Sembako", subKategori: "Beras", satuan: "Karung", foto: "🍚", hargaTier: [{ minQty: 10, harga: 62000 }, { minQty: 50, harga: 61000 }, { minQty: 100, harga: 59800 }], stok: 640, stokMinimum: 100, status: "AKTIF", terjual: 1240 },
  { id: "p2", kode: "SKU-002", nama: "Minyak Goreng Sania 2L", kategoriMaster: "Sembako", subKategori: "Minyak", satuan: "Karton", foto: "🛢️", hargaTier: [{ minQty: 12, harga: 218000 }, { minQty: 60, harga: 215000 }], stok: 32, stokMinimum: 40, status: "AKTIF", terjual: 860 },
  { id: "p3", kode: "SKU-003", nama: "Gula Pasir Tebu 1kg", kategoriMaster: "Sembako", subKategori: "Gula", satuan: "Karung", foto: "🍬", hargaTier: [{ minQty: 20, harga: 15500 }, { minQty: 100, harga: 15200 }], stok: 520, stokMinimum: 80, status: "AKTIF", terjual: 2100 },
  { id: "p4", kode: "SKU-004", nama: "Air Mineral Prima 600ml (isi 24)", kategoriMaster: "Minuman", subKategori: "Air Mineral", satuan: "Dus", foto: "💧", hargaTier: [{ minQty: 10, harga: 48000 }, { minQty: 50, harga: 47000 }], stok: 18, stokMinimum: 30, status: "AKTIF", terjual: 640 },
  { id: "p5", kode: "SKU-005", nama: "Teh Celup Tong Tji 25s", kategoriMaster: "Minuman", subKategori: "Teh", satuan: "Dus", foto: "🍵", hargaTier: [{ minQty: 12, harga: 42500 }], stok: 145, stokMinimum: 30, status: "AKTIF", terjual: 380 },
  { id: "p6", kode: "SKU-006", nama: "Kopi Bubuk Kapal Api 250g", kategoriMaster: "Minuman", subKategori: "Kopi", satuan: "Dus", foto: "☕", hargaTier: [{ minQty: 12, harga: 138000 }, { minQty: 48, harga: 135000 }], stok: 67, stokMinimum: 20, status: "AKTIF", terjual: 720 },
  { id: "p7", kode: "SKU-007", nama: "Mi Instan Indomie Goreng", kategoriMaster: "Makanan", subKategori: "Mi Instan", satuan: "Dus", foto: "🍜", hargaTier: [{ minQty: 20, harga: 111000 }, { minQty: 100, harga: 108500 }], stok: 890, stokMinimum: 100, status: "AKTIF", terjual: 5300 },
  { id: "p8", kode: "SKU-008", nama: "Sabun Mandi Lifebuoy 3-in-1", kategoriMaster: "Perawatan Tubuh", subKategori: "Sabun", satuan: "Lusin", foto: "🧼", hargaTier: [{ minQty: 10, harga: 72000 }, { minQty: 50, harga: 70000 }], stok: 210, stokMinimum: 40, status: "NONAKTIF", terjual: 150 },
  { id: "p9", kode: "SKU-009", nama: "Tissue Jolly 250s", kategoriMaster: "Perlengkapan Rumah", subKategori: "Tissue", satuan: "Dus", foto: "🧻", hargaTier: [{ minQty: 12, harga: 53500 }], stok: 9, stokMinimum: 24, status: "AKTIF", terjual: 96 },
  { id: "p10", kode: "SKU-010", nama: "Kecap Manis ABC 520ml", kategoriMaster: "Bumbu", subKategori: "Kecap", satuan: "Dus", foto: "🍶", hargaTier: [{ minQty: 12, harga: 129000 }, { minQty: 48, harga: 126000 }], stok: 76, stokMinimum: 20, status: "AKTIF", terjual: 440 },
];
