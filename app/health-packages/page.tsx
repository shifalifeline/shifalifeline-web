"use client";

import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import HealthPackageWizard from "@/components/health-packages/HealthPackageWizard";

export default function HealthPackagesPage() {
  return (
    <AppShell>
      <ModulePage
        title="Health Packages"
        description="Choose a preventive health check-up package and book your preferred date."
      >
        <HealthPackageWizard />
      </ModulePage>
    </AppShell>
  );
}