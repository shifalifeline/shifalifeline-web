"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TextInput from "@/components/ui/TextInput";
import { forgotPassword } from "@/lib/services/auth.service";
import { validateForgotPassword } from "@/lib/validation/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const validationErrors =
      validateForgotPassword(identifier);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await forgotPassword({
        identifier,
      });

      if (!response.success) {
        throw new Error(
          response.message || "Request failed."
        );
      }

      sessionStorage.setItem(
        "reset_identifier",
        identifier
      );

      router.push("/verify-otp");
    } catch (error) {
      console.error(error);

      setErrors({
        identifier:
          error instanceof Error
            ? error.message
            : "Unable to send verification code.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-white">
        Forgot Password
      </h2>

      <p className="mb-6 text-sm text-slate-400">
        Enter your registered mobile number or email
        address. We'll send a verification code to reset
        your password.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <TextInput
            type="text"
            placeholder="Mobile Number or Email"
            name="identifier"
            autoComplete="username"
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
          />

          {errors.identifier && (
            <p className="mt-1 text-sm text-red-400">
              {errors.identifier}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Sending..."
            : "Send Verification Code"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Login
        </Link>
      </div>
    </>
  );
}