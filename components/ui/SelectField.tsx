import { SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export default function SelectField({
  label,
  options,
  error,
  className = "",
  ...props
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200">
        {label}
      </label>

      <select
        {...props}
        className={`w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-blue-500 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}