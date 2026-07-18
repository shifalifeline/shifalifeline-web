"use client";

interface Props {
  collectionType: string;
  preferredDate: string;
  address: string;
  onCollectionTypeChange: (value: string) => void;
  onPreferredDateChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const collectionOptions = [
  {
    title: "Visit SHIFA LIFE LINE",
    value: "CENTER",
    description:
      "Visit our diagnostic centre for sample collection.",
  },
  {
    title: "Home Sample Collection",
    value: "HOME",
    description:
      "Our phlebotomist will visit your home for sample collection (available in selected locations).",
  },
];

export default function StepCollection({
  collectionType,
  preferredDate,
  address,
  onCollectionTypeChange,
  onPreferredDateChange,
  onAddressChange,
  onBack,
  onNext,
}: Props) {
  const valid =
    collectionType !== "" &&
    preferredDate !== "" &&
    (collectionType !== "HOME" ||
      address.trim() !== "");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Sample Collection
        </h2>

        <p className="mt-2 text-slate-600">
          Choose how you would like your
          diagnostic sample to be collected.
        </p>
      </div>

      <div className="grid gap-4">
        {collectionOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              onCollectionTypeChange(option.value)
            }
            className={`rounded-xl border p-5 text-left transition ${
              collectionType === option.value
                ? "border-cyan-600 bg-cyan-50"
                : "border-slate-300 bg-white hover:border-cyan-400"
            }`}
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {option.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {option.description}
            </p>
          </button>
        ))}
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Preferred Collection Date *
        </label>

        <input
          type="date"
          value={preferredDate}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) =>
            onPreferredDateChange(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {collectionType === "HOME" && (
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Home Collection Address *
          </label>

          <textarea
            rows={4}
            value={address}
            onChange={(e) =>
              onAddressChange(
                e.target.value
              )
            }
            placeholder="Enter complete address with landmark..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Home sample
          collection is available only in
          selected locations. Our team will
          call you to confirm the timing and
          availability after receiving your
          request.
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