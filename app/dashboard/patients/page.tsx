"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import ModulePage from "@/components/healthcare/ModulePage";
import PageHeader from "@/components/healthcare/PageHeader";
import SearchBar from "@/components/healthcare/SearchBar";
import StatsCard from "@/components/healthcare/StatsCard";
import DataTable from "@/components/healthcare/DataTable";
import EmptyState from "@/components/healthcare/EmptyState";

import Pagination from "@/components/ui/Pagination";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

import PatientModal from "@/components/healthcare/patients/PatientModal";

import { usePatients } from "@/modules/patients";
import type {
  Patient,
  PatientStats,
  CreatePatientRequest,
  UpdatePatientRequest,
} from "@/types/patient.types";

export default function PatientsPage() {
  const {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient,
  } = usePatients();

  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<PatientStats>({
    totalPatients: 0,
    activePatients: 0,
    todayRegistrations: 0,
    appointmentsToday: 0,
  });

  const [open, setOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient>();
  const [saving, setSaving] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] =
    useState<Patient>();

  const loadPatients = useCallback(async () => {
    const response = await getPatients();
    setPatients(response.patients);
    setStats(response.stats);
  }, [getPatients]);

  useEffect(() => {
    loadPatients().catch(console.error);
  }, [loadPatients]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return patients.filter(
      (p) =>
        p.uhid.toLowerCase().includes(q) ||
        `${p.firstName} ${p.lastName}`
          .toLowerCase()
          .includes(q) ||
        p.phone.includes(q)
    );
  }, [patients, search]);

  async function handleSubmit(
    data: CreatePatientRequest | UpdatePatientRequest
  ) {
    setSaving(true);

    try {
      if ("id" in data) {
        await updatePatient(data);
      } else {
        await createPatient(data);
      }

      await loadPatients();
    } finally {
      setSaving(false);
      setOpen(false);
      setEditingPatient(undefined);
    }
  }

  async function handleDelete() {
    if (!patientToDelete) return;

    await deletePatient(patientToDelete.id);

    await loadPatients();

    setDeleteOpen(false);
    setPatientToDelete(undefined);
  }

  return (
    <ModulePage>
      <PageHeader
        title="Patients"
        description="Manage all registered patients."
        action={
          <PrimaryButton onClick={() => setOpen(true)}>
            + Add Patient
          </PrimaryButton>
        }
      />

      <PatientModal
        open={open}
        mode={editingPatient ? "edit" : "create"}
        patient={editingPatient}
        loading={saving}
        onClose={() => {
          setOpen(false);
          setEditingPatient(undefined);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmationDialog
        open={deleteOpen}
        title="Delete Patient"
        message="Are you sure you want to delete this patient?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteOpen(false);
          setPatientToDelete(undefined);
        }}
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
          {filtered.length === 0 ? (
            <EmptyState
              title="No patients available"
              description="Patients will appear here after registration."
            />
          ) : (
            filtered.map((patient) => (
              <tr
                key={patient.id}
                className="border-b border-slate-800 last:border-none"
              >
                <td className="px-4 py-3 text-sm text-slate-300">
                  {patient.uhid}
                </td>

                <td className="px-4 py-3 text-white">
                  {patient.firstName} {patient.lastName}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {patient.phone}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {patient.gender}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {patient.age}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {patient.status}
                </td>

                <td className="px-4 py-3 space-x-3">
                  <button
                    className="text-sky-400 hover:underline"
                    onClick={() => {
                      setEditingPatient(patient);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-400 hover:underline"
                    onClick={() => {
                      setPatientToDelete(patient);
                      setDeleteOpen(true);
                    }}
                  >
                    Delete
                  </button>
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