import { PaymentStatus } from "@/types/payment";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusStyles: Record<PaymentStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  SUCCESS: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-red-100 text-red-700",
  PARTIAL: "bg-cyan-100 text-cyan-700",
  REFUNDED: "bg-violet-100 text-violet-700",
  CANCELLED: "bg-slate-200 text-slate-700",
};

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}