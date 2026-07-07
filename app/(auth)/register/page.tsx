import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Create Account
      </h2>

      <form className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <input
          type="email"
          placeholder="Email Address (Optional)"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-500"
        >
          Create Account
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