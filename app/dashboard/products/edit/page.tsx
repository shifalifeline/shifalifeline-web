"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

import {
  Medicine,
  MEDICINES,
} from "@/data/medicines";

export default function EditMedicinePage() {
  const [medicine, setMedicine] =
    useState<Medicine | null>(null);

  useEffect(() => {
    // Temporary: first medicine.
    // Later we'll load using the id from the URL.
    setMedicine(MEDICINES[0]);
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    if (!medicine) return;

    const { name, value, type } = e.target;

    setMedicine({
      ...medicine,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    console.log(medicine);

    alert("Medicine updated successfully (Demo)");
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
          <div className="p-10 text-center">
            Loading...
          </div>
        </AppShell>
      </ProtectedRoute>
    );
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
          title="Edit Medicine"
          description="Update medicine information."
        >
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2"
          >
            <input
              name="medicineName"
              value={medicine.medicineName}
              onChange={handleChange}
              placeholder="Medicine Name"
              className="rounded-lg border p-3"
            />

            <input
              name="genericName"
              value={medicine.genericName}
              onChange={handleChange}
              placeholder="Generic Name"
              className="rounded-lg border p-3"
            />

            <input
              name="brandName"
              value={medicine.brandName}
              onChange={handleChange}
              placeholder="Brand Name"
              className="rounded-lg border p-3"
            />

            <input
              name="manufacturer"
              value={medicine.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer"
              className="rounded-lg border p-3"
            />

            <input
              name="category"
              value={medicine.category}
              onChange={handleChange}
              placeholder="Category"
              className="rounded-lg border p-3"
            />

            <input
              name="strength"
              value={medicine.strength}
              onChange={handleChange}
              placeholder="Strength"
              className="rounded-lg border p-3"
            />

            <input
              name="purchasePrice"
              value={medicine.purchasePrice}
              onChange={handleChange}
              placeholder="Purchase Price"
              className="rounded-lg border p-3"
            />

            <input
              name="sellingPrice"
              value={medicine.sellingPrice}
              onChange={handleChange}
              placeholder="Selling Price"
              className="rounded-lg border p-3"
            />

            <input
              name="mrp"
              value={medicine.mrp}
              onChange={handleChange}
              placeholder="MRP"
              className="rounded-lg border p-3"
            />

            <input
              name="packSize"
              value={medicine.packSize}
              onChange={handleChange}
              placeholder="Pack Size"
              className="rounded-lg border p-3"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="retail"
                checked={medicine.retail}
                onChange={handleChange}
              />
              Available for Retail
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="wholesale"
                checked={medicine.wholesale}
                onChange={handleChange}
              />
              Available for Wholesale
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={medicine.active}
                onChange={handleChange}
              />
              Active
            </label>

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500"
              >
                Update Medicine
              </button>

              <Link
                href="/dashboard/products"
                className="rounded-lg border border-slate-300 px-6 py-3"
              >
                Cancel
              </Link>
            </div>
          </form>
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}