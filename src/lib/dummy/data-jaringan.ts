// Data dummy: Jaringan (Mitra Toko & Distributor Partner)
import type { DistributorPartner, MitraToko } from "./types";

export const dummyMitraToko: MitraToko[] = [
  { id: "mt1", namaToko: "Toko Berkah Abadi", pemilik: "H. Ahmad Fauzi", kota: "Makassar", totalTransaksi: 48, totalOmzet: 248500000, status: "AKTIF", terhubungSejak: "2025-03-12" },
  { id: "mt2", namaToko: "Toko Sumber Rejeki", pemilik: "Siti Aminah", kota: "Maros", totalTransaksi: 35, totalOmzet: 176200000, status: "AKTIF", terhubungSejak: "2025-06-08" },
  { id: "mt3", namaToko: "UD Maju Jaya", pemilik: "Budi Santoso", kota: "Gowa", totalTransaksi: 27, totalOmzet: 139800000, status: "AKTIF", terhubungSejak: "2025-09-21" },
  { id: "mt4", namaToko: "Toko Rizki Baru", pemilik: "Rahmat Hidayat", kota: "Makassar", totalTransaksi: 19, totalOmzet: 92100000, status: "AKTIF", terhubungSejak: "2026-01-15" },
  { id: "mt5", namaToko: "Kios Berkah", pemilik: "Junaedi", kota: "Takalar", totalTransaksi: 12, totalOmzet: 46800000, status: "AKTIF", terhubungSejak: "2026-02-02" },
  { id: "mt6", namaToko: "Toko Amanah Sentosa", pemilik: "Dewi Lestari", kota: "Makassar", totalTransaksi: 8, totalOmzet: 31500000, status: "NONAKTIF", terhubungSejak: "2025-11-30" },
  { id: "mt7", namaToko: "Toko Sinar Bahari", pemilik: "Hasan Basri", kota: "Pangkep", totalTransaksi: 5, totalOmzet: 18400000, status: "AKTIF", terhubungSejak: "2026-05-19" },
];

export const dummyDistributorPartner: DistributorPartner[] = [
  { id: "dp1", nama: "PT Nusantara Sembako", kota: "Surabaya", provinsi: "Jawa Timur", kategori: ["Sembako", "Makanan"], status: "AKTIF", totalTransaksi: 12, totalOmzet: 782000000, terhubungSejak: "2025-02-01" },
  { id: "dp2", nama: "CV Mitra Pangan Makmur", kota: "Jakarta Utara", provinsi: "DKI Jakarta", kategori: ["Minuman", "Perawatan"], status: "AKTIF", totalTransaksi: 8, totalOmzet: 415000000, terhubungSejak: "2025-07-14" },
  { id: "dp3", nama: "PT Sumber Berkah Distribusi", kota: "Makassar", provinsi: "Sulawesi Selatan", kategori: ["Bumbu", "Sembako"], status: "AKTIF", totalTransaksi: 15, totalOmzet: 523000000, terhubungSejak: "2025-04-22" },
  { id: "dp4", nama: "UD Sentra Grosir Timur", kota: "Denpasar", provinsi: "Bali", kategori: ["Perlengkapan Rumah"], status: "AKTIF", totalTransaksi: 4, totalOmzet: 96000000, terhubungSejak: "2026-03-10" },
  { id: "dp5", nama: "PT Agung Logistik & Dagang", kota: "Medan", provinsi: "Sumatera Utara", kategori: ["Makanan", "Minuman"], status: "NONAKTIF", totalTransaksi: 2, totalOmzet: 41000000, terhubungSejak: "2025-10-05" },
];
