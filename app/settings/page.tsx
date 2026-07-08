"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Settings
            </h1>

            <p className="mt-2 text-slate-400">
              Configure your SHIFA account.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-slate-400">
              Settings module coming in Sprint 22.
            </p>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}