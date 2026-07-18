"use client";

export interface LaboratoryReport {
  id: string;
  reportName: string;
  laboratory: string;
  collectedOn: string;
  status: "Ready" | "Pending";
}

interface Props {
  reports: LaboratoryReport[];
  onBack: () => void;
  onView: (report: LaboratoryReport) => void;
}

export default function StepReports({
  reports,
  onBack,
  onView,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Available Reports
        </h2>

        <p className="mt-2 text-slate-600">
          Select a report to view or download.
        </p>
      </div>

      <div className="space-y-5">
        {reports.length === 0 ? (
          <div className="rounded-xl border border-slate-300 p-8 text-center">
            <h3 className="text-lg font-semibold">
              No Reports Found
            </h3>

            <p className="mt-2 text-slate-600">
              We couldn't find any reports matching the
              details provided.
            </p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {report.reportName}
                  </h3>

                  <p className="text-slate-600">
                    <strong>Report ID:</strong> {report.id}
                  </p>

                  <p className="text-slate-600">
                    <strong>Laboratory:</strong>{" "}
                    {report.laboratory}
                  </p>

                  <p className="text-slate-600">
                    <strong>Collection Date:</strong>{" "}
                    {report.collectedOn}
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      report.status === "Ready"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={report.status !== "Ready"}
                    onClick={() => onView(report)}
                    className="rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    View Report
                  </button>

                  <button
                    type="button"
                    disabled={report.status !== "Ready"}
                    className="rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>
      </div>
    </div>
  );
}