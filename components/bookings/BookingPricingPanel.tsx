"use client";

import { useMemo, useState } from "react";

import bookingApi from "@/services/booking.api";
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

  const [saving, setSaving] = useState(false);

  const payableAmount = useMemo(() => {
    const amount = booking.amount - discount;

    return amount < 0 ? 0 : amount;
  }, [booking.amount, discount]);

  async function handleSaveQuotation() {
    try {
      setSaving(true);

      const response =
        await bookingApi.applyQuotation(
          booking.id,
          {
            originalAmount: booking.amount,
            promotionalDiscount: 0,
            manualDiscount: discount,
            finalAmount: payableAmount,
            preparedAt: new Date().toISOString(),
            preparedBy: "Administrator",
          }
        );

      alert(response.message);
    } catch (error) {
      console.error(error);

      alert("Unable to apply quotation.");
    } finally {
      setSaving(false);
    }
  }

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
            disabled={saving}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-600"
          />
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="font-semibold">
            Final Quotation
          </span>

          <span className="text-xl font-bold text-cyan-700">
            ₹{payableAmount.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={handleSaveQuotation}
          className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Quotation"}
        </button>
      </div>
    </div>
  );
}