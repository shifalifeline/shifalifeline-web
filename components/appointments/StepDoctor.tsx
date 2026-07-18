"use client";

import { DOCTORS } from "@/constants/doctors";

interface Props {
  selectedDoctor: number | null;
  onSelect: (id: number) => void;
  onNext: () => void;
}

export default function StepDoctor({
  selectedDoctor,
  onSelect,
  onNext,
}: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Select Doctor
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {DOCTORS.map((doctor) => (
          <button
            key={doctor.id}
            type="button"
            onClick={() => onSelect(doctor.id)}
            className={`rounded-xl border p-5 text-left transition ${
              selectedDoctor === doctor.id
                ? "border-cyan-600 bg-cyan-50"
                : "border-slate-200 bg-white hover:border-cyan-400"
            }`}
          >
            <h3 className="font-semibold text-slate-900">
              {doctor.name}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {doctor.speciality}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {doctor.qualification}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selectedDoctor}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}