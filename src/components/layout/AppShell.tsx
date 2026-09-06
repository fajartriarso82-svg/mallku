"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
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
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
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
  BUYER: [
    { href: "/mp", label: "Marketplace", icon: <ShoppingBag className="w-5 h-5" /> },
    { href: "/mp/orders", label: "Pesanan Saya", icon: <ClipboardList className="w-5 h-5" /> },
    { href: "/mp/akun", label: "Akun Saya", icon: <Users className="w-5 h-5" /> },
  ],
};

export default function AppShell({ children, role, userName, userEmail }: AppShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navItems = navByRole[role] || [];

  const roleTheme: Record<string, { bg: string; badge: string; title: string }> = {
    ADMIN: { bg: "bg-[#0f172a]", badge: "bg-slate-700 text-slate-200", title: "Administrator" },
    DISTRIBUTOR: { bg: "bg-[#247094]", badge: "bg-sky-800 text-sky-100", title: "Distributor" },
    TOKO: { bg: "bg-[#B61F18]", badge: "bg-red-800 text-red-100", title: "Mitra Usaha (Toko)" },
    BUYER: { bg: "bg-[#10245a]", badge: "bg-blue-800 text-blue-100", title: "Pembeli" },
  };

  const theme = roleTheme[role] || roleTheme.ADMIN;

  // `collapsed` hanya memengaruhi sidebar di layar md+ (desktop).
  // Di layar kecil sidebar adalah drawer penuh (lebar w-64, label selalu tampil).
  const isCollapsed = collapsed;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-30 h-full w-64 ${
          isCollapsed ? "md:w-24" : "md:w-64"
        } flex flex-col transition-all duration-300 ${theme.bg} text-white shadow-xl`}
      >
        {/* Header with Logo */}
        <div
          className={`flex flex-col ${
            isCollapsed ? "md:justify-center" : ""
          } items-center justify-center px-4 py-4 border-b border-white/10 bg-white/5`}
        >
          {/* Saat expanded / mobile: logo lebar Logo2 only2.png */}
          <div
            className={`bg-white rounded-lg p-2 shadow-sm w-full flex items-center justify-center ${
              isCollapsed ? "md:hidden" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo2 only2.png"
              alt="Mall ku SCM"
              className="h-8 w-auto max-h-8 object-contain block"
            />
          </div>

          {/* Saat collapsed (desktop): ikon mallku Logo2 only1.png */}
          {isCollapsed && (
            <div className="hidden md:flex bg-white rounded-lg p-2 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo2 only1.png"
                alt="Mall ku"
                title="Perluas menu"
                className="w-10 h-10 object-contain block cursor-pointer"
                onClick={() => setCollapsed(false)}
              />
            </div>
          )}

          <div
            className={`mt-2 text-xs font-medium text-white/80 flex items-center gap-1.5 ${
              isCollapsed ? "md:hidden" : ""
            }`}
          >
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${theme.badge}`}>
              {theme.title}
            </span>
          </div>
        </div>

        {/* Tombol collapse untuk desktop */}
        <div className="hidden md:flex justify-end px-3 pt-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
            title={collapsed ? "Perluas menu" : "Ciutkan menu"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {role === "TOKO" && (
            <div
              className={`px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-white/50 ${
                isCollapsed ? "md:hidden" : ""
              }`}
            >
              Navigasi SCM & Marketplace
            </div>
          )}
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/seller" && item.href !== "/admin" && item.href !== "/scm/distributor" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isCollapsed ? "md:justify-center md:px-2" : "justify-between"
                } ${
                  isActive
                    ? "bg-white/20 text-white font-bold shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className={isCollapsed ? "md:hidden" : ""}>{item.label}</span>
                </div>
                {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* User profile & Logout */}
        <div className="p-3 border-t border-white/10 bg-black/10">
          <div
            className={`flex items-center gap-3 px-2 py-2 mb-2 rounded-lg bg-white/5 ${
              isCollapsed ? "md:justify-center md:px-1" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white text-slate-800 font-bold flex items-center justify-center text-sm shadow shrink-0">
              {userName?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className={`flex-1 min-w-0 ${isCollapsed ? "md:hidden" : ""}`}>
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
            title="Keluar Akun"
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-red-600/80 transition-colors ${
              isCollapsed ? "md:px-1" : ""
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className={isCollapsed ? "md:hidden" : ""}>Keluar Akun</span>
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
            {/* Tombol hamburger: di mobile buka drawer, di desktop toggle collapse */}
            <button
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => {
                if (window.matchMedia("(min-width: 768px)").matches) {
                  setCollapsed(!collapsed);
                } else {
                  setSidebarOpen(true);
                }
              }}
              aria-label="Menu"
            >
              {/* Ikon Menu untuk mobile & saat sidebar expanded di desktop */}
              <Menu className="w-6 h-6 md:hidden" />
              {/* Ikon panel untuk desktop sesuai kondisi collapse */}
              {collapsed ? (
                <PanelLeftOpen className="w-6 h-6 hidden md:block" />
              ) : (
                <PanelLeftClose className="w-6 h-6 hidden md:block" />
              )}
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