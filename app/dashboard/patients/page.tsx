"use client";

import { useMemo, useState } from "react";

import ModulePage from "@/components/healthcare/ModulePage";
import PageHeader from "@/components/healthcare/PageHeader";
import SearchBar from "@/components/healthcare/SearchBar";
import StatsCard from "@/components/healthcare/StatsCard";
import DataTable from "@/components/healthcare/DataTable";
import EmptyState from "@/components/healthcare/EmptyState";

import Pagination from "@/components/ui/Pagination";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function PatientsPage() {
  const [search, setSearch] = useState("");

  const patients = useMemo(() => [], []);

  return (
    <ModulePage>
      <PageHeader
        title="Patients"
        description="Manage all registered patients."
        action={
          <PrimaryButton>
            + Add Patient
          </PrimaryButton>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatsCard title="Total Patients" value="0" />
        <StatsCard title="Active Patients" value="0" />
        <StatsCard title="Today's Registrations" value="0" />
        <StatsCard title="Appointments Today" value="0" />
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
          {patients.length === 0 ? (
            <EmptyState
              title="No patients available"
              description="Patients will appear here after registration."
            />
          ) : null}
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