"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

import BookingPriorityBadge from "@/components/bookings/BookingPriorityBadge";
import BookingPricingPanel from "@/components/bookings/BookingPricingPanel";
import BookingStatusPanel from "@/components/bookings/BookingStatusPanel";
import BookingPaymentPanel from "@/components/bookings/BookingPaymentPanel";
import BookingSchedulePanel from "@/components/bookings/BookingSchedulePanel";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

import bookingApi from "@/services/booking.api";
import { Booking } from "@/types/booking";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function BookingDetailsPage({
  params,
}: Props) {
  const { id } = use(params);

  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [declining, setDeclining] =
    useState(false);

  const [actionError, setActionError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function loadBooking() {
      try {
        const response =
          await bookingApi.getBooking(id);

        if (mounted) {
          setBooking(response.data);
        }
      } catch (error) {
        console.error(error);
        setBooking(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadBooking();

    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleDecline() {
    if (!booking) return;

    const confirmed = window.confirm(
      "Are you sure you want to decline this appointment request?"
    );

    if (!confirmed) return;

    try {
      setDeclining(true);
      setActionError("");

      const response =
        await bookingApi.updateStatus(
          booking.id,
          "CANCELLED"
        );

      setBooking(response.data);

      alert(
        "Appointment request declined."
      );
    } catch (error) {
      console.error(
        "Failed to decline booking.",
        error
      );

      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to decline appointment."
      );
    } finally {
      setDeclining(false);
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AppShell>
          <ModulePage
            title="Loading Booking..."
            description="Fetching booking details."
          >
            <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
              Loading booking...
            </div>
          </ModulePage>
        </AppShell>
      </ProtectedRoute>
    );
  }

  if (!booking) {
    notFound();
  }

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AppShell>
        <ModulePage
          title={`Booking ${booking.reference}`}
          description="Review and manage this booking."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Booking Summary
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">
                      Booking Reference
                    </p>

                    <p className="font-semibold text-slate-900">
                      {booking.reference}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Service
                    </p>

                    <p className="text-slate-900">
                      {booking.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Booking Type
                    </p>

                    <p className="text-slate-900">
                      {booking.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Amount
                    </p>

                    <p className="font-semibold text-slate-900">
                      ₹
                      {(
                        booking.quotation?.finalAmount ??
                        booking.finalAmount ??
                        booking.amount
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Created
                    </p>

                    <p className="text-slate-900">
                      {new Date(
                        booking.createdAt
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {booking.assignedTo && (
                    <div>
                      <p className="text-sm text-slate-500">
                        Assigned To
                      </p>

                      <p className="text-slate-900">
                        {booking.assignedTo}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Patient Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Full Name
                    </p>

                    <p className="text-slate-900">
                      {booking.customer.fullName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Mobile
                    </p>

                    <p className="text-slate-900">
                      {booking.customer.mobile}
                    </p>
                  </div>

                  {booking.customer.email && (
                    <div>
                      <p className="text-sm text-slate-500">
                        Email
                      </p>

                      <p className="text-slate-900">
                        {booking.customer.email}
                      </p>
                    </div>
                  )}

                  {booking.internalNotes && (
                    <div>
                      <p className="text-sm text-slate-500">
                        Internal Notes
                      </p>

                      <p className="text-slate-900">
                        {booking.internalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <BookingPricingPanel
                booking={booking}
              />

              {booking.type === "APPOINTMENT" && (
                <BookingSchedulePanel
                  booking={booking}
                  onScheduled={(updatedBooking) => {
                    setBooking(updatedBooking);
                  }}
                />
              )}
            </div>

            <div className="space-y-6">
              <BookingStatusPanel
                booking={booking}
              />

              <BookingPaymentPanel
                booking={booking}
              />

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Current Status
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm text-slate-500">
                      Payment
                    </p>

                    <PaymentStatusBadge
                      status={
                        booking.paymentStatus
                      }
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-slate-500">
                      Priority
                    </p>

                    <BookingPriorityBadge
                      priority={
                        booking.priority ??
                        "NORMAL"
                      }
                    />
                  </div>
                </div>
              </div>

              {booking.type === "APPOINTMENT" && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">
                    Appointment Decision
                  </h2>

                  {actionError && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {actionError}
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={
                      declining ||
                      booking.status ===
                        "CANCELLED" ||
                      booking.status ===
                        "COMPLETED"
                    }
                    onClick={handleDecline}
                    className="w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {declining
                      ? "Declining..."
                      : booking.status ===
                          "CANCELLED"
                        ? "Appointment Declined"
                        : "Decline Appointment"}
                  </button>
                </div>
              )}

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Operations
                </h2>

                <div className="grid gap-3">
                  <button
                    type="button"
                    className="rounded-lg bg-cyan-600 py-2 font-semibold text-white transition hover:bg-cyan-700"
                  >
                    Apply Promotional Pricing
                  </button>

                  <button
                    type="button"
                    className="rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Generate Payment Link
                  </button>

                  <button
                    type="button"
                    className="rounded-lg bg-orange-600 py-2 font-semibold text-white transition hover:bg-orange-700"
                  >
                    Notify Patient
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}