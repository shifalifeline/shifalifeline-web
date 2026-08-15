"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import AppointmentWizard from "@/components/appointments/AppointmentWizard";

export default function AppointmentsPage() {
  return (
    <ProtectedRoute
      allowedRoles={["PATIENT"]}
    >
      <AppShell>
        <ModulePage
          title="Book Appointment"
          description="Select your doctor and consultation mode to submit an appointment request."
        >
          <AppointmentWizard />
        </ModulePage>
      </AppShell>
    </ProtectedRoute>
  );
}