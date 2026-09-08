"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { addToCart } from "@/lib/mp-cart";

export function AddToCartButton({ item, disabled = false }: { item: Parameters<typeof addToCart>[0]; disabled?: boolean }) {
  const [added, setAdded] = useState(false);
  return <button type="button" disabled={disabled} onClick={() => { addToCart({ ...item, quantity: 1 }); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#173b68] px-5 text-sm font-bold text-[#173b68] transition hover:bg-[#edf5fb] disabled:cursor-not-allowed disabled:border-[#cbd7dd] disabled:text-[#9aa8af]">{added ? <><Check className="h-4 w-4" />Ditambahkan</> : <><ShoppingBag className="h-4 w-4" />Tambah ke keranjang</>}</button>;
}
