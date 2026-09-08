export default function EmptyState({ title, description, actionLabel, href }: { title: string; description: string; actionLabel?: string; href?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <h3 className="font-bold text-gray-800">{title}</h3>
      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
      {actionLabel && href && (
        <a href={href} className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline">
          {actionLabel}
        </a>
      )}
    </div>
  );
}
