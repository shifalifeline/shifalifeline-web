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
        <h2 className="text-2xl font-bold text-slate-900">
          Patient Information
        </h2>

        <p className="mt-2 text-slate-600">
          Please provide the patient's details for medicine
          verification, delivery updates and order confirmation.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Full Name *
          </label>

          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={onChange}
            placeholder="Enter full name"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Mobile Number *
          </label>

          <input
            type="tel"
            name="mobile"
            maxLength={10}
            value={data.mobile}
            onChange={onChange}
            placeholder="10-digit mobile number"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Alternate Mobile
          </label>

          <input
            type="tel"
            name="alternateMobile"
            maxLength={10}
            value={data.alternateMobile}
            onChange={onChange}
            placeholder="Optional"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            placeholder="Optional"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Age *
          </label>

          <input
            type="number"
            name="age"
            min={0}
            max={120}
            value={data.age}
            onChange={onChange}
            placeholder="Age"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Gender *
          </label>

          <select
            name="gender"
            value={data.gender}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-slate-700">
            City / Town
          </label>

          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChange}
            placeholder="Enter your city or town"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
        <p className="text-sm text-slate-700">
          Your information is used only for processing your
          medicine order, pharmacist verification, delivery
          updates and customer support.
        </p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>

        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}