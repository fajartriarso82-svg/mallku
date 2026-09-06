// Data dummy: PO ke Distributor Lain
import type { POOut } from "./types";

export const dummyPOOut: POOut[] = [
  { id: "poo1", nomorPO: "PO-KL-20260905-011", tanggal: "2026-09-05T10:00:00", distributor: "PT Nusantara Sembako", kota: "Surabaya", itemCount: 5, total: 482000000, status: "DIKONFIRMASI" },
  { id: "poo2", nomorPO: "PO-KL-20260902-010", tanggal: "2026-09-02T14:30:00", distributor: "PT Sumber Berkah Distribusi", kota: "Makassar", itemCount: 3, total: 215000000, status: "DIKIRIM" },
  { id: "poo3", nomorPO: "PO-KL-20260828-009", tanggal: "2026-08-28T09:15:00", distributor: "CV Mitra Pangan Makmur", kota: "Jakarta Utara", itemCount: 8, total: 640000000, status: "DITERIMA" },
  { id: "poo4", nomorPO: "PO-KL-20260820-008", tanggal: "2026-08-20T11:45:00", distributor: "UD Sentra Grosir Timur", kota: "Denpasar", itemCount: 2, total: 82000000, status: "DITERIMA" },
  { id: "poo5", nomorPO: "PO-KL-20260815-007", tanggal: "2026-08-15T08:20:00", distributor: "PT Nusantara Sembako", kota: "Surabaya", itemCount: 4, total: 298000000, status: "DIBATALKAN" },
  { id: "poo6", nomorPO: "PO-KL-20260906-012", tanggal: "2026-09-06T09:00:00", distributor: "PT Sumber Berkah Distribusi", kota: "Makassar", itemCount: 1, total: 47500000, status: "DRAFT" },
];
