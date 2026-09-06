// Data dummy: Mutasi Stok
import type { MutasiStok } from "./types";

export const dummyMutasiStok: MutasiStok[] = [
  { id: "m1", tanggal: "2026-09-05T09:12:00", sku: "SKU-001", namaProduk: "Beras Premium Ramos 5kg", jenis: "MASUK", jumlah: 200, saldoAkhir: 640, keterangan: "Pembelian dari pabrik — PO.PB-20260905-001" },
  { id: "m2", tanggal: "2026-09-05T08:40:00", sku: "SKU-002", namaProduk: "Minyak Goreng Sania 2L", jenis: "KELUAR", jumlah: -8, saldoAkhir: 32, keterangan: "Pengiriman PO.PO-20260904-118 — Toko Berkah Abadi" },
  { id: "m3", tanggal: "2026-09-04T14:05:00", sku: "SKU-009", namaProduk: "Tissue Jolly 250s", jenis: "KOREKSI", jumlah: -3, saldoAkhir: 9, keterangan: "Koreksi stok rusak (penyusutan)" },
  { id: "m4", tanggal: "2026-09-04T10:22:00", sku: "SKU-007", namaProduk: "Mi Instan Indomie Goreng", jenis: "MASUK", jumlah: 400, saldoAkhir: 890, keterangan: "Restock gudang utama" },
  { id: "m5", tanggal: "2026-09-03T16:50:00", sku: "SKU-003", namaProduk: "Gula Pasir Tebu 1kg", jenis: "KELUAR", jumlah: -50, saldoAkhir: 520, keterangan: "Pengiriman PO.PO-20260903-110 — Toko Sumber Rejeki" },
  { id: "m6", tanggal: "2026-09-03T11:10:00", sku: "SKU-004", namaProduk: "Air Mineral Prima 600ml", jenis: "KOREKSI", jumlah: 4, saldoAkhir: 18, keterangan: "Koreksi opname gudang (selisih lebih)" },
  { id: "m7", tanggal: "2026-09-02T09:30:00", sku: "SKU-006", namaProduk: "Kopi Bubuk Kapal Api 250g", jenis: "MASUK", jumlah: 48, saldoAkhir: 67, keterangan: "Pembelian dari pabrik" },
  { id: "m8", tanggal: "2026-09-01T13:45:00", sku: "SKU-005", namaProduk: "Teh Celup Tong Tji 25s", jenis: "KELUAR", jumlah: -12, saldoAkhir: 145, keterangan: "Pengiriman PO.PO-20260901-095 — Toko Maju Jaya" },
];
