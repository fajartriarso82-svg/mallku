import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lato",
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
    <html lang="id" className={lato.variable}>
      <body className={lato.className}>
        {/* Global Header */}
        <Header />
        {children}
        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}