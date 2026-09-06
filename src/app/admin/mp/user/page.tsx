import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummySellerMP } from "@/lib/dummy/admin-data";

export const metadata = { title: "Kelola Toko MP" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Marketplace</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Kelola Toko Marketplace</h1>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base font-bold text-slate-800">Daftar Seller</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nama Toko</th>
                  <th className="px-4 py-3 font-semibold">Pemilik</th>
                  <th className="px-4 py-3 font-semibold">Kota</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummySellerMP.map((row) => (
                  <tr key={row.id} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium text-slate-700">{row.namaToko}</td>
                    <td className="px-4 py-3 text-slate-600">{row.pemilik}</td>
                    <td className="px-4 py-3 text-slate-600">{row.kota}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">{row.status}</span></td>
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
