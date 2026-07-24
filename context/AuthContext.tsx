"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type {
  AuthUser,
  LoginRequest,
} from "@/types/auth.types";

import * as authService from "@/lib/services/auth.service";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const ACCESS_TOKEN_KEY = "shifa_access_token";
const REFRESH_TOKEN_KEY = "shifa_refresh_token";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    const accessToken = localStorage.getItem(
      ACCESS_TOKEN_KEY
    );

    if (!accessToken) {
      setUser(null);
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message);
      }

      setUser(data.user);
    } catch {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setUser(null);
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  async function login(
    payload: LoginRequest
  ): Promise<AuthUser> {
    const response = await authService.login(payload);

    if (
      !response.success ||
      !response.user ||
      !response.accessToken ||
      !response.refreshToken
    ) {
      throw new Error(
        response.message ?? "Login failed."
      );
    }

    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      response.accessToken
    );

    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      response.refreshToken
    );

    setUser(response.user);

    return response.user;
  }

  async function logout() {
    try {
      await authService.logout();
    } catch {}

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider."
    );
  }

  return context;
}