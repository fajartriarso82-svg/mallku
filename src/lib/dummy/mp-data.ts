// ============================================================
// DATA DUMMY MP (Marketplace B2C) — frontend only
// ============================================================
import type { MPKategori, MPProduk, MPToko, MPAlamat } from "./mp-types";

export const mpKategoriList: MPKategori[] = [
  { id: "k1", nama: "Sembako", slug: "sembako", ikon: "🍚", warna: "bg-amber-50" },
  { id: "k2", nama: "Minuman", slug: "minuman", ikon: "🧃", warna: "bg-sky-50" },
  { id: "k3", nama: "Makanan Ringan", slug: "makanan-ringan", ikon: "🍪", warna: "bg-orange-50" },
  { id: "k4", nama: "Perawatan Rumah", slug: "perawatan-rumah", ikon: "🧴", warna: "bg-emerald-50" },
  { id: "k5", nama: "Kebutuhan Bayi", slug: "kebutuhan-bayi", ikon: "🍼", warna: "bg-rose-50" },
  { id: "k6", nama: "Frozen Food", slug: "frozen-food", ikon: "🧊", warna: "bg-cyan-50" },
  { id: "k7", nama: "Pertanian", slug: "pertanian", ikon: "🌾", warna: "bg-lime-50" },
  { id: "k8", nama: "Perlengkapan Dapur", slug: "perlengkapan-dapur", ikon: "🍳", warna: "bg-indigo-50" },
];

export const mpTokoList: MPToko[] = [
  { id: "t1", nama: "Toko Sumber Rejeki", slug: "sumber-rejeki", kota: "Makassar", provinsi: "Sulawesi Selatan", rating: 4.8, jumlahTerjual: 1240, produkAktif: 46, isOfficial: true, deskripsi: "Toko grosir & eceran kebutuhan pokok Makassar." },
  { id: "t2", nama: "Berkah Abadi Mart", slug: "berkah-abadi-mart", kota: "Makassar", provinsi: "Sulawesi Selatan", rating: 4.7, jumlahTerjual: 980, produkAktif: 38, deskripsi: "Menyediakan sembako & kebutuhan rumah tangga." },
  { id: "t3", nama: "Toko Segar Alami", slug: "segar-alami", kota: "Gowa", provinsi: "Sulawesi Selatan", rating: 4.9, jumlahTerjual: 2210, produkAktif: 52, isOfficial: true, deskripsi: "Sayur, buah & frozen food segar dari petani lokal." },
  { id: "t4", nama: "Prima Fresh Mart", slug: "prima-fresh-mart", kota: "Makassar", provinsi: "Sulawesi Selatan", rating: 4.6, jumlahTerjual: 760, produkAktif: 29, deskripsi: "Market modern pilihan keluarga." },
  { id: "t5", nama: "Toko Barokah", slug: "barokah", kota: "Maros", provinsi: "Sulawesi Selatan", rating: 4.5, jumlahTerjual: 540, produkAktif: 21, deskripsi: "Sembako murah meriah." },
];

