"use client";

import { useMemo, useState } from "react";

import bookingService from "@/services/booking.service";
import { Booking } from "@/types/booking";

import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  booking: Booking;
}

const gateways = [
  "Razorpay",
  "PhonePe",
  "PayU",
  "Cash",
  "Bank Transfer",
];

export default function BookingPaymentPanel({
  booking,
}: Props) {
  const [gateway, setGateway] = useState("Razorpay");
  const [reference, setReference] = useState("");

  const payableAmount = useMemo(() => {
    return (
      booking.quotation?.finalAmount ??
      booking.finalAmount ??
      booking.amount
    );
  }, [
    booking.amount,
    booking.finalAmount,
    booking.quotation,
  ]);

  const handleGenerateLink = () => {
    const result =
      bookingService.generatePaymentLink(
        booking,
        gateway
      );

    if (!result.success || !result.data) {
      alert(result.message);
      return;
    }

    setReference(result.data.paymentReference);

    alert(result.message);
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Payment Management
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Amount Payable
          </span>

          <span className="text-lg font-bold text-cyan-700">
            ₹{payableAmount.toLocaleString("en-IN")}
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm text-slate-600">
            Payment Status
          </p>

          <PaymentStatusBadge
            status={booking.paymentStatus}
          />
        </div>

        <div>
          <label
            htmlFor="paymentGateway"
            className="mb-2 block text-sm font-medium"
          >
            Payment Gateway
          </label>

          <select
            id="paymentGateway"
            value={gateway}
            onChange={(e) =>
              setGateway(e.target.value)
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

        {reference && (
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Payment Reference
            </p>

            <p className="font-semibold">
              {reference}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerateLink}
          className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700"
        >
          Generate Payment Link
        </button>
      </div>
    </div>
  );
}