interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <tr>
      <td
        colSpan={100}
        className="px-6 py-12 text-center"
      >
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-slate-400">
            {description}
          </p>
        )}
      </td>
    </tr>
  );
}