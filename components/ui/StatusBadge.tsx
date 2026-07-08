interface StatusBadgeProps {
  status:
    | "active"
    | "inactive"
    | "pending"
    | "completed"
    | "cancelled"
    | "draft";
}

const styles = {
  active: "bg-green-500/20 text-green-300",
  inactive: "bg-gray-500/20 text-gray-300",
  pending: "bg-yellow-500/20 text-yellow-300",
  completed: "bg-blue-500/20 text-blue-300",
  cancelled: "bg-red-500/20 text-red-300",
  draft: "bg-purple-500/20 text-purple-300",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}