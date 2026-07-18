"use client";

interface Props {
  bookingId: string;
  bookingType: string;
  amount: number;
  onHome: () => void;
  onBookings: () => void;
}

export default function PaymentSuccess({
  bookingId,
  bookingType,
  amount,
  onHome,
  onBookings,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 text-center">

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <span className="text-5xl">✅</span>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-green-700">
          Payment Successful
        </h1>

        <p className="mt-3 text-slate-600">
          Thank you! Your booking has been confirmed successfully.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <div className="space-y-5">

          <div className="flex justify-between">
            <span className="text-slate-500">
              Booking Reference
            </span>

            <span className="font-semibold">
              {bookingId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Booking Type
            </span>

            <span className="font-semibold">
              {bookingType}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Amount Paid
            </span>

            <span className="font-bold text-cyan-700">
              ₹ {amount}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Payment Status
            </span>

            <span className="font-semibold text-green-700">
              SUCCESS
            </span>
          </div>

        </div>

      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-5">
        <p className="text-sm text-slate-700">
          A confirmation SMS and email will be sent to you shortly.
          Your invoice and booking details will be available in your
          dashboard once backend integration is complete.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Download Invoice
        </button>

        <button
          type="button"
          onClick={onBookings}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          View My Bookings
        </button>

        <button
          type="button"
          onClick={onHome}
          className="rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-900"
        >
          Return Home
        </button>

      </div>

    </div>
  );
}