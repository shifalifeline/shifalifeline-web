"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Billing
            </h1>

            <p className="mt-2 text-slate-400">
              Billing and payment management.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-slate-400">
              Billing module coming in Sprint 21.
            </p>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}