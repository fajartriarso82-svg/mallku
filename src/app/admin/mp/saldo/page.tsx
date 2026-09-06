import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummySellerMP } from "@/lib/dummy/admin-data";

export const metadata = { title: "Saldo Seller MP" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Marketplace</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Saldo Seller</h1>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base font-bold text-slate-800">Ringkasan saldo</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dummySellerMP.map((row) => (
              <div key={row.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{row.namaToko}</p>
                  <p className="text-xs text-slate-500">{row.pemilik}</p>
                </div>
                <p className="text-sm font-bold text-slate-800">Rp 24.000.000</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
