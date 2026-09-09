import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: "Mall ku — SCM",
    template: "%s | Mall ku",
  },
  description:
    "Platform ekosistem digital lokal: SCM (B2B) untuk distributor & toko. Utamakan Lokal.",
  keywords: ["SCM", "B2B", "distributor", "toko", "UMKM", "Mall ku"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={lato.variable} data-scroll-behavior="smooth">
      <body className={lato.className}>
        {children}
      </body>
    </html>
  );
}