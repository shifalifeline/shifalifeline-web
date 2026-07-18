"use client";

import { useState } from "react";
import StepMedicines from "./StepMedicines";
import StepPrescription from "./StepPrescription";
import StepDelivery from "./StepDelivery";
import StepPatient from "./StepPatient";
import StepReview from "./StepReview";

interface PatientData {
  fullName: string;
  mobile: string;
  alternateMobile: string;
  email: string;
  age: string;
  gender: string;
  city: string;
}

const initialPatient: PatientData = {
  fullName: "",
  mobile: "",
  alternateMobile: "",
  email: "",
  age: "",
  gender: "",
  city: "",
};

export default function PharmacyWizard() {
  const [step, setStep] = useState(1);

  const [medicines, setMedicines] = useState<string[]>([]);
  const [prescription, setPrescription] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [address, setAddress] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const [patient, setPatient] = useState(initialPatient);

  const [submitted, setSubmitted] = useState(false);

  const toggleMedicine = (medicine: string) => {
    setMedicines((prev) =>
      prev.includes(medicine)
        ? prev.filter((m) => m !== medicine)
        : [...prev, medicine]
    );
  };

  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPatient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    const orderId = `PHR-${Date.now().toString().slice(-8)}`;

    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <div className="mb-6 text-6xl">✅</div>

        <h2 className="text-3xl font-bold text-emerald-800">
          Order Submitted Successfully
        </h2>

        <p className="mt-4 text-slate-700">
          Thank you for placing your medicine order with
          SHIFA LIFE LINE.
        </p>

        <p className="mt-2 text-slate-700">
          Our pharmacy team will verify your order,
          contact you for confirmation, and arrange
          delivery or pickup.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <p className="font-semibold">
            Reference ID
          </p>

          <p className="mt-2 text-2xl font-bold text-cyan-700">
            {orderId}
          </p>
        </div>
      </div>
    );
  }

  switch (step) {
    case 1:
      return (
        <StepMedicines
          medicines={medicines}
          onToggle={toggleMedicine}
          onNext={() => setStep(2)}
        />
      );

    case 2:
      return (
        <StepPrescription
          prescription={prescription}
          notes={notes}
          onPrescriptionChange={setPrescription}
          onNotesChange={setNotes}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      );

    case 3:
      return (
        <StepDelivery
          deliveryMethod={deliveryMethod}
          address={address}
          preferredTime={preferredTime}
          onDeliveryMethodChange={setDeliveryMethod}
          onAddressChange={setAddress}
          onPreferredTimeChange={setPreferredTime}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      );

    case 4:
      return (
        <StepPatient
          data={patient}
          onChange={handlePatientChange}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      );

    case 5:
      return (
        <StepReview
          medicines={medicines}
          prescription={prescription}
          notes={notes}
          deliveryMethod={deliveryMethod}
          address={address}
          preferredTime={preferredTime}
          patient={patient}
          onBack={() => setStep(4)}
          onConfirm={() => setSubmitted(true)}
        />
      );

    default:
      return null;
  }
}