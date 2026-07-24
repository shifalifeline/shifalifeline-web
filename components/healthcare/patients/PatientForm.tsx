"use client";

import { useMemo, useState } from "react";

import FormField from "@/components/ui/FormField";
import SelectField from "@/components/ui/SelectField";

import type {
  CreatePatientRequest,
  Patient,
  UpdatePatientRequest,
} from "@/types/patient.types";

type PatientFormData = CreatePatientRequest;

interface PatientFormProps {
  mode: "create" | "edit";
  initialValues?: Patient;
  loading?: boolean;
  onSubmit: (
    data: CreatePatientRequest | UpdatePatientRequest
  ) => Promise<void> | void;
}

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const initialFormState: PatientFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  gender: "Male",
  dateOfBirth: "",
  bloodGroup: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  emergencyContact: "",
  status: "Active",
};

export default function PatientForm({
  mode,
  initialValues,
  loading = false,
  onSubmit,
}: PatientFormProps) {
  const [form, setForm] = useState<PatientFormData>({
  ...initialFormState,
  ...(initialValues
    ? {
        firstName: initialValues.firstName,
        lastName: initialValues.lastName,
        phone: initialValues.phone,
        email: initialValues.email ?? "",
        gender: initialValues.gender,
        dateOfBirth: initialValues.dateOfBirth ?? "",
        bloodGroup: initialValues.bloodGroup ?? "",
        address: initialValues.address ?? "",
        city: initialValues.city ?? "",
        state: initialValues.state ?? "",
        pinCode: initialValues.pinCode ?? "",
        emergencyContact: initialValues.emergencyContact ?? "",
        status: initialValues.status,
      }
    : {}),
});

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      /^[6-9]\d{9}$/.test(form.phone)
    );
  }, [form]);

  function update<K extends keyof PatientFormData>(
    key: K,
    value: PatientFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValid || loading) return;

    if (mode === "edit" && initialValues) {
      await onSubmit({
        id: initialValues.id,
        ...form,
      });
    } else {
      await onSubmit(form);
      setForm(initialFormState);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="First Name"
          value={form.firstName}
          error={errors.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />

        <FormField
          label="Last Name"
          value={form.lastName}
          error={errors.lastName}
          onChange={(e) => update("lastName", e.target.value)}
        />

        <FormField
          label="Phone"
          value={form.phone}
          maxLength={10}
          error={errors.phone}
          onChange={(e) =>
            update("phone", e.target.value.replace(/\D/g, ""))
          }
        />

        <FormField
          label="Email"
          value={form.email ?? ""}
          error={errors.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <SelectField
          label="Gender"
          value={form.gender}
          options={genderOptions}
          onChange={(e) =>
            update("gender", e.target.value as PatientFormData["gender"])
          }
        />

        <FormField
          type="date"
          label="Date of Birth"
          value={form.dateOfBirth ?? ""}
          onChange={(e) => update("dateOfBirth", e.target.value)}
        />

        <FormField
          label="Blood Group"
          value={form.bloodGroup ?? ""}
          onChange={(e) => update("bloodGroup", e.target.value)}
        />

        <FormField
          label="Address"
          value={form.address ?? ""}
          onChange={(e) => update("address", e.target.value)}
        />

        <FormField
          label="City"
          value={form.city ?? ""}
          onChange={(e) => update("city", e.target.value)}
        />

        <FormField
          label="State"
          value={form.state ?? ""}
          onChange={(e) => update("state", e.target.value)}
        />

        <FormField
          label="PIN Code"
          value={form.pinCode ?? ""}
          onChange={(e) => update("pinCode", e.target.value)}
        />

        <FormField
          label="Emergency Contact"
          value={form.emergencyContact ?? ""}
          onChange={(e) =>
            update("emergencyContact", e.target.value)
          }
        />

        <SelectField
          label="Status"
          value={form.status}
          options={statusOptions}
          onChange={(e) =>
            update("status", e.target.value as PatientFormData["status"])
          }
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Create Patient"
          : "Update Patient"}
      </button>
    </form>
  );
}