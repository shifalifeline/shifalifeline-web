import { ReactNode } from "react";

interface ModulePageProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function ModulePage({
  title,
  description,
  actions,
  children,
}: ModulePageProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}