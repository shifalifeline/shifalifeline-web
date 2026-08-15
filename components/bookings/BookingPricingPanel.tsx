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
  const initialFee =
    booking.quotation?.originalAmount ??
    booking.amount ??
    0;

  const initialDiscount =
    booking.quotation?.manualDiscount ??
    0;

  const [consultationFee, setConsultationFee] =
    useState<number>(initialFee);

  const [discount, setDiscount] =
    useState<number>(initialDiscount);

  const [remarks, setRemarks] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const payableAmount = useMemo(() => {
    const fee = Math.max(
      0,
      Number(consultationFee) || 0
    );

    const discountAmount = Math.max(
      0,
      Number(discount) || 0
    );

    return Math.max(
      0,
      fee - discountAmount
    );
  }, [consultationFee, discount]);

  async function handleSaveQuotation() {
    if (consultationFee <= 0) {
      alert(
        "Please enter the consultation fee."
      );
      return;
    }

    if (discount > consultationFee) {
      alert(
        "Discount cannot be greater than the consultation fee."
      );
      return;
    }

    try {
      setSaving(true);

      await bookingApi.applyQuotation(
        booking.id,
        {
          originalAmount:
            consultationFee,

          promotionalDiscount: 0,

          manualDiscount: discount,

          finalAmount:
            payableAmount,

          preparedAt:
            new Date().toISOString(),

          preparedBy:
            "Administrator",

          reason:
            remarks || undefined,
        }
      );

      alert(
        "Quotation updated and pushed to the patient."
      );
    } catch (error) {
      console.error(
        "Unable to apply quotation.",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update quotation."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-slate-900">
        Pricing & Quotation
      </h2>

      <p className="mb-5 text-sm text-slate-500">
        Set or update the amount payable by the patient.
      </p>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Consultation / Service Fee (₹)
          </label>

          <input
            type="number"
            min={0}
            step={1}
            value={consultationFee}
            disabled={saving}
            onChange={(e) =>
              setConsultationFee(
                Number(e.target.value)
              )
            }
            placeholder="Enter consultation fee"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-cyan-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Promotional / Manual Discount (₹)
          </label>

          <input
            type="number"
            min={0}
            step={1}
            max={consultationFee}
            value={discount}
            disabled={saving}
            onChange={(e) =>
              setDiscount(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-cyan-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Remarks
          </label>

          <textarea
            rows={3}
            value={remarks}
            disabled={saving}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Optional quotation remarks..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-cyan-600"
          />
        </div>

        <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Consultation / Service Fee
            </span>

            <span className="font-semibold text-slate-900">
              ₹
              {consultationFee.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Discount
            </span>

            <span className="font-semibold text-red-600">
              − ₹
              {discount.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-cyan-200 pt-3">
            <span className="font-semibold text-slate-900">
              Final Payable Amount
            </span>

            <span className="text-xl font-bold text-cyan-700">
              ₹
              {payableAmount.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={
            saving ||
            consultationFee <= 0 ||
            discount > consultationFee
          }
          onClick={handleSaveQuotation}
          className="w-full rounded-lg bg-cyan-600 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Updating & Pushing..."
            : "Update & Push Quotation"}
        </button>
      </div>
    </div>
  );
}