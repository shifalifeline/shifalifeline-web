"use client";

import type { Doctor } from "@/types/doctor.types";
import type { ConsultationMode } from "@/types/booking";

interface Props {
  doctors: Doctor[];
  selectedDoctor: string | null;
  consultationMode: ConsultationMode | "";
  loading: boolean;
  error: string;
  onSelect: (id: string) => void;
  onConsultationModeChange: (
    mode: ConsultationMode
  ) => void;
  onNext: () => void;
}

export default function StepDoctor({
  doctors,
  selectedDoctor,
  consultationMode,
  loading,
  error,
  onSelect,
  onConsultationModeChange,
  onNext,
}: Props) {
  const valid =
    !!selectedDoctor &&
    !!consultationMode;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Book Appointment
      </h2>

      {loading && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-slate-600">
          Loading doctors...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => {
            const name =
              `${doctor.firstName} ${doctor.lastName}`.trim();

            return (
              <button
                key={doctor.id}
                type="button"
                onClick={() =>
                  onSelect(doctor.id)
                }
                className={`rounded-xl border p-5 text-left transition ${
                  selectedDoctor === doctor.id
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-slate-200 bg-white hover:border-cyan-400"
                }`}
              >
                <h3 className="font-semibold text-slate-900">
                  {name}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {doctor.specialty}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {doctor.qualification}
                </p>
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900">
          Consultation Mode
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              onConsultationModeChange("PHYSICAL")
            }
            className={`rounded-lg border p-4 text-left transition ${
              consultationMode === "PHYSICAL"
                ? "border-cyan-600 bg-cyan-50"
                : "border-slate-300 bg-white hover:border-cyan-400"
            }`}
          >
            <p className="font-semibold">
              Physical Consultation
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Visit SHIFA LIFE LINE for consultation.
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              onConsultationModeChange("VIDEO")
            }
            className={`rounded-lg border p-4 text-left transition ${
              consultationMode === "VIDEO"
                ? "border-cyan-600 bg-cyan-50"
                : "border-slate-300 bg-white hover:border-cyan-400"
            }`}
          >
            <p className="font-semibold">
              Video Consultation
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Request a telemedicine consultation.
            </p>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Our team will check the
          doctor&apos;s availability and contact you with
          the confirmed appointment date and time.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white disabled:opacity-40"
        >
          Review Request
        </button>
      </div>
    </div>
  );
}