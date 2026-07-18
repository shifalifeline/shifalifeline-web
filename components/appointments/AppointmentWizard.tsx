"use client";

import { useState } from "react";
import { DOCTORS } from "@/constants/doctors";
import { DOCTOR_AVAILABILITY } from "@/constants/doctorAvailability";
import StepDoctor from "./StepDoctor";
import StepSchedule from "./StepSchedule";
import StepPatient from "./StepPatient";
import StepReview from "./StepReview";

export default function AppointmentWizard() {
  const [step, setStep] = useState(1);

  const [doctorId, setDoctorId] = useState<number | null>(null);

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const [patient, setPatient] = useState({
    fullName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    age: "",
    gender: "",
    city: "",
  });

  const doctor = DOCTORS.find(
    (d) => d.id === doctorId
  );

  const availability =
    DOCTOR_AVAILABILITY.find(
      (d) => d.doctorId === doctorId
    )?.dates ?? [];

  const hasAvailability =
    availability.length > 0;

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setPatient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  if (step === 1)
    return (
      <StepDoctor
        selectedDoctor={doctorId}
        onSelect={(id) => {
          setDoctorId(id);
          setDate("");
          setSlot("");
        }}
        onNext={() => {
          if (hasAvailability) {
            setStep(2);
          } else {
            setStep(3);
          }
        }}
      />
    );

  if (step === 2)
    return (
      <StepSchedule
        availableDates={availability}
        date={date}
        slot={slot}
        onDateChange={setDate}
        onSlotChange={setSlot}
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
      />
    );

  if (step === 3)
    return (
      <StepPatient
        data={patient}
        onChange={handleChange}
        onBack={() =>
          setStep(hasAvailability ? 2 : 1)
        }
        onNext={() => setStep(4)}
      />
    );

  return (
    <StepReview
      doctor={doctor}
      date={date}
      slot={slot}
      hasAvailability={hasAvailability}
      patient={patient}
      onBack={() =>
        setStep(hasAvailability ? 3 : 3)
      }
    />
  );
}