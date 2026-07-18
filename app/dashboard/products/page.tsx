"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

import { Medicine } from "@/data/medicines";
import {
  getMedicines,
  searchMedicines,
} from "@/lib/services/medicine.service";

function badge(active: boolean) {
  return active
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
}

export default function ProductsPage() {
  const [medicines, setMedicines] = useState<
    Medicine[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    const data = await getMedicines();

    setMedicines(data);

    setLoading(false);
  }

  async function handleSearch(
    value: string
  ) {
    setSearch(value);

    if (!value.trim()) {
      loadMedicines();
      return;
    }

    const result =
      await searchMedicines(value);

    setMedicines(result);
  }

  return (
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "PHARMACY",
      ]}
    >
      <AppShell>
        <ModulePage
          title="Medicine Master"
          description="Manage medicines available for retail and wholesale operations."
          actions={
            <Link
              href="/dashboard/products/add"
              className="rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-500"
            >
              + Add Medicine
            </Link>
          }
        >
          <div className="mb-5">
            <input
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder="Search medicine, generic, manufacturer..."
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

            {loading ? (
              <div className="p-10 text-center">
                Loading...
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      Code
                    </th>

                    <th className="px-4 py-3 text-left">
                      Medicine
                    </th>

                    <th className="px-4 py-3 text-left">
                      Generic
                    </th>

                    <th className="px-4 py-3 text-left">
                      Manufacturer
                    </th>

                    <th className="px-4 py-3 text-left">
                      Category
                    </th>

                    <th className="px-4 py-3 text-left">
                      Business
                    </th>

                    <th className="px-4 py-3 text-left">
                      MRP
                    </th>

                    <th className="px-4 py-3 text-left">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {medicines.map((medicine) => (
                    <tr
                      key={medicine.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-4 py-4">
                        {medicine.code}
                      </td>

                      <td className="px-4 py-4 font-medium">
                        {medicine.medicineName}
                      </td>

                      <td className="px-4 py-4">
                        {medicine.genericName}
                      </td>

                      <td className="px-4 py-4">
                        {medicine.manufacturer}
                      </td>

                      <td className="px-4 py-4">
                        {medicine.category}
                      </td>

                      <td className="px-4 py-4">
                        {medicine.retail &&
                        medicine.wholesale
                          ? "Retail & Wholesale"
                          : medicine.retail
                          ? "Retail"
                          : "Wholesale"}
                      </td>

                      <td className="px-4 py-4">
                        ₹{medicine.mrp}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                            medicine.active
                          )}`}
                        >
                          {medicine.active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="px-4 py-4 flex gap-2">
                        <Link
                          href={`/dashboard/products/view?id=${medicine.id}`}
                          className="rounded bg-cyan-600 px-3 py-1 text-sm text-white"
                        >
                          View
                        </Link>

                        <Link
                          href={`/dashboard/products/edit?id=${medicine.id}`}
                          className="rounded bg-amber-500 px-3 py-1 text-sm text-white"
                        >
                          Edit
                        </Link>

                        <button className="rounded bg-red-600 px-3 py-1 text-sm text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}