import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/layout/AdminShell";

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") redirect("/auth/login");

  return (
    <AdminShell userName={session.user?.name ?? "Administrator"} userEmail={session.user?.email ?? "admin@mallku.id"}>
      {children}
    </AdminShell>
  );
}
