import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyStokSCM } from "@/lib/dummy/admin-data";

export const metadata = { title: "Monitoring Stok SCM" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">SCM</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Monitoring Stok SCM</h1>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base font-bold text-slate-800">Produk dengan status stok</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Produk</th>
                  <th className="px-4 py-3 font-semibold">Distributor</th>
                  <th className="px-4 py-3 font-semibold">Stok</th>
                  <th className="px-4 py-3 font-semibold">Satuan</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyStokSCM.map((item) => (
                  <tr key={item.id} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium text-slate-700">{item.produk}</td>
                    <td className="px-4 py-3 text-slate-600">{item.distributor}</td>
                    <td className="px-4 py-3 text-slate-600">{item.stokTersedia} / {item.stokMinimum}</td>
                    <td className="px-4 py-3 text-slate-600">{item.satuan}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700">{item.status}</span></td>
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
