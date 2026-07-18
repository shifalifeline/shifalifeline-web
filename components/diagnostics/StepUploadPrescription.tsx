"use client";

interface Props {
  prescription: File | null;
  notes: string;
  onPrescriptionChange: (file: File | null) => void;
  onNotesChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepUploadPrescription({
  prescription,
  notes,
  onPrescriptionChange,
  onNotesChange,
  onBack,
  onNext,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Upload Prescription
        </h2>

        <p className="mt-2 text-slate-600">
          Upload your doctor's prescription if available. This
          step is optional. You may also write any additional
          instructions for our laboratory team.
        </p>
      </div>

      <div className="rounded-xl border border-slate-300 bg-white p-6">
        <label className="mb-3 block font-medium text-slate-700">
          Doctor's Prescription (Optional)
        </label>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) =>
            onPrescriptionChange(
              e.target.files?.[0] ?? null
            )
          }
          className="block w-full rounded-lg border border-slate-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-white hover:file:bg-cyan-500"
        />

        <p className="mt-3 text-sm text-slate-500">
          Supported formats: JPG, JPEG, PNG and PDF (Maximum
          recommended size: 10 MB).
        </p>

        {prescription && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">
              <strong>Selected File:</strong>{" "}
              {prescription.name}
            </p>
          </div>
        )}
      </div>

      <div>
        <label className="mb-3 block font-medium text-slate-700">
          Additional Instructions (Optional)
        </label>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) =>
            onNotesChange(e.target.value)
          }
          placeholder="Example: Patient is fasting, urgent report required, home collection after 9 AM, etc."
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h3 className="font-semibold text-slate-900">
          Don't have a prescription?
        </h3>

        <p className="mt-2 text-sm text-slate-700">
          No problem. You can continue without uploading a
          prescription. Our laboratory team will contact you to
          understand your diagnostic requirements and assist you
          with the booking.
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
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}