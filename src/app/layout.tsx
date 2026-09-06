import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mall ku — Ekosistem Lokal B2B & B2C",
    template: "%s | Mall ku",
  },
  description:
    "Platform ekosistem digital lokal: SCM (B2B) untuk distributor & toko, Marketplace (B2C) untuk pembeli lokal. Utamakan Lokal.",
  keywords: ["marketplace lokal", "SCM", "B2B", "B2C", "UMKM", "Mall ku"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}