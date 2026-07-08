"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                SHIFA LIFE LINE
              </h1>

              <p className="mt-2 text-slate-400">
                Welcome {user?.name}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-5 py-2 font-semibold transition hover:bg-red-500"
            >
              Logout
            </button>
          </header>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="#"
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500"
            >
              <h2 className="text-xl font-semibold">
                Appointments
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Book and manage appointments.
              </p>
            </Link>

            <Link
              href="#"
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500"
            >
              <h2 className="text-xl font-semibold">
                Medical Records
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                View your health history.
              </p>
            </Link>

            <Link
              href="#"
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500"
            >
              <h2 className="text-xl font-semibold">
                Prescriptions
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Access digital prescriptions.
              </p>
            </Link>

            <Link
              href="#"
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500"
            >
              <h2 className="text-xl font-semibold">
                Emergency
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Quick emergency access.
              </p>
            </Link>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}