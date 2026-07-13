import type { UserRole } from "@/types/auth.types";

export const ROLES = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
  PHARMACY: "PHARMACY",
  DIAGNOSTIC: "DIAGNOSTIC",
  RETAILER: "RETAILER",
} as const;

export const ROLE_HOME: Record<UserRole, string> = {
  ADMIN: "/dashboard",
  DOCTOR: "/dashboard",
  PATIENT: "/dashboard",
  PHARMACY: "/dashboard",
  DIAGNOSTIC: "/dashboard",
  RETAILER: "/dashboard",
};

export function getHomeRoute(role: UserRole): string {
  return ROLE_HOME[role] ?? "/dashboard";
}

export function hasRole(
  role: UserRole,
  allowed: UserRole[]
): boolean {
  return allowed.includes(role);
}