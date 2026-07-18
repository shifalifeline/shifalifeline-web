"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import { APPOINTMENTS } from "@/constants/appointments";

function badge(status: string) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";

    case "Completed":
      return "bg-blue-100 text-blue-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function DashboardAppointmentsPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AppShell>
        <ModulePage
          title="Appointment Management"
          description="Manage appointment requests submitted by patients."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    Booking ID
                  </th>

                  <th className="px-4 py-3 text-left">
                    Patient
                  </th>

                  <th className="px-4 py-3 text-left">
                    Doctor
                  </th>

                  <th className="px-4 py-3 text-left">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left">
                    Preferred Session
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {APPOINTMENTS.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-t border-slate-200"
                  >
                    <td className="px-4 py-4 font-medium">
                      {appointment.id}
                    </td>

                    <td className="px-4 py-4">
                      <div className="font-medium">
                        {appointment.patient}
                      </div>

                      <div className="text-sm text-slate-500">
                        {appointment.mobile}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {appointment.doctor}
                    </td>

                    <td className="px-4 py-4">
                      {appointment.date}
                    </td>

                    <td className="px-4 py-4">
                      {appointment.preferredSession}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button className="rounded bg-cyan-600 px-3 py-1 text-sm text-white hover:bg-cyan-500">
                          View
                        </button>

                        <button className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-500">
                          Confirm
                        </button>

                        <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500">
                          Complete
                        </button>

                        <button className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}