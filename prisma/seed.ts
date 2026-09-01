import { PrismaClient, UserRole, StatusAkun, StatusOrderSCM } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ============================================================
  // ADMIN
  // ============================================================
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mallku.id" },
    update: {},
    create: {
      email: "admin@mallku.id",
      name: "Admin Mall ku",
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      statusAkun: StatusAkun.AKTIF,
    },
  });
  console.log("Admin created:", admin.email);

  // ============================================================
  // KATEGORI MASTER
  // ============================================================
  const kategoriData = [
    { nama: "Pertanian & Pangan", slug: "pertanian-pangan", icon: "🌾", urutan: 1 },
    { nama: "Sembako & Kebutuhan Harian", slug: "sembako-harian", icon: "🛒", urutan: 2 },
    { nama: "Peternakan & Perikanan", slug: "peternakan-perikanan", icon: "🐄", urutan: 3 },
    { nama: "Perkebunan", slug: "perkebunan", icon: "🌿", urutan: 4 },
    { nama: "Industri & Manufaktur", slug: "industri-manufaktur", icon: "🏭", urutan: 5 },
    { nama: "Konstruksi & Material Bangunan", slug: "konstruksi-material", icon: "🏗️", urutan: 6 },
    { nama: "Farmasi & Kesehatan", slug: "farmasi-kesehatan", icon: "💊", urutan: 7 },
    { nama: "Elektronik & Teknologi", slug: "elektronik-teknologi", icon: "💻", urutan: 8 },
    { nama: "Fashion & Tekstil", slug: "fashion-tekstil", icon: "👗", urutan: 9 },
    { nama: "Kuliner & FnB", slug: "kuliner-fnb", icon: "🍽️", urutan: 10 },
    { nama: "Alat Tulis & Kantor", slug: "alat-tulis-kantor", icon: "📎", urutan: 11 },
    { nama: "Otomotif & Spare Part", slug: "otomotif-spare-part", icon: "🚗", urutan: 12 },
    { nama: "Kosmetik & Perawatan Diri", slug: "kosmetik-perawatan", icon: "💄", urutan: 13 },
    { nama: "Olahraga & Outdoor", slug: "olahraga-outdoor", icon: "⚽", urutan: 14 },
    { nama: "Lainnya", slug: "lainnya", icon: "📦", urutan: 99 },
  ];

  for (const k of kategoriData) {
    await prisma.kategoriMaster.upsert({
      where: { slug: k.slug },
      update: {},
      create: k,
    });
  }
  console.log(`${kategoriData.length} Kategori Master created`);

  // Sub Kategori untuk Pertanian & Pangan
  const pertanian = await prisma.kategoriMaster.findUnique({
    where: { slug: "pertanian-pangan" },
  });
  const sembako = await prisma.kategoriMaster.findUnique({
    where: { slug: "sembako-harian" },
  });

  const subKategoriData = [
    // Pertanian
    { kategoriMasterId: pertanian!.id, nama: "Beras & Serealia", slug: "beras-serealia", urutan: 1 },
    { kategoriMasterId: pertanian!.id, nama: "Sayuran Segar", slug: "sayuran-segar", urutan: 2 },
    { kategoriMasterId: pertanian!.id, nama: "Buah Segar", slug: "buah-segar", urutan: 3 },
    { kategoriMasterId: pertanian!.id, nama: "Rempah & Bumbu", slug: "rempah-bumbu", urutan: 4 },
    { kategoriMasterId: pertanian!.id, nama: "Kacang-kacangan", slug: "kacang-kacangan", urutan: 5 },
    // Sembako
    { kategoriMasterId: sembako!.id, nama: "Minyak Goreng", slug: "minyak-goreng", urutan: 1 },
    { kategoriMasterId: sembako!.id, nama: "Gula Pasir", slug: "gula-pasir", urutan: 2 },
    { kategoriMasterId: sembako!.id, nama: "Tepung", slug: "tepung", urutan: 3 },
    { kategoriMasterId: sembako!.id, nama: "Mie & Pasta", slug: "mie-pasta", urutan: 4 },
    { kategoriMasterId: sembako!.id, nama: "Minuman & Air Minum", slug: "minuman-air", urutan: 5 },
  ];

  for (const sk of subKategoriData) {
    await prisma.kategoriProduk.upsert({
      where: { slug: sk.slug },
      update: {},
      create: sk,
    });
  }
  console.log(`${subKategoriData.length} Sub Kategori created`);

  // ============================================================
  // DEMO: DISTRIBUTOR
  // ============================================================
  const distPass = await bcrypt.hash("dist123", 12);
  const distUser = await prisma.user.upsert({
    where: { email: "distributor@mallku.id" },
    update: {},
    create: {
      email: "distributor@mallku.id",
      name: "PT Berkah Makassar",
      passwordHash: distPass,
      role: UserRole.DISTRIBUTOR,
      statusAkun: StatusAkun.AKTIF,
      telepon: "081234567890",
    },
  });

  const distProfile = await prisma.distributorProfile.upsert({
    where: { userId: distUser.id },
    update: {},
    create: {
      userId: distUser.id,
      namaUsaha: "PT Berkah Makassar",
      slug: "pt-berkah-makassar",
      deskripsi: "Distributor sembako dan kebutuhan harian terpercaya di Makassar sejak 2005",
      alamatLengkap: "Jl. Penghibur No. 45",
      provinsi: "Sulawesi Selatan",
      kabupatenKota: "Kota Makassar",
      kecamatan: "Ujung Pandang",
      desa: "Losari",
      kodePos: "90111",
    },
  });
  console.log("Distributor created:", distUser.email);

  // ============================================================
  // DEMO: TOKO
  // ============================================================
  const tokoPass = await bcrypt.hash("toko123", 12);
  const tokoUser = await prisma.user.upsert({
    where: { email: "toko@mallku.id" },
    update: {},
    create: {
      email: "toko@mallku.id",
      name: "Toko Berkah Jaya",
      passwordHash: tokoPass,
      role: UserRole.TOKO,
      statusAkun: StatusAkun.AKTIF,
      telepon: "082345678901",
    },
  });

  await prisma.tokoProfile.upsert({
    where: { userId: tokoUser.id },
    update: {},
    create: {
      userId: tokoUser.id,
      namaToko: "Toko Berkah Jaya",
      slug: "toko-berkah-jaya",
      deskripsi: "Toko sembako dan kebutuhan harian di Gowa",
      alamatLengkap: "Jl. Poros Malino No. 12",
      provinsi: "Sulawesi Selatan",
      kabupatenKota: "Kabupaten Gowa",
      kecamatan: "Somba Opu",
      desa: "Bonto-bontoa",
      kodePos: "92111",
      tokoMpAktif: true,
      metodePengirimanDiDukung: ["TOKO_SENDIRI", "BITESHIP"],
    },
  });
  console.log("Toko created:", tokoUser.email);

  // ============================================================
  // DEMO: BUYER
  // ============================================================
  const buyerPass = await bcrypt.hash("buyer123", 12);
  const buyerUser = await prisma.user.upsert({
    where: { email: "buyer@mallku.id" },
    update: {},
    create: {
      email: "buyer@mallku.id",
      name: "Ahmad Pembeli",
      passwordHash: buyerPass,
      role: UserRole.BUYER,
      statusAkun: StatusAkun.AKTIF,
      telepon: "083456789012",
    },
  });

  await prisma.buyerProfile.upsert({
    where: { userId: buyerUser.id },
    update: {},
    create: {
      userId: buyerUser.id,
      nama: "Ahmad Pembeli",
      telepon: "083456789012",
    },
  });

  await prisma.alamat.upsert({
    where: { id: "alamat-buyer-demo-1" },
    update: {},
    create: {
      id: "alamat-buyer-demo-1",
      userId: buyerUser.id,
      label: "Rumah",
      namaPenerima: "Ahmad Pembeli",
      telepon: "083456789012",
      alamatLengkap: "Jl. Veteran Selatan No. 78",
      provinsi: "Sulawesi Selatan",
      kabupatenKota: "Kabupaten Gowa",
      kecamatan: "Somba Opu",
      desa: "Tombolo",
      kodePos: "92112",
      isUtama: true,
    },
  });
  console.log("Buyer created:", buyerUser.email);

  console.log("\n=== Seeding selesai! ===");
  console.log("Akun demo:");
  console.log("  Admin      : admin@mallku.id / admin123");
  console.log("  Distributor: distributor@mallku.id / dist123");
  console.log("  Toko       : toko@mallku.id / toko123");
  console.log("  Buyer      : buyer@mallku.id / buyer123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
