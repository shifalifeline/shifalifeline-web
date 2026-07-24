"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";

import { validateRegister } from "@/lib/validation/auth";
import { register as registerService } from "@/lib/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { getHomeRoute } from "@/lib/auth/roles";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const validationErrors = validateRegister({
      fullName,
      mobile,
      email,
      password,
      confirmPassword,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await registerService({
        fullName,
        mobile,
        email: email || undefined,
        password,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      const user = await login({
        identifier: mobile,
        password,
      });

      router.replace(getHomeRoute(user.role));
      router.refresh();
    } catch (error) {
      console.error(error);

      setErrors({
        mobile:
          error instanceof Error
            ? error.message
            : "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Create Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <TextInput
            placeholder="Full Name"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <TextInput
            type="tel"
            placeholder="Mobile Number"
            name="mobile"
            autoComplete="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && (
            <p className="mt-1 text-sm text-red-400">
              {errors.mobile}
            </p>
          )}
        </div>

        <div>
          <TextInput
            type="email"
            placeholder="Email Address (Optional)"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <PasswordInput
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <PasswordInput
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-slate-400">
          Already have an account?
        </span>{" "}
        <Link
          href="/login"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Login
        </Link>
      </div>
    </>
  );
}