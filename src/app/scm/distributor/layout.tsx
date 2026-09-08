import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import DistributorShell from "@/components/layout/DistributorShell";

export default async function DistributorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== "DISTRIBUTOR") redirect("/scm/login");

  let companyName = "PT Berkah Distribusi";
  try {
    const d = await prisma.distributorProfile.findUnique({
      where: { userId: session.user!.id! },
      select: { namaUsaha: true },
    });
    if (d) companyName = d.namaUsaha;
  } catch {
    // fallback
  }

  return (
    <DistributorShell
      userName={session.user?.name ?? "Pengguna"}
      userEmail={session.user?.email ?? ""}
      companyName={companyName}
    >
      {children}
    </DistributorShell>
  );
}
