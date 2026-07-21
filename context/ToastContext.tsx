"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toasts: ToastItem[];

  showToast: (
    message: string,
    type?: ToastType
  ) => void;

  removeToast: (
    id: number
  ) => void;
}

const ToastContext =
  createContext<
    ToastContextValue | undefined
  >(undefined);

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [toasts, setToasts] = useState<
    ToastItem[]
  >([]);

  const showToast = (
    message: string,
    type: ToastType = "info"
  ) => {
    const id = Date.now();

    setToasts((previous) => [
      ...previous,
      {
        id,
        message,
        type,
      },
    ]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (
    id: number
  ) => {
    setToasts((previous) =>
      previous.filter(
        (toast) => toast.id !== id
      )
    );
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context =
    useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext must be used inside ToastProvider."
    );
  }

  return context;
}