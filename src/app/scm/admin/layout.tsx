import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/layout/AdminShell";

export default async function ScmAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== "ADMIN") redirect("/scm/login");

  return (
    <AdminShell
      userName={session.user?.name ?? "Administrator"}
      userEmail={session.user?.email ?? "admin@mallku.id"}
    >
      {children}
    </AdminShell>
  );
}