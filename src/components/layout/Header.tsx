import Link from "next/link";
import Image from "next/image";
import { MapPin, Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo2 only2.png" alt="Mall ku" width={40} height={40} className="object-contain" />
          <span className="text-xl font-bold text-gray-800">Mall ku</span>
        </Link>

        {/* Search bar */}
        <form action="/cari" className="flex flex-1 items-center mx-4 max-w-xl rounded-full border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            name="q"
            placeholder="Cari produk, toko, atau kategori..."
            className="ml-2 w-full bg-transparent text-sm placeholder-gray-500 focus:outline-none"
          />
        </form>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Location picker placeholder */}
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Lokasi</span>
          </button>
          {/* Wishlist placeholder */}
          {/* <Link href="/wishlist" className="text-gray-600 hover:text-gray-800"><Heart className="h-5 w-5" /></Link> */}
          {/* Cart */}
          <Link href="/keranjang" className="relative text-gray-600 hover:text-gray-800">
            <ShoppingCart className="h-5 w-5" />
            {/* badge placeholder */}
            <span className="absolute -right-2 -top-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">0</span>
          </Link>
          {/* Account */}
          <Link href="/login" className="text-gray-600 hover:text-gray-800">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
