import { InputHTMLAttributes } from "react";

interface FormFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({
  label,
  error,
  className = "",
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200">
        {label}
      </label>

      <input
        {...props}
        className={`w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-blue-500 ${className}`}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}