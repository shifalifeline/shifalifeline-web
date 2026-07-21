"use client";

import { notFound } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

import BookingPriorityBadge from "@/components/bookings/BookingPriorityBadge";
import BookingPricingPanel from "@/components/bookings/BookingPricingPanel";
import BookingStatusPanel from "@/components/bookings/BookingStatusPanel";
import BookingPaymentPanel from "@/components/bookings/BookingPaymentPanel";
import PaymentStatusBadge from "@/components/bookings/PaymentStatusBadge";

import { bookings } from "@/data/bookings";

interface Props {
  params: {
    id: string;
  };
}

export default function BookingDetailsPage({
  params,
}: Props) {
  const booking = bookings.find(
    (item) => item.id === params.id
  );

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
            {/* LEFT COLUMN */}

            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  Booking Summary
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">
                      Booking Reference
                    </p>

                    <p className="font-semibold">
                      {booking.reference}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Service
                    </p>

                    <p>{booking.title}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Booking Type
                    </p>

                    <p>{booking.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Amount
                    </p>

                    <p className="font-semibold">
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

                    <p>
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

                      <p>{booking.assignedTo}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  Patient Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Full Name
                    </p>

                    <p>{booking.customer.fullName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Mobile
                    </p>

                    <p>{booking.customer.mobile}</p>
                  </div>

                  {booking.customer.email && (
                    <div>
                      <p className="text-sm text-slate-500">
                        Email
                      </p>

                      <p>{booking.customer.email}</p>
                    </div>
                  )}

                  {booking.internalNotes && (
                    <div>
                      <p className="text-sm text-slate-500">
                        Internal Notes
                      </p>

                      <p>{booking.internalNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              <BookingPricingPanel booking={booking} />
            </div>

            {/* RIGHT COLUMN */}

            <div className="space-y-6">
              <BookingStatusPanel booking={booking} />

              <BookingPaymentPanel booking={booking} />

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  Current Status
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm text-slate-500">
                      Payment
                    </p>

                    <PaymentStatusBadge
                      status={booking.paymentStatus}
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-slate-500">
                      Priority
                    </p>

                    <BookingPriorityBadge
                      priority={booking.priority}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  Operations
                </h2>

                <div className="grid gap-3">
                  <button className="rounded-lg bg-cyan-600 py-2 font-semibold text-white transition hover:bg-cyan-700">
                    Apply Promotional Pricing
                  </button>

                  <button className="rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700">
                    Generate Payment Link
                  </button>

                  <button className="rounded-lg bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700">
                    Schedule Service
                  </button>

                  <button className="rounded-lg bg-orange-600 py-2 font-semibold text-white transition hover:bg-orange-700">
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