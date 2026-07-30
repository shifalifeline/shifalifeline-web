"use client";

import { useState } from "react";

import bookingApi from "@/services/booking.api";
import {
  Booking,
  BookingStatus,
} from "@/types/booking";

interface Props {
  booking: Booking;
}

const STATUS_OPTIONS: BookingStatus[] = [
  "NEW",
  "UNDER_REVIEW",
  "QUOTATION_READY",
  "PAYMENT_PENDING",
  "PAYMENT_RECEIVED",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export default function BookingStatusPanel({
  booking,
}: Props) {
  const initialStatus: BookingStatus =
  booking.status ?? "NEW";

const [status, setStatus] =
  useState<BookingStatus>(initialStatus);

  const [saving, setSaving] = useState(false);

  async function handleUpdateStatus() {
    try {
      setSaving(true);

      const response =
        await bookingApi.updateStatus(
          booking.id,
          status
        );

      alert(response.message);
    } catch (error) {
      console.error(error);
      alert("Unable to update booking status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Booking Status
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Current Status
          </label>

          <select
            value={status}
            disabled={saving}
            onChange={(e) =>
              setStatus(
                e.target.value as BookingStatus
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-600"
          >
            {STATUS_OPTIONS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={handleUpdateStatus}
          className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Updating..."
            : "Update Status"}
        </button>
      </div>
    </div>
  );
}