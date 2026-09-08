export default function OrderStatusStepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${idx <= current ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"}`}>{idx + 1}</div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-0.5 ${idx < current ? "bg-primary-600" : "bg-gray-200"}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}
