"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/lib/services/auth.service";

export default function OTPVerification() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const value =
      sessionStorage.getItem("reset_identifier") ?? "";

    if (!value) {
      router.replace("/forgot-password");
      return;
    }

    setIdentifier(value);
  }, [router]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await verifyOtp({
        identifier,
        otp,
      });

      if (!response.success) {
        throw new Error(
          response.message ?? "Invalid OTP."
        );
      }

      sessionStorage.setItem("reset_otp", otp);

      router.push("/reset-password");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify OTP."
      );
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
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(
              /\D/g,
              ""
            );

            if (value.length <= 6) {
              setOtp(value);
            }
          }}
          maxLength={6}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Enter OTP"
          className="w-full rounded-lg border px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-cyan-500"
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
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}