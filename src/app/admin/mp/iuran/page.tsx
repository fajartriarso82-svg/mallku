import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Komisi MP" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Marketplace</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Komisi & Fee</h1>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base font-bold text-slate-800">Ringkasan komisi</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">Komisi Bulan Ini</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-800">Rp 342.000.000</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">Fee Payment</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-800">Rp 28.500.000</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">Outstanding</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-800">Rp 11.900.000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
