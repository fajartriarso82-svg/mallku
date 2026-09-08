"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, Boxes, ClipboardList, Network, Wallet, Store, BadgePercent,
  CreditCard, Settings, Bell, ChevronDown, Search, LogOut, Menu, PanelLeftClose,
  User, Inbox, Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ===== Struktur menu dua konteks bisnis Toko =====
interface Leaf { href: string; label: string; icon: React.ReactNode; }
interface Group {
  // konteks bisnis: SCM (beli grosir) / MP (jual eceran)
  context: "ROOT" | "SCM" | "MP";
  title: string;
  icon: React.ReactNode;
  children: Leaf[];
}

const tokoNav: Group[] = [
  {
    context: "ROOT",
    title: "Dashboard Overview",
    icon: <LayoutDashboard className="h-5 w-5" />,
    children: [{ href: "/seller", label: "Dashboard Overview", icon: <LayoutDashboard className="h-5 w-5" /> }],
  },
  {
    context: "SCM",
    title: "SCM — Belanja Grosir",
    icon: <Boxes className="h-5 w-5" />,
    children: [
      { href: "/seller/produk", label: "Manajemen Produk", icon: <Boxes className="h-5 w-5" /> },
      { href: "/seller/po", label: "Manajemen PO", icon: <ClipboardList className="h-5 w-5" /> },
      { href: "/seller/jaringan", label: "Manajemen Jaringan", icon: <Network className="h-5 w-5" /> },
      { href: "/seller/keuangan-scm", label: "Keuangan", icon: <Wallet className="h-5 w-5" /> },
    ],
  },
  {
    context: "MP",
    title: "Marketplace — Jualan",
    icon: <StoreIcon className="h-5 w-5" />,
    children: [
      { href: "/seller/listing", label: "Manajemen Produk", icon: <Store className="h-5 w-5" /> },
      { href: "/seller/pesanan", label: "PO / Pesanan Masuk", icon: <Inbox className="h-5 w-5" /> },
      { href: "/seller/diskon", label: "Kartu Diskon", icon: <BadgePercent className="h-5 w-5" /> },
      { href: "/seller/saldo-mp", label: "Keuangan (Saldo)", icon: <CreditCard className="h-5 w-5" /> },
    ],
  },
  {
    context: "ROOT",
    title: "Pengaturan Akun",
    icon: <Settings className="h-5 w-5" />,
    children: [{ href: "/seller/pengaturan", label: "Pengaturan Akun", icon: <Settings className="h-5 w-5" /> }],
  },
];

