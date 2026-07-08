import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
  AuthResponse,
} from "@/types/auth.types";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function login(
  data: LoginRequest
): Promise<AuthResponse> {
  console.log("Login", data);

  await delay(1000);

  return {
    success: true,
    message: "Login successful",
    accessToken: "demo-access-token",
    refreshToken: "demo-refresh-token",
    user: {
      id: "1",
      name: "Demo User",
      email: data.identifier,
      role: "PATIENT",
    },
  };
}

export async function register(
  data: RegisterRequest
): Promise<AuthResponse> {
  console.log("Register", data);

  await delay(1000);

  return {
    success: true,
    message: "Registration successful",
  };
}

export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<AuthResponse> {
  console.log("Forgot Password", data);

  await delay(1000);

  return {
    success: true,
    message: "OTP sent successfully",
    token: "verification-session-demo",
  };
}

export async function verifyOtp(
  data: VerifyOtpRequest
): Promise<AuthResponse> {
  console.log("Verify OTP", data);

  await delay(1000);

  return {
    success: true,
    message: "OTP verified successfully",
    token: "reset-password-token-demo",
  };
}

export async function resetPassword(
  data: ResetPasswordRequest
): Promise<AuthResponse> {
  console.log("Reset Password", data);

  await delay(1000);

  return {
    success: true,
    message: "Password reset successfully",
  };
}

export async function refreshToken(): Promise<AuthResponse> {
  console.log("Refresh Token");

  await delay(1000);

  return {
    success: true,
    accessToken: "new-demo-access-token",
    refreshToken: "new-demo-refresh-token",
  };
}

export async function logout(): Promise<AuthResponse> {
  console.log("Logout");

  await delay(500);

  return {
    success: true,
    message: "Logged out successfully",
  };
}