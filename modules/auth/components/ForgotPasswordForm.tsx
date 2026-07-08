"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/lib/services/auth.service";

interface ForgotPasswordFormProps {
  onSubmit?: (identifier: string) => void;
}

export default function ForgotPasswordForm({
  onSubmit,
}: ForgotPasswordFormProps) {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!identifier.trim()) {
      setError("Please enter your email or mobile number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await forgotPassword({
        identifier,
      });

      if (!response.success) {
        setError(
          response.message ??
            "Unable to send OTP. Please try again."
        );
        return;
      }

      onSubmit?.(identifier);

      router.push(
        `/verify-otp?identifier=${encodeURIComponent(
          identifier
        )}`
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <input
          name="identifier"
          type="text"
          value={identifier}
          onChange={(e) =>
            setIdentifier(e.target.value)
          }
          required
          placeholder="Email Address or Mobile Number"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
        />

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
}