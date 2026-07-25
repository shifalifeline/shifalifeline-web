"use client";

import { useMemo, useState } from "react";

import FormField from "@/components/ui/FormField";
import SelectField from "@/components/ui/SelectField";

import type {
  CreateDoctorRequest,
  Doctor,
  UpdateDoctorRequest,
} from "@/types/doctor.types";

type DoctorFormData = CreateDoctorRequest;

interface DoctorFormProps {
  mode: "create" | "edit";
  initialValues?: Doctor;
  loading?: boolean;
  onSubmit: (
    data: CreateDoctorRequest | UpdateDoctorRequest
  ) => Promise<void> | void;
}

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const initialFormState: DoctorFormData = {
  firstName: "",
  lastName: "",
  specialty: "",
  qualification: "",
  experience: undefined,
  registrationNumber: "",
  consultationFee: undefined,
  bio: "",
  photoUrl: "",
  status: "Active",
};

export default function DoctorForm({
  mode,
  initialValues,
  loading = false,
  onSubmit,
}: DoctorFormProps) {
  const [form, setForm] = useState<DoctorFormData>({
    ...initialFormState,
    ...(initialValues
      ? {
          firstName: initialValues.firstName,
          lastName: initialValues.lastName,
          specialty: initialValues.specialty,
          qualification: initialValues.qualification,
          experience: initialValues.experience ?? undefined,
          registrationNumber:
            initialValues.registrationNumber ?? "",
          consultationFee:
            initialValues.consultationFee ?? undefined,
          bio: initialValues.bio ?? "",
          photoUrl: initialValues.photoUrl ?? "",
          status: initialValues.status,
        }
      : {}),
  });

  const [errors] = useState<Record<string, string>>({});

  const isValid = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.specialty.trim().length > 0 &&
      form.qualification.trim().length > 0
    );
  }, [form]);

  function update<K extends keyof DoctorFormData>(
    key: K,
    value: DoctorFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
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
          label="Specialty"
          value={form.specialty}
          error={errors.specialty}
          onChange={(e) => update("specialty", e.target.value)}
        />

        <FormField
          label="Qualification"
          value={form.qualification}
          error={errors.qualification}
          onChange={(e) =>
            update("qualification", e.target.value)
          }
        />

        <FormField
          type="number"
          label="Experience (Years)"
          value={form.experience?.toString() ?? ""}
          onChange={(e) =>
            update(
              "experience",
              e.target.value
                ? Number(e.target.value)
                : undefined
            )
          }
        />

        <FormField
          label="Registration Number"
          value={form.registrationNumber ?? ""}
          onChange={(e) =>
            update("registrationNumber", e.target.value)
          }
        />

        <FormField
          type="number"
          label="Consultation Fee"
          value={form.consultationFee?.toString() ?? ""}
          onChange={(e) =>
            update(
              "consultationFee",
              e.target.value
                ? Number(e.target.value)
                : undefined
            )
          }
        />

        <FormField
          label="Photo URL"
          value={form.photoUrl ?? ""}
          onChange={(e) =>
            update("photoUrl", e.target.value)
          }
        />

        <div className="md:col-span-2">
          <FormField
            label="Bio"
            value={form.bio ?? ""}
            onChange={(e) => update("bio", e.target.value)}
          />
        </div>

        <SelectField
          label="Status"
          value={form.status}
          options={statusOptions}
          onChange={(e) =>
            update(
              "status",
              e.target.value as DoctorFormData["status"]
            )
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
          ? "Create Doctor"
          : "Update Doctor"}
      </button>
    </form>
  );
}