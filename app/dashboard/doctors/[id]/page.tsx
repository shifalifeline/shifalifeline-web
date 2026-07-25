"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/healthcare/ModulePage";
import PageHeader from "@/components/healthcare/PageHeader";
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
            <div className="py-10 text-center text-slate-400">
              Loading doctor...
            </div>
          ) : (
            <>
              <PageHeader
                title={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                description={`Doctor Code: ${doctor.doctorCode}`}
                action={
                  <Link
                    href="/dashboard/doctors"
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800"
                  >
                    ← Back to Doctors
                  </Link>
                }
              />

              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                  <div className="mb-6 border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-semibold text-white">
                      Doctor Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
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
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-white">
        {value || "-"}
      </p>
    </div>
  );
}