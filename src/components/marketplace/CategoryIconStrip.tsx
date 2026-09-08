import Link from "next/link";
import { Wheat, Utensils, Home, Sparkles } from "lucide-react";

const icons = [Wheat, Utensils, Home, Sparkles];

export default function CategoryIconStrip({ categories }: { categories: { id: string; nama: string; slug: string }[] }) {
  return (
    <div className="flex overflow-x-auto gap-4 py-2" style={{ scrollbarWidth: "none" }}>
      {categories.map((cat, idx) => {
        const Icon = icons[idx % icons.length];
        return (
          <Link key={cat.id} href={`/kategori/${cat.slug}`}
            className="group flex flex-col items-center rounded-lg bg-white p-3 shadow-sm transition hover:-translate-y-1"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white">
              <Icon className="h-5 w-5" />
            </span>
            <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-primary-600">
              {cat.nama}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
