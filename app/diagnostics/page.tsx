"use client";

import AppShell from "@/components/layout/AppShell";
import ModulePage from "@/components/layout/ModulePage";
import DiagnosticWizard from "@/components/diagnostics/DiagnosticWizard";

export default function DiagnosticsPage() {
  return (
    <AppShell>
      <ModulePage
        title="Book Diagnostic Tests"
        description="Book pathology and diagnostic tests online. Home sample collection is available for selected locations."
      >
        <DiagnosticWizard />
      </ModulePage>
    </AppShell>
  );
}