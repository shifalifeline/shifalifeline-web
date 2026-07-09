"use client";

import { useEffect, useMemo, useState } from "react";

import ModulePage from "@/components/healthcare/ModulePage";
import PageHeader from "@/components/healthcare/PageHeader";
import SearchBar from "@/components/healthcare/SearchBar";
import StatsCard from "@/components/healthcare/StatsCard";
import DataTable from "@/components/healthcare/DataTable";
import EmptyState from "@/components/healthcare/EmptyState";

import Pagination from "@/components/ui/Pagination";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { usePatients } from "@/modules/patients";
import type {
  Patient,
  PatientStats,
} from "@/types/patient.types";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<PatientStats>({
    totalPatients: 0,
    activePatients: 0,
    todayRegistrations: 0,
    appointmentsToday: 0,
  });

  const { getPatients } = usePatients();

  useEffect(() => {
    async function loadPatients() {
      try {
        const response = await getPatients();
        setPatients(response.patients);
        setStats(response.stats);
      } catch (error) {
        console.error("Failed to load patients:", error);
      }
    }

    loadPatients();
  }, [getPatients]);

  const filteredPatients = useMemo(() => {
    const keyword = search.toLowerCase();

    return patients.filter((patient) => {
      const fullName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();

      return (
        patient.uhid.toLowerCase().includes(keyword) ||
        fullName.includes(keyword) ||
        patient.phone.includes(keyword)
      );
    });
  }, [patients, search]);

  return (
    <ModulePage>
      <PageHeader
        title="Patients"
        description="Manage all registered patients."
        action={<PrimaryButton>+ Add Patient</PrimaryButton>}
      />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients}
        />

        <StatsCard
          title="Active Patients"
          value={stats.activePatients}
        />

        <StatsCard
          title="Today's Registrations"
          value={stats.todayRegistrations}
        />

        <StatsCard
          title="Appointments Today"
          value={stats.appointmentsToday}
        />
      </div>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by patient name, UHID or phone..."
      />

      <div className="mt-6">
        <DataTable
          headers={[
            "UHID",
            "Patient Name",
            "Phone",
            "Gender",
            "Age",
            "Status",
            "Actions",
          ]}
        >
          {filteredPatients.length === 0 ? (
            <EmptyState
              title="No patients available"
              description="Patients will appear here after registration."
            />
          ) : (
            filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b border-slate-800 last:border-none"
              >
                <td className="px-4 py-3 text-sm text-slate-300">
                  {patient.uhid}
                </td>

                <td className="px-4 py-3 text-sm text-white">
                  {patient.firstName} {patient.lastName}
                </td>

                <td className="px-4 py-3 text-sm text-slate-300">
                  {patient.phone}
                </td>

                <td className="px-4 py-3 text-sm text-slate-300">
                  {patient.gender}
                </td>

                <td className="px-4 py-3 text-sm text-slate-300">
                  {patient.age}
                </td>

                <td className="px-4 py-3 text-sm">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      patient.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-sky-400">
                  View
                </td>
              </tr>
            ))
          )}
        </DataTable>
      </div>

      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />
    </ModulePage>
  );
}