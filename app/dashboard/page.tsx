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

import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";
import BookingStatusBadge from "@/components/bookings/BookingStatusBadge";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [processingPayment, setProcessingPayment] =
    useState(false);

  const [paymentMessage, setPaymentMessage] =
    useState("");

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("shifa_user");

      if (!storedUser) {
        return;
      }

      const user = JSON.parse(storedUser);

      const role =
        user?.role ??
        user?.userRole ??
        user?.type ??
        "";

      setUserRole(
        String(role).trim().toUpperCase()
      );
    } catch (error) {
      console.error(
        "Unable to read logged-in user.",
        error
      );
    }
  }, []);

  useEffect(() => {
    async function loadBookings() {
      try {
        const response =
          await bookingApi.getBookings();

        setBookings(response.data);
      } catch (error) {
        console.error(
          "Failed to load dashboard bookings.",
          error
        );

        setBookings([]);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const isPatient = true;
    
  const dashboard = useMemo(() => {
    return {
      total: bookings.length,

      pendingReview: bookings.filter(
        (booking) =>
          (booking.status ?? "NEW") ===
          "UNDER_REVIEW"
      ).length,

      paymentPending: bookings.filter(
        (booking) =>
          booking.status ===
          "PAYMENT_PENDING"
      ).length,

      scheduled: bookings.filter(
        (booking) =>
          booking.status === "SCHEDULED" ||
          booking.status === "IN_PROGRESS"
      ).length,
    };
  }, [bookings]);

  function getAmount(booking: Booking) {
    return (
      booking.quotation?.finalAmount ??
      booking.finalAmount ??
      booking.amount ??
      0
    );
  }

  function openQuotation(booking: Booking) {
    setPaymentMessage("");
    setSelectedBooking(booking);
  }

  async function handlePayment() {
    if (!selectedBooking) {
      return;
    }

    try {
      setProcessingPayment(true);
      setPaymentMessage("");

      const response =
        await bookingApi.generatePaymentLink(
          selectedBooking.id,
          "RAZORPAY"
        );

      if (response.data?.paymentLink) {
        window.location.href =
          response.data.paymentLink;

        return;
      }

      setPaymentMessage(
        "Payment link could not be generated."
      );
    } catch (error) {
      console.error(
        "Unable to start payment.",
        error
      );

      setPaymentMessage(
        error instanceof Error
          ? error.message
          : "Unable to start payment."
      );
    } finally {
      setProcessingPayment(false);
    }
  }

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

          <SearchBar
            placeholder="Search bookings, patients, doctors or services..."
          />

          <DataTable
            headers={[
              "Reference",
              "Service",
              "Customer",
              "Status",
              "Payment",
              ...(isPatient ? ["Action"] : []),
            ]}
          >
            {loading ? (
              <tr>
                <td
                  colSpan={isPatient ? 6 : 5}
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  Loading dashboard...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={isPatient ? 6 : 5}
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.slice(0, 10).map((booking) => {
                const quotationReady =
                  booking.status ===
                  "QUOTATION_READY";

                return (
                  <tr
                    key={booking.id}
                    onClick={() => {
                      if (
                        isPatient &&
                        quotationReady
                      ) {
                        openQuotation(booking);
                      }
                    }}
                    className={
                      isPatient &&
                      quotationReady
                        ? "cursor-pointer border-b border-slate-100 transition hover:bg-cyan-50"
                        : "border-b border-slate-100"
                    }
                  >
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {booking.reference}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {booking.title}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {booking.customer?.fullName ??
                        "Patient"}
                    </td>

                    <td className="px-6 py-4">
                      <BookingStatusBadge
                        status={booking.status}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <PaymentStatusBadge
                        status={
                          booking.paymentStatus
                        }
                      />
                    </td>

                    {isPatient && (
                      <td className="px-6 py-4">
                        {quotationReady ? (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openQuotation(
                                booking
                              );
                            }}
                            className="rounded-lg bg-cyan-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700"
                          >
                            View Quotation
                          </button>
                        ) : booking.status ===
                          "PAYMENT_PENDING" ? (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openQuotation(
                                booking
                              );
                            }}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Proceed to Payment
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">
                            —
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </DataTable>

          {selectedBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
              <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
                <div className="border-b border-slate-200 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Booking Quotation
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Reference:{" "}
                        {selectedBooking.reference}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBooking(null)
                      }
                      className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Service
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {selectedBooking.title}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Booking Type
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {selectedBooking.type}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Patient
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {selectedBooking.customer?.fullName ??
                            "Patient"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Mobile
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {selectedBooking.customer?.mobile ??
                            "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.schedule && (
                    <div className="rounded-xl border border-slate-200 p-5">
                      <h3 className="mb-4 font-semibold text-slate-900">
                        Scheduled Service
                      </h3>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-500">
                            Date
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            {selectedBooking.schedule.date ??
                              "To be confirmed"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-500">
                            Session
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            {selectedBooking.schedule.session ??
                              "To be confirmed"}
                          </p>
                        </div>

                        {selectedBooking.schedule.location && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Location
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                              {
                                selectedBooking
                                  .schedule
                                  .location
                              }
                            </p>
                          </div>
                        )}

                        {selectedBooking.schedule.assignedTo && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Assigned Doctor / Staff
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                              {
                                selectedBooking
                                  .schedule
                                  .assignedTo
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Amount Payable
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Final amount confirmed by SHIFA LIFE LINE
                        </p>
                      </div>

                      <p className="text-2xl font-bold text-cyan-700">
                        ₹
                        {getAmount(
                          selectedBooking
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {selectedBooking.status ===
                    "QUOTATION_READY" && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
                      Please review the service details
                      and final quotation. You can proceed
                      to payment once you accept the quotation.
                    </div>
                  )}

                  {paymentMessage && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                      {paymentMessage}
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBooking(null)
                      }
                      className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Close
                    </button>

                    {(selectedBooking.status ===
                      "QUOTATION_READY" ||
                      selectedBooking.status ===
                        "PAYMENT_PENDING") && (
                      <button
                        type="button"
                        disabled={processingPayment}
                        onClick={handlePayment}
                        className="rounded-lg bg-cyan-600 px-6 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {processingPayment
                          ? "Preparing Payment..."
                          : "Accept & Proceed to Payment"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}