import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              SHIFA LIFE LINE
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Secure Healthcare Platform
            </p>
          </div>

          {children}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          © 2026 SHIFA LIFE LINE
        </p>
      </div>
    </main>
  );
}