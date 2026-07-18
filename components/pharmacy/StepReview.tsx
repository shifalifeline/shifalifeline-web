"use client";

interface PatientData {
  fullName: string;
  mobile: string;
  alternateMobile: string;
  email: string;
  age: string;
  gender: string;
  city: string;
}

interface Props {
  medicines: string[];
  prescription: File | null;
  notes: string;
  deliveryMethod: string;
  address: string;
  preferredTime: string;
  patient: PatientData;
  onBack: () => void;
  onConfirm: () => void;
}

export default function StepReview({
  medicines,
  prescription,
  notes,
  deliveryMethod,
  address,
  preferredTime,
  patient,
  onBack,
  onConfirm,
}: Props) {
  const orderId = `PHR-${Date.now().toString().slice(-8)}`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Review Your Order
        </h2>

        <p className="mt-2 text-slate-600">
          Please review your medicine order before submitting it.
        </p>
      </div>

      <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Medicines
          </h3>

          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {medicines.map((medicine) => (
              <li key={medicine}>{medicine}</li>
            ))}
          </ul>
        </section>

        <hr />

        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Prescription
          </h3>

          <p>
            <strong>Uploaded:</strong>{" "}
            {prescription ? prescription.name : "Not Uploaded"}
          </p>

          {notes && (
            <p className="mt-2">
              <strong>Notes:</strong> {notes}
            </p>
          )}
        </section>

        <hr />

        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Delivery
          </h3>

          <p>
            <strong>Method:</strong>{" "}
            {deliveryMethod === "HOME"
              ? "Home Delivery"
              : "Store Pickup"}
          </p>

          {deliveryMethod === "HOME" && (
            <p className="mt-2">
              <strong>Address:</strong> {address}
            </p>
          )}

          <p className="mt-2">
            <strong>Preferred Time:</strong> {preferredTime}
          </p>
        </section>

        <hr />

        <section>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Patient Details
          </h3>

          <div className="grid gap-2 md:grid-cols-2">
            <p>
              <strong>Name:</strong> {patient.fullName}
            </p>

            <p>
              <strong>Mobile:</strong> {patient.mobile}
            </p>

            {patient.alternateMobile && (
              <p>
                <strong>Alternate:</strong>{" "}
                {patient.alternateMobile}
              </p>
            )}

            {patient.email && (
              <p>
                <strong>Email:</strong> {patient.email}
              </p>
            )}

            <p>
              <strong>Age:</strong> {patient.age}
            </p>

            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>

            {patient.city && (
              <p>
                <strong>City:</strong> {patient.city}
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="font-semibold text-emerald-800">
          Order Summary
        </h3>

        <p className="mt-2 text-sm text-emerald-700">
          Your request will be reviewed by our pharmacy team.
          Prescription medicines will be dispensed only after
          pharmacist verification. You will receive a call to
          confirm medicine availability, pricing and delivery.
        </p>

        <p className="mt-3 font-semibold text-slate-900">
          Reference ID: {orderId}
        </p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white hover:bg-cyan-500"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}