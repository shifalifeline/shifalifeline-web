"use client";

import { useState } from "react";

interface Props {
  doctor: any;
  date: string;
  slot: string;
  hasAvailability: boolean;
  patient: {
    fullName: string;
    mobile: string;
    alternateMobile: string;
    email: string;
    age: string;
    gender: string;
    city: string;
  };
  onBack: () => void;
}

export default function StepReview({
  doctor,
  date,
  slot,
  hasAvailability,
  patient,
  onBack,
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  const [reference] = useState(() => {
    const value = Date.now().toString().slice(-6);
    return hasAvailability
      ? `SHF-${value}`
      : `TK-${value}`;
  });

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8">
          <div className="mb-4 text-6xl">✅</div>

          <h2 className="text-3xl font-bold text-emerald-700">
            {hasAvailability
              ? "Appointment Request Submitted"
              : "Callback Request Submitted"}
          </h2>

          <div className="mt-6 rounded-lg border bg-white p-5 text-left">
            <p>
              <strong>
                {hasAvailability
                  ? "Booking ID"
                  : "Token Number"}
                :
              </strong>{" "}
              {reference}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {hasAvailability
                ? "Pending Confirmation"
                : "Callback Pending"}
            </p>

            <p>
              <strong>Doctor:</strong>{" "}
              {doctor?.name}
            </p>

            {hasAvailability && (
              <>
                <p>
                  <strong>Date:</strong> {date}
                </p>

                <p>
                  <strong>
                    Preferred Session:
                  </strong>{" "}
                  {slot}
                </p>
              </>
            )}
          </div>

          <div className="mt-6 rounded-lg bg-cyan-50 p-4 text-left">
            <p className="text-sm text-slate-700">
              {hasAvailability
                ? "Our scheduling team will contact you via Phone, SMS or WhatsApp to confirm your appointment time."
                : "Our appointment desk will call you within the next few minutes to confirm the doctor's availability and finalize your appointment. Please keep your phone available."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Review Appointment Request
      </h2>

      {!hasAvailability && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            This doctor's consultation schedule is currently
            being coordinated by our team. Submit your request
            and we will call you within the next few minutes
            with the earliest available appointment.
          </p>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        <div>
          <h3 className="font-semibold">
            Doctor
          </h3>

          <p>{doctor?.name}</p>

          <p className="text-sm text-slate-500">
            {doctor?.speciality}
          </p>
        </div>

        {hasAvailability && (
          <div>
            <h3 className="font-semibold">
              Appointment
            </h3>

            <p>Date: {date}</p>

            <p>
              Preferred Session: {slot}
            </p>
          </div>
        )}

        <div>
          <h3 className="font-semibold">
            Patient Details
          </h3>

          <p>{patient.fullName}</p>

          <p>{patient.mobile}</p>

          {patient.alternateMobile && (
            <p>
              Alternate:{" "}
              {patient.alternateMobile}
            </p>
          )}

          {patient.email && (
            <p>{patient.email}</p>
          )}

          <p>
            {patient.age} Years •{" "}
            {patient.gender}
          </p>

          {patient.city && (
            <p>{patient.city}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>

        <button
          onClick={() => setSubmitted(true)}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500"
        >
          {hasAvailability
            ? "Submit Appointment Request"
            : "Request Callback"}
        </button>
      </div>
    </div>
  );
}