"use client";

import { useState } from "react";
import Link from "next/link";
import PasswordInput from "@/components/ui/PasswordInput";
import { validateLogin } from "@/lib/validation/auth";
import { login } from "@/lib/services/auth.service";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const validationErrors = validateLogin(
      identifier,
      password
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await login({
        identifier,
        password,
      });

      console.log(response);

      // Navigation will be added after backend integration.
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Mobile Number or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          {errors.identifier && (
            <p className="mt-1 text-sm text-red-400">
              {errors.identifier}
            </p>
          )}
        </div>

        <div>
          <PasswordInput
            placeholder="Password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 flex justify-between text-sm">
        <Link
          href="/forgot-password"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Forgot Password?
        </Link>

        <Link
          href="/register"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Register
        </Link>
      </div>
    </>
  );
}