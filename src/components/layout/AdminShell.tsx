"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Database,
  Boxes,
  ClipboardList,
  Wallet,
  Landmark,
  Store,
  Bell,
  Search,
  LogOut,
  Menu,
  PanelLeftClose,
  ChevronDown,
  Settings,
  ShieldCheck,
  Building2,
  PackageCheck,
  ArrowRightLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Leaf {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface Group {
  context: "ROOT" | "SCM" | "MP";
  title: string;
  icon: React.ReactNode;
  children: Leaf[];
}

const adminNav: Group[] = [
  {
    context: "ROOT",
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    children: [{ href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> }],
  },
  {
    context: "SCM",
    title: "SCM — Distributor & Toko",
    icon: <Building2 className="h-5 w-5" />,
    children: [
      { href: "/admin/scm/user", label: "Kelola Akun", icon: <Users className="h-5 w-5" /> },
      { href: "/admin/scm/master", label: "Master SCM", icon: <Database className="h-5 w-5" /> },
      { href: "/admin/scm/stok", label: "Stok & Inventory", icon: <Boxes className="h-5 w-5" /> },
      { href: "/admin/scm/po", label: "Purchase Order", icon: <ClipboardList className="h-5 w-5" /> },
      { href: "/admin/scm/iuran", label: "Iuran & Langganan", icon: <Wallet className="h-5 w-5" /> },
      { href: "/admin/scm/saldo", label: "Saldo & Pencairan", icon: <Landmark className="h-5 w-5" /> },
    ],
  },
  {
    context: "MP",
    title: "Marketplace — Seller & Buyer",
    icon: <Store className="h-5 w-5" />,
    children: [
      { href: "/admin/mp/user", label: "Kelola Toko", icon: <Users className="h-5 w-5" /> },
      { href: "/admin/mp/master", label: "Master Listing", icon: <Database className="h-5 w-5" /> },
      { href: "/admin/mp/stok", label: "Monitoring Stok", icon: <PackageCheck className="h-5 w-5" /> },
      { href: "/admin/mp/po", label: "Order & Delivery", icon: <ArrowRightLeft className="h-5 w-5" /> },
      { href: "/admin/mp/iuran", label: "Komisi & Fee", icon: <ShieldCheck className="h-5 w-5" /> },
      { href: "/admin/mp/saldo", label: "Saldo Seller", icon: <Wallet className="h-5 w-5" /> },
    ],
  },
  {
    context: "ROOT",
    title: "Pengaturan",
    icon: <Settings className="h-5 w-5" />,
    children: [{ href: "/admin/akun", label: "Verifikasi & Akses", icon: <Settings className="h-5 w-5" /> }],
  },
];

const CONTEXT_STYLE: Record<Group["context"], { text: string; bar: string }> = {
  ROOT: { text: "text-[#53616D]", bar: "bg-white/60" },
  SCM: { text: "text-[#53616D]", bar: "bg-white/60" },
  MP: { text: "text-[#53616D]", bar: "bg-white/60" },
};

export default function AdminShell({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
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
    const handle = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const initials = (userName || "A").charAt(0).toUpperCase();
  const ctxActive = (ctx: "ROOT" | "SCM" | "MP") =>
    adminNav.some((g) => g.context === ctx && g.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")));

  function renderGroup(g: Group) {
    if (g.context === "ROOT") {
      const leaf = g.children[0];
      const active = pathname === leaf.href || pathname.startsWith(leaf.href + "/");
      return (
        <Link
          key={g.title}
          href={leaf.href}
          title={collapsed ? leaf.label : undefined}
          className={cn(
            "flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition",
            collapsed ? "md:justify-center" : "gap-3",
            active ? "bg-[#DCE8F3] text-[#173B68]" : "text-[#53616D] hover:bg-white/70 hover:text-[#173B68]",
          )}
        >
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
        <button
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
              return;
            }
            setOpenCtx((p) => ({ ...p, [g.context]: !open }));
          }}
          title={collapsed ? g.title : undefined}
          className={cn(
            "flex w-full items-center rounded-xl py-2 transition",
            collapsed ? "md:justify-center px-3" : "justify-between gap-2 px-3",
            active ? "bg-[#DCE8F3]" : "hover:bg-white/70",
          )}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="shrink-0">{g.icon}</span>
            {!collapsed && (
              <span className={cn("truncate text-sm font-semibold", style.text)}>{g.title}</span>
            )}
          </span>
          {!collapsed && <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-[#687681] transition-transform", open && "rotate-180")} />}
        </button>

        {!collapsed && open && (
          <div className={cn("mt-1 space-y-0.5 rounded-xl py-1 pl-2", style.bar)}>
            {g.children.map((c) => {
              const activeItem = pathname === c.href || pathname.startsWith(c.href + "/");
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className={cn(
                    "flex items-center rounded-lg px-2.5 py-2 text-sm font-medium transition",
                    activeItem ? "bg-[#DCE8F3] font-semibold text-[#173B68]" : "text-[#53616D] hover:bg-white/70 hover:text-[#173B68]",
                  )}
                >
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
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-[#E9EFF2] text-[#26343F] shadow-2xl transition-all duration-300 md:relative md:translate-x-0",
          mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full",
          collapsed ? "md:w-[84px]" : "md:w-[300px]",
        )}
      >
        <div className="relative flex h-16 shrink-0 items-center justify-center border-b border-[#DDE3E7] bg-white px-4">
          {collapsed ? (
            <button onClick={() => setCollapsed(false)} className="mx-auto" title="Perluas menu">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo2 only1.png" alt="Mall ku" className="h-14 w-14 object-contain" />
            </button>
          ) : (
            <Link href="/admin" className="flex items-center justify-center">
              <span className="shrink-0 rounded-lg bg-white p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Logo2 only2.png" alt="Mall ku" className="h-14 w-auto object-contain" />
              </span>
            </Link>
          )}
          <button onClick={() => setMobileOpen(false)} className="absolute right-4 rounded p-1 text-[#687681] hover:bg-[#F5F7F8] md:hidden" aria-label="Tutup menu">
            <PanelLeftClose className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2.5 overflow-y-auto px-3 py-2">
          {adminNav.filter((g) => g.context === "ROOT").map(renderGroup)}

          <div className="pt-1">
            {adminNav.filter((g) => g.context === "SCM").map(renderGroup)}
          </div>

          <div className="pt-1">
            {adminNav.filter((g) => g.context === "MP").map(renderGroup)}
          </div>
        </nav>

        <div className="border-t border-[#DDE3E7] p-3">
          <div className={cn("flex items-center rounded-xl bg-white/70 p-2", collapsed ? "md:justify-center" : "gap-2.5")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#173B68] text-xs font-bold text-white">{initials}</div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-[#26343F]">{userName || "Administrator"}</p>
                  <p className="truncate text-[10px] text-[#687681]">{userEmail}</p>
                </div>
                <button onClick={() => signOut({ callbackUrl: "/scm" })} className="text-[#687681] hover:text-[#173B68]" title="Keluar">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="z-20 flex h-16 shrink-0 items-center gap-2 border-b border-[#DDE3E7] bg-white px-4 shadow-sm md:gap-4 md:px-6">
          <button
            onClick={() => {
              if (window.matchMedia("(min-width: 768px)").matches) setCollapsed((c) => !c);
              else setMobileOpen(true);
            }}
            className="rounded-lg p-2 text-[#53616D] hover:bg-[#F5F7F8]"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687681]" />
            <input
              type="text"
              placeholder="Cari akun, produk, PO..."
              className="w-full rounded-xl border border-[#DDE3E7] bg-[#F5F7F8] py-2 pl-9 pr-4 text-sm text-[#26343F] outline-none transition focus:border-[#168BC3] focus:bg-white focus:ring-2 focus:ring-[#168BC3]/10"
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen((o) => !o)} className="relative rounded-lg p-2 text-[#687681] hover:bg-[#F5F7F8]" aria-label="Notifikasi">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E53935] text-[9px] font-bold text-white">4</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-[#DDE3E7] bg-white p-3 shadow-xl">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#687681]">Notifikasi</p>
                  <div className="space-y-2 text-sm text-[#53616D]">
                    <div className="rounded-lg bg-[#F5F7F8] p-2">Akun toko baru menunggu review</div>
                    <div className="rounded-lg bg-[#F5F7F8] p-2">Stok produk kritis di 3 distributor</div>
                    <div className="rounded-lg bg-[#F5F7F8] p-2">PO belum dibayar 2 order</div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#F5F7F8]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173B68] text-xs font-bold text-white">{initials}</div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-[#26343F]">{userName || "Administrator"}</p>
                  <p className="text-[10px] text-[#687681]">Super Admin</p>
                </div>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[#DDE3E7] bg-white p-3 shadow-xl">
                  <div className="mb-3 rounded-lg bg-[#F5F7F8] p-2">
                    <p className="text-xs text-[#687681]">Email</p>
                    <p className="truncate text-sm font-semibold text-[#26343F]">{userEmail || "admin@mallku.id"}</p>
                  </div>
                  <button onClick={() => signOut({ callbackUrl: "/scm" })} className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-[#53616D] hover:bg-[#F5F7F8]">
                    <span>Keluar</span>
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
