import Link from "next/link";
import { Eye } from "lucide-react";

interface BookingActionsProps {
  bookingId: string;
}

export default function BookingActions({
  bookingId,
}: BookingActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/bookings/${bookingId}`}
        className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700"
      >
        <Eye size={14} />
        View
      </Link>
    </div>
  );
}