"use client";

const POPULAR_MEDICINES = [
  "Paracetamol 500 mg",
  "Azithromycin 500 mg",
  "Amoxicillin 500 mg",
  "Pantoprazole 40 mg",
  "Dolo 650",
  "Telmisartan 40 mg",
  "Metformin 500 mg",
  "Amlodipine 5 mg",
  "Atorvastatin 10 mg",
  "Rosuvastatin 10 mg",
  "Vitamin D3",
  "Calcium Tablets",
  "Iron Tablets",
  "ORS",
  "Insulin",
  "Nebulizer Solution",
  "Blood Glucose Strips",
  "Surgical Items",
  "Other Medicines",
];

interface Props {
  medicines: string[];
  onToggle: (medicine: string) => void;
  onNext: () => void;
}

export default function StepMedicines({
  medicines,
  onToggle,
  onNext,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Select Medicines
        </h2>

        <p className="mt-2 text-slate-600">
          Select one or more medicines you wish to purchase.
          If your medicine is not listed, select
          <strong> Other Medicines</strong>.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {POPULAR_MEDICINES.map((medicine) => {
          const selected =
            medicines.includes(medicine);

          return (
            <button
              key={medicine}
              type="button"
              onClick={() => onToggle(medicine)}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-slate-300 bg-white hover:border-cyan-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{medicine}</span>

                {selected && (
                  <span className="text-cyan-600 text-xl">
                    ✓
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-slate-700">
          Can't find your medicine? Select
          <strong> Other Medicines</strong>.
          Our pharmacy team will call you and assist with
          availability and suitable alternatives, if needed.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={medicines.length === 0}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}