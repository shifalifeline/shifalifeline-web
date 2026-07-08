"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome to SHIFA LIFE LINE.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Appointments"
              value="0"
              description="Upcoming appointments"
            />

            <DashboardCard
              title="Patients"
              value="0"
              description="Registered patients"
            />

            <DashboardCard
              title="Doctors"
              value="0"
              description="Available doctors"
            />

            <DashboardCard
              title="Medical Records"
              value="0"
              description="Digital health records"
            />
          </div>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-xl font-semibold text-white">
              System Status
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <StatusCard
                label="Authentication"
                status="Operational"
              />

              <StatusCard
                label="Frontend"
                status="Operational"
              />

              <StatusCard
                label="Backend"
                status="Pending"
              />
            </div>
          </section>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
}

function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-sm uppercase tracking-wide text-slate-400">
        {title}
      </h3>

      <p className="mt-4 text-4xl font-bold text-cyan-400">
        {value}
      </p>

      <p className="mt-3 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

interface StatusCardProps {
  label: string;
  status: string;
}

function StatusCard({
  label,
  status,
}: StatusCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-3 font-semibold text-emerald-400">
        {status}
      </p>
    </div>
  );
}