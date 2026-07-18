"use client";

import { useState } from "react";

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
  tests: string[];
  collectionType: string;
  preferredDate: string;
  address: string;
  patient: PatientData;
  prescription: File | null;
  notes: string;
  onBack: () => void;
}

export default function StepReview({
  tests,
  collectionType,
  preferredDate,
  address,
  patient,
  prescription,
  notes,
  onBack,
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  const [bookingId] = useState(
    () => "LAB-" + Date.now().toString().slice(-6)
  );

  if (submitted) {
    return (
      <div className="space-y-8 text-center">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8">
          <div className="mb-4 text-6xl">✅</div>

          <h2 className="text-3xl font-bold text-emerald-700">
            Diagnostic Booking Request Submitted
          </h2>

          <p className="mt-4 text-slate-700">
            Thank you. Your diagnostic booking request has been
            received successfully.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-left">
            <p>
              <strong>Booking ID:</strong> {bookingId}
            </p>

            <p>
              <strong>Status:</strong> Pending Confirmation
            </p>

            <p>
              <strong>Collection:</strong>{" "}
              {collectionType === "HOME"
                ? "Home Sample Collection"
                : "Visit SHIFA LIFE LINE"}
            </p>

            <p>
              <strong>Preferred Date:</strong>{" "}
              {preferredDate}
            </p>

            <p>
              <strong>Patient:</strong>{" "}
              {patient.fullName}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {patient.mobile}
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-cyan-200 bg-cyan-50 p-5 text-left">
            <p className="text-sm text-slate-700">
              Our laboratory team will contact you shortly to
              confirm test availability, pricing, sample
              collection timing and report delivery.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Review Diagnostic Booking
        </h2>

        <p className="mt-2 text-slate-600">
          Please review your details before submitting your
          booking request.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-8">
        <div>
          <h3 className="font-semibold text-slate-900">
            Selected Tests
          </h3>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {tests.map((test) => (
              <li key={test}>{test}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Collection Details
          </h3>

          <p className="mt-2">
            <strong>Method:</strong>{" "}
            {collectionType === "HOME"
              ? "Home Sample Collection"
              : "Visit SHIFA LIFE LINE"}
          </p>

          <p>
            <strong>Preferred Date:</strong>{" "}
            {preferredDate}
          </p>

          {collectionType === "HOME" &&
            address.trim() !== "" && (
              <p className="mt-2">
                <strong>Address:</strong>{" "}
                {address}
              </p>
            )}
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Patient Details
          </h3>

          <p className="mt-2">
            <strong>Name:</strong>{" "}
            {patient.fullName}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            {patient.mobile}
          </p>

          {patient.alternateMobile && (
            <p>
              <strong>Alternate:</strong>{" "}
              {patient.alternateMobile}
            </p>
          )}

          {patient.email && (
            <p>
              <strong>Email:</strong>{" "}
              {patient.email}
            </p>
          )}

          <p>
            <strong>Age:</strong>{" "}
            {patient.age} Years
          </p>

          <p>
            <strong>Gender:</strong>{" "}
            {patient.gender}
          </p>

          {patient.city && (
            <p>
              <strong>City:</strong>{" "}
              {patient.city}
            </p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Prescription
          </h3>

          {prescription ? (
            <p className="mt-2">
              {prescription.name}
            </p>
          ) : (
            <p className="mt-2 text-slate-500">
              No prescription uploaded.
            </p>
          )}
        </div>

        {notes.trim() !== "" && (
          <div>
            <h3 className="font-semibold text-slate-900">
              Additional Instructions
            </h3>

            <p className="mt-2 whitespace-pre-wrap text-slate-700">
              {notes}
            </p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> This request is not confirmed
          yet. Our diagnostic team will contact you to confirm
          availability, pricing and sample collection schedule.
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
          onClick={() => setSubmitted(true)}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500"
        >
          Submit Booking Request
        </button>
      </div>
    </div>
  );
}