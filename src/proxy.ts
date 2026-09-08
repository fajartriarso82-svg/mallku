import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Routes yang tidak perlu auth (semua berada di bawah /scm)
const publicRoutes = ["/", "/scm", "/scm/login", "/scm/register", "/scm/forgot-password"];
const authRoutes = ["/scm/login", "/scm/register", "/scm/forgot-password"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as { role?: string } | undefined)?.role;
  const accountStatus = (req.auth?.user as { statusAkun?: string } | undefined)?.statusAkun;

  const isPublicRoute = publicRoutes.some(
    (route) => nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Root / selalu diarahkan ke halaman masuk SCM / landing
  if (nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/scm", nextUrl));
  }

  // Sudah login tapi akses halaman auth → redirect ke dashboard masing-masing role
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole ?? ""), nextUrl));
  }

  // Belum login dan bukan public route → arahkan ke /scm (halaman masuk)
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/scm", nextUrl));
  }

  // Role-based access control di dalam /scm
  if (isLoggedIn && nextUrl.pathname.startsWith("/scm")) {
    const scmRoles = ["DISTRIBUTOR", "TOKO", "ADMIN"];

    // Hanya role SCM yang boleh masuk area /scm (di luar halaman publik)
    if (
      !isPublicRoute &&
      !scmRoles.includes(userRole ?? "")
    ) {
      return NextResponse.redirect(new URL("/scm", nextUrl));
    }

    // Akun non-aktif: hanya boleh akses halaman pengaturan untuk melengkapi data
    if (
      scmRoles.includes(userRole ?? "") &&
      accountStatus !== "AKTIF" &&
      !nextUrl.pathname.startsWith("/scm/login") &&
      !nextUrl.pathname.startsWith("/scm/register") &&
      !nextUrl.pathname.startsWith("/scm/forgot-password") &&
      !nextUrl.pathname.startsWith(userRole === "TOKO" ? "/scm/seller/pengaturan" : "/scm/distributor/pengaturan")
    ) {
      return NextResponse.redirect(
        new URL(userRole === "TOKO" ? "/scm/seller/pengaturan" : "/scm/distributor/pengaturan", nextUrl)
      );
    }
  }

  return NextResponse.next();
});

function getDashboardUrl(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/scm/admin";
    case "DISTRIBUTOR":
      return "/scm/distributor";
    case "TOKO":
      return "/scm/seller";
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