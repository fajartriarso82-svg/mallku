import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import TokoShell from "@/components/layout/TokoShell";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "TOKO") redirect("/login");

  let storeName = "Toko Saya";
  try {
    const t = await prisma.tokoProfile.findUnique({
      where: { userId: session.user!.id! },
      select: { namaToko: true },
    });
    if (t) storeName = t.namaToko;
  } catch {
    // fallback dummy
  }

  return (
    <TokoShell
      userName={session.user?.name ?? "Pengguna"}
      userEmail={session.user?.email ?? ""}
      storeName={storeName}
    >
      {children}
    </TokoShell>
  );
}
