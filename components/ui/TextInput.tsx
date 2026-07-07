import { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
  className = "",
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition-colors focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    />
  );
}