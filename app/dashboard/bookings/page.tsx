"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

import StatsCard from "@/components/ui/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/DataTable";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

import bookingApi from "@/services/booking.api";

import type { Booking } from "@/types/booking";

export default function BookingsPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const response =
          await bookingApi.getBookings();

        setBookings(response.data);
      } catch (error) {
        console.error(error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    if (!keyword) return bookings;

    return bookings.filter((booking) => {
      return (
        booking.reference
          .toLowerCase()
          .includes(keyword) ||
        booking.customer.fullName
          .toLowerCase()
          .includes(keyword) ||
        booking.title
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [bookings, search]);

  const metrics = useMemo(
    () => ({
      total: bookings.length,

      pendingReview: bookings.filter(
        (booking) =>
          (booking.status ?? "NEW") ===
            "NEW" ||
          booking.status ===
            "UNDER_REVIEW"
      ).length,

      paymentPending:
        bookings.filter(
          (booking) =>
            booking.paymentStatus ===
            "PENDING"
        ).length,

      completed: bookings.filter(
        (booking) =>
          booking.status ===
          "COMPLETED"
      ).length,
    }),
    [bookings]
  );

  return (
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
    >
      <AppShell>
        <ModulePage
          title="Booking Management"
          description="Review, price, schedule and manage all patient booking requests."
          actions={
            <button
              onClick={() =>
                router.push(
                  "/dashboard/bookings/new"
                )
              }
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              New Booking
            </button>
          }
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <StatsCard
              title="Total Bookings"
              value={metrics.total}
              subtitle="All booking requests"
            />

            <StatsCard
              title="Pending Review"
              value={metrics.pendingReview}
              subtitle="Awaiting admin review"
            />

            <StatsCard
              title="Payment Pending"
              value={metrics.paymentPending}
              subtitle="Awaiting payment"
            />

            <StatsCard
              title="Completed"
              value={metrics.completed}
              subtitle="Successfully completed"
            />
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by patient, booking reference or service..."
          />

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
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  Loading bookings...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map(
                (booking) => (
                  <tr
                    key={booking.id}
                    onClick={() =>
                      router.push(
                        `/dashboard/bookings/${booking.id}`
                      )
                    }
                    className="cursor-pointer transition-colors hover:bg-slate-50"
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

                    <td className="px-6 py-4 text-sm font-medium">
                      {booking.status ?? "NEW"}
                    </td>

                    <td className="px-6 py-4">
                      <PaymentStatusBadge
                        status={
                          booking.paymentStatus
                        }
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-900">
                      ₹
                      {(
                        booking.quotation
                          ?.finalAmount ??
                        booking.finalAmount ??
                        booking.amount
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                )
              )
            )}
          </DataTable>
                  </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}