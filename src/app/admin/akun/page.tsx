import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyAkunSCM } from "@/lib/dummy/admin-data";

const statusTabs = [
  { value: "PENDING", label: "Menunggu Review" },
  { value: "AKTIF", label: "Aktif" },
  { value: "SUSPEND", label: "Suspend" },
  { value: "DITOLAK", label: "Ditolak" },
] as const;

export const metadata = { title: "Kelola Akun" };

export default function AdminAkunPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Akun</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-800">Kelola Akun Mitra</h1>
        <p className="mt-1 text-sm text-slate-500">Review distributor dan toko aktif, tertunda, atau perlu evaluasi.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button key={tab.value} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-800">Daftar Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nama Usaha</th>
                  <th className="px-4 py-3 font-semibold">Tipe</th>
                  <th className="px-4 py-3 font-semibold">Pemilik</th>
                  <th className="px-4 py-3 font-semibold">Kota</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyAkunSCM.map((item) => (
                  <tr key={item.id} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium text-slate-700">{item.namaUsaha}</td>
                    <td className="px-4 py-3 text-slate-600">{item.tipe}</td>
                    <td className="px-4 py-3 text-slate-600">{item.pemilik}</td>
                    <td className="px-4 py-3 text-slate-600">{item.kota}</td>
                    <td className="px-4 py-3">
                      <span className={
                        item.status === "AKTIF"
                          ? "rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700"
                          : item.status === "PENDING"
                            ? "rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700"
                            : "rounded-full bg-rose-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700"
                      }>
                        {item.status}
                      </span>
                    </td>
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
