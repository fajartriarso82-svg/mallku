import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
