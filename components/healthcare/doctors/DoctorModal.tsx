"use client";

import Modal from "@/components/ui/Modal";
import DoctorForm from "./DoctorForm";

import type {
  CreateDoctorRequest,
  Doctor,
  UpdateDoctorRequest,
} from "@/types/doctor.types";

interface DoctorModalProps {
  open: boolean;
  mode: "create" | "edit";
  doctor?: Doctor;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateDoctorRequest | UpdateDoctorRequest
  ) => Promise<void> | void;
}

export default function DoctorModal({
  open,
  mode,
  doctor,
  loading = false,
  onClose,
  onSubmit,
}: DoctorModalProps) {
  return (
    <Modal
      open={open}
      title={mode === "create" ? "Add Doctor" : "Edit Doctor"}
      onClose={onClose}
    >
      <DoctorForm
        mode={mode}
        initialValues={doctor}
        loading={loading}
        onSubmit={async (data) => {
          await onSubmit(data);
          onClose();
        }}
      />
    </Modal>
  );
}