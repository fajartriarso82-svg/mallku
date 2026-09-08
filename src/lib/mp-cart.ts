"use client";

export interface CartItem {
  listingId: string;
  title: string;
  image?: string;
  price: number;
  quantity: number;
  stock: number;
  storeId: string;
  storeName: string;
  storeCity: string;
  variantId?: string;
  variantLabel?: string;
}

const CART_KEY = "mallku-mp-cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(CART_KEY);
    return value ? (JSON.parse(value) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("mallku-cart-updated"));
}

export function addToCart(item: CartItem) {
  const cart = readCart();
  const existing = cart.find(
    (entry) => entry.listingId === item.listingId && entry.variantId === item.variantId,
  );
  if (existing) {
    existing.quantity = Math.min(existing.quantity + item.quantity, existing.stock);
  } else {
    cart.push(item);
  }
  writeCart(cart);
}

export function cartCount(items = readCart()) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function cartTotal(items = readCart()) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
