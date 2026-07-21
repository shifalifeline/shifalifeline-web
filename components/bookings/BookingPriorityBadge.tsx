import { BookingPriority } from "@/types/booking";

interface BookingPriorityBadgeProps {
  priority?: BookingPriority;
}

const priorityStyles: Record<BookingPriority, string> = {
  LOW: "bg-slate-100 text-slate-700",
  NORMAL: "bg-blue-100 text-blue-700",
  HIGH: "bg-amber-100 text-amber-700",
  URGENT: "bg-red-100 text-red-700",
};

export default function BookingPriorityBadge({
  priority = "NORMAL",
}: BookingPriorityBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
}