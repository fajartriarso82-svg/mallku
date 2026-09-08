import Image from "next/image";
import { MapPin } from "lucide-react";

export default function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden bg-primary-900 text-white"
      style={{ backgroundImage: "linear-gradient(135deg, #173b68 0%, #55c3e8 100%)" }}
    >
      <div
        className="mx-auto max-w-[1400px] grid gap-8 px-4 py-12 md:grid-cols-2 md:px-8"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-200">
            <MapPin className="h-4 w-4" />
            Belanja dekat, dukung lokal
          </p>
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Kebutuhan harian dari toko di sekitar Anda.
          </h1>
          <p className="mt-4 text-sm md:text-base text-primary-100">
            Temukan produk pilihan dari mitra toko lokal. Lebih dekat, lebih mudah, dan membantu usaha sekitar.
          </p>
          <button className="mt-6 rounded bg-primary-600 px-5 py-2 font-semibold hover:bg-primary-500">
            Lihat Sekarang
          </button>
        </div>
        <div className="hidden md:flex items-end justify-end">
          {/* Placeholder for illustration image */}
          <Image src="/hero-illustration.png" alt="Hero" width={500} height={400} className="object-contain" />
        </div>
      </div>
    </section>
  );
}
