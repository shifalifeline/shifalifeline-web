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
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}