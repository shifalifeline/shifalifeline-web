"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";

const medicine = {
  code: "MED001",
  name: "Doxofylline 400 mg",
  generic: "Doxofylline",
  brand: "Doxolin",
  manufacturer: "Sun Pharma",
  category: "Respiratory",
  dosageForm: "Tablet",
  strength: "400 mg",
  hsn: "30049099",
  gst: "12%",
  purchasePrice: "₹145.00",
  sellingPrice: "₹190.00",
  mrp: "₹210.00",
  packSize: "10 Tablets",
  reorderLevel: "25",
  prescription: "Yes",
  schedule: "Schedule H",
  retail: "Yes",
  wholesale: "Yes",
  status: "Active",
};

export default function ViewMedicinePage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "PHARMACY"]}>
      <AppShell>
        <ModulePage
          title="Medicine Details"
          description="View complete information about this medicine."
          actions={
            <Link
              href="/dashboard/products"
              className="rounded-lg border border-slate-300 px-5 py-3"
            >
              Back
            </Link>
          }
        >
          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Basic Information
              </h2>

              <Info label="Medicine Code" value={medicine.code} />
              <Info label="Medicine Name" value={medicine.name} />
              <Info label="Generic Name" value={medicine.generic} />
              <Info label="Brand Name" value={medicine.brand} />
              <Info label="Manufacturer" value={medicine.manufacturer} />
              <Info label="Category" value={medicine.category} />
              <Info label="Dosage Form" value={medicine.dosageForm} />
              <Info label="Strength" value={medicine.strength} />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Pricing
              </h2>

              <Info label="Purchase Price" value={medicine.purchasePrice} />
              <Info label="Selling Price" value={medicine.sellingPrice} />
              <Info label="MRP" value={medicine.mrp} />
              <Info label="Pack Size" value={medicine.packSize} />
              <Info label="Reorder Level" value={medicine.reorderLevel} />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Regulatory
              </h2>

              <Info label="HSN Code" value={medicine.hsn} />
              <Info label="GST" value={medicine.gst} />
              <Info label="Drug Schedule" value={medicine.schedule} />
              <Info
                label="Prescription Required"
                value={medicine.prescription}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Availability
              </h2>

              <Info label="Retail" value={medicine.retail} />
              <Info label="Wholesale" value={medicine.wholesale} />
              <Info label="Status" value={medicine.status} />
            </div>

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
    <div className="flex justify-between border-b border-slate-100 py-3">
      <span className="font-medium text-slate-600">
        {label}
      </span>

      <span className="text-slate-900">
        {value}
      </span>
    </div>
  );
}