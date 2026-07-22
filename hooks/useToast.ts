"use client";

import { useToastContext } from "@/context/ToastContext";

export default function useToast() {
  const { showToast } = useToastContext();

  return {
    success: (message: string) =>
      showToast(message, "success"),

    error: (message: string) =>
      showToast(message, "error"),

    warning: (message: string) =>
      showToast(message, "warning"),

    info: (message: string) =>
      showToast(message, "info"),
  };
}