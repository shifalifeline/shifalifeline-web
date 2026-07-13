"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types/auth.types";
import { authGuard } from "@/middleware/authGuard";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (
      allowedRoles &&
      !authGuard({
        userRole: user.role,
        allowedRoles,
      })
    ) {
      router.replace("/unauthorized");
    }
  }, [loading, user, router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (
    allowedRoles &&
    !authGuard({
      userRole: user.role,
      allowedRoles,
    })
  ) {
    return null;
  }

  return <>{children}</>;
}