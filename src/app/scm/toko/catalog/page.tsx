import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";

export const metadata = { title: "Katalog Grosir" };

export default async function TokoCatalogSCMPage({
  searchParams,
}: {
  searchParams: Promise<{ distributor?: string; kategori?: string; q?: string }>;
}) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "TOKO") redirect("/login");

  const { distributor: distributorFilter, kategori, q } = await searchParams;
  const userId = session.user!.id!;

  const toko = await prisma.tokoProfile.findUnique({ where: { userId } });
  if (!toko) redirect("/login");

  // Distributor yang sudah jadi mitra Toko ini
  const mitraRelasi = await prisma.mitraRelasi.findMany({
    where: { tokoId: toko.id, status: "AKTIF" },
    include: { distributor: true },
  });

  const distributorIds = mitraRelasi.map((m) => m.distributorId);

  const produk = await prisma.produkMasterSCM.findMany({
    where: {
      aktif: true,
      distributorId: distributorFilter ? distributorFilter : { in: distributorIds.length > 0 ? distributorIds : ["no-mitra"] },
      ...(kategori && { kategoriProduk: { slug: kategori } }),
      ...(q && {
        OR: [
          { nama: { contains: q, mode: "insensitive" } },
          { deskripsi: { contains: q, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      distributor: true,
      kategoriProduk: { include: { kategoriMaster: true } },
      hargaTier: { orderBy: { minQty: "asc" } },
      stokGudang: true,
    },
    orderBy: { nama: "asc" },
  });

  return (
    <AppShell role="TOKO" userName={session.user?.name ?? ""} userEmail={session.user?.email ?? ""}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Katalog Grosir</h1>
          <p className="text-gray-500 text-sm">Belanja stok dari distributor mitra Anda</p>
        </div>

        {mitraRelasi.length === 0 ? (
          <div className="mk-card p-12 text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum ada distributor mitra</h3>
            <p className="text-gray-500 text-sm">
              Ajukan koneksi ke distributor atau tunggu distributor mengundang Anda sebagai mitra.
            </p>
          </div>
        ) : (
          <>
            {/* Filter distributor */}
            <div className="flex gap-2 flex-wrap">
              <a href="/scm/toko/catalog"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${!distributorFilter ? "text-white" : "text-gray-500 bg-white border border-gray-200"}`}
                style={!distributorFilter ? { background: "#10245a" } : {}}>
                Semua Distributor
              </a>
              {mitraRelasi.map((m) => (
                <a key={m.distributorId}
                  href={`/scm/toko/catalog?distributor=${m.distributorId}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${distributorFilter === m.distributorId ? "text-white" : "text-gray-500 bg-white border border-gray-200"}`}
                  style={distributorFilter === m.distributorId ? { background: "#009ee2" } : {}}>
                  {m.distributor.namaUsaha}
                </a>
              ))}
            </div>

            {produk.length === 0 ? (
              <div className="mk-card p-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500">Tidak ada produk ditemukan</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {produk.map((p, i) => (
                  <div key={p.id} className="mk-card p-4 animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.04}s` }}>
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl"
                        style={{ background: "#f0f4f8" }}>
                        {p.fotoUrls.length > 0 ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.fotoUrls[0]} alt={p.nama} className="w-full h-full object-cover rounded-lg" />
                        ) : "📦"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm">{p.nama}</h3>
                        <p className="text-xs text-gray-400 truncate">{p.distributor.namaUsaha}</p>
                        <p className="text-xs text-gray-400">{p.kategoriProduk.nama}</p>
                      </div>
                    </div>

                    {/* Harga tier */}
                    <div className="mt-3 space-y-1">
                      {p.hargaTier.map((tier, ti) => (
                        <div key={ti} className="flex justify-between text-xs">
                          <span className="text-gray-500">≥ {tier.minQty} {p.satuan}</span>
                          <span className="font-semibold" style={{ color: "#10245a" }}>
                            {formatRupiah(Number(tier.harga))}/{p.satuan}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Stok: {p.stokGudang?.stokAktual ?? 0} {p.satuan}
                      </span>
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition"
                        style={{ background: "linear-gradient(135deg, #009ee2, #0077b3)" }}>
                        + Tambah ke Keranjang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}