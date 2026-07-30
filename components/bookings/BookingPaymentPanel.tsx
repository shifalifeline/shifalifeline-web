"use client";

import { useState } from "react";

import bookingApi from "@/services/booking.api";
import { Booking } from "@/types/booking";

interface BookingPaymentPanelProps {
  booking: Booking;
}

const gateways = [
  "RAZORPAY",
  "PHONEPE",
  "PAYU",
] as const;

export default function BookingPaymentPanel({
  booking,
}: BookingPaymentPanelProps) {
  type PaymentGateway =
  (typeof gateways)[number];

const [gateway, setGateway] =
  useState<PaymentGateway>(gateways[0]);

  const [loading, setLoading] =
    useState(false);

  async function generatePaymentLink() {
    try {
      setLoading(true);

      const response =
        await bookingApi.generatePaymentLink(
          booking.id,
          gateway
        );

      if (
        response.data?.paymentLink
      ) {
        window.open(
          response.data.paymentLink,
          "_blank"
        );
      } else {
        alert(
          "Payment link generated successfully."
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Unable to generate payment link."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Payment
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Payment Status
          </span>

          <span className="font-semibold">
            {booking.paymentStatus}
          </span>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Payment Gateway
          </label>

          <select
            value={gateway}
            disabled={loading}
            onChange={(e) =>
              setGateway(
                e.target.value as
                  (typeof gateways)[number]
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            {gateways.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={generatePaymentLink}
          className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Payment Link"}
        </button>
      </div>
    </div>
  );
}