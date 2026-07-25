"use client";

import Link from "next/link";
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

import DoctorModal from "@/components/healthcare/doctors/DoctorModal";

import { useDoctors } from "@/modules/doctors";

import type {
  Doctor,
  DoctorStats,
  CreateDoctorRequest,
  UpdateDoctorRequest,
} from "@/types/doctor.types";

export default function DoctorsPage() {
  const {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useDoctors();

  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [stats, setStats] = useState<DoctorStats>({
    totalDoctors: 0,
    activeDoctors: 0,
    specialties: 0,
  });

  const [open, setOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor>();
  const [saving, setSaving] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] =
    useState<Doctor>();

  const loadDoctors = useCallback(async () => {
    const response = await getDoctors();
    setDoctors(response.doctors);
    setStats(response.stats);
  }, [getDoctors]);

  useEffect(() => {
    loadDoctors().catch(console.error);
  }, [loadDoctors]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return doctors.filter(
      (doctor) =>
        doctor.doctorCode.toLowerCase().includes(q) ||
        `${doctor.firstName} ${doctor.lastName}`
          .toLowerCase()
          .includes(q) ||
        doctor.specialty.toLowerCase().includes(q) ||
        doctor.qualification.toLowerCase().includes(q)
    );
  }, [doctors, search]);

  async function handleSubmit(
    data: CreateDoctorRequest | UpdateDoctorRequest
  ) {
    setSaving(true);

    try {
      if ("id" in data) {
        await updateDoctor(data);
      } else {
        await createDoctor(data);
      }

      await loadDoctors();
    } finally {
      setSaving(false);
      setOpen(false);
      setEditingDoctor(undefined);
    }
  }

  async function handleDelete() {
    if (!doctorToDelete) return;

    await deleteDoctor(doctorToDelete.id);

    await loadDoctors();

    setDeleteOpen(false);
    setDoctorToDelete(undefined);
  }

  return (
    <ModulePage>
      <PageHeader
        title="Doctors"
        description="Manage all registered doctors."
        action={
          <PrimaryButton onClick={() => setOpen(true)}>
            + Add Doctor
          </PrimaryButton>
        }
      />

      <DoctorModal
        open={open}
        mode={editingDoctor ? "edit" : "create"}
        doctor={editingDoctor}
        loading={saving}
        onClose={() => {
          setOpen(false);
          setEditingDoctor(undefined);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmationDialog
        open={deleteOpen}
        title="Delete Doctor"
        message="Are you sure you want to delete this doctor?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteOpen(false);
          setDoctorToDelete(undefined);
        }}
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Doctors"
          value={stats.totalDoctors}
        />

        <StatsCard
          title="Active Doctors"
          value={stats.activeDoctors}
        />

        <StatsCard
          title="Specialties"
          value={stats.specialties}
        />
      </div>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by doctor name, code or specialty..."
      />

      <div className="mt-6">
        <DataTable
          headers={[
            "Code",
            "Doctor",
            "Specialty",
            "Qualification",
            "Experience",
            "Fee",
            "Status",
            "Actions",
          ]}
        >
          {filtered.length === 0 ? (
            <EmptyState
              title="No doctors available"
              description="Doctors will appear here after registration."
            />
          ) : (
            filtered.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-b border-slate-800 last:border-none"
              >
                <td className="px-4 py-3 text-sm text-slate-300">
                  {doctor.doctorCode}
                </td>

                <td className="px-4 py-3 text-white">
                  Dr. {doctor.firstName} {doctor.lastName}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {doctor.specialty}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {doctor.qualification}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {doctor.experience != null
                    ? `${doctor.experience} Years`
                    : "-"}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {doctor.consultationFee != null
                    ? `₹${doctor.consultationFee}`
                    : "-"}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {doctor.status}
                </td>

                <td className="space-x-3 px-4 py-3">
                  <Link
                    href={`/dashboard/doctors/${doctor.id}`}
                    className="text-emerald-400 hover:underline"
                  >
                    View
                  </Link>

                  <button
                    className="text-sky-400 hover:underline"
                    onClick={() => {
                      setEditingDoctor(doctor);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-400 hover:underline"
                    onClick={() => {
                      setDoctorToDelete(doctor);
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