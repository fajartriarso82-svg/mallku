import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyListingMP } from "@/lib/dummy/admin-data";

export const metadata = { title: "Monitoring Stok MP" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Marketplace</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Monitoring Stok Marketplace</h1>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base font-bold text-slate-800">Stok listing toko</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Produk</th>
                  <th className="px-4 py-3 font-semibold">Toko</th>
                  <th className="px-4 py-3 font-semibold">Stok</th>
                  <th className="px-4 py-3 font-semibold">Kategori</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyListingMP.map((row) => (
                  <tr key={row.id} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium text-slate-700">{row.produk}</td>
                    <td className="px-4 py-3 text-slate-600">{row.toko}</td>
                    <td className="px-4 py-3 text-slate-600">{row.stok}</td>
                    <td className="px-4 py-3 text-slate-600">{row.kategoriMP}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-rose-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700">{row.status}</span></td>
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
