"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import {
  LayoutDashboard,
  Users,
  FolderTree,
  CreditCard,
  Package,
  ShoppingBag,
  Store,
  Boxes,
  ClipboardList,
  ArrowDownLeft,
  UploadCloud,
  LogOut,
  Menu,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface AppShellProps {
  children: React.ReactNode;
  role: "ADMIN" | "DISTRIBUTOR" | "TOKO" | "BUYER";
  userName?: string;
  userEmail?: string;
}

const navByRole: Record<string, NavItem[]> = {
  ADMIN: [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/akun", label: "Kelola Akun", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/kategori", label: "Master Kategori", icon: <FolderTree className="w-5 h-5" /> },
    { href: "/admin/transaksi", label: "Transaksi", icon: <CreditCard className="w-5 h-5" /> },
  ],
  DISTRIBUTOR: [
    { href: "/scm/distributor", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/scm/distributor/catalog", label: "Katalog Produk SCM", icon: <Package className="w-5 h-5" /> },
    { href: "/scm/distributor/orders", label: "PO Masuk", icon: <ShoppingBag className="w-5 h-5" /> },
    { href: "/scm/distributor/mitra", label: "Mitra Toko", icon: <Store className="w-5 h-5" /> },
  ],
  TOKO: [
    { href: "/seller", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/scm/toko/catalog", label: "Belanja Grosir (SCM)", icon: <Boxes className="w-5 h-5" /> },
    { href: "/scm/toko/orders", label: "Purchase Order (PO)", icon: <ClipboardList className="w-5 h-5" /> },
    { href: "/scm/toko/stok", label: "Stok Diterima", icon: <ArrowDownLeft className="w-5 h-5" /> },
    { href: "/seller/stok", label: "Alokasi Stok ke MP", icon: <UploadCloud className="w-5 h-5" /> },
    { href: "/seller/listings", label: "Listing Produk MP", icon: <Store className="w-5 h-5" /> },
    { href: "/seller/orders", label: "Pesanan MP", icon: <ShoppingBag className="w-5 h-5" /> },
  ],
  BUYER: [
    { href: "/mp", label: "Marketplace", icon: <ShoppingBag className="w-5 h-5" /> },
    { href: "/mp/orders", label: "Pesanan Saya", icon: <ClipboardList className="w-5 h-5" /> },
    { href: "/mp/akun", label: "Akun Saya", icon: <Users className="w-5 h-5" /> },
  ],
};

export default function AppShell({ children, role, userName, userEmail }: AppShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = navByRole[role] || [];

  const roleTheme: Record<string, { bg: string; badge: string; title: string }> = {
    ADMIN: { bg: "bg-[#0f172a]", badge: "bg-slate-700 text-slate-200", title: "Administrator" },
    DISTRIBUTOR: { bg: "bg-[#247094]", badge: "bg-sky-800 text-sky-100", title: "Distributor" },
    TOKO: { bg: "bg-[#B61F18]", badge: "bg-red-800 text-red-100", title: "Mitra Usaha (Toko)" },
    BUYER: { bg: "bg-[#10245a]", badge: "bg-blue-800 text-blue-100", title: "Pembeli" },
  };

  const theme = roleTheme[role] || roleTheme.ADMIN;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-30 h-full w-64 flex flex-col transition-transform duration-300 ${theme.bg} text-white shadow-xl`}
      >
        {/* Header with Logo */}
        <div className="flex flex-col items-center justify-center px-4 py-4 border-b border-white/10 bg-white/5">
          <div className="bg-white rounded-lg p-2 shadow-sm w-full flex items-center justify-center">
            <Logo size="md" />
          </div>
          <div className="mt-2 text-xs font-medium text-white/80 flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${theme.badge}`}>
              {theme.title}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {role === "TOKO" && (
            <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-white/50">
              Navigasi SCM & Marketplace
            </div>
          )}
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/seller" && item.href !== "/admin" && item.href !== "/scm/distributor" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/20 text-white font-bold shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* User profile & Logout */}
        <div className="p-3 border-t border-white/10 bg-black/10">
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-white text-slate-800 font-bold flex items-center justify-center text-sm shadow">
              {userName?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName || "User"}</p>
              <p className="text-[10px] text-white/70 truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={() => {
              // Jika peran SCM (DISTRIBUTOR, TOKO, ADMIN), logout kembali ke /scm
              const targetUrl = role === "BUYER" ? "/mp" : "/scm";
              signOut({ callbackUrl: targetUrl });
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-red-600/80 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-base font-bold text-slate-800 hidden sm:block">
              {theme.title} Portal SCM
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {role === "TOKO" && (
              <Link
                href="/mp"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Lihat Storefront MP</span>
              </Link>
            )}
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-400">Selamat datang,</span>
              <p className="text-xs font-bold text-slate-700">{userName || "Pengguna"}</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}