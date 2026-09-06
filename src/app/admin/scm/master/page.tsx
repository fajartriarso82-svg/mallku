import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyKategoriTree, dummySatuan } from "@/lib/dummy/admin-data";

export const metadata = { title: "Master SCM" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">SCM</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Master Produk & Kategori</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base font-bold text-slate-800">Kategori</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummyKategoriTree.map((group) => (
                <div key={group.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-700">{group.nama}</p>
                  <p className="mt-1 text-xs text-slate-500">{group.children.join(" • ")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base font-bold text-slate-800">Satuan</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {dummySatuan.map((unit) => (
                <div key={unit.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-sm font-semibold text-slate-700">{unit.nama}</p>
                  <p className="text-xs text-slate-500">{unit.singkatan}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
