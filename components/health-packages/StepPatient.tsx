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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Patient Details
        </h2>

        <p className="mt-2 text-slate-600">
          Enter the details of the person for whom the
          health package is being booked.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Full Name *
          </label>

          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Mobile Number *
          </label>

          <input
            type="tel"
            name="mobile"
            maxLength={10}
            value={data.mobile}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Alternate Mobile
          </label>

          <input
            type="tel"
            name="alternateMobile"
            maxLength={10}
            value={data.alternateMobile}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Age *
          </label>

          <input
            type="number"
            name="age"
            value={data.age}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Gender *
          </label>

          <select
            name="gender"
            value={data.gender}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            City / Town
          </label>

          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

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