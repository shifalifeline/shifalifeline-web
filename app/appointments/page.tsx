"use client";

import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import AppointmentWizard from "@/components/appointments/AppointmentWizard";

export default function AppointmentsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Book Appointment"
        description="Select your doctor, choose an available date and submit your appointment request."
      >
        <AppointmentWizard />
      </ModulePage>
    </AppShell>
  );
}