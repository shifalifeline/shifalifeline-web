"use client";

import { useEffect, useMemo, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import StatsCard from "@/components/ui/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/DataTable";

import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";
import BookingStatusBadge from "@/components/bookings/BookingStatusBadge";

import PaymentSummary from "@/components/payment/PaymentSummary";
import PaymentGateway from "@/components/payment/PaymentGateway";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import PaymentFailed from "@/components/payment/PaymentFailed";

import bookingApi from "@/services/booking.api";
import type { Booking } from "@/types/booking";

type PaymentStep =
  | "QUOTATION"
  | "SUMMARY"
  | "GATEWAY"
  | "SUCCESS"
  | "FAILED";

export default function DashboardPage() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [paymentStep, setPaymentStep] =
    useState<PaymentStep>("QUOTATION");

  const [processing, setProcessing] =
    useState(false);

  const [error, setError] =
    useState("");

  const isPatient = true;

  useEffect(() => {
    async function loadBookings() {
      try {
        const response =
          await bookingApi.getBookings();

        setBookings(response.data);
      } catch (err) {
        console.error(
          "Failed to load dashboard bookings.",
          err
        );

        setBookings([]);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

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
          booking.status ===
            "SCHEDULED" ||
          booking.status ===
            "IN_PROGRESS"
      ).length,
    };
  }, [bookings]);

  function getAmount(
    booking: Booking
  ) {
    return (
      booking.quotation
        ?.finalAmount ??
      booking.finalAmount ??
      booking.amount ??
      0
    );
  }

  function openQuotation(
    booking: Booking
  ) {
    setSelectedBooking(booking);
    setPaymentStep("QUOTATION");
    setError("");
  }

  async function acceptQuotation() {
    if (!selectedBooking) {
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const response =
        await bookingApi.updateStatus(
          selectedBooking.id,
          "PAYMENT_PENDING"
        );

      const updated =
        response.data;

      setSelectedBooking(updated);

      setBookings((current) =>
        current.map((booking) =>
          booking.id === updated.id
            ? updated
            : booking
        )
      );

      setPaymentStep("SUMMARY");
    } catch (err) {
      console.error(
        "Unable to accept quotation.",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to proceed to payment."
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handlePaymentSuccess() {
    if (!selectedBooking) {
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const response =
        await bookingApi.processPayment(
          selectedBooking.id,
          "SUCCESS"
        );

      const updated =
        response.data;

      setSelectedBooking(updated);

      setBookings((current) =>
        current.map((booking) =>
          booking.id === updated.id
            ? updated
            : booking
        )
      );

      setPaymentStep("SUCCESS");
    } catch (err) {
      console.error(
        "Unable to confirm payment.",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to confirm payment."
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handlePaymentFailure() {
    if (!selectedBooking) {
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const response =
        await bookingApi.processPayment(
          selectedBooking.id,
          "FAILED"
        );

      const updated =
        response.data;

      setSelectedBooking(updated);

      setBookings((current) =>
        current.map((booking) =>
          booking.id === updated.id
            ? updated
            : booking
        )
      );

      setPaymentStep("FAILED");
    } catch (err) {
      console.error(
        "Unable to update payment status.",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update payment status."
      );
    } finally {
      setProcessing(false);
    }
  }

  function closePaymentFlow() {
    setSelectedBooking(null);
    setPaymentStep("QUOTATION");
    setError("");
  }

  if (
    selectedBooking &&
    paymentStep === "SUMMARY"
  ) {
    const payment = {
      bookingId:
        selectedBooking.reference,

      bookingType:
        selectedBooking.type,

      title:
        selectedBooking.title,

      customerName:
        selectedBooking.customer
          ?.fullName ?? "Patient",

      mobile:
        selectedBooking.customer
          ?.mobile ?? "",

      email:
        selectedBooking.customer
          ?.email,

      amount:
        getAmount(selectedBooking),
    };

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
            title="Payment"
            description="Review the payment amount before continuing."
          >
            <PaymentSummary
              payment={payment}
              onBack={() =>
                setPaymentStep(
                  "QUOTATION"
                )
              }
              onPay={() =>
                setPaymentStep(
                  "GATEWAY"
                )
              }
            />
          </ModulePage>
        </AppShell>
      </ProtectedRoute>
    );
  }

  if (
    selectedBooking &&
    paymentStep === "GATEWAY"
  ) {
    const payment = {
      bookingId:
        selectedBooking.reference,

      bookingType:
        selectedBooking.type,

      title:
        selectedBooking.title,

      customerName:
        selectedBooking.customer
          ?.fullName ?? "Patient",

      mobile:
        selectedBooking.customer
          ?.mobile ?? "",

      email:
        selectedBooking.customer
          ?.email,

      amount:
        getAmount(selectedBooking),
    };

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
            title="Payment"
            description="Select your preferred payment method."
          >
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {processing ? (
              <div className="mx-auto max-w-3xl rounded-xl border bg-white p-10 text-center shadow-sm">
                Processing payment...
              </div>
            ) : (
              <PaymentGateway
                payment={payment}
                onSuccess={
                  handlePaymentSuccess
                }
                onFailure={
                  handlePaymentFailure
                }
                onCancel={() =>
                  setPaymentStep(
                    "SUMMARY"
                  )
                }
              />
            )}
          </ModulePage>
        </AppShell>
      </ProtectedRoute>
    );
  }

  if (
    selectedBooking &&
    paymentStep === "SUCCESS"
  ) {
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
            title="Payment Complete"
            description="Your payment has been recorded."
          >
            <PaymentSuccess
              bookingId={
                selectedBooking.reference
              }
              bookingType={
                selectedBooking.type
              }
              amount={getAmount(
                selectedBooking
              )}
              onBookings={
                closePaymentFlow
              }
              onHome={
                closePaymentFlow
              }
            />
          </ModulePage>
        </AppShell>
      </ProtectedRoute>
    );
  }

  if (
    selectedBooking &&
    paymentStep === "FAILED"
  ) {
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
            title="Payment Failed"
            description="The payment was not completed."
          >
            <PaymentFailed
              bookingId={
                selectedBooking.reference
              }
              amount={getAmount(
                selectedBooking
              )}
              onRetry={() =>
                setPaymentStep(
                  "GATEWAY"
                )
              }
              onChangeGateway={() =>
                setPaymentStep(
                  "GATEWAY"
                )
              }
              onCancel={
                closePaymentFlow
              }
            />
          </ModulePage>
        </AppShell>
      </ProtectedRoute>
    );
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
              value={
                dashboard.pendingReview
              }
              subtitle="Awaiting quotation"
            />

            <StatsCard
              title="Payment Pending"
              value={
                dashboard.paymentPending
              }
              subtitle="Awaiting payment"
            />

            <StatsCard
              title="Scheduled Services"
              value={
                dashboard.scheduled
              }
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
              ...(isPatient
                ? ["Action"]
                : []),
            ]}
          >
            {loading ? (
              <tr>
                <td
                  colSpan={
                    isPatient ? 6 : 5
                  }
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  Loading dashboard...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    isPatient ? 6 : 5
                  }
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings
                .slice(0, 10)
                .map((booking) => {
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
                          openQuotation(
                            booking
                          );
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
                        {booking.customer
                          ?.fullName ??
                          "Patient"}
                      </td>

                      <td className="px-6 py-4">
                        <BookingStatusBadge
                          status={
                            booking.status
                          }
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
                              onClick={(
                                event
                              ) => {
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
                              onClick={(
                                event
                              ) => {
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

          {selectedBooking &&
            paymentStep ===
              "QUOTATION" && (
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
                          {
                            selectedBooking.reference
                          }
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={
                          closePaymentFlow
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
                            {
                              selectedBooking.title
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Booking Type
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {
                              selectedBooking.type
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Patient
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {
                              selectedBooking
                                .customer
                                ?.fullName ??
                              "Patient"
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Mobile
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {
                              selectedBooking
                                .customer
                                ?.mobile ??
                              "—"
                            }
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
                              {
                                selectedBooking
                                  .schedule
                                  .date
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Session
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                              {
                                selectedBooking
                                  .schedule
                                  .session
                              }
                            </p>
                          </div>

                          {selectedBooking
                            .schedule
                            .location && (
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

                          {selectedBooking
                            .schedule
                            .assignedTo && (
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
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                        {error}
                      </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={
                          closePaymentFlow
                        }
                        className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Close
                      </button>

                      {(
                        selectedBooking.status ===
                          "QUOTATION_READY" ||
                        selectedBooking.status ===
                          "PAYMENT_PENDING"
                      ) && (
                        <button
                          type="button"
                          disabled={
                            processing
                          }
                          onClick={
                            selectedBooking.status ===
                            "QUOTATION_READY"
                              ? acceptQuotation
                              : () =>
                                  setPaymentStep(
                                    "SUMMARY"
                                  )
                          }
                          className="rounded-lg bg-cyan-600 px-6 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {processing
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