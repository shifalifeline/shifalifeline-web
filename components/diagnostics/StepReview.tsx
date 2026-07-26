"use client";

import { useState } from "react";
import bookingApi from "@/services/booking.api";

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
  notes: string;
  onBack: () => void;
}

export default function StepReview({
  tests,
  collectionType,
  preferredDate,
  address,
  patient,
  notes,
  onBack,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
const [bookingId, setBookingId] = useState("");
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async () => {
  try {
    setSubmitting(true);
    setError("");

    const response = await bookingApi.createBooking({
      type: "DIAGNOSTIC",

      title: "Diagnostic Booking",

      customer: {
        fullName: patient.fullName,
        mobile: patient.mobile,
        email: patient.email || "",
      },

      requestData: {
        tests,
        collectionType:
          collectionType === "HOME"
            ? "HOME"
            : "CENTER",
        preferredDate,
        address,
        notes,
      },
    });

    const booking =
      (response as any)?.data?.data ??
      (response as any)?.data;

    setBookingId(
      booking?.reference ??
        booking?.id ??
        "LAB-" + Date.now().toString().slice(-6)
    );

    setSubmitted(true);
  } catch (err) {
    console.error(err);

    setError(
      "Unable to submit booking request. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};

  if (submitted) {
    return (
      <div className="space-y-8 text-center">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8">
          <div className="mb-4 text-6xl">✅</div>

          <h2 className="text-3xl font-bold text-emerald-700">
            Diagnostic Booking Request Submitted
          </h2>

          <p className="mt-4 text-slate-700">
            Your diagnostic booking request has been submitted successfully.
            Our operations team will review your request, prepare the best
            available pricing, and contact you for confirmation before
            scheduling your test.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-left">
            <p>
              <strong>Booking ID:</strong> {bookingId}
            </p>

            <p>
              <strong>Status:</strong> Under Review
            </p>

            <p>
              <strong>Collection:</strong>{" "}
              {collectionType === "HOME"
                ? "Home Sample Collection"
                : "Visit SHIFA LIFE LINE"}
            </p>
                  {collectionType === "HOME" &&
  address.trim() !== "" && (
    <p>
      <strong>Collection Address:</strong>{" "}
      {address}
    </p>
)}

            <p>
              <strong>Preferred Date:</strong>{" "}
              {preferredDate || "To be decided"}
            </p>

            <p>
              <strong>Patient Name:</strong>{" "}
              {patient.fullName}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {patient.mobile}
            </p>
            {patient.email && (
  <p>
    <strong>Email:</strong>{" "}
    {patient.email}
  <strong>Total Tests Requested:</strong>{" "}
  {tests.length}
</p>
)}
<div className="mt-4">
  <p className="font-semibold">
    Requested Tests
  </p>
{notes.trim() !== "" && (
  <div className="mt-4">
    <p className="font-semibold">
      Additional Instructions
    </p>

    <p className="mt-2 whitespace-pre-wrap">
      {notes}
    </p>
  </div>
)}

  <ul className="mt-2 list-disc pl-5">
    {tests.map((test) => (
      <li key={test}>{test}</li>
    ))}
  </ul>
</div>
          </div>

          <div className="mt-6 rounded-lg border border-cyan-200 bg-cyan-50 p-5 text-left">
            <div className="space-y-2 text-sm text-slate-700">
  <p>
    ✓ Your booking has been received successfully.
  </p>

  <p>
    ✓ Our team will verify your requested investigations.
  </p>

  <p>
    ✓ You will receive the best available promotional quotation.
  </p>

  <p>
    ✓ After quotation approval, a payment link will be shared.
  </p>

  <p>
    ✓ Sample collection / laboratory visit will be scheduled after
    payment confirmation.
  </p>
</div>
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
      {error && (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
    {error}
  </div>
)}

      <div className="flex justify-between">
        <button
          type="button"
          disabled={submitting}
         onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
>
        </button>

        <button
  type="button"
  disabled={submitting}
  onClick={handleSubmit}
  className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
>
  {submitting
    ? "Submitting Booking..."
    : "Submit Booking Request"}
        </button>
      </div>
    </div>
  );
}