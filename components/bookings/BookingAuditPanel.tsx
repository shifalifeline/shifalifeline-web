"use client";

import { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
}

export default function BookingAuditPanel({
  booking,
}: Props) {
  const timeline = booking.timeline ?? [];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Activity Log
      </h2>

      {timeline.length === 0 ? (
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No activity has been recorded.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left">
                  Date & Time
                </th>

                <th className="px-3 py-2 text-left">
                  User
                </th>

                <th className="px-3 py-2 text-left">
                  Activity
                </th>

                <th className="px-3 py-2 text-left">
                  Description
                </th>
              </tr>
            </thead>

            <tbody>
              {timeline.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b"
                >
                  <td className="px-3 py-3">
                    {new Date(
                      entry.createdAt
                    ).toLocaleString("en-IN")}
                  </td>

                  <td className="px-3 py-3">
                    {entry.createdBy}
                  </td>

                  <td className="px-3 py-3 font-medium">
                    {entry.title}
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    {entry.description ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}