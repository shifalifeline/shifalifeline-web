"use client";

import { useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

interface MedicineForm {
  medicineName: string;
  genericName: string;
  brandName: string;
  manufacturer: string;
  category: string;
  dosageForm: string;
  strength: string;
  hsnCode: string;
  gst: string;
  drugSchedule: string;
  prescriptionRequired: boolean;
  purchasePrice: string;
  sellingPrice: string;
  mrp: string;
  packSize: string;
  reorderLevel: string;
  retail: boolean;
  wholesale: boolean;
  active: boolean;
}

const initialForm: MedicineForm = {
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
  packSize: "",
  reorderLevel: "",
  retail: true,
  wholesale: true,
  active: true,
};

const fieldClass =
  "rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100";

function generateMedicineCode() {
  return `MED${Date.now().toString().slice(-8)}`;
}

export default function AddMedicinePage() {
  const [form, setForm] =
    useState<MedicineForm>(initialForm);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (
              event.target as HTMLInputElement
            ).checked
          : value,
    }));
  }

  function validateForm() {
    if (!form.medicineName.trim()) {
      return "Medicine name is required.";
    }

    if (!form.genericName.trim()) {
      return "Generic name is required.";
    }

    if (!form.brandName.trim()) {
      return "Brand name is required.";
    }

    if (!form.manufacturer.trim()) {
      return "Manufacturer is required.";
    }

    if (!form.category.trim()) {
      return "Category is required.";
    }

    if (!form.dosageForm.trim()) {
      return "Dosage form is required.";
    }

    if (!form.strength.trim()) {
      return "Strength is required.";
    }

    if (!form.hsnCode.trim()) {
      return "HSN code is required.";
    }

    const gst = Number(form.gst);
    const purchasePrice = Number(
      form.purchasePrice
    );
    const sellingPrice = Number(
      form.sellingPrice
    );
    const mrp = Number(form.mrp);
    const reorderLevel = Number(
      form.reorderLevel || 0
    );

    if (!Number.isFinite(gst) || gst < 0) {
      return "Enter a valid GST percentage.";
    }

    if (
      !Number.isFinite(purchasePrice) ||
      purchasePrice < 0
    ) {
      return "Enter a valid purchase price.";
    }

    if (
      !Number.isFinite(sellingPrice) ||
      sellingPrice < 0
    ) {
      return "Enter a valid selling price.";
    }

    if (!Number.isFinite(mrp) || mrp < 0) {
      return "Enter a valid MRP.";
    }

    if (
      !Number.isFinite(reorderLevel) ||
      reorderLevel < 0
    ) {
      return "Enter a valid reorder level.";
    }

    return null;
  }

  async function saveMedicine(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/inventory",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            code: generateMedicineCode(),
            medicineName:
              form.medicineName.trim(),
            genericName:
              form.genericName.trim(),
            brandName:
              form.brandName.trim(),
            manufacturer:
              form.manufacturer.trim(),
            category:
              form.category.trim(),
            dosageForm:
              form.dosageForm,
            strength:
              form.strength.trim(),
            hsnCode:
              form.hsnCode.trim(),
            gst: Number(form.gst),
            purchasePrice:
              Number(form.purchasePrice),
            sellingPrice:
              Number(form.sellingPrice),
            mrp: Number(form.mrp),
            packSize:
              form.packSize.trim(),
            reorderLevel:
              Number(
                form.reorderLevel || 0
              ),
            prescriptionRequired:
              form.prescriptionRequired,
            drugSchedule:
              form.drugSchedule,
            retail: form.retail,
            wholesale: form.wholesale,
            active: form.active,
          }),
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
            "Unable to save medicine."
        );
      }

      window.location.href =
        "/dashboard/products";
    } catch (error) {
      console.error(
        "Failed to save medicine.",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to save medicine."
      );
    } finally {
      setSaving(false);
    }
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
          description="Create a medicine in the SHIFA Medicine Master."
        >
          <form
            onSubmit={saveMedicine}
            className="space-y-6"
          >
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Medicine Information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="medicineName"
                  placeholder="Medicine Name *"
                  value={form.medicineName}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="genericName"
                  placeholder="Generic Name *"
                  value={form.genericName}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="brandName"
                  placeholder="Brand Name *"
                  value={form.brandName}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="manufacturer"
                  placeholder="Manufacturer *"
                  value={form.manufacturer}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="category"
                  placeholder="Category *"
                  value={form.category}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <select
                  name="dosageForm"
                  value={form.dosageForm}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option>Tablet</option>
                  <option>Capsule</option>
                  <option>Syrup</option>
                  <option>Injection</option>
                  <option>Cream</option>
                  <option>Drops</option>
                  <option>Powder</option>
                  <option>Inhaler</option>
                  <option>Suspension</option>
                  <option>Other</option>
                </select>

                <input
                  name="strength"
                  placeholder="Strength (e.g. 500 mg) *"
                  value={form.strength}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="packSize"
                  placeholder="Pack Size"
                  value={form.packSize}
                  onChange={handleChange}
                  className={fieldClass}
                />

                <input
                  name="hsnCode"
                  placeholder="HSN Code *"
                  value={form.hsnCode}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="gst"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="GST %"
                  value={form.gst}
                  onChange={handleChange}
                  className={fieldClass}
                />

                <select
                  name="drugSchedule"
                  value={form.drugSchedule}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option>OTC</option>
                  <option>Schedule H</option>
                  <option>Schedule H1</option>
                  <option>Schedule X</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Pricing & Inventory Settings
              </h2>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <input
                  name="purchasePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Purchase Price *"
                  value={form.purchasePrice}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="sellingPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Selling Price *"
                  value={form.sellingPrice}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="mrp"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="MRP *"
                  value={form.mrp}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <input
                  name="reorderLevel"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Reorder Level"
                  value={form.reorderLevel}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Availability & Compliance
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="prescriptionRequired"
                    checked={
                      form.prescriptionRequired
                    }
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Prescription Required
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="retail"
                    checked={form.retail}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Available for Retail
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="wholesale"
                    checked={form.wholesale}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Available for Wholesale
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="active"
                    checked={form.active}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Active
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Medicine"}
              </button>

              <Link
                href="/dashboard/products"
                className="rounded-lg border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-50"
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