import { ReactNode } from "react";

interface ModulePageProps {
  children: ReactNode;
}

export default function ModulePage({
  children,
}: ModulePageProps) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
}