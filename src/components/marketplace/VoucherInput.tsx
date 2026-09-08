import { useState } from "react";

export default function VoucherInput({ onApply }: { onApply: (code: string) => void }) {
  const [code, setCode] = useState("");
  const handleApply = () => {
    if (code.trim()) {
      onApply(code.trim());
      setCode("");
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Masukkan kode voucher"
        value={code}
        onChange={e => setCode(e.target.value)}
        className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none"
      />
      <button onClick={handleApply} className="rounded bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-500">Gunakan</button>
    </div>
  );
}
