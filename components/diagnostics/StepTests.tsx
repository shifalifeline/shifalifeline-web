"use client";

const AVAILABLE_TESTS = [
  "Complete Blood Count (CBC)",
  "Blood Sugar (FBS)",
  "Post Prandial Blood Sugar (PPBS)",
  "HbA1c",
  "Lipid Profile",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Thyroid Profile (T3, T4, TSH)",
  "Vitamin D",
  "Vitamin B12",
  "Iron Profile",
  "Urine Routine Examination",
  "Stool Examination",
  "Dengue Test",
  "Malaria Test",
  "Typhoid Test",
  "COVID-19 Test",
  "ECG",
  "X-Ray",
  "Ultrasound (USG)",
  "CT Scan",
  "MRI",
  "Health Checkup Package",
  "Other Test",
];

interface Props {
  selectedTests: string[];
  onToggleTest: (test: string) => void;
  onNext: () => void;
}

export default function StepTests({
  selectedTests,
  onToggleTest,
  onNext,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Select Diagnostic Test(s)
        </h2>

        <p className="mt-2 text-slate-600">
          Select one or more diagnostic tests. If you don't find
          your required investigation, choose <strong>Other Test</strong>.
          Our diagnostic team will assist you.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {AVAILABLE_TESTS.map((test) => {
          const active = selectedTests.includes(test);

          return (
            <button
              key={test}
              type="button"
              onClick={() => onToggleTest(test)}
              className={`rounded-xl border p-4 text-left transition-all ${
                active
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-slate-300 bg-white hover:border-cyan-400 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">
                  {test}
                </span>

                {active && (
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
        <h3 className="font-semibold text-slate-900">
          Can't find your test?
        </h3>

        <p className="mt-2 text-slate-700">
          Select <strong>Other Test</strong>. Our laboratory team
          will call you and help you book the required
          investigation.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={selectedTests.length === 0}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}