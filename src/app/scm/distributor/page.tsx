import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DashboardOverview } from "./dashboard-overview";

export const metadata = { title: "Dashboard Distributor SCM" };

export default async function DistributorDashboard() {
  const session = await auth();
  let companyName = "PT Berkah Distribusi";

  try {
    const distributor = await prisma.distributorProfile.findUnique({
      where: { userId: session?.user?.id ?? "" },
      select: { namaUsaha: true },
    });
    if (distributor) companyName = distributor.namaUsaha;
  } catch {
    // Use the local fallback when the profile is unavailable.
  }

  return <DashboardOverview companyName={companyName} />;
}
