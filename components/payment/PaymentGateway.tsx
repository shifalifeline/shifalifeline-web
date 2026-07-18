"use client";

import { PaymentData } from "./PaymentSummary";

interface Props {
  payment: PaymentData;
  onSuccess: () => void;
  onFailure: () => void;
  onCancel: () => void;
}

const gateways = [
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Cards, UPI, Net Banking & Wallets",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    description: "UPI & PhonePe Payments",
  },
  {
    id: "payu",
    name: "PayU",
    description: "Cards, UPI & Net Banking",
  },
];

export default function PaymentGateway({
  payment,
  onSuccess,
  onFailure,
  onCancel,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          Select Payment Gateway
        </h2>

        <p className="mt-2 text-slate-600">
          Choose your preferred payment method.
        </p>
      </div>

      <div className="rounded-xl border bg-cyan-50 p-6">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Booking Reference
            </p>

            <h3 className="font-semibold">
              {payment.bookingId}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              Amount Payable
            </p>

            <h2 className="text-3xl font-bold text-cyan-700">
              ₹ {payment.amount}
            </h2>
          </div>

        </div>
      </div>

      <div className="grid gap-5">

        {gateways.map((gateway) => (

          <button
            key={gateway.id}
            type="button"
            onClick={onSuccess}
            className="rounded-xl border border-slate-300 p-6 text-left transition hover:border-cyan-500 hover:bg-cyan-50"
          >
            <h3 className="text-xl font-semibold">
              {gateway.name}
            </h3>

            <p className="mt-2 text-slate-600">
              {gateway.description}
            </p>

            <p className="mt-4 text-sm font-medium text-cyan-700">
              Integration Ready
            </p>
          </button>

        ))}

      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 p-5">
        <p className="text-sm text-slate-700">
          This is a placeholder payment screen. Live gateway
          integration will be added during the payment integration
          sprint without requiring changes to the booking modules.
        </p>
      </div>

      <div className="flex justify-between">

        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Cancel
        </button>

        <button
          onClick={onFailure}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Simulate Failure
        </button>

      </div>

    </div>
  );
}