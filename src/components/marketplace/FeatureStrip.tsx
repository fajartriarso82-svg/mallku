export default function FeatureStrip() {
  const features = [
    { icon: "🛒", label: "Dukung UMKM Lokal" },
    { icon: "💳", label: "Pembayaran Aman" },
    { icon: "↩️", label: "Retur Mudah" },
    { icon: "🤝", label: "Dukungan Pembeli" },
    { icon: "🚚", label: "Pengiriman Pilihan" },
  ];
  return (
    <section className="my-8">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 gap-4 md:grid-cols-5">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <span className="text-xl">{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
