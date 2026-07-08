"use client";

import { navigation } from "@/config/navigation";
import SidebarSection from "./SidebarSection";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-800 bg-slate-900 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          SHIFA LIFE LINE
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Digital Healthcare Platform
        </p>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto p-4">
        {navigation.map((section) => (
          <SidebarSection
            key={section.title || "dashboard"}
            section={section}
          />
        ))}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <p className="font-semibold text-white">
          {user?.name}
        </p>

        <p className="text-sm text-slate-400">
          {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="mt-5 w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}