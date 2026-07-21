"use client";

import { useState } from "react";

import {
  Booking,
  BookingStatus,
} from "@/types/booking";

interface BookingStatusPanelProps {
  booking: Booking;
}

const statuses: BookingStatus[] = [
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
}: BookingStatusPanelProps) {
  const [status, setStatus] = useState<BookingStatus>(
    booking.status ?? "NEW"
  );

  const [remarks, setRemarks] = useState("");

  function handleUpdate() {
    // API integration will replace this in a later sprint.
    console.log({
      bookingId: booking.id,
      status,
      remarks,
    });

    alert("Booking status updated (demo).");
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Status Management
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Booking Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as BookingStatus)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-600"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Internal Remarks
          </label>

          <textarea
            rows={4}
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Add internal notes for this status change..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-600"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white transition hover:bg-cyan-700"
        >
          Update Booking Status
        </button>
      </div>
    </div>
  );
}