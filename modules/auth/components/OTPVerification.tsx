"use client";

import { FormEvent } from "react";

interface OTPVerificationProps {
  onSubmit?: (otp: string) => void;
}

export default function OTPVerification({
  onSubmit,
}: OTPVerificationProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    onSubmit?.(String(form.get("otp") ?? ""));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        name="otp"
        maxLength={6}
        required
        placeholder="Enter OTP"
        className="w-full rounded-lg border px-4 py-3 text-center tracking-[0.5em]"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white"
      >
        Verify OTP
      </button>
    </form>
  );
}