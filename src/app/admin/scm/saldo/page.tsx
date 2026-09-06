import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummySaldoSCM, dummyPencairan } from "@/lib/dummy/admin-data";
import { formatRupiah } from "@/lib/utils";

export const metadata = { title: "Saldo SCM" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">SCM</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Saldo & Pencairan</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base font-bold text-slate-800">Saldo Akun</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummySaldoSCM.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{item.namaUsaha}</p>
                    <p className="text-xs text-slate-500">{item.tipe}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{formatRupiah(item.saldo)}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base font-bold text-slate-800">Pencairan</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummyPencairan.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-700">{item.ref}</p>
                  <p className="text-xs text-slate-500">{item.namaUsaha} · {formatRupiah(item.nominal)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
