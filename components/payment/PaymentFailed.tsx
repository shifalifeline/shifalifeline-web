"use client";

interface Props {
  bookingId: string;
  amount: number;
  onRetry: () => void;
  onChangeGateway: () => void;
  onCancel: () => void;
}

export default function PaymentFailed({
  bookingId,
  amount,
  onRetry,
  onChangeGateway,
  onCancel,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 text-center">

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
        <span className="text-5xl">❌</span>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-red-700">
          Payment Failed
        </h1>

        <p className="mt-3 text-slate-600">
          Unfortunately, we could not complete your payment.
          No amount has been confirmed against your booking.
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
              Amount
            </span>

            <span className="font-bold text-cyan-700">
              ₹ {amount}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Status
            </span>

            <span className="font-semibold text-red-600">
              FAILED
            </span>
          </div>

        </div>

      </div>

      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <p className="text-sm text-slate-700">
          If your bank account was debited but the payment failed,
          the amount is generally reversed automatically according
          to your bank's settlement timeline.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">

        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          Retry Payment
        </button>

        <button
          type="button"
          onClick={onChangeGateway}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Change Gateway
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-900"
        >
          Cancel Booking
        </button>

      </div>

    </div>
  );
}