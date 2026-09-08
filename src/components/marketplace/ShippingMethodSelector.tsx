import { useState } from "react";

export type ShippingMethod = "store" | "bite";

export default function ShippingMethodSelector({ onSelect }: { onSelect: (method: ShippingMethod) => void }) {
  const [method, setMethod] = useState<ShippingMethod>("store");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as ShippingMethod;
    setMethod(val);
    onSelect(val);
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Metode Pengiriman</label>
      <select value={method} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
        <option value="store">Kirim oleh Toko</option>
        <option value="bite">Kurir BiteShip</option>
      </select>
    </div>
  );
}
