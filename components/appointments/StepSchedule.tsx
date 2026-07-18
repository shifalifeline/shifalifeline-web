"use client";

interface Props {
  availableDates: string[];
  date: string;
  slot: string;
  onDateChange: (value: string) => void;
  onSlotChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const sessions = [
  "Morning",
  "Afternoon",
  "Evening",
  "No Preference",
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function StepSchedule({
  availableDates,
  date,
  slot,
  onDateChange,
  onSlotChange,
  onBack,
  onNext,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Select Appointment Date
        </h2>

        <p className="mt-2 text-slate-600">
          Choose one of the available dates published by our
          scheduling team.
        </p>
      </div>

      <div>
        <label className="mb-3 block font-medium text-slate-700">
          Available Dates
        </label>

        {availableDates.length === 0 ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            No appointment dates are currently available for
            this doctor.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {availableDates.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onDateChange(item)}
                className={`rounded-lg border p-4 text-left transition ${
                  date === item
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-slate-300 hover:border-cyan-400"
                }`}
              >
                {formatDate(item)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="mb-3 block font-medium text-slate-700">
          Preferred Session
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          {sessions.map((session) => (
            <button
              key={session}
              type="button"
              onClick={() => onSlotChange(session)}
              className={`rounded-lg border p-4 text-left transition ${
                slot === session
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-slate-300 hover:border-cyan-400"
              }`}
            >
              {session}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Your appointment request will
          be reviewed by our team. The exact consultation time
          will be communicated via Phone, SMS or WhatsApp after
          confirmation.
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>

        <button
          disabled={
            availableDates.length === 0 ||
            !date ||
            !slot
          }
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}