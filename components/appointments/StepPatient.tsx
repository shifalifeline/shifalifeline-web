"use client";

interface PatientData {
  fullName: string;
  mobile: string;
  alternateMobile: string;
  email: string;
  age: string;
  gender: string;
  city: string;
}

interface Props {
  data: PatientData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepPatient({
  data,
  onChange,
  onBack,
  onNext,
}: Props) {
  const valid =
    data.fullName.trim() !== "" &&
    /^[6-9]\d{9}$/.test(data.mobile) &&
    data.age.trim() !== "" &&
    data.gender !== "";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Patient Details
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="fullName"
          placeholder="Full Name *"
          value={data.fullName}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-3"
        />

        <input
          name="mobile"
          placeholder="Mobile Number *"
          maxLength={10}
          value={data.mobile}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-3"
        />

        <input
          name="alternateMobile"
          placeholder="Alternate Mobile"
          maxLength={10}
          value={data.alternateMobile}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email (Optional)"
          value={data.email}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-3"
        />

        <input
          name="age"
          placeholder="Age *"
          value={data.age}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-3"
        />

        <select
          name="gender"
          value={data.gender}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-3"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="city"
          placeholder="City"
          value={data.city}
          onChange={onChange}
          className="rounded-lg border border-slate-300 p-3 md:col-span-2"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>

        <button
          disabled={!valid}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}