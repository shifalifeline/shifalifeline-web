import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Login
      </h2>

      <form className="space-y-5">
        <input
          type="text"
          placeholder="Mobile Number or Email"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-500"
        >
          Login
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