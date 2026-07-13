"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-red-500">
          Access Denied
        </h1>

        <p className="mt-4 text-slate-300">
          You do not have permission to access this page.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-500"
        >
          Return to Dashboard
        </button>
      </div>
    </main>
  );
}