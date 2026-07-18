"use client";

export interface PaymentData {
  bookingId: string;
  bookingType: "APPOINTMENT" | "DIAGNOSTIC" | "PHARMACY" | "PACKAGE";
  title: string;
  customerName: string;
  mobile: string;
  email?: string;
  amount: number;
}

interface Props {
  payment: PaymentData;
  onBack: () => void;
  onPay: () => void;
}

export default function PaymentSummary({
  payment,
  onBack,
  onPay,
}: Props) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          Payment Summary
        </h2>

        <p className="mt-2 text-slate-600">
          Please verify your booking details before proceeding.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-slate-600">Booking Reference</span>
            <span className="font-semibold">
              {payment.bookingId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Service</span>
            <span className="font-semibold">
              {payment.title}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Booking Type</span>
            <span className="font-semibold">
              {payment.bookingType}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Customer</span>
            <span className="font-semibold">
              {payment.customerName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Mobile</span>
            <span className="font-semibold">
              {payment.mobile}
            </span>
          </div>

          {payment.email && (
            <div className="flex justify-between">
              <span className="text-slate-600">Email</span>
              <span className="font-semibold">
                {payment.email}
              </span>
            </div>
          )}

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>

            <span className="text-cyan-700">
              ₹ {payment.amount}
            </span>
          </div>

        </div>

      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-slate-700">
          By proceeding, you agree to our payment terms. A confirmation SMS
          and email will be sent after successful payment.
        </p>
      </div>

      <div className="flex justify-between">

        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>

        <button
          onClick={onPay}
          className="rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          Proceed to Payment
        </button>

      </div>

    </div>
  );
}