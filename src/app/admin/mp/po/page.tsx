import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyOrderMP } from "@/lib/dummy/admin-data";
import { formatRupiah } from "@/lib/utils";

export const metadata = { title: "Order MP" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Marketplace</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Order & Delivery</h1>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base font-bold text-slate-800">Order marketplace</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nomor Order</th>
                  <th className="px-4 py-3 font-semibold">Toko</th>
                  <th className="px-4 py-3 font-semibold">Pembeli</th>
                  <th className="px-4 py-3 font-semibold">Nominal</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyOrderMP.map((row) => (
                  <tr key={row.id} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium text-slate-700">{row.nomorOrder}</td>
                    <td className="px-4 py-3 text-slate-600">{row.toko}</td>
                    <td className="px-4 py-3 text-slate-600">{row.pembeli}</td>
                    <td className="px-4 py-3 text-slate-600">{formatRupiah(row.nominal)}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
