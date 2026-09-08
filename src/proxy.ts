import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Rute publik MP (storefront) — tanpa login
const mpPublicRoutes = ["/", "/produk", "/kategori", "/toko", "/cari", "/keranjang", "/checkout", "/login", "/register"];
// Rute publik SCM
const scmPublicRoutes = ["/scm", "/scm/login", "/scm/register", "/scm/forgot-password"];
// Halaman auth entry MP (jika sudah login, redirect ke dashboard)
const mpAuthRoutes = ["/login", "/register"];
const scmAuthRoutes = ["/scm/login", "/scm/register", "/scm/forgot-password"];
// Area akun buyer
const mpAccountRoutes = ["/akun", "/pesanan"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as { role?: string } | undefined)?.role;
  const accountStatus = (req.auth?.user as { statusAkun?: string } | undefined)?.statusAkun;

  const path = nextUrl.pathname;
  const isMpPublic = mpPublicRoutes.some((r) => path === r || path.startsWith(r + "/"));
  const isScmPublic = scmPublicRoutes.some((r) => path === r);
  const isMpAuth = mpAuthRoutes.includes(path);
  const isScmAuth = scmAuthRoutes.includes(path);
  const isScmArea = path.startsWith("/scm");
  const isMpAccount = mpAccountRoutes.some((r) => path === r || path.startsWith(r + "/"));

  // ===== Area SCM =====
  if (isScmArea) {
    // Sudah login & akses halaman auth SCM → ke dashboard sesuai role
    if (isLoggedIn && isScmAuth) {
      return NextResponse.redirect(new URL(getScmDashboardUrl(userRole ?? ""), nextUrl));
    }
    // Belum login & bukan halaman publik SCM → ke /scm
    if (!isLoggedIn && !isScmPublic) {
      return NextResponse.redirect(new URL("/scm", nextUrl));
    }
    if (isLoggedIn) {
      const scmRoles = ["DISTRIBUTOR", "TOKO", "ADMIN"];
      if (!isScmPublic && !scmRoles.includes(userRole ?? "")) {
        return NextResponse.redirect(new URL("/scm", nextUrl));
      }
      // Akun non-aktif: hanya boleh akses halaman pengaturan
      if (
        scmRoles.includes(userRole ?? "") &&
        accountStatus !== "AKTIF" &&
        !isScmAuth &&
        !nextUrl.pathname.startsWith(userRole === "TOKO" ? "/scm/seller/pengaturan" : "/scm/distributor/pengaturan")
      ) {
        return NextResponse.redirect(
          new URL(userRole === "TOKO" ? "/scm/seller/pengaturan" : "/scm/distributor/pengaturan", nextUrl)
        );
      }
    }
    return NextResponse.next();
  }

  // ===== Area MP =====
  // Halaman auth buyer (login/register): jika sudah login, arahkan sesuai role
  if (isMpAuth) {
    if (isLoggedIn) {
      const dest = userRole === "BUYER" ? "/akun" : getScmDashboardUrl(userRole ?? "");
      return NextResponse.redirect(new URL(dest, nextUrl));
    }
    return NextResponse.next();
  }

  // Area akun buyer (akun, pesanan).
  // Catatan: saat ini autentikasi BUYER masih dummy, jadi halaman ini diizinkan
  // terbuka untuk pratinjau. Saat integrasi NextAuth BUYER, aktifkan guard di bawah.
  if (isMpAccount) {
    // if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    // if (userRole !== "BUYER") return NextResponse.redirect(new URL("/scm", nextUrl));
    return NextResponse.next();
  }

  // Rute MP publik (storefront) selalu bisa diakses
  if (isMpPublic || !isLoggedIn) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

function getScmDashboardUrl(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/scm/admin";
    case "DISTRIBUTOR":
      return "/scm/distributor";
    case "TOKO":
      return "/scm/seller";
    case "BUYER":
      return "/akun";
    default:
      return "/scm";
  }
}

export const config = {
  // File statis & aset gambar (termasuk logo di /public) dikecualikan agar
  // tidak diintersep proxy auth. Penamaan logo mengandung spasi, sehingga
  // pengecualian dilakukan lewat ekstensi file (robust & berlaku untuk semua aset).
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp|gif|avif|ico|txt|pdf|woff2?)$).*)",
  ],
};