const CONTEXT_STYLE: Record<Group["context"], { text: string; bar: string }> = {
  ROOT: { text: "text-[#53616D]", bar: "bg-white/60" },
  SCM: { text: "text-[#53616D]", bar: "bg-white/60" },
  MP: { text: "text-[#53616D]", bar: "bg-white/60" },
};
export default function TokoShell({
  children, userName, userEmail, storeName,
}: {
  children: React.ReactNode; userName?: string; userEmail?: string; storeName?: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [openCtx, setOpenCtx] = useState<Record<string, boolean>>({ SCM: true, MP: true });
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

  const initials = (userName || "T").charAt(0).toUpperCase();
  const ctxActive = (ctx: "ROOT" | "SCM" | "MP") =>
    tokoNav.some((g) => g.context === ctx && g.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")));

  // Render satu item (group ROOT = direct link; SCM/MP = expandable super-group)
  function renderGroup(g: Group) {
    if (g.context === "ROOT") {
      const leaf = g.children[0];
      const active = pathname === leaf.href || pathname.startsWith(leaf.href + "/");
      return (
        <Link key={g.title} href={leaf.href} title={collapsed ? leaf.label : undefined}
          className={cn("flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition",
            collapsed ? "md:justify-center" : "gap-3",
            active ? "bg-[#DCE8F3] text-[#173B68]" : "text-[#53616D] hover:bg-white/70 hover:text-[#173B68]")}>
          <span className="shrink-0">{g.icon}</span>
          {!collapsed && <span className="truncate">{leaf.label}</span>}
        </Link>
      );
    }
    const style = CONTEXT_STYLE[g.context];
    const open = openCtx[g.context] ?? false;
    const active = ctxActive(g.context);
    return (
      <div key={g.title}>
        <button onClick={() => { if (collapsed) { setCollapsed(false); return; } setOpenCtx((p) => ({ ...p, [g.context]: !open })); }}
          title={collapsed ? g.title : undefined}
          className={cn("flex w-full items-center rounded-xl py-2 transition", collapsed ? "md:justify-center px-3" : "justify-between gap-2 px-3", active ? "bg-[#DCE8F3]" : "hover:bg-white/70")}>
          <span className="flex min-w-0 items-center gap-3">
            <span className="shrink-0">{g.icon}</span>
            {!collapsed && (
              <span className={cn("truncate text-sm font-semibold", style.text)}>{g.title}</span>
            )}
          </span>
          {!collapsed && (
            <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-[#687681] transition-transform", open && "rotate-180")} />
          )}
        </button>

        {!collapsed && open && (
          <div className={cn("mt-1 space-y-0.5 rounded-xl py-1 pl-2", style.bar)}>
            {g.children.map((c) => {
              const ca = pathname === c.href || pathname.startsWith(c.href + "/");
              return (
                <Link key={c.href} href={c.href}
                  className={cn("flex items-center rounded-lg px-2.5 py-2 text-sm font-medium transition", ca ? "bg-[#DCE8F3] font-semibold text-[#173B68]" : "text-[#53616D] hover:bg-white/70 hover:text-[#173B68]")}>
                  <span className="mr-2.5">{c.icon}</span>
                  <span className="truncate">{c.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7F8]">
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-[#E9EFF2] text-[#26343F] shadow-2xl transition-all duration-300 md:relative md:translate-x-0",
        mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full",
        collapsed ? "md:w-[84px]" : "md:w-[300px]"
      )}>
        {/* Logo */}
        <div className="relative flex h-16 shrink-0 items-center justify-center border-b border-[#DDE3E7] bg-white px-4">
          {collapsed ? (
            <button onClick={() => setCollapsed(false)} className="mx-auto" title="Perluas menu">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo2 only1.png" alt="Mall ku" className="h-14 w-14 object-contain" />
            </button>
          ) : (
            <Link href="/seller" className="flex items-center justify-center">
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

        {/* Nav */}
        <nav className="flex-1 space-y-2.5 overflow-y-auto px-3 py-2">
          {/* Dashboard + Pengaturan (ROOT) */}
          {tokoNav.filter((g) => g.context === "ROOT").map(renderGroup)}

          {/* SCM super-group */}
          <div className="pt-1">
            {tokoNav.filter((g) => g.context === "SCM").map(renderGroup)}
          </div>

          {/* MP super-group */}
          <div className="pt-1">
            {tokoNav.filter((g) => g.context === "MP").map(renderGroup)}
          </div>
        </nav>

        {/* Bottom user */}
        <div className="border-t border-[#DDE3E7] p-3">
          <div className={cn("flex items-center rounded-xl bg-[#E53935] p-2 text-white", collapsed ? "md:justify-center" : "gap-2.5")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">{initials}</div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">{storeName || userName || "Toko"}</p>
                  <p className="truncate text-[10px] text-white/70">{userEmail}</p>
                </div>
                <Link href="/seller/pengaturan" className="text-white/75 hover:text-white" title="Pengaturan"><Settings className="h-4 w-4" /></Link>
              </>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="z-20 flex h-16 shrink-0 items-center gap-2 border-b border-[#DDE3E7] bg-white px-4 shadow-sm md:gap-4 md:px-6">
          <button onClick={() => { if (window.matchMedia("(min-width: 768px)").matches) setCollapsed((c) => !c); else setMobileOpen(true); }}
            className="rounded-lg p-2 text-[#53616D] hover:bg-[#F5F7F8]" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687681]" />
            <input type="text" placeholder="Cari produk, PO, pesanan..."
              className="w-full rounded-xl border border-[#DDE3E7] bg-[#F5F7F8] py-2 pl-9 pr-4 text-sm text-[#26343F] outline-none transition focus:border-[#168BC3] focus:bg-white focus:ring-2 focus:ring-[#168BC3]/10" />
          </div>

          <div className="ml-auto flex items-center gap-1">
            {/* Notif */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen((o) => !o)} className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifikasi">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">4</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-slate-800">Notifikasi</p>
                    <span className="text-[11px] font-semibold text-sky-600">Tandai dibaca</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { t: "Pesanan Masuk Baru", d: "ORD-20260905-2041 dari Andi Saputra", time: "5 mnt", unread: true, ctx: "MP" },
                      { t: "PO Dikirim Distributor", d: "PO-20260828-115 dikirim CV Sulawesi Pangan", time: "1 jam", unread: true, ctx: "SCM" },
                      { t: "Stok Diterima", d: "150 karung Beras siap ditayangkan", time: "3 jam", unread: true, ctx: "SCM" },
                      { t: "Pencairan Diproses", d: "Penarikan saldo MP Anda sedang diproses", time: "Kemarin", unread: false, ctx: "MP" },
                    ].map((n, i) => (
                      <div key={i} className={cn("flex gap-3 border-b border-slate-50 px-4 py-3", n.unread && "bg-sky-50/40")}>
                        <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", n.unread ? "bg-sky-500" : "bg-slate-200")} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-700">{n.t}</p>
                          <p className="truncate text-[11px] text-slate-400">{n.d}</p>
                          <p className="text-[10px] text-slate-300">{n.time}</p>
                        </div>
                        <span className={cn("h-fit rounded px-1.5 py-0.5 text-[8px] font-extrabold", n.ctx === "SCM" ? "bg-cyan-50 text-cyan-600" : "bg-amber-50 text-amber-600")}>{n.ctx}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar dropdown */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-1.5 rounded-lg p-1.5 hover:bg-slate-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500 text-xs font-bold text-white">{initials}</span>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="truncate text-sm font-bold text-slate-800">{storeName || userName || "Toko"}</p>
                    <p className="truncate text-[11px] text-slate-400">{userEmail}</p>
                  </div>
                  <Link href="/seller/pengaturan" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                    <User className="h-4 w-4" /> Profil Saya
                  </Link>
                  <Link href="/mp" target="_blank" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                    <Store className="h-4 w-4" /> Lihat Storefront MP
                  </Link>
                  <div className="border-t border-slate-100" />
                  <button onClick={() => signOut({ callbackUrl: "/scm" })}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-bold text-rose-600 hover:bg-rose-50">
                    <LogOut className="h-4 w-4" /> Keluar Akun
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
