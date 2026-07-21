import { Booking } from "@/types/booking";

import DataTable from "@/components/ui/DataTable";

import BookingStatusBadge from "./BookingStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import BookingPriorityBadge from "./BookingPriorityBadge";
import BookingActions from "./BookingActions";

interface BookingTableProps {
  bookings: Booking[];
}

export default function BookingTable({
  bookings,
}: BookingTableProps) {
  return (
    <DataTable
      headers={[
        "Reference",
        "Patient",
        "Service",
        "Type",
        "Priority",
        "Status",
        "Payment",
        "Amount",
        "Actions",
      ]}
    >
      {bookings.map((booking) => (
        <tr
          key={booking.id}
          className="transition-colors hover:bg-slate-50"
        >
          <td className="px-6 py-4">
            <div className="font-semibold text-slate-900">
              {booking.reference}
            </div>

            <div className="text-xs text-slate-500">
              {new Date(booking.createdAt).toLocaleString("en-IN")}
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="font-medium text-slate-900">
              {booking.customer.fullName}
            </div>

            <div className="text-xs text-slate-500">
              {booking.customer.mobile}
            </div>

            {booking.customer.email && (
              <div className="text-xs text-slate-500">
                {booking.customer.email}
              </div>
            )}
          </td>

          <td className="px-6 py-4 text-sm text-slate-700">
            {booking.title}
          </td>

          <td className="px-6 py-4">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {booking.type}
            </span>
          </td>

          <td className="px-6 py-4">
            <BookingPriorityBadge
              priority={booking.priority}
            />
          </td>

          <td className="px-6 py-4">
            <BookingStatusBadge
              status={booking.status}
            />
          </td>

          <td className="px-6 py-4">
            <PaymentStatusBadge
              status={booking.paymentStatus}
            />
          </td>

          <td className="px-6 py-4 font-semibold text-slate-900">
            ₹
            {(booking.finalAmount ?? booking.amount).toLocaleString(
              "en-IN"
            )}
          </td>

          <td className="px-6 py-4">
            <BookingActions bookingId={booking.id} />
          </td>
        </tr>
      ))}
    </DataTable>
  );
}