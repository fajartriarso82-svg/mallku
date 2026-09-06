"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, Package, Warehouse, Send, Inbox, Search, Store, Building2,
  BadgePercent, Wallet, Landmark, CreditCard, Settings, Bell, ChevronDown, LogOut,
  Menu, PanelLeftClose, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLeaf { href: string; label: string; icon: React.ReactNode; }
interface NavGroup { label: string; icon: React.ReactNode; children: NavLeaf[]; }

const distGroups: NavGroup[] = [
  { label: "Dashboard Overview", icon: <LayoutDashboard className="h-5 w-5" />, children: [{ href: "/scm/distributor", label: "Dashboard Overview", icon: <LayoutDashboard className="h-5 w-5" /> }] },
  { label: "Manajemen Produk", icon: <Package className="h-5 w-5" />, children: [
    { href: "/scm/distributor/produk", label: "Produk Saya", icon: <Package className="h-5 w-5" /> },
    { href: "/scm/distributor/stok", label: "Manajemen Stok", icon: <Warehouse className="h-5 w-5" /> },
  ]},
  { label: "Manajemen PO", icon: <Send className="h-5 w-5" />, children: [
    { href: "/scm/distributor/po-keluar", label: "PO ke Distributor Lain", icon: <Send className="h-5 w-5" /> },
    { href: "/scm/distributor/po-masuk", label: "PO Masuk (dari Toko)", icon: <Inbox className="h-5 w-5" /> },
    { href: "/scm/distributor/cari-produk", label: "Cari Produk di Katalog SCM", icon: <Search className="h-5 w-5" /> },
  ]},
  { label: "Manajemen Jaringan", icon: <Building2 className="h-5 w-5" />, children: [
    { href: "/scm/distributor/mitra", label: "List Mitra (Toko)", icon: <Store className="h-5 w-5" /> },
    { href: "/scm/distributor/partner", label: "List Distributor Partner", icon: <Building2 className="h-5 w-5" /> },
  ]},
  { label: "Kartu Diskon", icon: <BadgePercent className="h-5 w-5" />, children: [{ href: "/scm/distributor/diskon", label: "Kartu Diskon", icon: <BadgePercent className="h-5 w-5" /> }] },
  { label: "Keuangan", icon: <Wallet className="h-5 w-5" />, children: [
    { href: "/scm/distributor/keuangan/iuran", label: "Iuran", icon: <Landmark className="h-5 w-5" /> },
    { href: "/scm/distributor/keuangan/saldo", label: "Saldo", icon: <CreditCard className="h-5 w-5" /> },
  ]},
  { label: "Pengaturan Akun", icon: <Settings className="h-5 w-5" />, children: [{ href: "/scm/distributor/pengaturan", label: "Pengaturan Akun", icon: <Settings className="h-5 w-5" /> }] },
];

