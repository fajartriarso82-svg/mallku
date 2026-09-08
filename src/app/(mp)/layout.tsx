import type { Metadata } from "next";
import { Suspense } from "react";
import { MpHeader } from "@/components/mp/mp-header";
import { MpFooter } from "@/components/mp/mp-footer";

export const metadata: Metadata = {
  title: {
    default: "Mall ku — Marketplace Lokal",
    template: "%s | Mall ku",
  },
  description: "Belanja kebutuhan sehari-hari dari toko & UMKM lokal terdekat.",
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-mk-bg">
      {/* MpHeader memakai useSearchParams → perlu Suspense saat prerender statis */}
      <Suspense fallback={null}>
        <MpHeader />
      </Suspense>
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-6">
        {children}
      </main>
      <MpFooter />
    </div>
  );
}
