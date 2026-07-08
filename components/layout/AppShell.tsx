"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { navigation } from "@/config/navigation";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const currentPage =
    navigation
      .flatMap((section) => section.items)
      .find((item) => item.href === pathname)?.label ??
    "SHIFA LIFE LINE";

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
          <div>
            <h2 className="text-xl font-semibold">
              {currentPage}
            </h2>

            <p className="text-sm text-slate-400">
              SHIFA LIFE LINE Admin Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-lg border border-slate-700 px-4 py-2 transition hover:bg-slate-800">
              Notifications
            </button>

            <div className="rounded-lg bg-cyan-600 px-4 py-2 font-medium">
              {user?.name}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}