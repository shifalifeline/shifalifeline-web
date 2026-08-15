"use client";

import { useState } from "react";

import bookingApi from "@/services/booking.api";

import type {
  ConsultationMode,
} from "@/types/booking";

import type { Doctor } from "@/types/doctor.types";

interface Props {
  doctor: Doctor | null;
  consultationMode: ConsultationMode | "";
  patient: {
    fullName: string;
    mobile: string;
    email: string;
  };
  onBack: () => void;
}

export default function StepReview({
  doctor,
  consultationMode,
  patient,
  onBack,
}: Props) {
  const [submitted, setSubmitted] =
    useState(false);

  const [bookingId, setBookingId] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit() {
    if (!doctor || !consultationMode) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response =
        await bookingApi.createBooking({
          type: "APPOINTMENT",

          title:
            consultationMode === "VIDEO"
              ? "Telemedicine Consultation"
              : "Doctor Appointment",

          customer: {
            fullName: patient.fullName,
            mobile: patient.mobile,
            email: patient.email || undefined,
          },

          requestData: {
            doctorId: doctor.id,
            consultationMode,
          },
        });

      if (!response.success) {
        throw new Error(
          response.message
        );
      }

      setBookingId(
        response.data.reference
      );

      setSubmitted(true);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit appointment request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8">
          <div className="mb-4 text-6xl">
            ✅
          </div>

          <h2 className="text-3xl font-bold text-emerald-700">
            Appointment Request Submitted
          </h2>

          <div className="mt-6 rounded-lg border bg-white p-5 text-left">
            <p>
              <strong>Booking ID:</strong>{" "}
              {bookingId}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              Pending Confirmation
            </p>

            <p>
              <strong>Doctor:</strong>{" "}
              {doctor?.firstName}{" "}
              {doctor?.lastName}
            </p>

            <p>
              <strong>Consultation:</strong>{" "}
              {consultationMode === "VIDEO"
                ? "Video Consultation"
                : "Physical Consultation"}
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

          <div className="mt-6 rounded-lg bg-cyan-50 p-4 text-left">
            <p className="text-sm text-slate-700">
              Your appointment request has been
              received. Our team will check the
              doctor&apos;s availability and contact
              you with the confirmed appointment date
              and time.
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

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        <div>
          <h3 className="font-semibold">
            Doctor
          </h3>

          <p>
            {doctor?.firstName}{" "}
            {doctor?.lastName}
          </p>

          <p className="text-sm text-slate-500">
            {doctor?.specialty}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Consultation
          </h3>

          <p>
            {consultationMode === "VIDEO"
              ? "Video Consultation"
              : "Physical Consultation"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Patient
          </h3>

          <p>{patient.fullName}</p>

          <p>{patient.mobile}</p>

          {patient.email && (
            <p>{patient.email}</p>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> This is an
          appointment request, not a confirmed
          appointment. Our team will check the
          doctor&apos;s availability and contact you
          with the confirmed date and time.
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
          className="rounded-lg border border-slate-300 px-6 py-3 disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          disabled={submitting}
          onClick={handleSubmit}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Submitting Request..."
            : "Submit Appointment Request"}
        </button>
      </div>
    </div>
  );
}