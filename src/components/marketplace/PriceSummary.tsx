export default function PriceSummary({ subtotal, shipping, discount = 0 }: { subtotal: number; shipping: number; discount?: number }) {
  const total = subtotal + shipping - discount;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>Rp {subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Ongkir</span>
        <span>Rp {shipping.toLocaleString()}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>Diskon</span>
          <span>- Rp {discount.toLocaleString()}</span>
        </div>
      )}
      <hr className="my-2" />
      <div className="flex justify-between text-base font-semibold text-gray-800">
        <span>Total</span>
        <span>Rp {total.toLocaleString()}</span>
      </div>
    </div>
  );
}
