import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk / Daftar — Mall ku",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}