import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth.types";

export const AuthService = {
  async login(_: LoginRequest): Promise<AuthResponse> {
    throw new Error("Backend not connected.");
  },

  async register(_: RegisterRequest): Promise<AuthResponse> {
    throw new Error("Backend not connected.");
  },

  async logout(): Promise<void> {
    return;
  },

  async refreshToken(): Promise<AuthResponse> {
    throw new Error("Backend not connected.");
  },
};