interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <button
          onClick={onView}
          className="rounded-lg bg-slate-700 px-3 py-1 text-sm text-white transition hover:bg-slate-600"
        >
          View
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-500"
        >
          Edit
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-500"
        >
          Delete
        </button>
      )}
    </div>
  );
}