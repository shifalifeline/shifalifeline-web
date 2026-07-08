"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface AppShellProps {
  children: ReactNode;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Appointments",
    href: "/appointments",
  },
  {
    label: "Patients",
    href: "/patients",
  },
  {
    label: "Doctors",
    href: "/doctors",
  },
  {
    label: "Medical Records",
    href: "/medical-records",
  },
  {
    label: "Prescriptions",
    href: "/prescriptions",
  },
  {
    label: "Billing",
    href: "/billing",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export default function AppShell({
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="hidden w-72 border-r border-slate-800 bg-slate-900 lg:flex lg:flex-col">
        <div className="border-b border-slate-800 p-6">
          <h1 className="text-2xl font-bold">
            SHIFA LIFE LINE
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Digital Healthcare
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-cyan-600"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-5">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-slate-400">
            {user?.email}
          </p>

          <button
            onClick={handleLogout}
            className="mt-5 w-full rounded-lg bg-red-600 py-2 font-semibold transition hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
          <h2 className="text-xl font-semibold">
            {menuItems.find(
              (item) => item.href === pathname
            )?.label ?? "SHIFA"}
          </h2>

          <div className="flex items-center gap-4">
            <button className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800">
              Notifications
            </button>

            <div className="rounded-lg bg-cyan-600 px-4 py-2">
              {user?.name}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}