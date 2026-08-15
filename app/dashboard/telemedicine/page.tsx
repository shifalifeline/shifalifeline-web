"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

import StatsCard from "@/components/ui/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/DataTable";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

import bookingApi from "@/services/booking.api";

interface TelemedicineBooking {
  id: string;
  reference: string;
  type: string;
  title: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  status?: string;
  paymentStatus: string;
  preferredDate?: string | null;
  preferredSession?: string | null;
  consultationMode?: string | null;
  createdAt: string;
  doctor?: {
    firstName: string;
    lastName: string;
    specialty?: string;
  } | null;
}

function statusBadge(status?: string) {
  switch (status) {
    case "SCHEDULED":
      return "bg-emerald-100 text-emerald-700";

    case "PAYMENT_RECEIVED":
      return "bg-blue-100 text-blue-700";

    case "PAYMENT_PENDING":
      return "bg-orange-100 text-orange-700";

    case "QUOTATION_READY":
      return "bg-purple-100 text-purple-700";

    case "UNDER_REVIEW":
      return "bg-yellow-100 text-yellow-700";

    case "COMPLETED":
      return "bg-slate-100 text-slate-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-cyan-100 text-cyan-700";
  }
}

function formatDate(date?: string | null) {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatSession(session?: string | null) {
  if (!session) return "Not specified";

  return session
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export default function TelemedicinePage() {
  const [bookings, setBookings] = useState<
    TelemedicineBooking[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadTelemedicineBookings() {
      try {
        const response =
          await bookingApi.getBookings();

        const data =
          response.data as unknown as TelemedicineBooking[];

        const telemedicine =
          data.filter(
            (booking) =>
              booking.type === "APPOINTMENT" &&
              booking.consultationMode === "VIDEO"
          );

        setBookings(telemedicine);
      } catch (error) {
        console.error(
          "Failed to load telemedicine bookings.",
          error
        );

        setBookings([]);
      } finally {
        setLoading(false);
      }
    }

    loadTelemedicineBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) return bookings;

    return bookings.filter((booking) => {
      const doctorName = booking.doctor
        ? `${booking.doctor.firstName} ${booking.doctor.lastName}`
        : "";

      return (
        booking.reference
          .toLowerCase()
          .includes(keyword) ||
        booking.customerName
          .toLowerCase()
          .includes(keyword) ||
        booking.customerPhone
          .toLowerCase()
          .includes(keyword) ||
        doctorName
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [bookings, search]);

  const metrics = useMemo(
    () => ({
      total: bookings.length,

      newRequests: bookings.filter(
        (booking) =>
          !booking.status ||
          booking.status === "NEW"
      ).length,

      paymentPending: bookings.filter(
        (booking) =>
          booking.paymentStatus ===
            "PENDING" ||
          booking.status ===
            "PAYMENT_PENDING"
      ).length,

      scheduled: bookings.filter(
        (booking) =>
          booking.status === "SCHEDULED"
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
          title="Telemedicine"
          description="Review and manage telemedicine consultation requests submitted by patients."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total Requests"
              value={metrics.total}
              subtitle="All telemedicine requests"
            />

            <StatsCard
              title="New Requests"
              value={metrics.newRequests}
              subtitle="Awaiting admin review"
            />

            <StatsCard
              title="Payment Pending"
              value={metrics.paymentPending}
              subtitle="Awaiting payment"
            />

            <StatsCard
              title="Scheduled"
              value={metrics.scheduled}
              subtitle="Confirmed consultations"
            />
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by patient, mobile, doctor or booking reference..."
          />

          <DataTable
            headers={[
              "Reference",
              "Patient",
              "Doctor",
              "Preferred Date",
              "Session",
              "Status",
              "Payment",
              "Action",
            ]}
          >
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  Loading telemedicine requests...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No telemedicine requests found.
                </td>
              </tr>
            ) : (
              filteredBookings.map(
                (booking) => {
                  const doctorName =
                    booking.doctor
                      ? `${booking.doctor.firstName} ${booking.doctor.lastName}`
                      : "Not assigned";

                  return (
                    <tr
                      key={booking.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {booking.reference}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {booking.customerName}
                        </div>

                        <div className="text-xs text-slate-500">
                          {booking.customerPhone}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {doctorName}
                        </div>

                        {booking.doctor?.specialty && (
                          <div className="text-xs text-slate-500">
                            {booking.doctor.specialty}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {formatDate(
                          booking.preferredDate
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {formatSession(
                          booking.preferredSession
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                            booking.status
                          )}`}
                        >
                          {booking.status ??
                            "NEW"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <PaymentStatusBadge
                          status={
                            booking.paymentStatus as
                              | "PENDING"
                              | "SUCCESS"
                              | "FAILED"
                          }
                        />
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/bookings/${booking.id}`}
                          className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </DataTable>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}