import { OTPVerification } from "@/modules/auth";

export default function VerifyOTPPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">
          Verify OTP
        </h1>

        <p className="mb-8 text-gray-600">
          Enter the verification code sent to your registered mobile number or email.
        </p>

        <OTPVerification />
      </div>
    </main>
  );
}