export const mpProdukList: MPProduk[] = [
  // --- Sembako ---
  { id: "p1", slug: "beras-premium-5kg", judul: "Beras Premium 5kg", foto: "🍚", harga: 68000, hargaCoret: 72000, stok: 120, terjual: 342, rating: 4.9, kategoriSlug: "sembako", kategori: "Sembako", tokoId: "t1", tokoNama: "Toko Sumber Rejeki", tokoKota: "Makassar", tokoSlug: "sumber-rejeki", satuan: "kantong", deskripsi: "Beras premium kualitas terbaik, pulen dan wangi. Cocok untuk konsumsi rumah tangga sehari-hari.", tags: ["Beras", "Sembako"], isUnggulan: true, createdAt: "2026-09-01" },
  { id: "p2", slug: "minyak-goreng-2l", judul: "Minyak Goreng 2L", foto: "🛢️", harga: 38000, stok: 80, terjual: 210, rating: 4.7, kategoriSlug: "sembako", kategori: "Sembako", tokoId: "t1", tokoNama: "Toko Sumber Rejeki", tokoKota: "Makassar", tokoSlug: "sumber-rejeki", satuan: "botol", deskripsi: "Minyak goreng kemasan 2 liter, jernih dan hemat.", isUnggulan: true, createdAt: "2026-09-02" },
  { id: "p3", slug: "gula-pasir-1kg", judul: "Gula Pasir 1kg", foto: "🍬", harga: 18500, stok: 200, terjual: 420, rating: 4.8, kategoriSlug: "sembako", kategori: "Sembako", tokoId: "t2", tokoNama: "Berkah Abadi Mart", tokoKota: "Makassar", tokoSlug: "berkah-abadi-mart", satuan: "bungkus", deskripsi: "Gula pasir putih bersih, manis alami.", createdAt: "2026-09-03" },
  { id: "p4", slug: "telur-ayam-1kg", judul: "Telur Ayam 1kg", foto: "🥚", harga: 29000, hargaCoret: 32000, stok: 60, terjual: 150, rating: 4.6, kategoriSlug: "sembako", kategori: "Sembako", tokoId: "t3", tokoNama: "Toko Segar Alami", tokoKota: "Gowa", tokoSlug: "segar-alami", satuan: "kg", deskripsi: "Telur ayam negeri segar dari peternak lokal.", createdAt: "2026-09-04" },

  // --- Minuman ---
  { id: "p5", slug: "air-mineral-600ml", judul: "Air Mineral 600ml (dus)", foto: "💧", harga: 45000, hargaCoret: 50000, stok: 90, terjual: 320, rating: 4.8, kategoriSlug: "minuman", kategori: "Minuman", tokoId: "t2", tokoNama: "Berkah Abadi Mart", tokoKota: "Makassar", tokoSlug: "berkah-abadi-mart", satuan: "dus", deskripsi: "Air mineral 600ml isi 12 botol per dus.", isUnggulan: true, createdAt: "2026-09-05" },
  { id: "p6", slug: "teh-celup-25-sachet", judul: "Teh Celup 25 sachet", foto: "🍵", harga: 9800, stok: 150, terjual: 180, rating: 4.5, kategoriSlug: "minuman", kategori: "Minuman", tokoId: "t1", tokoNama: "Toko Sumber Rejeki", tokoKota: "Makassar", tokoSlug: "sumber-rejeki", satuan: "kotak", deskripsi: "Teh celup hitam aroma melati.", createdAt: "2026-09-06" },
  { id: "p7", slug: "kopi-bubuk-250g", judul: "Kopi Bubuk 250g", foto: "☕", harga: 24000, stok: 70, terjual: 95, rating: 4.9, kategoriSlug: "minuman", kategori: "Minuman", tokoId: "t3", tokoNama: "Toko Segar Alami", tokoKota: "Gowa", tokoSlug: "segar-alami", satuan: "bungkus", deskripsi: "Kopi bubuk robusta lokal Toraja.", isUnggulan: true, createdAt: "2026-09-07" },

  // --- Makanan Ringan ---
  { id: "p8", slug: "keripik-singkong-200g", judul: "Keripik Singkong 200g", foto: "🍟", harga: 15000, stok: 100, terjual: 260, rating: 4.7, kategoriSlug: "makanan-ringan", kategori: "Makanan Ringan", tokoId: "t1", tokoNama: "Toko Sumber Rejeki", tokoKota: "Makassar", tokoSlug: "sumber-rejeki", satuan: "bungkus", deskripsi: "Keripik singkong renyah dengan bumbu balado khas.", createdAt: "2026-09-08" },
  { id: "p9", slug: "biskuit-kaleng-800g", judul: "Biskuit Kaleng 800g", foto: "🍪", harga: 65000, hargaCoret: 78000, stok: 40, terjual: 88, rating: 4.8, kategoriSlug: "makanan-ringan", kategori: "Makanan Ringan", tokoId: "t4", tokoNama: "Prima Fresh Mart", tokoKota: "Makassar", tokoSlug: "prima-fresh-mart", satuan: "kaleng", deskripsi: "Biskuit aneka rasa dalam kaleng, cocok untuk hampers.", isUnggulan: true, createdAt: "2026-09-09" },
  { id: "p10", slug: "cokelat-batang-100g", judul: "Cokelat Batang 100g", foto: "🍫", harga: 12500, stok: 130, terjual: 310, rating: 4.6, kategoriSlug: "makanan-ringan", kategori: "Makanan Ringan", tokoId: "t2", tokoNama: "Berkah Abadi Mart", tokoKota: "Makassar", tokoSlug: "berkah-abadi-mart", satuan: "batang", deskripsi: "Cokelat batang susu creamy.", createdAt: "2026-09-10" },

  // --- Perawatan Rumah ---
  { id: "p11", slug: "detergen-bubuk-800g", judul: "Detergen Bubuk 800g", foto: "🧺", harga: 21000, hargaCoret: 24000, stok: 85, terjual: 190, rating: 4.7, kategoriSlug: "perawatan-rumah", kategori: "Perawatan Rumah", tokoId: "t4", tokoNama: "Prima Fresh Mart", tokoKota: "Makassar", tokoSlug: "prima-fresh-mart", satuan: "bungkus", deskripsi: "Detergen bubuk dengan aroma segar.", createdAt: "2026-09-11" },
  { id: "p12", slug: "sabun-cuci-piring-780ml", judul: "Sabun Cuci Piring 780ml", foto: "🧼", harga: 18000, stok: 110, terjual: 230, rating: 4.6, kategoriSlug: "perawatan-rumah", kategori: "Perawatan Rumah", tokoId: "t2", tokoNama: "Berkah Abadi Mart", tokoKota: "Makassar", tokoSlug: "berkah-abadi-mart", satuan: "botol", deskripsi: "Sabun cuci piring, ampuh mengangkat lemak.", isUnggulan: true, createdAt: "2026-09-12" },

  // --- Kebutuhan Bayi ---
  { id: "p13", slug: "popok-bayi-m-20pcs", judul: "Popok Bayi M 20 pcs", foto: "👶", harga: 38000, hargaCoret: 42000, stok: 55, terjual: 140, rating: 4.9, kategoriSlug: "kebutuhan-bayi", kategori: "Kebutuhan Bayi", tokoId: "t4", tokoNama: "Prima Fresh Mart", tokoKota: "Makassar", tokoSlug: "prima-fresh-mart", satuan: "pak", deskripsi: "Popok bayi ukuran M, lembut & anti bocor.", isUnggulan: true, createdAt: "2026-09-13" },
  { id: "p14", slug: "sabun-mandi-bayi", judul: "Sabun Mandi Bayi", foto: "🧴", harga: 16500, stok: 95, terjual: 120, rating: 4.8, kategoriSlug: "kebutuhan-bayi", kategori: "Kebutuhan Bayi", tokoId: "t5", tokoNama: "Toko Barokah", tokoKota: "Maros", tokoSlug: "barokah", satuan: "botol", deskripsi: "Sabun mandi bayi lembut, tidak perih di mata.", createdAt: "2026-09-14" },

  // --- Frozen Food ---
  { id: "p15", slug: "nugget-ayam-500g", judul: "Nugget Ayam 500g", foto: "🍗", harga: 32000, hargaCoret: 36000, stok: 75, terjual: 280, rating: 4.7, kategoriSlug: "frozen-food", kategori: "Frozen Food", tokoId: "t3", tokoNama: "Toko Segar Alami", tokoKota: "Gowa", tokoSlug: "segar-alami", satuan: "bungkus", deskripsi: "Nugget ayam crispy siap goreng.", isUnggulan: true, createdAt: "2026-09-15" },
  { id: "p16", slug: "sosis-ayam-500g", judul: "Sosis Ayam 500g", foto: "🌭", harga: 28000, stok: 60, terjual: 170, rating: 4.6, kategoriSlug: "frozen-food", kategori: "Frozen Food", tokoId: "t3", tokoNama: "Toko Segar Alami", tokoKota: "Gowa", tokoSlug: "segar-alami", satuan: "bungkus", deskripsi: "Sosis ayam premium, siap olah.", createdAt: "2026-09-16" },

  // --- Pertanian ---
  { id: "p17", slug: "bibit-cabe-rawit", judul: "Bibit Cabai Rawit", foto: "🌶️", harga: 8000, stok: 200, terjual: 410, rating: 4.8, kategoriSlug: "pertanian", kategori: "Pertanian", tokoId: "t5", tokoNama: "Toko Barokah", tokoKota: "Maros", tokoSlug: "barokah", satuan: "pak", deskripsi: "Bibit cabai rawit unggul, cepat berbuah.", isUnggulan: true, createdAt: "2026-09-17" },
  { id: "p18", slug: "pupuk-organik-1kg", judul: "Pupuk Organik 1kg", foto: "🌱", harga: 12000, stok: 140, terjual: 220, rating: 4.7, kategoriSlug: "pertanian", kategori: "Pertanian", tokoId: "t5", tokoNama: "Toko Barokah", tokoKota: "Maros", tokoSlug: "barokah", satuan: "bungkus", deskripsi: "Pupuk organik padat, suburkan tanaman.", createdAt: "2026-09-18" },

  // --- Perlengkapan Dapur ---
  { id: "p19", slug: "wajan-anti-lengket-26cm", judul: "Wajan Anti Lengket 26cm", foto: "🍳", harga: 85000, hargaCoret: 99000, stok: 35, terjual: 76, rating: 4.7, kategoriSlug: "perlengkapan-dapur", kategori: "Perlengkapan Dapur", tokoId: "t4", tokoNama: "Prima Fresh Mart", tokoKota: "Makassar", tokoSlug: "prima-fresh-mart", satuan: "buah", deskripsi: "Wajan anti lengket 26cm, mudah dibersihkan.", isUnggulan: true, createdAt: "2026-09-19" },
  { id: "p20", slug: "pisau-dapur-stainless", judul: "Pisau Dapur Stainless", foto: "🔪", harga: 45000, stok: 50, terjual: 98, rating: 4.6, kategoriSlug: "perlengkapan-dapur", kategori: "Perlengkapan Dapur", tokoId: "t5", tokoNama: "Toko Barokah", tokoKota: "Maros", tokoSlug: "barokah", satuan: "buah", deskripsi: "Pisau dapur stainless tajam & awet.", createdAt: "2026-09-20" },
  { id: "p21", slug: "saringan-minyak", judul: "Saringan Minyak Kawat", foto: "🥄", harga: 15000, stok: 90, terjual: 130, rating: 4.5, kategoriSlug: "perlengkapan-dapur", kategori: "Perlengkapan Dapur", tokoId: "t2", tokoNama: "Berkah Abadi Mart", tokoKota: "Makassar", tokoSlug: "berkah-abadi-mart", satuan: "buah", deskripsi: "Saringan minyak kawat halus, kokoh.", createdAt: "2026-09-21" },
  { id: "p22", slug: "talenan-kayu", judul: "Talenan Kayu", foto: "🪵", harga: 25000, stok: 65, terjual: 85, rating: 4.6, kategoriSlug: "perlengkapan-dapur", kategori: "Perlengkapan Dapur", tokoId: "t1", tokoNama: "Toko Sumber Rejeki", tokoKota: "Makassar", tokoSlug: "sumber-rejeki", satuan: "buah", deskripsi: "Talenan kayu alami, aman untuk makanan.", createdAt: "2026-09-22" },
];

