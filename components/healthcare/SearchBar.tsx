import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface SearchBarProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchBar({
  className = "",
  ...props
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        {...props}
        className={`w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-white outline-none transition focus:border-cyan-500 ${className}`}
      />
    </div>
  );
}