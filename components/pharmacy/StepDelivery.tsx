"use client";

interface Props {
  deliveryMethod: string;
  address: string;
  preferredTime: string;
  onDeliveryMethodChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onPreferredTimeChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const deliveryOptions = [
  {
    title: "Home Delivery",
    value: "HOME",
    description:
      "Get your medicines delivered to your doorstep (available in selected locations).",
  },
  {
    title: "Store Pickup",
    value: "PICKUP",
    description:
      "Collect your medicines from the nearest SHIFA LIFE LINE Pharmacy.",
  },
];

const preferredTimes = [
  "Morning (8 AM - 12 PM)",
  "Afternoon (12 PM - 4 PM)",
  "Evening (4 PM - 8 PM)",
  "Any Time",
];

export default function StepDelivery({
  deliveryMethod,
  address,
  preferredTime,
  onDeliveryMethodChange,
  onAddressChange,
  onPreferredTimeChange,
  onBack,
  onNext,
}: Props) {
  const valid =
    deliveryMethod !== "" &&
    preferredTime !== "" &&
    (deliveryMethod !== "HOME" ||
      address.trim() !== "");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Delivery Details
        </h2>

        <p className="mt-2 text-slate-600">
          Choose how you would like to receive
          your medicines.
        </p>
      </div>

      <div className="grid gap-4">
        {deliveryOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              onDeliveryMethodChange(option.value)
            }
            className={`rounded-xl border p-5 text-left transition ${
              deliveryMethod === option.value
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

      {deliveryMethod === "HOME" && (
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Delivery Address *
          </label>

          <textarea
            rows={4}
            value={address}
            onChange={(e) =>
              onAddressChange(e.target.value)
            }
            placeholder="Enter your complete delivery address with landmark..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      )}

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Preferred Delivery / Pickup Time *
        </label>

        <select
          value={preferredTime}
          onChange={(e) =>
            onPreferredTimeChange(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
        >
          <option value="">
            Select Preferred Time
          </option>

          {preferredTimes.map((time) => (
            <option
              key={time}
              value={time}
            >
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm text-slate-700">
          Our pharmacy team will verify medicine
          availability and contact you before
          dispatch or pickup confirmation.
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