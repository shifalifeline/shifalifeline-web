"use client";

interface Props {
  bookingId: string;
  amount: number;
  onRefresh: () => void;
  onCancel: () => void;
}

export default function PaymentPending({
  bookingId,
  amount,
  onRefresh,
  onCancel,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 text-center">

      <div className="flex justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
      </div>

      <div>
        <h1 className="text-4xl font-bold text-cyan-700">
          Payment Processing
        </h1>

        <p className="mt-3 text-slate-600">
          We are waiting for confirmation from the payment gateway.
          Please do not close or refresh this page.
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

            <span className="font-semibold text-amber-600">
              PENDING
            </span>
          </div>

        </div>

      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-slate-700">
          Payment confirmation usually takes a few seconds. If you
          have already completed the payment, click the button below
          to check the latest payment status.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          I've Completed Payment
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Cancel Transaction
        </button>

      </div>

    </div>
  );
}