"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/healthcare/ModulePage";
import PageHeader from "@/components/healthcare/PageHeader";
import StatsCard from "@/components/healthcare/StatsCard";

import { usePatients } from "@/modules/patients";
import type { Patient } from "@/types/patient.types";

export default function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getPatientById } = usePatients();

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    async function load() {
      const data = await getPatientById(id);

      if (!data) {
        notFound();
      }

      setPatient(data);
    }

    load().catch(console.error);
  }, [id, getPatientById]);

  return (
    <ProtectedRoute>
      <AppShell>
        <ModulePage>
          {!patient ? (
            <div className="py-10 text-center text-slate-400">
              Loading patient...
            </div>
          ) : (
            <>
              <PageHeader
                title={`${patient.firstName} ${patient.lastName}`}
                description={`UHID: ${patient.uhid}`}
                action={
                  <Link
                    href="/dashboard/patients"
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800"
                  >
                    ← Back to Patients
                  </Link>
                }
              />

              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                  <div className="mb-6 border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-semibold text-white">
                      Customer Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Registered SHIFA customer
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Info
                      label="Phone"
                      value={patient.phone}
                    />
                    <Info
                      label="Email"
                      value={patient.email}
                    />
                    <Info
                      label="Gender"
                      value={patient.gender}
                    />
                    <Info
                      label="Date of Birth"
                      value={
                      patient.dateOfBirth
                      ? new Date(patient.dateOfBirth).toLocaleDateString()
                      : "-"
                      }
                    />
                    <Info
                      label="Address"
                      value={patient.address}
                    />
                    <Info
                      label="City"
                      value={patient.city}
                    />
                    <Info
                      label="Status"
                      value={patient.status}
                    />
                    <Info
                      label="Blood Group"
                      value={patient.bloodGroup}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <StatsCard
                    title="Medicine Orders"
                    value="Coming Soon"
                  />

                  <StatsCard
                    title="Pathology Tests"
                    value="Coming Soon"
                  />

                  <StatsCard
                    title="Uploaded Prescriptions"
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