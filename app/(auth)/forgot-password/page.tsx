import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-white">
        Forgot Password
      </h2>

      <p className="mb-6 text-sm text-slate-400">
        Enter your registered mobile number or email address. We'll send you a
        verification code to reset your password.
      </p>

      <form className="space-y-5">
        <input
          type="text"
          placeholder="Mobile Number or Email"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-500"
        >
          Send Verification Code
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