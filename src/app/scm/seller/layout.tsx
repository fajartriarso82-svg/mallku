import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TokoShell from "@/components/layout/TokoShell";

export default async function ScmSellerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== "TOKO") redirect("/scm/login");

  return (
    <TokoShell
      userName={session.user?.name ?? "Pengguna"}
      userEmail={session.user?.email ?? ""}
      storeName="Toko Saya"
    >
      {children}
    </TokoShell>
  );
}