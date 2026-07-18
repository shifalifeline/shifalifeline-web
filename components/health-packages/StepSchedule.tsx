"use client";

interface Props {
  collectionType: string;
  preferredDate: string;
  preferredSession: string;
  onCollectionTypeChange: (value: string) => void;
  onPreferredDateChange: (value: string) => void;
  onPreferredSessionChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const collectionOptions = [
  {
    title: "Home Sample Collection",
    value: "HOME",
    description:
      "Our phlebotomist will visit your location for sample collection.",
  },
  {
    title: "Visit Our Laboratory",
    value: "LAB",
    description:
      "Visit your preferred SHIFA LIFE LINE diagnostic centre.",
  },
];

const sessions = [
  "Morning",
  "Afternoon",
  "Evening",
  "No Preference",
];

export default function StepSchedule({
  collectionType,
  preferredDate,
  preferredSession,
  onCollectionTypeChange,
  onPreferredDateChange,
  onPreferredSessionChange,
  onBack,
  onNext,
}: Props) {
  const valid =
    collectionType !== "" &&
    preferredDate !== "" &&
    preferredSession !== "";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Collection Preference
        </h2>

        <p className="mt-2 text-slate-600">
          Choose how you would like your health package to be completed.
        </p>
      </div>

      <div className="grid gap-4">
        {collectionOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onCollectionTypeChange(option.value)}
            className={`rounded-xl border p-5 text-left transition ${
              collectionType === option.value
                ? "border-cyan-600 bg-cyan-50"
                : "border-slate-300 hover:border-cyan-400"
            }`}
          >
            <h3 className="text-lg font-semibold">
              {option.title}
            </h3>

            <p className="mt-2 text-slate-600">
              {option.description}
            </p>
          </button>
        ))}
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Preferred Date
        </label>

        <input
          type="date"
          value={preferredDate}
          onChange={(e) =>
            onPreferredDateChange(e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Preferred Session
        </label>

        <select
          value={preferredSession}
          onChange={(e) =>
            onPreferredSessionChange(e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 p-3"
        >
          <option value="">Select Session</option>

          {sessions.map((session) => (
            <option
              key={session}
              value={session}
            >
              {session}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm text-slate-700">
          Our team will contact you to confirm the final schedule after your
          booking and payment are completed.
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
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}