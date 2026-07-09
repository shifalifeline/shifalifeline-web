"use client";

import { useMemo, useState } from "react";
import FormField from "@/components/ui/FormField";
import SelectField from "@/components/ui/SelectField";
import type { CreatePatientRequest, Patient, UpdatePatientRequest } from "@/types/patient.types";

type PatientFormData = CreatePatientRequest;

interface PatientFormProps {
  mode: "create" | "edit";
  initialValues?: Patient;
  loading?: boolean;
  onSubmit: (data: CreatePatientRequest | UpdatePatientRequest) => Promise<void> | void;
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

export default function PatientForm({ mode, initialValues, loading = false, onSubmit }: PatientFormProps) {
  const [form, setForm] = useState<PatientFormData>({
    firstName: initialValues?.firstName ?? "",
    lastName: initialValues?.lastName ?? "",
    phone: initialValues?.phone ?? "",
    email: initialValues?.email ?? "",
    gender: initialValues?.gender ?? "Male",
    age: initialValues?.age ?? 0,
    bloodGroup: initialValues?.bloodGroup ?? "",
    city: initialValues?.city ?? "",
    state: initialValues?.state ?? "",
    status: initialValues?.status ?? "Active",
  });

  const [errors, setErrors] = useState<Record<string,string>>({});

  const isValid = useMemo(() => !!form.firstName && !!form.lastName && form.phone.length===10 && form.age>0,[form]);

  function update(key: keyof PatientFormData, value: any){
    setForm(prev=>({...prev,[key]:value}));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const next: Record<string,string>={};
    if(!form.firstName.trim()) next.firstName="Required";
    if(!form.lastName.trim()) next.lastName="Required";
    if(form.phone.length!==10) next.phone="Phone must be 10 digits";
    if(form.age<=0) next.age="Invalid age";
    setErrors(next);
    if(Object.keys(next).length) return;
    if(mode==="edit" && initialValues){
      await onSubmit({id:initialValues.id,...form});
    } else {
      await onSubmit(form);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="First Name" value={form.firstName} error={errors.firstName} onChange={e=>update("firstName",e.target.value)} />
        <FormField label="Last Name" value={form.lastName} error={errors.lastName} onChange={e=>update("lastName",e.target.value)} />
        <FormField label="Phone" value={form.phone} error={errors.phone} onChange={e=>update("phone",e.target.value)} />
        <FormField label="Email" value={form.email} onChange={e=>update("email",e.target.value)} />
        <SelectField label="Gender" value={form.gender} options={genderOptions} onChange={e=>update("gender",e.target.value)} />
        <FormField type="number" label="Age" value={form.age} error={errors.age} onChange={e=>update("age",Number(e.target.value))} />
        <FormField label="Blood Group" value={form.bloodGroup} onChange={e=>update("bloodGroup",e.target.value)} />
        <SelectField label="Status" value={form.status} options={statusOptions} onChange={e=>update("status",e.target.value)} />
        <FormField label="City" value={form.city} onChange={e=>update("city",e.target.value)} />
        <FormField label="State" value={form.state} onChange={e=>update("state",e.target.value)} />
      </div>
      <button type="submit" disabled={!isValid||loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {loading ? "Saving..." : mode==="create" ? "Create Patient" : "Update Patient"}
      </button>
    </form>
  );
}