// ===== Helper lookup =====
export function getKategoriBySlug(slug: string): MPKategori | undefined {
  return mpKategoriList.find((k) => k.slug === slug);
}

export function getTokoBySlug(slug: string): MPToko | undefined {
  return mpTokoList.find((t) => t.slug === slug);
}

export function mpProdukSlugs(): string[] {
  return mpProdukList.map((p) => p.slug);
}

export function getProdukBySlug(slug: string): MPProduk | undefined {
  return mpProdukList.find((p) => p.slug === slug);
}

export function getProdukById(id: string): MPProduk | undefined {
  return mpProdukList.find((p) => p.id === id);
}

export function getProdukByKategori(kategoriSlug: string): MPProduk[] {
  return mpProdukList.filter((p) => p.kategoriSlug === kategoriSlug);
}

export function getProdukByToko(tokoSlug: string): MPProduk[] {
  return mpProdukList.filter((p) => p.tokoSlug === tokoSlug);
}

export function getProdukUnggulan(): MPProduk[] {
  return mpProdukList.filter((p) => p.isUnggulan);
}

export function cariProduk(q: string): MPProduk[] {
  const query = q.toLowerCase().trim();
  if (!query) return mpProdukList;
  return mpProdukList.filter(
    (p) =>
      p.judul.toLowerCase().includes(query) ||
      p.kategori.toLowerCase().includes(query) ||
      p.tokoNama.toLowerCase().includes(query) ||
      p.deskripsi?.toLowerCase().includes(query)
  );
}

export const mpAlamatDummy: MPAlamat[] = [
  { id: "a1", label: "Rumah", nama: "Fajar Pratama", telepon: "081234567890", provinsi: "Sulawesi Selatan", kabupatenKota: "Kota Makassar", kecamatan: "Panakkukang", alamatLengkap: "Jl. Pengayoman No. 12, Perumnas Antang", kodePos: "90222", utama: true },
  { id: "a2", label: "Kantor", nama: "Fajar Pratama", telepon: "081234567890", provinsi: "Sulawesi Selatan", kabupatenKota: "Kota Makassar", kecamatan: "Tamalanrea", alamatLengkap: "Jl. Perintis Kemerdekaan KM 10", kodePos: "90245", utama: false },
];