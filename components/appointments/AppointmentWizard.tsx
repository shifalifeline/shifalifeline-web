"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { DoctorsService } from "@/modules/doctors/services/doctors.service";

import type { Doctor } from "@/types/doctor.types";
import type { ConsultationMode } from "@/types/booking";

import StepDoctor from "./StepDoctor";
import StepReview from "./StepReview";

export default function AppointmentWizard() {
  const { user } = useAuth();

  const [step, setStep] = useState(1);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [doctorError, setDoctorError] = useState("");

  const [doctorId, setDoctorId] =
    useState<string | null>(null);

  const [consultationMode, setConsultationMode] =
    useState<ConsultationMode | "">("");

  useEffect(() => {
    let mounted = true;

    async function loadDoctors() {
      try {
        setLoadingDoctors(true);
        setDoctorError("");

        const response =
          await DoctorsService.getDoctors();

        if (!mounted) return;

        setDoctors(
          response.doctors.filter(
            (doctor) => doctor.status === "Active"
          )
        );
      } catch (error) {
        console.error(error);

        if (mounted) {
          setDoctorError(
            "Unable to load doctors. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoadingDoctors(false);
        }
      }
    }

    loadDoctors();

    return () => {
      mounted = false;
    };
  }, []);

  const doctor =
    doctors.find(
      (item) => item.id === doctorId
    ) ?? null;

  if (step === 1) {
    return (
      <StepDoctor
        doctors={doctors}
        selectedDoctor={doctorId}
        consultationMode={consultationMode}
        loading={loadingDoctors}
        error={doctorError}
        onSelect={(id) => {
          setDoctorId(id);
        }}
        onConsultationModeChange={
          setConsultationMode
        }
        onNext={() => setStep(2)}
      />
    );
  }

  return (
    <StepReview
      doctor={doctor}
      consultationMode={consultationMode}
      patient={{
        fullName: user?.name ?? "",
        mobile: user?.phone ?? "",
        email: user?.email ?? "",
      }}
      onBack={() => setStep(1)}
    />
  );
}