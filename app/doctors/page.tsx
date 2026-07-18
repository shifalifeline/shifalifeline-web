"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";

const doctorStats = [
  {
    title: "Total Doctors",
    value: "0",
  },
  {
    title: "Active Doctors",
    value: "0",
  },
  {
    title: "Specializations",
    value: "0",
  },
  {
    title: "Appointments Today",
    value: "0",
  },
];

export default function DoctorsPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]}>
      <AppShell>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Doctors
              </h1>

              <p className="mt-2 text-slate-400">
                Manage doctors, profiles, specializations and
                consultation availability.
              </p>
            </div>

            <Link
              href="#"
              className="rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500"
            >
              + Add Doctor
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {doctorStats.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <p className="text-sm text-slate-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-6 py-4">
              <h2 className="font-semibold text-white">
                Doctor Directory
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-slate-400">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-sm text-slate-400">
                      Specialization
                    </th>
                    <th className="px-6 py-4 text-left text-sm text-slate-400">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-left text-sm text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No doctors available.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}