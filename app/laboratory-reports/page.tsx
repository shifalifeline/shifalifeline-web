"use client";

import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import LaboratoryReports from "@/components/laboratory/LaboratoryReports";

export default function LaboratoryReportsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Laboratory Reports"
        description="Search, view and download your diagnostic reports securely."
      >
        <LaboratoryReports />
      </ModulePage>
    </AppShell>
  );
}