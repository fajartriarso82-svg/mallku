"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

export interface CartLine {
  produkId: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (produkId: string, qty?: number) => void;
  removeItem: (produkId: string) => void;
  setQty: (produkId: string, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
}

export const useMpCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (produkId, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.produkId === produkId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.produkId === produkId ? { ...l, qty: l.qty + qty } : l
              ),
            };
          }
          return { lines: [...state.lines, { produkId, qty }] };
        }),
      removeItem: (produkId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.produkId !== produkId) })),
      setQty: (produkId, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.produkId !== produkId)
              : state.lines.map((l) => (l.produkId === produkId ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
      totalQty: () => get().lines.reduce((acc, l) => acc + l.qty, 0),
    }),
    { name: "mallku-mp-cart" }
  )
);

// Hook penanda "sudah mount di client" untuk mencegah mismatch SSR hydration
// pada nilai yang berasal dari localStorage (zustand persist).
export function useHydrated(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
