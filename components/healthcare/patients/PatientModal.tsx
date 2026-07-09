"use client";

import Modal from "@/components/ui/Modal";
import PatientForm from "./PatientForm";

import type {
  CreatePatientRequest,
  Patient,
  UpdatePatientRequest,
} from "@/types/patient.types";

interface PatientModalProps {
  open: boolean;
  mode: "create" | "edit";
  patient?: Patient;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreatePatientRequest | UpdatePatientRequest
  ) => Promise<void> | void;
}

export default function PatientModal({
  open,
  mode,
  patient,
  loading = false,
  onClose,
  onSubmit,
}: PatientModalProps) {
  return (
    <Modal
      open={open}
      title={mode === "create" ? "Add Patient" : "Edit Patient"}
      onClose={onClose}
    >
      <PatientForm
        mode={mode}
        initialValues={patient}
        loading={loading}
        onSubmit={async (data) => {
          await onSubmit(data);
          onClose();
        }}
      />
    </Modal>
  );
}
