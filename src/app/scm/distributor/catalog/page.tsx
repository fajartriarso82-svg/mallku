import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";

export const metadata = { title: "Katalog Produk SCM" };

export default async function DistributorCatalogPage() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "DISTRIBUTOR") redirect("/login");

  const distributor = await prisma.distributorProfile.findUnique({
    where: { userId: session.user!.id! },
  });
  if (!distributor) redirect("/login");

  const produk = await prisma.produkMasterSCM.findMany({
    where: { distributorId: distributor.id },
    include: {
      kategoriProduk: { include: { kategoriMaster: true } },
      hargaTier: { orderBy: { minQty: "asc" } },
      stokGudang: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell role="DISTRIBUTOR" userName={session.user?.name ?? ""} userEmail={session.user?.email ?? ""}>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Katalog Produk Grosir</h1>
            <p className="text-gray-500 text-sm">{produk.length} produk terdaftar</p>
          </div>
          <Link href="/scm/distributor/catalog/tambah"
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #10245a, #1a3a8a)" }}>
            + Tambah Produk
          </Link>
        </div>

        {produk.length === 0 ? (
          <div className="mk-card p-16 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum ada produk</h3>
            <p className="text-gray-500 text-sm mb-6">Mulai dengan menambahkan produk grosir pertama Anda</p>
            <Link href="/scm/distributor/catalog/tambah"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white text-sm"
              style={{ background: "linear-gradient(135deg, #009ee2, #0077b3)" }}>
              Tambah Produk Pertama
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produk.map((p, i) => (
              <div key={p.id} className="mk-card mk-card-hover p-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.04}s` }}>
                {/* Foto placeholder */}
                <div className="w-full h-36 rounded-lg mb-3 flex items-center justify-center text-4xl"
                  style={{ background: "#f0f4f8" }}>
                  {p.fotoUrls.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.fotoUrls[0]} alt={p.nama} className="w-full h-full object-cover rounded-lg" />
                  ) : "📦"}
                </div>

                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">{p.nama}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${p.aktif ? "status-aktif" : "status-nonaktif"}`}>
                      {p.aktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">
                    {p.kategoriProduk.kategoriMaster.nama} › {p.kategoriProduk.nama}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <div className="text-xs text-gray-400">Harga mulai</div>
                      <div className="font-bold text-sm" style={{ color: "#10245a" }}>
                        {p.hargaTier.length > 0
                          ? formatRupiah(Number(p.hargaTier[0].harga)) + `/${p.satuan}`
                          : "Belum diset"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Stok gudang</div>
                      <div className="font-bold text-sm text-gray-700">
                        {p.stokGudang?.stokAktual ?? 0} {p.satuan}
                      </div>
                    </div>
                  </div>

                  {/* Tier harga preview */}
                  {p.hargaTier.length > 1 && (
                    <div className="mt-2 p-2 rounded-lg text-xs" style={{ background: "#f0f4f8" }}>
                      <span className="font-medium text-gray-600">Tier harga: </span>
                      {p.hargaTier.map((t, ti) => (
                        <span key={ti} className="text-gray-500">
                          {ti > 0 && " | "}≥{t.minQty} {formatRupiah(Number(t.harga))}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Link href={`/scm/distributor/catalog/${p.id}/edit`}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium text-center transition hover:opacity-80"
                      style={{ background: "#e0f5fe", color: "#0077b3" }}>
                      Edit
                    </Link>
                    <Link href={`/scm/distributor/catalog/${p.id}/stok`}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium text-center transition hover:opacity-80"
                      style={{ background: "#dcfce7", color: "#065f46" }}>
                      Update Stok
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}