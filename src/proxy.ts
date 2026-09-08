import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Routes yang tidak perlu auth
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/scm",
  "/scm/login",
  "/scm/register",
  "/scm/forgot-password",
  "/mp"
];
const authRoutes = ["/login", "/register", "/scm", "/scm/login", "/scm/register", "/scm/forgot-password"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as { role?: string } | undefined)?.role;
  const accountStatus = (req.auth?.user as { statusAkun?: string } | undefined)?.statusAkun;
  const host = req.headers.get("host") || "";

  // Dukungan multi-domain & subdomain
  // Jika akses dari subdomain scm.mallku.id atau scm.localhost:3003
  const isSCMSubdomain = host.startsWith("scm.") || host.startsWith("scm-");

  // Jika di root subdomain SCM dan belum login, arahkan ke /scm
  if (isSCMSubdomain && nextUrl.pathname === "/" && !isLoggedIn) {
    return NextResponse.rewrite(new URL("/scm", nextUrl));
  }

  const isPublicRoute = publicRoutes.some(
    (route) => nextUrl.pathname === route || nextUrl.pathname.startsWith("/mp/")
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Sudah login tapi akses auth routes → redirect ke dashboard masing-masing role
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole ?? ""), nextUrl));
  }

  // Belum login dan bukan public route
  if (!isLoggedIn && !isPublicRoute) {
    if (isSCMSubdomain || nextUrl.pathname.startsWith("/scm")) {
      return NextResponse.redirect(new URL("/scm", nextUrl));
    }
    return NextResponse.redirect(new URL("/mp/login", nextUrl));
  }

  // Role-based access control
  if (isLoggedIn) {
    // Admin-only routes
    if (nextUrl.pathname.startsWith("/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/403", nextUrl));
    }
    // SCM routes → hanya DISTRIBUTOR, TOKO, ADMIN
    if (
      nextUrl.pathname.startsWith("/scm") &&
      !nextUrl.pathname.startsWith("/scm/login") &&
      !nextUrl.pathname.startsWith("/scm/forgot-password") &&
      nextUrl.pathname !== "/scm" &&
      !["DISTRIBUTOR", "TOKO", "ADMIN"].includes(userRole ?? "")
    ) {
      return NextResponse.redirect(new URL("/403", nextUrl));
    }
    if (
      ["TOKO", "DISTRIBUTOR"].includes(userRole ?? "") &&
      accountStatus !== "AKTIF" &&
      (nextUrl.pathname.startsWith("/scm/") || nextUrl.pathname.startsWith("/seller/")) &&
      !nextUrl.pathname.startsWith("/scm/login") &&
      !nextUrl.pathname.startsWith("/scm/register") &&
      !nextUrl.pathname.startsWith("/scm/forgot-password") &&
      !nextUrl.pathname.startsWith(userRole === "TOKO" ? "/seller/pengaturan" : "/scm/distributor/pengaturan")
    ) {
      return NextResponse.redirect(new URL(userRole === "TOKO" ? "/seller/pengaturan" : "/scm/distributor/pengaturan", nextUrl));
    }
    // Dashboard seller → hanya TOKO
    if (nextUrl.pathname.startsWith("/seller") && !["TOKO", "ADMIN"].includes(userRole ?? "")) {
      return NextResponse.redirect(new URL("/403", nextUrl));
    }
  }

  return NextResponse.next();
});

function getDashboardUrl(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "DISTRIBUTOR":
      return "/scm/distributor";
    case "TOKO":
      return "/scm/seller";
    case "BUYER":
      return "/mp";
    default:
      return "/";
  }
}

export const config = {
  // File statis & aset gambar (termasuk logo di /public) dikecualikan agar
  // tidak diintersep middleware auth. Nama logo mengandung spasi, sehingga
  // pengecualian dilakukan lewat ekstensi file (robust & berlaku untuk semua aset).
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp|gif|avif|ico|txt|pdf|woff2?)$).*)",
  ],
};