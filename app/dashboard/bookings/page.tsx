"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import StatsCard from "@/components/ui/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/DataTable";

import { bookings } from "@/data/bookings";

export default function BookingsPage() {
  const totalBookings = bookings.length;

  const pendingReview = bookings.filter(
    (booking) =>
      booking.status === "NEW" ||
      booking.status === "UNDER_REVIEW"
  ).length;

  const paymentPending = bookings.filter(
    (booking) => booking.paymentStatus === "PENDING"
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AppShell>
        <ModulePage
          title="Booking Management"
          description="Review, price, schedule and manage all patient booking requests."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total Bookings"
              value={totalBookings}
              subtitle="All booking requests"
            />

            <StatsCard
              title="Pending Review"
              value={pendingReview}
              subtitle="Awaiting admin review"
            />

            <StatsCard
              title="Payment Pending"
              value={paymentPending}
              subtitle="Awaiting payment"
            />

            <StatsCard
              title="Completed"
              value={completed}
              subtitle="Successfully completed"
            />
          </div>

          <SearchBar placeholder="Search by patient, booking reference or service..." />

          <DataTable
            headers={[
              "Reference",
              "Patient",
              "Service",
              "Type",
              "Status",
              "Payment",
              "Amount",
            ]}
          >
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {booking.reference}
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {booking.customer.fullName}
                  </div>

                  <div className="text-xs text-slate-500">
                    {booking.customer.mobile}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {booking.title}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {booking.type}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      booking.status === "COMPLETED"
                        ? "bg-emerald-100 text-emerald-700"
                        : booking.status === "SCHEDULED"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "PAYMENT_PENDING"
                        ? "bg-amber-100 text-amber-700"
                        : booking.status === "UNDER_REVIEW"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      booking.paymentStatus === "SUCCESS"
                        ? "bg-emerald-100 text-emerald-700"
                        : booking.paymentStatus === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold text-slate-900">
                  ₹{booking.finalAmount ?? booking.amount}
                </td>
              </tr>
            ))}
          </DataTable>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}