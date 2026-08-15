"use client";

import { useState } from "react";

import bookingApi from "@/services/booking.api";
import { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
  onScheduled?: (booking: Booking) => void;
}

const sessions = [
  "MORNING",
  "AFTERNOON",
  "EVENING",
] as const;

type Session = (typeof sessions)[number];

export default function BookingSchedulePanel({
  booking,
  onScheduled,
}: Props) {
  const [serviceDate, setServiceDate] = useState(
    booking.schedule?.date ?? ""
  );

  const [session, setSession] =
    useState<Session>(
      booking.schedule?.session ?? "MORNING"
    );

  const [assignedTo, setAssignedTo] = useState(
    booking.schedule?.assignedTo ?? ""
  );

  const [location, setLocation] = useState(
    booking.schedule?.location ?? ""
  );

  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSchedule() {
    setError("");

    if (!serviceDate) {
      setError("Please select an appointment date.");
      return;
    }

    if (!session) {
      setError("Please select an appointment session.");
      return;
    }

    try {
      setSaving(true);

      const response =
        await bookingApi.scheduleBooking(
          booking.id,
          {
            scheduledOn: serviceDate,
            session,
            assignedTo,
            location,
            notes,
          } as any
        );

      const updatedBooking = response.data;

      alert(
        "Appointment scheduled successfully."
      );

      onScheduled?.(updatedBooking);
    } catch (error) {
      console.error(
        "Failed to schedule appointment.",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to schedule appointment."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Appointment Scheduling
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Appointment Date
          </label>

          <input
            type="date"
            value={serviceDate}
            onChange={(e) =>
              setServiceDate(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Session
          </label>

          <select
            value={session}
            onChange={(e) =>
              setSession(
                e.target.value as Session
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          >
            {sessions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Assigned Doctor / Staff
          </label>

          <input
            type="text"
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            placeholder="Enter assigned doctor / staff"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Appointment Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Clinic / SHIFA LIFE LINE"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Scheduling Notes
          </label>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Internal scheduling notes..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          disabled={saving}
          onClick={handleSchedule}
          className="w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Scheduling..."
            : "Schedule Appointment"}
        </button>
      </div>
    </div>
  );
}