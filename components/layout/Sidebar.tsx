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

  const filteredNavigation = navigation
    .map((section) => {
      const items = section.items.filter((item) => {
        if (!user) return false;

        if (user.role === "ADMIN") return true;

        switch (item.label) {
          case "Dashboard":
            return true;

          case "Patients":
          case "Doctors":
          case "Appointments":
          case "EMR":
            return (
              user.role === "DOCTOR" ||
              user.role === "PATIENT"
            );

          case "Prescriptions":
            return (
              user.role === "DOCTOR" ||
              user.role === "PHARMACY"
            );

          case "Laboratory":
          case "Test Catalogue":
          case "Diagnostic Bookings":
            return user.role === "DIAGNOSTIC";

          case "Products":
          case "Categories":
          case "Inventory":
          case "Suppliers":
          case "Purchase Orders":
            return (
              user.role === "PHARMACY" ||
              user.role === "RETAILER"
            );

          default:
            return false;
        }
      });

      return {
        ...section,
        items,
      };
    })
    .filter((section) => section.items.length > 0);

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
        {filteredNavigation.map((section) => (
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

        <p className="text-sm uppercase text-cyan-400">
          {user?.role}
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