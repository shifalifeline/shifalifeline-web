"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/healthcare/ModulePage";
import StatsCard from "@/components/healthcare/StatsCard";

import { useDoctors } from "@/modules/doctors";
import type { Doctor } from "@/types/doctor.types";

export default function DoctorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getDoctorById } = useDoctors();

  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    async function load() {
      const data = await getDoctorById(id);

      if (!data) {
        notFound();
      }

      setDoctor(data);
    }

    load().catch(console.error);
  }, [id, getDoctorById]);

  return (
    <ProtectedRoute>
      <AppShell>
        <ModulePage>
          {!doctor ? (
            <div className="py-10 text-center text-slate-500">
              Loading doctor...
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h1>

                  <p className="mt-1 text-slate-500">
                    Doctor Code: {doctor.doctorCode}
                  </p>
                </div>

                <Link
                  href="/dashboard/doctors"
                  className="inline-flex w-fit items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  ← Back to Doctors
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex flex-col gap-6 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
                    <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      {doctor.photoUrl ? (
                        <img
                          src={doctor.photoUrl}
                          alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-sm text-slate-400">
                          No Photo
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Dr. {doctor.firstName} {doctor.lastName}
                      </h2>

                      <p className="mt-1 text-slate-600">
                        {doctor.specialty}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {doctor.qualification}
                      </p>

                      <span
                        className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          doctor.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {doctor.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Doctor Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Registered SHIFA Doctor
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Info
                      label="Doctor Code"
                      value={doctor.doctorCode}
                    />

                    <Info
                      label="Specialty"
                      value={doctor.specialty}
                    />

                    <Info
                      label="Qualification"
                      value={doctor.qualification}
                    />

                    <Info
                      label="Experience"
                      value={
                        doctor.experience != null
                          ? `${doctor.experience} Years`
                          : "-"
                      }
                    />

                    <Info
                      label="Registration No."
                      value={doctor.registrationNumber}
                    />

                    <Info
                      label="Consultation Fee"
                      value={
                        doctor.consultationFee != null
                          ? `₹${doctor.consultationFee}`
                          : "-"
                      }
                    />

                    <Info
                      label="Status"
                      value={doctor.status}
                    />

                    <Info
                      label="Profile"
                      value={doctor.bio}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <StatsCard
                    title="Appointments"
                    value="Coming Soon"
                  />

                  <StatsCard
                    title="Consultations"
                    value="Coming Soon"
                  />

                  <StatsCard
                    title="Availability"
                    value="Coming Soon"
                  />
                </div>
              </div>
            </>
          )}
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 font-medium text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
}