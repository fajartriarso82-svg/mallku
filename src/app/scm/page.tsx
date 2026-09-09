import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SCMLoginPage from "./login/page";

// Halaman /scm bersifat role-aware:
// - Sudah login  → langsung arahkan ke dashboard sesuai role (tanpa render ulang form login).
// - Belum login  → tampilkan halaman login.
export default async function ScmLandingPage() {
  const session = await auth();
  const user = session?.user as { role?: string; statusAkun?: string } | undefined;

  if (session && user?.role) {
    const status = user.statusAkun;
    const dashboardByRole: Record<string, string> = {
      ADMIN: "/scm/admin",
      DISTRIBUTOR: status === "AKTIF" ? "/scm/distributor" : "/scm/distributor/pengaturan",
      TOKO: status === "AKTIF" ? "/scm/seller" : "/scm/seller/pengaturan",
    };
    redirect(dashboardByRole[user.role] ?? "/scm");
  }

  return <SCMLoginPage />;
}