"use client";

import { useState } from "react";

import StepPackages, {
  HealthPackage,
} from "./StepPackages";
import StepSchedule from "./StepSchedule";
import StepPatient from "./StepPatient";
import StepReview from "./StepReview";

const packages: HealthPackage[] = [
  {
    id: "1",
    name: "Executive Health Check-up",
    price: 4999,
    tests: 82,
    homeCollection: true,
    description:
      "Comprehensive preventive health screening.",
  },
  {
    id: "2",
    name: "Basic Health Check-up",
    price: 1499,
    tests: 32,
    homeCollection: true,
    description:
      "Routine health assessment for adults.",
  },
  {
    id: "3",
    name: "Diabetes Care Package",
    price: 1899,
    tests: 18,
    homeCollection: true,
    description:
      "Complete diabetic screening profile.",
  },
  {
    id: "4",
    name: "Cardiac Screening",
    price: 2499,
    tests: 24,
    homeCollection: true,
    description:
      "Heart health and lipid assessment.",
  },
  {
    id: "5",
    name: "Women's Wellness",
    price: 2999,
    tests: 38,
    homeCollection: true,
    description:
      "Preventive healthcare package for women.",
  },
];

const initialPatient = {
  fullName: "",
  mobile: "",
  alternateMobile: "",
  email: "",
  age: "",
  gender: "",
  city: "",
};

export default function HealthPackageWizard() {
  const [step, setStep] = useState(1);

  const [selectedPackage, setSelectedPackage] =
    useState<HealthPackage | null>(null);

  const [collectionType, setCollectionType] =
    useState("");

  const [preferredDate, setPreferredDate] =
    useState("");

  const [preferredSession, setPreferredSession] =
    useState("");

  const [patient, setPatient] =
    useState(initialPatient);

  const [paymentPage, setPaymentPage] =
    useState(false);

  const handlePatientChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setPatient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (paymentPage && selectedPackage) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-cyan-200 bg-cyan-50 p-10 text-center">
        <div className="mb-5 text-6xl">💳</div>

        <h2 className="text-3xl font-bold">
          Payment Gateway
        </h2>

        <p className="mt-4 text-slate-700">
          This booking is ready for payment gateway
          integration.
        </p>

        <div className="mt-8 rounded-lg bg-white p-6">
          <p className="font-semibold">
            Package
          </p>

          <p className="mt-2">
            {selectedPackage.name}
          </p>

          <p className="mt-4 text-3xl font-bold text-cyan-700">
            ₹ {selectedPackage.price}
          </p>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Razorpay / PhonePe / PayU will be integrated
          in the payment sprint.
        </p>
      </div>
    );
  }

  switch (step) {
    case 1:
      return (
        <StepPackages
          packages={packages}
          selectedPackage={selectedPackage}
          onSelect={setSelectedPackage}
          onNext={() => setStep(2)}
        />
      );

    case 2:
      return (
        <StepSchedule
          collectionType={collectionType}
          preferredDate={preferredDate}
          preferredSession={preferredSession}
          onCollectionTypeChange={setCollectionType}
          onPreferredDateChange={setPreferredDate}
          onPreferredSessionChange={setPreferredSession}
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
      return selectedPackage ? (
        <StepReview
          selectedPackage={selectedPackage}
          collectionType={collectionType}
          preferredDate={preferredDate}
          preferredSession={preferredSession}
          patient={patient}
          onBack={() => setStep(3)}
          onProceedToPayment={() =>
            setPaymentPage(true)
          }
        />
      ) : null;

    default:
      return null;
  }
}