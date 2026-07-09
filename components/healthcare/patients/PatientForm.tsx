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
  { label: "Select Gender", value: "" },
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
  age: 0,
  bloodGroup: "",
  city: "",
  state: "",
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
    ...initialValues,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      /^\d{10}$/.test(form.phone) &&
      form.age > 0
    );
  }, [form]);

  function update<K extends keyof PatientFormData>(
    key: K,
    value: PatientFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    const next: Record<string, string> = {};

    if (!form.firstName.trim())
      next.firstName = "First name is required.";

    if (!form.lastName.trim())
      next.lastName = "Last name is required.";

    if (!/^\d{10}$/.test(form.phone))
      next.phone = "Enter a valid 10-digit phone number.";

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      next.email = "Enter a valid email address.";
    }

    if (form.age <= 0)
      next.age = "Age must be greater than 0.";

    setErrors(next);

    if (Object.keys(next).length > 0) return;

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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="First Name"
          value={form.firstName}
          error={errors.firstName}
          onChange={(e) =>
            update("firstName", e.target.value)
          }
        />

        <FormField
          label="Last Name"
          value={form.lastName}
          error={errors.lastName}
          onChange={(e) =>
            update("lastName", e.target.value)
          }
        />

        <FormField
          label="Phone"
          value={form.phone}
          maxLength={10}
          error={errors.phone}
          onChange={(e) =>
            update(
              "phone",
              e.target.value.replace(/\D/g, "")
            )
          }
        />

        <FormField
          label="Email"
          value={form.email}
          error={errors.email}
          onChange={(e) =>
            update("email", e.target.value)
          }
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
          type="number"
          label="Age"
          value={form.age}
          error={errors.age}
          onChange={(e) =>
            update("age", Number(e.target.value))
          }
        />

        <FormField
          label="Blood Group"
          value={form.bloodGroup}
          onChange={(e) =>
            update("bloodGroup", e.target.value)
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

        <FormField
          label="City"
          value={form.city}
          onChange={(e) =>
            update("city", e.target.value)
          }
        />

        <FormField
          label="State"
          value={form.state}
          onChange={(e) =>
            update("state", e.target.value)
          }
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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