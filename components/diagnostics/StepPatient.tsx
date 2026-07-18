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
          Patient Details
        </h2>

        <p className="mt-2 text-slate-600">
          Enter the patient's information. Our diagnostic team
          will use these details to contact you regarding sample
          collection and report delivery.
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
            placeholder="City or Town"
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
        <p className="text-sm text-slate-700">
          We respect your privacy. Your information is used only
          for diagnostic booking, communication and report
          delivery.
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