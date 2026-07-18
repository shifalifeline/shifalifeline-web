"use client";

interface Props {
  mobile: string;
  bookingId: string;
  reportId: string;
  onMobileChange: (value: string) => void;
  onBookingIdChange: (value: string) => void;
  onReportIdChange: (value: string) => void;
  onNext: () => void;
}

export default function StepSearch({
  mobile,
  bookingId,
  reportId,
  onMobileChange,
  onBookingIdChange,
  onReportIdChange,
  onNext,
}: Props) {
  const valid =
    /^[6-9]\d{9}$/.test(mobile) ||
    bookingId.trim() !== "" ||
    reportId.trim() !== "";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Search Laboratory Reports
        </h2>

        <p className="mt-2 text-slate-600">
          Search using your registered mobile number,
          booking ID or report ID.
        </p>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="mb-2 block font-medium">
            Mobile Number
          </label>

          <input
            type="tel"
            maxLength={10}
            value={mobile}
            onChange={(e) => onMobileChange(e.target.value)}
            placeholder="Enter registered mobile number"
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Booking ID
          </label>

          <input
            type="text"
            value={bookingId}
            onChange={(e) => onBookingIdChange(e.target.value)}
            placeholder="Example: LAB-202600123"
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Report ID
          </label>

          <input
            type="text"
            value={reportId}
            onChange={(e) => onReportIdChange(e.target.value)}
            placeholder="Example: REP-202600456"
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm text-slate-700">
          Enter any one of the above details to continue.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}