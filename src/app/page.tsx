import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import HeroBanner from "@/components/marketplace/HeroBanner";
import CategoryIconStrip from "@/components/marketplace/CategoryIconStrip";
import FeatureStrip from "@/components/marketplace/FeatureStrip";
import ProductCard from "@/components/marketplace/ProductCard";
import StoreCard from "@/components/marketplace/StoreCard";
import EmptyState from "@/components/marketplace/EmptyState";

export const metadata: Metadata = {
	title: "Mall ku – Marketplace",
	description: "Belanja produk kebutuhan sehari-hari dari toko lokal terdekat.",
};

type SearchParams = { kota?: string; q?: string };

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
	const { kota, q } = await searchParams;
	const [categories, stores, products] = await Promise.all([
		prisma.kategoriProduk.findMany({ where: { aktif: true }, orderBy: { urutan: "asc" }, take: 8 }),
		prisma.tokoProfile.findMany({
			where: { tokoMpAktif: true, ...(kota ? { kabupatenKota: { contains: kota, mode: "insensitive" } } : {}) },
			select: {
				id: true,
				namaToko: true,
				slug: true,
				kabupatenKota: true,
				fotoProfil: true,
				_count: { select: { listingMp: true } },
			},
			orderBy: { namaToko: "asc" },
			take: 6,
		}),
		prisma.listingMP.findMany({
			where: {
				status: "AKTIF",
				stokTampil: { gt: 0 },
				...(kota ? { toko: { kabupatenKota: { contains: kota, mode: "insensitive" } } } : {}),
				...(q ? { OR: [{ judulJual: { contains: q, mode: "insensitive" } }, { deskripsi: { contains: q, mode: "insensitive" } }] } : {}),
			},
			include: { toko: { select: { id: true, namaToko: true, slug: true, kabupatenKota: true } }, kategoriProduk: { select: { nama: true, slug: true } } },
			orderBy: [{ terjual: "desc" }, { createdAt: "desc" }],
			take: 12,
		}),
	]);

	return (
		<main className="mx-auto max-w-[1400px] px-4 md:px-8">
			{/* Hero */}
			<HeroBanner />

			{/* Category strip */}
			<section className="my-8">
				<CategoryIconStrip categories={categories} />
			</section>

			{/* Feature strip */}
			<FeatureStrip />

			{/* Stores nearby */}
			<section className="my-8">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold text-gray-800">Toko lokal terdekat</h2>
					<Link href="/cari" className="text-sm font-medium text-primary-600 hover:underline">Cari toko</Link>
				</div>
				{stores.length ? (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{stores.map(store => (
							<StoreCard
								key={store.id}
								store={{
									id: store.id,
									namaToko: store.namaToko,
									slug: store.slug,
									kabupatenKota: store.kabupatenKota,
									fotoProfil: store.fotoProfil ?? undefined,
									listingCount: store._count.listingMp,
								}}
							/>
						))}
					</div>
				) : (
					<EmptyState title="Belum ada toko di area ini" description="Coba perluas area pencarian untuk menemukan toko lain." actionLabel="Jelajahi semua area" href="/" />
				)}
			</section>

			{/* Recommended products */}
			<section className="my-8">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold text-gray-800">Rekomendasi untuk Anda</h2>
					<Link href="/cari" className="text-sm font-medium text-primary-600 hover:underline">Lihat semua</Link>
				</div>
				{products.length ? (
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
						{products.map(product => (
							<ProductCard
								key={product.id}
								product={{
									id: product.id,
									namaProduk: product.judulJual,
									hargaJual: Number(product.hargaJual),
									fotoProduk: product.fotoProduk ?? undefined,
									toko: {
										namaToko: product.toko?.namaToko ?? "",
										slug: product.toko?.slug ?? "",
										kabupatenKota: product.toko?.kabupatenKota ?? "",
									},
								}}
							/>
						))}
					</div>
				) : (
					<EmptyState title="Produk lokal sedang disiapkan" description="Kembali lagi sebentar untuk melihat pilihan dari mitra kami." />
				)}
			</section>
		</main>
	);
}
