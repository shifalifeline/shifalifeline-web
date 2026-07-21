"use client";

import { useMemo, useState } from "react";

import bookingService from "@/services/booking.service";
import { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
}

export default function BookingPricingPanel({
  booking,
}: Props) {
  const [discount, setDiscount] = useState<number>(
    booking.quotation?.manualDiscount ?? 0
  );

  const finalAmount = useMemo(() => {
    const amount = booking.amount - discount;

    return amount < 0 ? 0 : amount;
  }, [booking.amount, discount]);

  const handleSaveQuotation = () => {
    const result = bookingService.applyQuotation(
      booking,
      {
        originalAmount: booking.amount,
        promotionalDiscount: 0,
        manualDiscount: discount,
        finalAmount,
        preparedAt: new Date().toISOString(),
        preparedBy: "Administrator",
      }
    );

    alert(result.message);
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Pricing & Quotation
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Original Amount
          </span>

          <span className="font-semibold">
            ₹{booking.amount.toLocaleString("en-IN")}
          </span>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Promotional / Manual Discount (₹)
          </label>

          <input
            type="number"
            min={0}
            max={booking.amount}
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="font-semibold">
            Final Quotation
          </span>

          <span className="text-xl font-bold text-cyan-700">
            ₹{finalAmount.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSaveQuotation}
          className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white transition hover:bg-cyan-700"
        >
          Save Quotation
        </button>
      </div>
    </div>
  );
}