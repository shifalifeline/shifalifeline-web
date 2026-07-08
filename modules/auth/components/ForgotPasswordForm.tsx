"use client";

import { FormEvent } from "react";

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void;
}

export default function ForgotPasswordForm({
  onSubmit,
}: ForgotPasswordFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    onSubmit?.(String(form.get("email") ?? ""));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        name="email"
        type="email"
        required
        placeholder="Email Address"
        className="w-full rounded-lg border px-4 py-3"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white"
      >
        Send Reset Link
      </button>
    </form>
  );
}