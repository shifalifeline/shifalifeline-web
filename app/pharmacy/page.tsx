"use client";

import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import PharmacyWizard from "@/components/pharmacy/PharmacyWizard";

export default function PharmacyPage() {
  return (
    <AppShell>
      <ModulePage
        title="Order Medicines"
        description="Order medicines online, upload your prescription and request home delivery."
      >
        <PharmacyWizard />
      </ModulePage>
    </AppShell>
  );
}