"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

interface InventoryBatch {
  id: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
}

interface InventoryMedicine {
  id: string;
  code: string;
  medicineName: string;
  genericName: string;
  manufacturer: string;
  category: string;
  packSize: string;
  mrp: number;
  reorderLevel: number;
  active: boolean;
  inventoryBatches: InventoryBatch[];
  totalStock: number;
  lowStock: boolean;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<
    InventoryMedicine[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    try {
      setLoading(true);

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
            "Unable to load inventory."
        );
      }

      setInventory(result.data);
    } catch (error) {
      console.error(
        "Failed to load inventory.",
        error
      );

      setInventory([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredInventory = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return inventory;
    }

    return inventory.filter(
      (item) =>
        item.medicineName
          .toLowerCase()
          .includes(keyword) ||
        item.genericName
          .toLowerCase()
          .includes(keyword) ||
        item.code
          .toLowerCase()
          .includes(keyword) ||
        item.manufacturer
          .toLowerCase()
          .includes(keyword) ||
        item.category
          .toLowerCase()
          .includes(keyword)
    );
  }, [inventory, search]);

  const metrics = useMemo(() => {
    const totalStock = inventory.reduce(
      (total, item) =>
        total + item.totalStock,
      0
    );

    const lowStock = inventory.filter(
      (item) => item.lowStock
    ).length;

    const expiringSoon = inventory.filter(
      (item) =>
        item.inventoryBatches.some(
          (batch) => {
            const expiry = new Date(
              batch.expiryDate
            );

            const today = new Date();

            const days =
              (expiry.getTime() -
                today.getTime()) /
              (1000 * 60 * 60 * 24);

            return (
              days >= 0 &&
              days <= 90 &&
              batch.quantity > 0
            );
          }
        )
    ).length;

    return {
      medicines: inventory.length,
      totalStock,
      lowStock,
      expiringSoon,
    };
  }, [inventory]);

  function formatExpiry(
    date: string
  ) {
    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
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
          title="Inventory Management"
          description="Monitor medicine stock, batches, expiry and reorder requirements."
          actions={
            <Link
              href="/dashboard/products/add"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add Medicine
            </Link>
          }
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Medicines
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {metrics.medicines}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Active medicine master
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total Stock
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {metrics.totalStock.toLocaleString(
                  "en-IN"
                )}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Units currently available
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Low Stock
              </p>

              <p className="mt-2 text-3xl font-bold text-amber-600">
                {metrics.lowStock}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Reorder attention required
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Expiring Soon
              </p>

              <p className="mt-2 text-3xl font-bold text-red-600">
                {metrics.expiringSoon}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Within next 90 days
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Current Inventory
                </h2>

                <p className="text-sm text-slate-500">
                  Stock position by medicine and batch.
                </p>
              </div>

              <button
                type="button"
                onClick={loadInventory}
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
              placeholder="Search medicine, generic, code or manufacturer..."
              className="mb-5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Medicine
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Manufacturer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Batches
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Stock
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Reorder Level
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Earliest Expiry
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 bg-white">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-10 text-center text-sm text-slate-500"
                        >
                          Loading inventory...
                        </td>
                      </tr>
                    ) : filteredInventory.length ===
                      0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-10 text-center text-sm text-slate-500"
                        >
                          {search
                            ? "No medicines match your search."
                            : "No inventory records found."}
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map(
                        (item) => {
                          const firstBatch =
                            item.inventoryBatches[0];

                          return (
                            <tr
                              key={item.id}
                              className="transition hover:bg-slate-50"
                            >
                              <td className="px-5 py-4">
                                <div className="font-semibold text-slate-900">
                                  {
                                    item.medicineName
                                  }
                                </div>

                                <div className="text-xs text-slate-500">
                                  {
                                    item.code
                                  }{" "}
                                  ·{" "}
                                  {
                                    item.packSize
                                  }
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-700">
                                {
                                  item.manufacturer
                                }
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-700">
                                {
                                  item
                                    .inventoryBatches
                                    .length
                                }
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`font-semibold ${
                                    item.lowStock
                                      ? "text-amber-600"
                                      : "text-slate-900"
                                  }`}
                                >
                                  {item.totalStock.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-700">
                                {
                                  item.reorderLevel
                                }
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-700">
                                {firstBatch
                                  ? formatExpiry(
                                      firstBatch.expiryDate
                                    )
                                  : "—"}
                              </td>

                              <td className="px-5 py-4">
                                {item.lowStock ? (
                                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                    Low Stock
                                  </span>
                                ) : item.totalStock >
                                  0 ? (
                                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                    Out of Stock
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        }
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