import Link from "next/link";
import { MapPin, Mail, Phone, Globe, MessageCircle, Share2 } from "lucide-react";

const kategoriLinks = [
  { label: "Sembako", href: "/kategori/sembako" },
  { label: "Minuman", href: "/kategori/minuman" },
  { label: "Makanan Ringan", href: "/kategori/makanan-ringan" },
  { label: "Perawatan Rumah", href: "/kategori/perawatan-rumah" },
  { label: "Kebutuhan Bayi", href: "/kategori/kebutuhan-bayi" },
  { label: "Frozen Food", href: "/kategori/frozen-food" },
];

const bantuanLinks = [
  { label: "Cara Belanja", href: "/" },
  { label: "Pusat Bantuan", href: "/" },
  { label: "Kebijakan Privasi", href: "/" },
  { label: "Syarat & Ketentuan", href: "/" },
];

export function MpFooter() {
  return (
    <footer className="mt-12 bg-mk-navy-dark text-slate-300">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div>
          <p className="text-lg font-extrabold text-white">Mall ku</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Marketplace lokal untuk kebutuhan sehari-hari. Utamakan produk & toko
            dari daerahmu.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-mk-red"><Globe className="h-4 w-4" /></span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-mk-red"><MessageCircle className="h-4 w-4" /></span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-mk-red"><Share2 className="h-4 w-4" /></span>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Kategori</p>
          <ul className="mt-3 space-y-2 text-sm">
            {kategoriLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-slate-400 transition hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Bantuan</p>
          <ul className="mt-3 space-y-2 text-sm">
            {bantuanLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-slate-400 transition hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Hubungi Kami</p>
          <ul className="mt-3 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mk-cyan" /> Makassar, Sulawesi Selatan, Indonesia</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-mk-cyan" /> halo@mallku.id</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-mk-cyan" /> 0800-123-4567</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Mall ku. Semua hak dilindungi. Utamakan Lokal.
      </div>
    </footer>
  );
}
