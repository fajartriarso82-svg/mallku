import Link from "next/link";
// Icon imports removed due to missing exports in current lucide-react version.

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 gap-8 px-4 md:grid-cols-5 md:px-8">
        {/* Support */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Dukungan Pembeli</h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li><Link href="/">Tentang Mall ku</Link></li>
            <li><Link href="/">Kontak Kami</Link></li>
            <li><Link href="/">Bantuan</Link></li>
          </ul>
        </div>
        {/* Hours */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Jam Operasional</h3>
          <p className="text-xs text-gray-600">Senin–Jumat: 08.00–20.00</p>
          <p className="text-xs text-gray-600">Sabtu–Minggu: 09.00–18.00</p>
        </div>
        {/* About */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Tentang Kami</h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li><Link href="/">Cerita Toko Lokal</Link></li>
            <li><Link href="/">Karier</Link></li>
          </ul>
        </div>
        {/* Help */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Bantuan & Dukungan</h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li><Link href="/">Cara Pembayaran</Link></li>
            <li><Link href="/">Kebijakan Pengembalian</Link></li>
            <li><Link href="/">FAQ</Link></li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Newsletter</h3>
          <p className="mb-2 text-xs text-gray-600">Dapatkan info promo & toko lokal baru.</p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="email@contoh.com"
              className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs focus:outline-none"
            />
            <button type="submit" className="rounded bg-gray-800 px-3 py-1 text-xs text-white hover:bg-gray-700">
              Subscribe
            </button>
          </form>
          <div className="mt-4 flex space-x-3 text-gray-500">
            <span>FB</span>
            <span>IG</span>
            <span>TW</span>
            <span>YT</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Mall ku. All rights reserved. | <Link href="/">Kebijakan Privasi</Link> | <Link href="/">Syarat & Ketentuan</Link>
      </div>
    </footer>
  );
}
