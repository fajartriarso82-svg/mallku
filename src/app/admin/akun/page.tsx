import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { prisma } from "@/lib/db";
import Link from "next/link";

export const metadata = { title: "Kelola Akun" };

export default async function AdminAkunPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") redirect("/login");

  const { status } = await searchParams;
  const filterStatus = (status as any) || "MENUNGGU_VERIFIKASI";

  const users = await prisma.user.findMany({
    where: {
      statusAkun: filterStatus,
      role: { in: ["DISTRIBUTOR", "TOKO"] },
    },
    include: { distributorProfile: true, tokoProfile: true },
    orderBy: { createdAt: "asc" },
  });

  const statusTabs = [
    { val: "MENUNGGU_VERIFIKASI", label: "Menunggu", color: "#f59e0b" },
    { val: "AKTIF", label: "Aktif", color: "#009a49" },
    { val: "DITOLAK", label: "Ditolak", color: "#ef4444" },
    { val: "NONAKTIF", label: "Nonaktif", color: "#6b7280" },
  ];

  return (
    <AppShell role="ADMIN" userName={session.user?.name ?? ""} userEmail={session.user?.email ?? ""}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Akun Mitra</h1>
          <p className="text-gray-500 text-sm">Verifikasi distributor dan toko baru</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {statusTabs.map((tab) => (
            <Link key={tab.val} href={`/admin/akun?status=${tab.val}`}
              className="px-4 py-2 rounded-lg text-sm font-medium transition"
              style={{
                background: filterStatus === tab.val ? tab.color : "#f0f4f8",
                color: filterStatus === tab.val ? "white" : "#6b7280",
              }}>
              {tab.label}
            </Link>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {users.length === 0 ? (
            <div className="mk-card p-12 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-gray-500">Tidak ada akun dengan status ini</p>
            </div>
          ) : (
            users.map((user) => {
              const profile = user.distributorProfile ?? user.tokoProfile;
                  const namaProfile = user.distributorProfile?.namaUsaha ?? user.tokoProfile?.namaToko ?? user.name ?? "";
              return (
                <div key={user.id} className="mk-card p-5 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
                        style={{ background: user.role === "DISTRIBUTOR" ? "#009ee2" : "#009a49" }}>
                        {((profile as any)?.namaUsaha ?? (profile as any)?.namaToko ?? "?")?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{((profile as any)?.namaUsaha ?? (profile as any)?.namaToko ?? user.name)}</div>
                        <div className="text-xs text-gray-500">{user.email} · {user.role}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 ml-13">
                      {profile && (
                        <>
                          <p>📍 {profile.kecamatan}, {profile.kabupatenKota}, {profile.provinsi}</p>
                          {profile.kodePos && <p>Kode Pos: {profile.kodePos}</p>}
                        </>
                      )}
                      <p className="text-xs text-gray-400">Daftar: {new Date(user.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
                    </div>
                  </div>
                  {filterStatus === "MENUNGGU_VERIFIKASI" && (
                    <div className="flex gap-2 flex-shrink-0">
                      <form action={`/api/admin/akun/${user.id}/approve`} method="POST">
                        <button type="submit"
                          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
                          style={{ background: "#009a49" }}>
                          ✓ Approve
                        </button>
                      </form>
                      <form action={`/api/admin/akun/${user.id}/reject`} method="POST">
                        <button type="submit"
                          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
                          style={{ background: "#ef4444" }}>
                          ✗ Tolak
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}