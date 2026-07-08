"use client";

import { FormEvent } from "react";

interface RegisterFormProps {
  onSubmit?: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => void;
}

export default function RegisterForm({
  onSubmit,
}: RegisterFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    onSubmit?.(
      String(form.get("name") ?? ""),
      String(form.get("email") ?? ""),
      String(form.get("phone") ?? ""),
      String(form.get("password") ?? "")
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        name="name"
        placeholder="Full Name"
        required
        className="w-full rounded-lg border px-4 py-3"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-lg border px-4 py-3"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        required
        className="w-full rounded-lg border px-4 py-3"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full rounded-lg border px-4 py-3"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
      >
        Create Account
      </button>
    </form>
  );
}