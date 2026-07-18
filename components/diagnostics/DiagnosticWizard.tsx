// Complete DiagnosticWizard.tsx
"use client";

import { useState } from "react";
import StepTests from "./StepTests";
import StepCollection from "./StepCollection";
import StepPatient from "./StepPatient";
import StepUploadPrescription from "./StepUploadPrescription";
import StepReview from "./StepReview";

export default function DiagnosticWizard() {
  const [step, setStep] = useState(1);

  const [tests, setTests] = useState<string[]>([]);
  const [collectionType, setCollectionType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [address, setAddress] = useState("");

  const [patient, setPatient] = useState({
    fullName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    age: "",
    gender: "",
    city: "",
  });

  const [prescription, setPrescription] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  function toggleTest(test: string) {
    setTests((prev) =>
      prev.includes(test)
        ? prev.filter((t) => t !== test)
        : [...prev, test]
    );
  }

  function handlePatientChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setPatient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  switch (step) {
    case 1:
      return (
        <StepTests
          selectedTests={tests}
          onToggleTest={toggleTest}
          onNext={() => setStep(2)}
        />
      );

    case 2:
      return (
        <StepCollection
          collectionType={collectionType}
          preferredDate={preferredDate}
          address={address}
          onCollectionTypeChange={setCollectionType}
          onPreferredDateChange={setPreferredDate}
          onAddressChange={setAddress}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      );

    case 3:
      return (
        <StepPatient
          data={patient}
          onChange={handlePatientChange}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      );

    case 4:
      return (
        <StepUploadPrescription
          prescription={prescription}
          notes={notes}
          onPrescriptionChange={setPrescription}
          onNotesChange={setNotes}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      );

    default:
      return (
        <StepReview
          tests={tests}
          collectionType={collectionType}
          preferredDate={preferredDate}
          address={address}
          patient={patient}
          prescription={prescription}
          notes={notes}
          onBack={() => setStep(4)}
        />
      );
  }
}
