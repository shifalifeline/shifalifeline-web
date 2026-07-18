"use client";

export interface HealthPackage {
  id: string;
  name: string;
  price: number;
  tests: number;
  homeCollection: boolean;
  description: string;
}

interface Props {
  packages: HealthPackage[];
  selectedPackage: HealthPackage | null;
  onSelect: (pkg: HealthPackage) => void;
  onNext: () => void;
}

export default function StepPackages({
  packages,
  selectedPackage,
  onSelect,
  onNext,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Choose a Health Package
        </h2>

        <p className="mt-2 text-slate-600">
          Select the package that best suits your healthcare needs.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => onSelect(pkg)}
            className={`rounded-xl border p-6 text-left transition ${
              selectedPackage?.id === pkg.id
                ? "border-cyan-600 bg-cyan-50"
                : "border-slate-300 hover:border-cyan-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {pkg.name}
              </h3>

              <span className="font-bold text-cyan-700">
                ₹{pkg.price}
              </span>
            </div>

            <p className="mt-3 text-slate-600">
              {pkg.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded bg-slate-100 px-3 py-1">
                {pkg.tests} Tests
              </span>

              {pkg.homeCollection && (
                <span className="rounded bg-emerald-100 px-3 py-1 text-emerald-700">
                  Home Collection
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selectedPackage}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}