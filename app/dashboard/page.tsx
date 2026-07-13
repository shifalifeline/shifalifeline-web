"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import StatsCard from "@/components/ui/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/ui/DataTable";

export default function DashboardPage() {
  return (
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "DOCTOR",
        "PATIENT",
        "PHARMACY",
        "DIAGNOSTIC",
        "RETAILER",
      ]}
    >
      <AppShell>
        <ModulePage
          title="Dashboard"
          description="Welcome to SHIFA LIFE LINE. Monitor your healthcare platform from a unified dashboard."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Appointments"
              value={0}
              subtitle="Upcoming appointments"
            />

            <StatsCard
              title="Patients"
              value={0}
              subtitle="Registered patients"
            />

            <StatsCard
              title="Doctors"
              value={0}
              subtitle="Available doctors"
            />

            <StatsCard
              title="Medical Records"
              value={0}
              subtitle="Digital health records"
            />
          </div>

          <SearchBar placeholder="Search patients, doctors or appointments..." />

          <DataTable
            headers={[
              "Module",
              "Status",
              "Last Updated",
              "Remarks",
            ]}
          >
            <tr>
              <td className="px-6 py-4 text-sm text-slate-700">
                Authentication
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Operational
                </span>
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                Just now
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                Healthy
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-slate-700">
                Frontend
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Operational
                </span>
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                Just now
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                Stable
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-slate-700">
                Backend
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  Pending
                </span>
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                —
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                Under development
              </td>
            </tr>
          </DataTable>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}