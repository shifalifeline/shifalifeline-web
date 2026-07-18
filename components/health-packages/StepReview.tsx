"use client";

import { HealthPackage } from "./StepPackages";

interface PatientData {
  fullName: string;
  mobile: string;
  alternateMobile: string;
  email: string;
  age: string;
  gender: string;
  city: string;
}

interface Props {
  selectedPackage: HealthPackage;
  collectionType: string;
  preferredDate: string;
  preferredSession: string;
  patient: PatientData;
  onBack: () => void;
  onProceedToPayment: () => void;
}

export default function StepReview({
  selectedPackage,
  collectionType,
  preferredDate,
  preferredSession,
  patient,
  onBack,
  onProceedToPayment,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Review Booking
        </h2>

        <p className="mt-2 text-slate-600">
          Verify your booking details before proceeding to payment.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">

        <section>
          <h3 className="text-lg font-semibold mb-3">
            Selected Package
          </h3>

          <p><strong>{selectedPackage.name}</strong></p>
          <p>{selectedPackage.description}</p>
          <p className="mt-2">{selectedPackage.tests} Tests Included</p>
          <p className="text-cyan-700 font-bold mt-2">
            ₹ {selectedPackage.price}
          </p>
        </section>

        <hr />

        <section>
          <h3 className="text-lg font-semibold mb-3">
            Collection Preference
          </h3>

          <p>
            <strong>Mode:</strong>{" "}
            {collectionType === "HOME"
              ? "Home Collection"
              : "Laboratory Visit"}
          </p>

          <p>
            <strong>Date:</strong> {preferredDate}
          </p>

          <p>
            <strong>Session:</strong> {preferredSession}
          </p>
        </section>

        <hr />

        <section>
          <h3 className="text-lg font-semibold mb-3">
            Patient
          </h3>

          <p><strong>{patient.fullName}</strong></p>
          <p>{patient.mobile}</p>

          {patient.email && <p>{patient.email}</p>}

          <p>
            {patient.age} Years | {patient.gender}
          </p>

          {patient.city && <p>{patient.city}</p>}
        </section>

      </div>

      <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            Total Amount
          </span>

          <span className="text-3xl font-bold text-cyan-700">
            ₹ {selectedPackage.price}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          GST and additional home collection charges (if applicable)
          will be reflected during payment.
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
          onClick={onProceedToPayment}
          className="rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white hover:bg-cyan-500"
        >
          Proceed to Payment
        </button>

      </div>
    </div>
  );
}