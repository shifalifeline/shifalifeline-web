"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

interface InventoryBatch {
  id: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
}

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
  inventoryBatches: InventoryBatch[];
}

function ViewMedicinePageContent() {
  const searchParams = useSearchParams();
  const medicineId = searchParams.get("id");

  const [medicine, setMedicine] =
    useState<Medicine | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!medicineId) {
      setError("Medicine ID is missing.");
      setLoading(false);
      return;
    }

    loadMedicine(medicineId);
  }, [medicineId]);

  async function loadMedicine(id: string) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/inventory/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to load medicine."
        );
      }

      setMedicine(result.data);
    } catch (error) {
      console.error(
        "Failed to load medicine.",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load medicine."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <ProtectedRoute
        allowedRoles={[
          "ADMIN",
          "PHARMACY",
        ]}
      >
        <AppShell>
          <ModulePage
            title="Medicine Details"
            description="View complete information about this medicine."
          >
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              Loading medicine...
            </div>
          </ModulePage>
        </AppShell>
      </ProtectedRoute>
    );
  }

  if (!medicine) {
    return (
      <ProtectedRoute
        allowedRoles={[
          "ADMIN",
          "PHARMACY",
        ]}
      >
        <AppShell>
          <ModulePage
            title="Medicine Details"
            description="View complete information about this medicine."
          >
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
              {error ||
                "Medicine could not be loaded."}
            </div>

            <Link
              href="/dashboard/products"
              className="mt-4 inline-block rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 hover:bg-slate-50"
            >
              Back to Medicine Master
            </Link>
          </ModulePage>
        </AppShell>
      </ProtectedRoute>
    );
  }

  const totalStock =
    medicine.inventoryBatches.reduce(
      (total, batch) =>
        total + batch.quantity,
      0
    );

  return (
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "PHARMACY",
      ]}
    >
      <AppShell>
        <ModulePage
          title="Medicine Details"
          description="View complete information about this medicine."
          actions={
            <div className="flex gap-2">
              <Link
                href={`/dashboard/products/edit?id=${medicine.id}`}
                className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Edit
              </Link>

              <Link
                href="/dashboard/products"
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Back
              </Link>
            </div>
          }
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Basic Information
              </h2>

              <Info
                label="Medicine Code"
                value={medicine.code}
              />

              <Info
                label="Medicine Name"
                value={medicine.medicineName}
              />

              <Info
                label="Generic Name"
                value={medicine.genericName}
              />

              <Info
                label="Brand Name"
                value={medicine.brandName}
              />

              <Info
                label="Manufacturer"
                value={medicine.manufacturer}
              />

              <Info
                label="Category"
                value={medicine.category}
              />

              <Info
                label="Dosage Form"
                value={medicine.dosageForm}
              />

              <Info
                label="Strength"
                value={medicine.strength}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Pricing & Inventory
              </h2>

              <Info
                label="Purchase Price"
                value={`₹${medicine.purchasePrice.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                )}`}
              />

              <Info
                label="Selling Price"
                value={`₹${medicine.sellingPrice.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                )}`}
              />

              <Info
                label="MRP"
                value={`₹${medicine.mrp.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                )}`}
              />

              <Info
                label="Pack Size"
                value={
                  medicine.packSize || "—"
                }
              />

              <Info
                label="Reorder Level"
                value={String(
                  medicine.reorderLevel
                )}
              />

              <Info
                label="Current Stock"
                value={String(totalStock)}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Regulatory
              </h2>

              <Info
                label="HSN Code"
                value={medicine.hsnCode}
              />

              <Info
                label="GST"
                value={`${medicine.gst}%`}
              />

              <Info
                label="Drug Schedule"
                value={medicine.drugSchedule}
              />

              <Info
                label="Prescription Required"
                value={
                  medicine.prescriptionRequired
                    ? "Yes"
                    : "No"
                }
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Availability
              </h2>

              <Info
                label="Retail"
                value={
                  medicine.retail
                    ? "Yes"
                    : "No"
                }
              />

              <Info
                label="Wholesale"
                value={
                  medicine.wholesale
                    ? "Yes"
                    : "No"
                }
              />

              <Info
                label="Status"
                value={
                  medicine.active
                    ? "Active"
                    : "Inactive"
                }
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Inventory Batches
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current stock by batch and
                expiry date.
              </p>
            </div>

            {medicine.inventoryBatches
              .length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                No inventory batches have
                been received for this
                medicine.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Batch
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Expiry
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Quantity
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Purchase
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Selling
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        MRP
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {medicine.inventoryBatches.map(
                      (batch) => (
                        <tr
                          key={batch.id}
                          className="hover:bg-slate-50"
                        >
                          <td className="px-5 py-4 text-sm font-medium text-slate-900">
                            {
                              batch.batchNumber
                            }
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-700">
                            {new Date(
                              batch.expiryDate
                            ).toLocaleDateString(
                              "en-IN"
                            )}
                          </td>

                          <td className="px-5 py-4 text-right text-sm font-semibold text-slate-900">
                            {batch.quantity}
                          </td>

                          <td className="px-5 py-4 text-right text-sm text-slate-700">
                            ₹
                            {batch.purchasePrice.toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </td>

                          <td className="px-5 py-4 text-right text-sm text-slate-700">
                            ₹
                            {batch.sellingPrice.toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </td>

                          <td className="px-5 py-4 text-right text-sm font-semibold text-slate-900">
                            ₹
                            {batch.mrp.toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-900">
        {value}
      </span>
    </div>
  );
}

export default function ViewMedicinePage() {
  return (
    <Suspense
      fallback={
        <ProtectedRoute
          allowedRoles={["ADMIN", "PHARMACY"]}
        >
          <AppShell>
            <ModulePage
              title="Medicine Details"
              description="View complete information about this medicine."
            >
              <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                Loading medicine...
              </div>
            </ModulePage>
          </AppShell>
        </ProtectedRoute>
      }
    >
      <ViewMedicinePageContent />
    </Suspense>
  );
}