export default function DistributorShell({
  children, userName, userEmail, companyName,
}: {
  children: React.ReactNode; userName?: string; userEmail?: string; companyName?: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(
    distGroups.filter((g) => g.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"))).map((g) => g.label)
  );
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const initials = (userName || "D").charAt(0).toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7F8]">
      {/* ===== SIDEBAR ===== */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-[#E9EFF2] text-[#26343F] shadow-2xl transition-all duration-300 md:relative md:translate-x-0",
        mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full",
        collapsed ? "md:w-[84px]" : "md:w-[290px]"
      )}>
        {/* Logo */}
        <div className="relative flex h-16 shrink-0 items-center justify-center border-b border-[#DDE3E7] bg-white px-4">
          {collapsed ? (
            <button onClick={() => setCollapsed(false)} className="mx-auto" title="Perluas menu">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo2 only1.png" alt="Mall ku" className="h-14 w-14 object-contain" />
            </button>
          ) : (
            <Link href="/scm/distributor" className="flex items-center justify-center">
              <span className="shrink-0 rounded-lg bg-white p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Logo2 only2.png" alt="Mall ku SCM" className="h-14 w-auto object-contain" />
              </span>
            </Link>
          )}
          <button onClick={() => setMobileOpen(false)} className="absolute right-4 rounded p-1 text-[#687681] hover:bg-[#F5F7F8] md:hidden" aria-label="Tutup">
            <PanelLeftClose className="h-5 w-5" />
          </button>
        </div>

        {/* ===== NAV ===== */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {distGroups.map((group) => {
            const active = group.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));
            const open = openGroups.includes(group.label);
            // Group tunggal -> link langsung
            if (group.children.length === 1) {
              const t = group.children[0];
              return (
                <Link key={group.label} href={t.href} title={collapsed ? t.label : undefined}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-[13px] font-medium transition",
                    collapsed ? "md:justify-center" : "gap-3",
                    (pathname === t.href || pathname.startsWith(t.href + "/")) ? "bg-[#DCE8F3] font-semibold text-[#173B68]" : "text-[#53616D] hover:bg-white/70 hover:text-[#173B68]"
                  )}>
                  <span className="shrink-0">{group.icon}</span>
                  {!collapsed && <span className="truncate">{t.label}</span>}
                </Link>
              );
            }
            // Group dengan submenu
            return (
              <div key={group.label}>
                <button
                  onClick={() => setOpenGroups((p) => (p.includes(group.label) ? p.filter((x) => x !== group.label) : [...p, group.label]))}
                  title={collapsed ? group.label : undefined}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2.5 text-[13px] font-medium transition",
                    collapsed ? "md:justify-center" : "justify-between gap-3",
                    active ? "bg-[#DCE8F3] text-[#173B68]" : "text-[#53616D] hover:bg-white/70 hover:text-[#173B68]"
                  )}>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0">{group.icon}</span>
                    {!collapsed && <span className="truncate">{group.label}</span>}
                  </span>
                  {!collapsed && <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-180")} />}
                </button>
                {!collapsed && open && (
                  <div className="ml-[22px] mt-0.5 space-y-0.5 border-l border-[#DDE3E7] pl-3">
                    {group.children.map((child) => {
                      const ca = pathname === child.href || pathname.startsWith(child.href + "/");
                      return (
                        <Link key={child.href} href={child.href}
                          className={cn(
                            "flex items-center rounded-md px-2.5 py-2 text-[12.5px] transition",
                            ca ? "bg-[#DCE8F3] font-semibold text-[#173B68]" : "text-[#53616D] hover:bg-white/70 hover:text-[#173B68]"
                          )}>
                          <span className="truncate">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#DDE3E7] p-3">
          <div className={cn("flex items-center rounded-xl bg-[#168BC3] p-2 text-white", collapsed ? "md:justify-center" : "gap-2.5")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">{initials}</div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">{companyName || userName || "Distributor"}</p>
                  <p className="truncate text-[10px] text-white/70">{userEmail}</p>
                </div>
                <Link href="/scm/distributor/pengaturan" className="text-white/75 hover:text-white" title="Pengaturan"><Settings className="h-4 w-4" /></Link>
              </>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* ===== CONTENT ===== */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="z-20 flex h-16 shrink-0 items-center gap-2 border-b border-[#DDE3E7] bg-white px-4 shadow-sm md:gap-4 md:px-6">
          {/* Hamburger */}
          <button
            onClick={() => { if (window.matchMedia("(min-width: 768px)").matches) setCollapsed((c) => !c); else setMobileOpen(true); }}
            className="rounded-lg p-2 text-[#53616D] hover:bg-[#F5F7F8]" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>

          {/* Search global */}
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687681]" />
            <input type="text" placeholder="Cari produk, nomor PO, mitra..."
              className="w-full rounded-xl border border-[#DDE3E7] bg-[#F5F7F8] py-2 pl-9 pr-4 text-sm text-[#26343F] outline-none transition focus:border-[#168BC3] focus:bg-white focus:ring-2 focus:ring-[#168BC3]/10" />
          </div>

          <div className="ml-auto flex items-center gap-1">
            {/* Notif bell */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen((o) => !o)} className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifikasi">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-slate-800">Notifikasi</p>
                    <span className="text-[11px] font-semibold text-sky-600">Tandai dibaca</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { t: "PO Masuk Baru", d: "PO-20260905-118 dari Toko Berkah Abadi", time: "5 mnt", unread: true },
                      { t: "Pembayaran Diterima", d: "PO-20260905-117 dibayar (UD Maju Jaya)", time: "1 jam", unread: true },
                      { t: "Stok Kritis", d: "Tissue Jolly 250s hampir habis", time: "3 jam", unread: true },
                      { t: "Iuran Jatuh Tempo", d: "Iuran September 2026 segera jatuh tempo", time: "Kemarin", unread: false },
                    ].map((n, i) => (
                      <div key={i} className={cn("flex gap-3 border-b border-slate-50 px-4 py-3", n.unread && "bg-sky-50/40")}>
                        <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", n.unread ? "bg-sky-500" : "bg-slate-200")} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-700">{n.t}</p>
                          <p className="truncate text-[11px] text-slate-400">{n.d}</p>
                          <p className="text-[10px] text-slate-300">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar dropdown */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-1.5 rounded-lg p-1.5 hover:bg-slate-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#247094] to-[#10245a] text-xs font-bold text-white">{initials}</span>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="truncate text-sm font-bold text-slate-800">{userName || "Pengguna"}</p>
                    <p className="truncate text-[11px] text-slate-400">{userEmail}</p>
                  </div>
                  <Link href="/scm/distributor/pengaturan" className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50">
                    <User className="h-4 w-4" /> Profil Saya
                  </Link>
                  <Link href="/scm" className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50">
                    <Settings className="h-4 w-4" /> Bantuan &amp; Panduan
                  </Link>
                  <div className="border-t border-slate-100" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/scm" })}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] font-semibold text-rose-600 hover:bg-rose-50">
                    <LogOut className="h-4 w-4" /> Keluar Akun
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
