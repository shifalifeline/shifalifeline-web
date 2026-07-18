"use client";

import { useEffect, useState } from "react";

interface Props {
  otp: string;
  onOtpChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepVerify({
  otp,
  onOtpChange,
  onBack,
  onNext,
}: Props) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const resendOtp = () => {
    setTimer(30);
  };

  const valid = /^\d{6}$/.test(otp);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Verify OTP
        </h2>

        <p className="mt-2 text-slate-600">
          Enter the 6-digit OTP sent to your registered
          mobile number.
        </p>
      </div>

      <div className="rounded-xl border border-slate-300 bg-white p-6">
        <label className="mb-2 block font-medium text-slate-700">
          One-Time Password
        </label>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            onOtpChange(
              e.target.value.replace(/\D/g, "")
            )
          }
          placeholder="Enter 6-digit OTP"
          className="w-full rounded-lg border border-slate-300 p-3 text-center text-2xl tracking-[0.5em] focus:border-cyan-500 focus:outline-none"
        />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {timer > 0
              ? `Resend OTP in ${timer}s`
              : "Didn't receive the OTP?"}
          </span>

          <button
            type="button"
            disabled={timer > 0}
            onClick={resendOtp}
            className="font-medium text-cyan-600 disabled:text-slate-400"
          >
            Resend OTP
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          Demo Mode: Use any 6-digit numeric OTP to continue.
          Backend verification will be integrated later.
        </p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-6 py-3"
        >
          Back
        </button>

        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}