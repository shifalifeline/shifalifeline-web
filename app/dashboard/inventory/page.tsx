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

interface StockForm {
  medicineId: string;
  batchNumber: string;
  expiryDate: string;
  quantity: string;
  purchasePrice: string;
  sellingPrice: string;
  mrp: string;
  reference: string;
  remarks: string;
}

interface IssueForm {
  medicineId: string;
  batchId: string;
  quantity: string;
  reference: string;
  remarks: string;
}

const emptyForm: StockForm = {
  medicineId: "",
  batchNumber: "",
  expiryDate: "",
  quantity: "",
  purchasePrice: "",
  sellingPrice: "",
  mrp: "",
  reference: "",
  remarks: "",
};

const emptyIssueForm: IssueForm = {
  medicineId: "",
  batchId: "",
  quantity: "",
  reference: "",
  remarks: "",
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<
    InventoryMedicine[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showReceive, setShowReceive] =
    useState(false);

  const [showIssue, setShowIssue] =
    useState(false);

  const [form, setForm] =
    useState<StockForm>(emptyForm);

  const [issueForm, setIssueForm] =
    useState<IssueForm>(emptyIssueForm);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/inventory"
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
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

    if (!keyword) return inventory;

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
    const totalStock =
      inventory.reduce(
        (total, item) =>
          total + item.totalStock,
        0
      );

    const lowStock =
      inventory.filter(
        (item) => item.lowStock
      ).length;

    const expiringSoon =
      inventory.filter((item) =>
        item.inventoryBatches.some(
          (batch) => {
            const expiry =
              new Date(
                batch.expiryDate
              );

            const days =
              (expiry.getTime() -
                Date.now()) /
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

  const selectedIssueMedicine =
    inventory.find(
      (item) =>
        item.id ===
        issueForm.medicineId
    );

  const availableIssueBatches =
    selectedIssueMedicine?.inventoryBatches.filter(
      (batch) => {
        const expiry =
          new Date(batch.expiryDate);

        return (
          batch.quantity > 0 &&
          expiry.getTime() > Date.now()
        );
      }
    ) ?? [];

  const selectedIssueBatch =
    selectedIssueMedicine?.inventoryBatches.find(
      (batch) =>
        batch.id === issueForm.batchId
    );

  function formatExpiry(date: string) {
    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleIssueChange(
    event: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) {
    const { name, value } =
      event.target;

    setIssueForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "medicineId"
        ? { batchId: "" }
        : {}),
    }));
  }

  async function receiveStock(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.medicineId ||
      !form.batchNumber.trim() ||
      !form.expiryDate ||
      !form.quantity
    ) {
      setError(
        "Medicine, batch number, expiry date and quantity are required."
      );
      return;
    }

    const quantity =
      Number(form.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      setError(
        "Quantity must be a positive whole number."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/inventory/batches",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            medicineId:
              form.medicineId,
            batchNumber:
              form.batchNumber.trim(),
            expiryDate:
              form.expiryDate,
            quantity,
            purchasePrice: Number(
              form.purchasePrice || 0
            ),
            sellingPrice: Number(
              form.sellingPrice || 0
            ),
            mrp: Number(
              form.mrp || 0
            ),
            reference:
              form.reference.trim() ||
              undefined,
            remarks:
              form.remarks.trim() ||
              undefined,
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
            "Unable to receive stock."
        );
      }

      setSuccess(
        "Stock received successfully."
      );

      setForm(emptyForm);
      setShowReceive(false);

      await loadInventory();
    } catch (error) {
      console.error(
        "Failed to receive stock.",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to receive stock."
      );
    } finally {
      setSaving(false);
    }
  }

  async function issueStock(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !issueForm.medicineId ||
      !issueForm.batchId ||
      !issueForm.quantity
    ) {
      setError(
        "Medicine, batch and quantity are required."
      );
      return;
    }

    const quantity =
      Number(issueForm.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      setError(
        "Issue quantity must be a positive whole number."
      );
      return;
    }

    if (!selectedIssueBatch) {
      setError(
        "Please select a valid inventory batch."
      );
      return;
    }

    const expiry =
      new Date(
        selectedIssueBatch.expiryDate
      );

    if (
      expiry.getTime() <= Date.now()
    ) {
      setError(
        "Expired stock cannot be issued."
      );
      return;
    }

    if (
      quantity >
      selectedIssueBatch.quantity
    ) {
      setError(
        `Only ${selectedIssueBatch.quantity} units are available in this batch.`
      );
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/inventory/movements",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            batchId:
              issueForm.batchId,
            type: "ISSUE",
            quantity,
            reference:
              issueForm.reference.trim() ||
              undefined,
            remarks:
              issueForm.remarks.trim() ||
              undefined,
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
            "Unable to issue stock."
        );
      }

      setSuccess(
        `Stock issued successfully. ${quantity} units removed from inventory.`
      );

      setIssueForm(emptyIssueForm);
      setShowIssue(false);

      await loadInventory();
    } catch (error) {
      console.error(
        "Failed to issue stock.",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to issue stock."
      );
    } finally {
      setSaving(false);
    }
  }

  function closeReceive() {
    setShowReceive(false);
    setError("");
    setForm(emptyForm);
  }

  function closeIssue() {
    setShowIssue(false);
    setError("");
    setIssueForm(emptyIssueForm);
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
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/products/add"
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Add Medicine
              </Link>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setShowIssue(false);
                  setShowReceive(true);
                }}
                className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500"
              >
                Receive Stock
              </button>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setShowReceive(false);
                  setShowIssue(true);
                }}
                className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-500"
              >
                Issue Stock
              </button>
            </div>
          }
        >
          {success && (
            <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {success}
            </div>
          )}

          {error &&
            !showReceive &&
            !showIssue && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

          {showReceive && (
            <div className="mb-6 rounded-xl border border-cyan-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Receive Stock
                  </h2>

                  <p className="text-sm text-slate-500">
                    Add stock against a medicine batch.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeReceive}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={receiveStock}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                <select
                  name="medicineId"
                  value={form.medicineId}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  required
                >
                  <option value="">
                    Select Medicine *
                  </option>

                  {inventory
                    .filter(
                      (item) => item.active
                    )
                    .map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.medicineName} —{" "}
                        {item.code}
                      </option>
                    ))}
                </select>

                <input
                  name="batchNumber"
                  placeholder="Batch Number *"
                  value={form.batchNumber}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  required
                />

                <input
                  name="expiryDate"
                  type="date"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  required
                />

                <input
                  name="quantity"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Quantity *"
                  value={form.quantity}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  required
                />

                <input
                  name="purchasePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Purchase Price"
                  value={form.purchasePrice}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />

                <input
                  name="sellingPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Selling Price"
                  value={form.sellingPrice}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />

                <input
                  name="mrp"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="MRP"
                  value={form.mrp}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />

                <input
                  name="reference"
                  placeholder="Reference / Invoice No."
                  value={form.reference}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />

                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  rows={1}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />

                <div className="flex items-center gap-3 md:col-span-2 lg:col-span-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Receiving..."
                      : "Receive Stock"}
                  </button>

                  <button
                    type="button"
                    onClick={closeReceive}
                    className="rounded-lg border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {showIssue && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Issue Stock
                  </h2>

                  <p className="text-sm text-slate-500">
                    Remove stock from an active, non-expired batch.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeIssue}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={issueStock}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                <select
                  name="medicineId"
                  value={issueForm.medicineId}
                  onChange={handleIssueChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  required
                >
                  <option value="">
                    Select Medicine *
                  </option>

                  {inventory
                    .filter(
                      (item) =>
                        item.active &&
                        item.totalStock > 0
                    )
                    .map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.medicineName} — Stock:{" "}
                        {item.totalStock}
                      </option>
                    ))}
                </select>

                <select
                  name="batchId"
                  value={issueForm.batchId}
                  onChange={handleIssueChange}
                  disabled={
                    !issueForm.medicineId
                  }
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:bg-slate-100 disabled:text-slate-400"
                  required
                >
                  <option value="">
                    Select Batch *
                  </option>

                  {availableIssueBatches.map(
                    (batch) => (
                      <option
                        key={batch.id}
                        value={batch.id}
                      >
                        {batch.batchNumber} —{" "}
                        {batch.quantity} units — Exp:{" "}
                        {formatExpiry(
                          batch.expiryDate
                        )}
                      </option>
                    )
                  )}
                </select>

                <input
                  name="quantity"
                  type="number"
                  min="1"
                  step="1"
                  max={
                    selectedIssueBatch?.quantity ??
                    undefined
                  }
                  placeholder="Issue Quantity *"
                  value={issueForm.quantity}
                  onChange={handleIssueChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  required
                />

                <input
                  name="reference"
                  placeholder="Reference / Invoice / Sale No."
                  value={issueForm.reference}
                  onChange={handleIssueChange}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />

                <textarea
                  name="remarks"
                  placeholder="Reason / Remarks"
                  value={issueForm.remarks}
                  onChange={handleIssueChange}
                  rows={1}
                  className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />

                {selectedIssueBatch && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <p className="font-semibold text-slate-900">
                      Available Stock
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {selectedIssueBatch.quantity.toLocaleString(
                        "en-IN"
                      )}{" "}
                      units
                    </p>

                    <p className="text-slate-500">
                      Expiry:{" "}
                      {formatExpiry(
                        selectedIssueBatch.expiryDate
                      )}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3 md:col-span-2 lg:col-span-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Issuing..."
                      : "Issue Stock"}
                  </button>

                  <button
                    type="button"
                    onClick={closeIssue}
                    className="rounded-lg border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mb-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Medicines"
              value={metrics.medicines}
              description="Active medicine master"
            />

            <Metric
              label="Total Stock"
              value={metrics.totalStock.toLocaleString(
                "en-IN"
              )}
              description="Units currently available"
            />

            <Metric
              label="Low Stock"
              value={metrics.lowStock}
              description="Reorder attention required"
              warning
            />

            <Metric
              label="Expiring Soon"
              value={metrics.expiringSoon}
              description="Within next 90 days"
              danger
            />
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
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
              className="mb-5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      {[
                        "Medicine",
                        "Manufacturer",
                        "Batches",
                        "Stock",
                        "Reorder Level",
                        "Earliest Expiry",
                        "Status",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                        >
                          {heading}
                        </th>
                      ))}
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
                                <Link
                                  href={`/dashboard/products/view?id=${item.id}`}
                                  className="font-semibold text-cyan-700 hover:text-cyan-900"
                                >
                                  {item.medicineName}
                                </Link>

                                <div className="text-xs text-slate-500">
                                  {item.code} ·{" "}
                                  {item.packSize}
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-700">
                                {item.manufacturer}
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
                                  className={
                                    item.lowStock
                                      ? "font-semibold text-amber-600"
                                      : "font-semibold text-slate-900"
                                  }
                                >
                                  {item.totalStock.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-700">
                                {item.reorderLevel}
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

function Metric({
  label,
  value,
  description,
  warning,
  danger,
}: {
  label: string;
  value: number | string;
  description: string;
  warning?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${
          warning
            ? "text-amber-600"
            : danger
              ? "text-red-600"
              : "text-slate-900"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}