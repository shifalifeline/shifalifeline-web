"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

export default function AddMedicinePage() {
  const [form, setForm] = useState({
    medicineName: "",
    genericName: "",
    brandName: "",
    manufacturer: "",
    category: "",
    dosageForm: "Tablet",
    strength: "",
    hsnCode: "",
    gst: "12",
    drugSchedule: "OTC",
    prescriptionRequired: false,
    purchasePrice: "",
    sellingPrice: "",
    mrp: "",
    retail: true,
    wholesale: true,
    packSize: "",
    reorderLevel: "",
    active: true,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  function saveMedicine(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    console.log(form);

    alert("Medicine saved successfully (Demo)");
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
          title="Add Medicine"
          description="Create a new medicine in the Medicine Master."
        >
          <form
            onSubmit={saveMedicine}
            className="grid gap-5 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2"
          >
            <input
              name="medicineName"
              placeholder="Medicine Name *"
              value={form.medicineName}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="genericName"
              placeholder="Generic Name *"
              value={form.genericName}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="brandName"
              placeholder="Brand Name"
              value={form.brandName}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="manufacturer"
              placeholder="Manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <select
              name="dosageForm"
              value={form.dosageForm}
              onChange={handleChange}
              className="rounded-lg border p-3"
            >
              <option>Tablet</option>
              <option>Capsule</option>
              <option>Syrup</option>
              <option>Injection</option>
              <option>Cream</option>
              <option>Drops</option>
              <option>Powder</option>
            </select>

            <input
              name="strength"
              placeholder="Strength (500 mg)"
              value={form.strength}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="hsnCode"
              placeholder="HSN Code"
              value={form.hsnCode}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="gst"
              placeholder="GST %"
              value={form.gst}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <select
              name="drugSchedule"
              value={form.drugSchedule}
              onChange={handleChange}
              className="rounded-lg border p-3"
            >
              <option>OTC</option>
              <option>Schedule H</option>
              <option>Schedule H1</option>
              <option>Schedule X</option>
            </select>

            <input
              name="purchasePrice"
              placeholder="Purchase Price"
              value={form.purchasePrice}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="sellingPrice"
              placeholder="Selling Price"
              value={form.sellingPrice}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="mrp"
              placeholder="MRP"
              value={form.mrp}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="packSize"
              placeholder="Pack Size"
              value={form.packSize}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="reorderLevel"
              placeholder="Reorder Level"
              value={form.reorderLevel}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={form.prescriptionRequired}
                onChange={handleChange}
              />
              Prescription Required
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="retail"
                checked={form.retail}
                onChange={handleChange}
              />
              Available for Retail
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="wholesale"
                checked={form.wholesale}
                onChange={handleChange}
              />
              Available for Wholesale
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Active
            </label>

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500"
              >
                Save Medicine
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