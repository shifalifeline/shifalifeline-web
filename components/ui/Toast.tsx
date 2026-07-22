"use client";

import { useToastContext } from "@/context/ToastContext";

const toastStyles = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-800",

  error:
    "border-red-200 bg-red-50 text-red-800",

  warning:
    "border-amber-200 bg-amber-50 text-amber-800",

  info:
    "border-cyan-200 bg-cyan-50 text-cyan-800",
};

export default function Toast() {
  const {
    toasts,
    removeToast,
  } = useToastContext();

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto min-w-[320px] rounded-xl border px-4 py-3 shadow-lg transition-all duration-300 ${toastStyles[toast.type]}`}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="flex-1 text-sm font-medium">
              {toast.message}
            </p>

            <button
              type="button"
              onClick={() =>
                removeToast(toast.id)
              }
              className="text-lg leading-none opacity-70 transition hover:opacity-100"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}