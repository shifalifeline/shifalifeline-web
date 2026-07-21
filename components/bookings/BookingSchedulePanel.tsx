"use client";

import { useState } from "react";

import bookingService from "@/services/booking.service";
import { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
}

const sessions = [
  "MORNING",
  "AFTERNOON",
  "EVENING",
] as const;

type Session = (typeof sessions)[number];

export default function BookingSchedulePanel({
  booking,
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

  const handleSchedule = () => {
    const result =
      bookingService.scheduleBooking(
        booking,
        {
          date: serviceDate,
          session,
          assignedTo,
          location,
        }
      );

    if (!result.success) {
      alert(result.message);
      return;
    }

    console.log(notes);

    alert(result.message);
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Service Scheduling
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Service Date
          </label>

          <input
            type="date"
            value={serviceDate}
            onChange={(e) =>
              setServiceDate(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Session
          </label>

          <select
            value={session}
            onChange={(e) =>
              setSession(
                e.target.value as Session
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
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
          <label className="mb-2 block text-sm font-medium">
            Assign Doctor / Technician
          </label>

          <input
            type="text"
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            placeholder="Enter doctor or technician"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Service Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Clinic / Lab / Home Collection"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Scheduling Notes
          </label>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Internal scheduling notes..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <button
          type="button"
          onClick={handleSchedule}
          className="w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700"
        >
          Schedule Service
        </button>
      </div>
    </div>
  );
}