import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/marketplace/ProductCard";
import EmptyState from "@/components/marketplace/EmptyState";
import Link from "next/link";

export const metadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
	const category = await prisma.kategoriProduk.findUnique({
		where: { slug: params.slug },
		select: { nama: true, deskripsi: true },
	});
	return {
		title: category?.nama ?? "Kategori Produk",
		description: category?.deskripsi ?? `Temukan produk ${category?.nama ?? "lokal"} di Mall ku.`,
	};
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const { slug } = params;

	// Verify category exists
	const category = await prisma.kategoriProduk.findUnique({
		where: { slug },
		select: { id: true, nama: true },
	});

	if (!category) {
		notFound();
		return null;
	}

	// Fetch products for this category
	const products = await prisma.listingMP.findMany({
		where: {
			status: "AKTIF",
			stokTampil: { gt: 0 },
			kategoriProduk: { slug },
		},
		include: {
			toko: { select: { namaToko: true, slug: true, kabupatenKota: true } },
		},
		orderBy: [{ terjual: "desc" }, { createdAt: "desc" }],
		take: 24,
	});

	return (
		<main className="mx-auto max-w-[1400px] px-4 md:px-8 py-8">
			<nav className="mb-4 text-sm text-gray-600">
				<Link href="/" className="hover:underline">Home</Link>
				<span className="mx-2">/</span>
				<span className="font-medium text-gray-800">{category.nama}</span>
			</nav>
			<h1 className="mb-6 text-3xl font-semibold text-gray-800">{category.nama}</h1>
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
				<EmptyState
					title="Tidak ada produk"
					description="Produk belum tersedia di kategori ini."
					actionLabel="Kembali ke beranda"
					href="/"
				/>
			)}
		</main>
	);
}
