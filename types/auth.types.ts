export type UserRole =
  | "PATIENT"
  | "DOCTOR"
  | "ADMIN"
  | "PHARMACY"
  | "DIAGNOSTIC"
  | "RETAILER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  mobile: string;
  email?: string;
  password: string;
}

export interface ForgotPasswordRequest {
  identifier: string;
}

export interface VerifyOtpRequest {
  identifier: string;
  otp: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;

  accessToken?: string;
  refreshToken?: string;

  token?: string;

  user?: AuthUser;
}