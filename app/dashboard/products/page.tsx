"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

interface Medicine {
  id: string;
  code: string;
  medicineName: string;
  genericName: string;
  brandName: string;
  manufacturer: string;
  category: string;
  dosageForm: string;
  strength: string;
  hsnCode: string;
  gst: number;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  packSize: string;
  reorderLevel: number;
  prescriptionRequired: boolean;
  drugSchedule: string;
  retail: boolean;
  wholesale: boolean;
  active: boolean;
}

function statusBadge(active: boolean) {
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
  const [error, setError] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/inventory",
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to load medicines."
        );
      }

      setMedicines(result.data);
    } catch (error) {
      console.error(
        "Failed to load medicines.",
        error
      );

      setError(
        "Unable to load medicine master."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    id: string,
    medicineName: string
  ) {
    const confirmed = window.confirm(
      `Delete ${medicineName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/inventory/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        window.alert(
          result.message ||
            "Unable to delete medicine."
        );
        return;
      }

      setMedicines((current) =>
        current.filter(
          (medicine) =>
            medicine.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete medicine.",
        error
      );

      window.alert(
        "Unable to delete medicine."
      );
    }
  }

  const filteredMedicines = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return medicines;
    }

    return medicines.filter(
      (medicine) =>
        medicine.medicineName
          .toLowerCase()
          .includes(keyword) ||
        medicine.genericName
          .toLowerCase()
          .includes(keyword) ||
        medicine.brandName
          .toLowerCase()
          .includes(keyword) ||
        medicine.manufacturer
          .toLowerCase()
          .includes(keyword) ||
        medicine.code
          .toLowerCase()
          .includes(keyword) ||
        medicine.category
          .toLowerCase()
          .includes(keyword)
    );
  }, [medicines, search]);

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
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              + Add Medicine
            </Link>
          }
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Medicine Catalogue
                </h2>

                <p className="text-sm text-slate-500">
                  Database-backed medicine master.
                </p>
              </div>

              <button
                type="button"
                onClick={loadMedicines}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Refresh
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search medicine, generic, manufacturer, code..."
              className="mb-5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Code
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Medicine
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Generic
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Manufacturer
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Category
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Business
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        MRP
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Status
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 bg-white">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-10 text-center text-sm text-slate-500"
                        >
                          Loading medicines...
                        </td>
                      </tr>
                    ) : filteredMedicines.length ===
                      0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-10 text-center text-sm text-slate-500"
                        >
                          {search
                            ? "No medicines match your search."
                            : "No medicines found in the database."}
                        </td>
                      </tr>
                    ) : (
                      filteredMedicines.map(
                        (medicine) => (
                          <tr
                            key={medicine.id}
                            className="transition-colors hover:bg-slate-50"
                          >
                            <td className="px-4 py-4 text-sm text-slate-700">
                              {medicine.code}
                            </td>

                            <td className="px-4 py-4">
                              <div className="font-medium text-slate-900">
                                {
                                  medicine.medicineName
                                }
                              </div>

                              <div className="text-xs text-slate-500">
                                {
                                  medicine.brandName
                                }
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-700">
                              {
                                medicine.genericName
                              }
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-700">
                              {
                                medicine.manufacturer
                              }
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-700">
                              {
                                medicine.category
                              }
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-700">
                              {medicine.retail &&
                              medicine.wholesale
                                ? "Retail & Wholesale"
                                : medicine.retail
                                ? "Retail"
                                : medicine.wholesale
                                ? "Wholesale"
                                : "—"}
                            </td>

                            <td className="px-4 py-4 font-semibold text-slate-900">
                              ₹
                              {medicine.mrp.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td className="px-4 py-4">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                                  medicine.active
                                )}`}
                              >
                                {medicine.active
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <Link
                                  href={`/dashboard/products/view?id=${medicine.id}`}
                                  className="rounded bg-cyan-600 px-3 py-1 text-sm text-white transition hover:bg-cyan-700"
                                >
                                  View
                                </Link>

                                <Link
                                  href={`/dashboard/products/edit?id=${medicine.id}`}
                                  className="rounded bg-amber-500 px-3 py-1 text-sm text-white transition hover:bg-amber-600"
                                >
                                  Edit
                                </Link>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      medicine.id,
                                      medicine.medicineName
                                    )
                                  }
                                  className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}