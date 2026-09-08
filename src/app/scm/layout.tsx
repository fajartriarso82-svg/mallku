import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SCM – Mall ku",
  description: "Supply‑chain management area of Mall ku",
};

export default function ScmLayout({ children }: { children: React.ReactNode }) {
  return (
    // No marketplace Header/Footer — SCM pages get a clean layout.
    // Segment layout only (root layout owns <html>/<body>).
    <>{children}</>
  );
}
