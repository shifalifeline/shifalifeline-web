"use client";

import { LaboratoryReport } from "./StepReports";

interface Props {
  report: LaboratoryReport;
  onBack: () => void;
}

export default function StepViewer({
  report,
  onBack,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Laboratory Report
        </h2>

        <p className="mt-2 text-slate-600">
          Review your laboratory report below.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <strong>Report Name</strong>
            <p>{report.reportName}</p>
          </div>

          <div>
            <strong>Report ID</strong>
            <p>{report.id}</p>
          </div>

          <div>
            <strong>Laboratory</strong>
            <p>{report.laboratory}</p>
          </div>

          <div>
            <strong>Collection Date</strong>
            <p>{report.collectedOn}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{report.status}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-16 text-center">
        <div className="text-6xl mb-4">📄</div>

        <h3 className="text-xl font-semibold">
          PDF Report Preview
        </h3>

        <p className="mt-3 text-slate-600">
          Report preview will appear here after backend
          integration.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          PDFs will be securely fetched from the SHIFA LIFE
          LINE report repository.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500"
        >
          Download PDF
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
        >
          Print Report
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
        >
          Share Report
        </button>
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          ← Back to Reports
        </button>
      </div>
    </div>
  );
}