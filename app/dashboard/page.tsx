"use client";

import { useEffect, useMemo, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import StatsCard from "@/components/ui/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/DataTable";

import bookingApi from "@/services/booking.api";
import type { Booking } from "@/types/booking";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await bookingApi.getBookings();
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to load dashboard bookings.", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const dashboard = useMemo(() => {
    return {
      total: bookings.length,
      pendingReview: bookings.filter(
        (b) => (b.status ?? "NEW") === "UNDER_REVIEW"
      ).length,
      paymentPending: bookings.filter(
        (b) => b.status === "PAYMENT_PENDING"
      ).length,
      scheduled: bookings.filter(
        (b) =>
          b.status === "SCHEDULED" ||
          b.status === "IN_PROGRESS"
      ).length,
    };
  }, [bookings]);

  return (
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "DOCTOR",
        "PATIENT",
        "PHARMACY",
        "DIAGNOSTIC",
        "RETAILER",
      ]}
    >
      <AppShell>
        <ModulePage
          title="Dashboard"
          description="Monitor bookings, quotations, payments and scheduled healthcare services."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total Bookings"
              value={dashboard.total}
              subtitle="Bookings received"
            />
            <StatsCard
              title="Pending Review"
              value={dashboard.pendingReview}
              subtitle="Awaiting quotation"
            />
            <StatsCard
              title="Payment Pending"
              value={dashboard.paymentPending}
              subtitle="Awaiting payment"
            />
            <StatsCard
              title="Scheduled Services"
              value={dashboard.scheduled}
              subtitle="Scheduled / In Progress"
            />
          </div>

          <SearchBar placeholder="Search bookings, patients, doctors or services..." />

          <DataTable
            headers={[
              "Reference",
              "Service",
              "Customer",
              "Status",
              "Payment",
            ]}
          >
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                  Loading dashboard...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.slice(0, 10).map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.reference}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.customer.fullName}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.status ?? "NEW"}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.paymentStatus}</td>
                </tr>
              ))
            )}
          </DataTable>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}
