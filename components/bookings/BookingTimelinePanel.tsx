"use client";

import { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
}

export default function BookingTimelinePanel({
  booking,
}: Props) {
  const timeline = booking.timeline ?? [];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Booking Timeline
      </h2>

      {timeline.length === 0 ? (
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No activity available for this booking.
        </div>
      ) : (
        <div className="space-y-5">
          {timeline.map((entry, index) => (
            <div
              key={entry.id}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-cyan-600" />

                {index < timeline.length - 1 && (
                  <div className="mt-1 h-full w-px bg-slate-300" />
                )}
              </div>

              <div className="flex-1 pb-4">
                <h3 className="font-semibold">
                  {entry.title}
                </h3>

                {entry.description && (
                  <p className="mt-1 text-sm text-slate-600">
                    {entry.description}
                  </p>
                )}

                <div className="mt-2 text-xs text-slate-500">
                  <span>
                    By {entry.createdBy}
                  </span>

                  <span className="mx-2">•</span>

                  <span>
                    {new Date(
                      entry.createdAt
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}