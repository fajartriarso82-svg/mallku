"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { MPProduk } from "@/lib/dummy/mp-types";
import { useMpCart } from "@/lib/mp-cart-store";

export function AddToCartButton({ product }: { product: MPProduk }) {
  const addItem = useMpCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition sm:flex-none ${
        added ? "bg-mk-green" : "bg-mk-red hover:bg-mk-red-light"
      }`}
    >
      {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      {added ? "Ditambahkan!" : "Tambah ke Keranjang"}
    </button>
  );
}
