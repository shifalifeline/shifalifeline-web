interface BookingStatusBadgeProps {
  status?:
    | "NEW"
    | "UNDER_REVIEW"
    | "QUOTATION_READY"
    | "PAYMENT_PENDING"
    | "PAYMENT_RECEIVED"
    | "SCHEDULED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";
}

const statusStyles: Record<string, string> = {
  NEW: "bg-slate-100 text-slate-700",

  UNDER_REVIEW:
    "bg-orange-100 text-orange-700",

  QUOTATION_READY:
    "bg-indigo-100 text-indigo-700",

  PAYMENT_PENDING:
    "bg-amber-100 text-amber-700",

  PAYMENT_RECEIVED:
    "bg-cyan-100 text-cyan-700",

  SCHEDULED:
    "bg-blue-100 text-blue-700",

  IN_PROGRESS:
    "bg-violet-100 text-violet-700",

  COMPLETED:
    "bg-emerald-100 text-emerald-700",

  CANCELLED:
    "bg-red-100 text-red-700",
};

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  if (!status) {
    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
        —
      </span>
    );
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}