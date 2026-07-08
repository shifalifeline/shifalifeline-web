"use client";

import { useState } from "react";
import type { AuthUser } from "../../../types/auth.types";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  return {
    user,
    setUser,
    isAuthenticated: !!user,
  };
}